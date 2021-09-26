echo "==> Installing AWS-CLI"

echo "AWS-CLI Authorizing..."
mkdir -p ~/.aws/

pip3 install --user ec2instanceconnectcli

wget -O AWSCLIV2.pkg https://awscli.amazonaws.com/AWSCLIV2.pkg
installer -pkg AWSCLIV2.pkg -target CurrentUserHomeDirectory

aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID --profile $AWS_PROFILE_ID
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY --profile $AWS_PROFILE_ID

which mssh

echo "[SUCCESS] aws-cli configured"
