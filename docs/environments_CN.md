# 环境变量描述

本文档概述了项目中使用的环境变量。

## 核心变量

- `NODE_ENV` - 定义应用程序运行的环境。`production`值指示生产环境。
- `HASURA_GRAPHQL_ADMIN_SECRET` - 用于访问GraphQL [Hasura](https://github.com/hasura/graphql-engine)的管理员密钥。
- `HASURA_GRAPHQL_DATABASE_URL` - 用于将[Hasura](https://github.com/hasura/graphql-engine)连接到PostgreSQL数据库的URL。
- `DATABASE_URL` - 用于将[Hasura Backend Plus](https://github.com/nhost/hasura-backend-plus)连接到PostgreSQL的URL。
- `APP_FRONTEND_URL` - 应用程序前端的URL。

## PostgreSQL数据库

- `POSTGRES_HOST` - PostgreSQL数据库的主机。
- `POSTGRES_USER` - PostgreSQL数据库用户。
- `POSTGRES_PASSWORD` - 访问PostgreSQL数据库的密码。
- `POSTGRES_DB` - PostgreSQL数据库的名称。

## Amazon S3存储

- `AWS_S3_ENDPOINT` - 访问Amazon S3的端点。
- `AWS_S3_ACCESS_KEY_ID` - Amazon S3的访问密钥ID。
- `AWS_S3_SECRET_ACCESS_KEY` - Amazon S3的秘密访问密钥。
- `AWS_S3_REGION` - Amazon S3存储的区域。
- `AWS_S3_BUCKET_NAME` - Amazon S3桶的名称。

Amazon S3存储用于内部数据交换和视觉报告的生成，允许高效管理和传播组织内的处理数据，并便于分析和决策时访问报告。

## Minio存储

- `MINIO_ROOT_USER` - Minio的根用户。
- `MINIO_ROOT_PASSWORD` - Minio根用户的密码。
- `MINIO_DEFAULT_REGION` - Minio的默认区域。

Minio作为Amazon S3的开源替代品。它是一个与S3兼容的云存储，专为建立私有云而设计。Minio使组织能够独立于第三方云提供商存储大量数据，同时确保数据高性能和可用性。

## SMTP邮件服务器

- `SMTP_HOST` - SMTP服务器的主机。
- `SMTP_PORT` - SMTP服务器的端口。
- `SMTP_SECURE` - 是否对SMTP使用加密。
- `SMTP_USER` - SMTP服务器的用户。
- `SMTP_PASS` - SMTP服务器的密码。
- `SMTP_SENDER` - SMTP的电子邮件发送者。

SMTP用于发送邀请，注册新用户和基于电子邮件的登录。它为与用户的通信提供了一种安全高效的方法，通知他们重要事件、账户变更或通过电子邮件要求确认行动。

## Let's Encrypt

- `LETSENCRYPT_EMAIL` - 来自Let's Encrypt的通知电子邮件地址。由[Traefik](https://github.com/traefik/traefik)使用，为项目域生成SSL证书。