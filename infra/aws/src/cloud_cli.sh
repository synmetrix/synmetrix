echo "==> Installing AWS-CLI"
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"

sudo apt install -y unzip

unzip -qq awscliv2.zip
./aws/install

echo "AWS-CLI Authorizing..."
mkdir -p $RUNNER_HOME/.aws/
sudo chown $RUNNER_USER:$RUNNER_USER -R $RUNNER_HOME/.aws

aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY

echo "[SUCCESS] aws-cli configured"
