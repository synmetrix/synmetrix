# AWS cluster deployment guide

1. Install `aws-cli`
    * https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html
    * https://www.pulumi.com/docs/intro/cloud-providers/aws/setup/

2. Install `mssh` for the connection to EC2 instances: 
```
pip3 install ec2instanceconnectcli
```

3. Prepare production environment:
    * Auth aws-cli:
    ```
    aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID --profile $AWS_PROFILE_ID
    aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY --profile $AWS_PROFILE_ID
    ```

    * Create exchange `s3` storage bucket:
    ```
    aws s3api create-bucket --bucket mlcraft-bi-exchange-bucket --region us-east-1
    ```

    * Obtain AWS Service Account via [IAM](https://console.aws.amazon.com/iam/home). Account should have `SystemAdministrator` permission.

3. Go to `infra/aws`: `cd infra/aws`

4. Deploy configuration (you able to change yaml config file for `mlcraft-bi-stage`):

```
export AWS_PROFILE_ID=mlcraft_bi
export AWS_ACCESS_KEY_ID=<your-key-id>
export AWS_SECRET_ACCESS_KEY=<your-access-key>

./up.sh mlcraft-bi-stage
```

Note: pulumi passphrase is empty

To destroy:

```
./destroy.sh mlcraft-bi-stage
```

Note: to connect to the created instance use `mssh` [See docs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-connect-set-up.html#ec2-instance-connect-install-eic-CLI):

```
mssh LOGIN@INSTANCE_ID
```

Where:

* `Login` – your instance's `ami` login user name

* `INSTANCE_ID` – your instance id in format `i-001234a4bf70dec41EXAMPLE`

Warning: every AMI has it's own default login. Use default login to connect.

5. Change DNS to Route53 NS servers
6. Install CI/CD and deploy services

### `aws-cli` Quick Install (Mac OS)

```
AWS_PROFILE_ID=mlcraft_bi \
AWS_ACCESS_KEY_ID=<your-key-id> \
AWS_SECRET_ACCESS_KEY=<your-access-key> \
./scripts/install-aws-cli.sh
```

For more information go to [intallation guide.](https://github.com/aws/aws-cli/tree/v2#installation)
