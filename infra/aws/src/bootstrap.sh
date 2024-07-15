#!/bin/bash

# Place runner user
RUNNER_HOME=/home/ubuntu
RUNNER_USER=ubuntu
PROJECT_HOME=/project
# EBS volume default path
EBS_PATH=/dev/xvdb

echo "=============== USER INFO ===================="
id -u
whoami
grep ^$(whoami): /etc/subuid
grep ^$(whoami): /etc/subgid
echo "/=============== USER INFO ===================="

sudo apt update
sudo apt remove -y --purge man-db
sudo apt install uidmap tar gzip python3-pip apt-transport-https ca-certificates curl software-properties-common -y --no-install-recommends

sudo addgroup --system docker
sudo adduser $RUNNER_USER docker
newgrp docker

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=$(dpkg --print-architecture)] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

sudo apt-cache search docker-ce
sudo apt install docker-ce docker-ce-cli containerd.io -y --no-install-recommends

echo "==> Installing NodeJS"
curl -sL https://deb.nodesource.com/setup_14.x | bash
sudo apt install nodejs -y --no-install-recommends

echo "==> Installing Yarn package manager"
curl -o- -L https://yarnpkg.com/install.sh | HOME=$RUNNER_HOME bash
sudo chown $RUNNER_USER:$RUNNER_USER -R $RUNNER_HOME/.yarn

echo "==> Installing Pulumi"
curl -fsSL https://get.pulumi.com/ | HOME=$RUNNER_HOME bash
sudo chown $RUNNER_USER:$RUNNER_USER -R $RUNNER_HOME/.pulumi

echo "==> Updating $RUNNER_HOME/.profile"
touch $RUNNER_HOME/.profile
sudo chown $RUNNER_USER:$RUNNER_USER -R $RUNNER_HOME/.profile

if test -e $EBS_PATH; then
  sudo mkfs -t xfs $EBS_PATH
  DISK_UUID=`blkid -s UUID -o value $EBS_PATH`

  echo UUID=$DISK_UUID $PROJECT_HOME xfs  user,defaults  0 2 | sudo tee -a /etc/fstab
else
  echo "[ERROR] No EBS disk found"
  exit
fi

# SWAP
sudo dd if=/dev/zero of=/swapfile bs=128M count=96
sudo chmod 600 /swapfile

echo "Swappiness before: "
cat /proc/sys/vm/swappiness
sudo sysctl vm.swappiness=10

echo "Swappiness after: "
cat /proc/sys/vm/swappiness

sudo mkswap /swapfile
sudo swapon /swapfile
sudo swapon -s

echo "/swapfile swap swap defaults 0 0" | sudo tee -a /etc/fstab
echo "vm.swappiness=10" | sudo tee -a /etc/sysctl.conf
# END SWAP

sudo mkdir -p $PROJECT_HOME
sudo chmod a+w $PROJECT_HOME
sudo chown $RUNNER_USER:$RUNNER_USER -R $PROJECT_HOME 

DOCKER_DATA_PATH=$PROJECT_HOME/.docker
sudo sudo mkdir -p $DOCKER_DATA_PATH
sudo chown $RUNNER_USER:$RUNNER_USER -R $DOCKER_DATA_PATH

echo "export PATH=\"$RUNNER_HOME/.yarn/bin:$RUNNER_HOME/.config/yarn/global/node_modules/.bin:\$PATH\"" >> $RUNNER_HOME/.profile
echo "export PATH=\"$RUNNER_HOME/.pulumi/bin:\$PATH\"" >> $RUNNER_HOME/.profile
echo "export PATH=\"$RUNNER_HOME/.local/bin:\$PATH\"" >> $RUNNER_HOME/.profile
echo "sudo mount -a" >> $RUNNER_HOME/.profile
echo "sudo mkdir -p $PROJECT_HOME" >> $RUNNER_HOME/.profile
echo "sudo chmod a+w $PROJECT_HOME" >> $RUNNER_HOME/.profile
echo "sudo chown $RUNNER_USER:$RUNNER_USER $PROJECT_HOME" >> $RUNNER_HOME/.profile 

echo "==> Finished updating $RUNNER_HOME/.profile"
echo "==> Use 'source $RUNNER_HOME/.profile' while working with the project"

source $RUNNER_HOME/.profile

sudo mount -a
sudo mkdir -p /etc/docker
sudo touch /etc/docker/daemon.json
echo "{\"data-root\": \"$DOCKER_DATA_PATH\"}" | sudo tee /etc/docker/daemon.json

sudo kubeadm reset -f
sudo systemctl stop kubelet
sudo systemctl disable kubelet

# restart docker after the bootstrap
sudo systemctl status docker
sudo systemctl daemon-reload
sudo systemctl restart docker

sudo systemctl enable docker
