export PULUMI_CONFIG_PASSPHRASE=
pulumi stack init --stack $1
pulumi up --stack $1 --non-interactive -y
