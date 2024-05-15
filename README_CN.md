<p align="center"><a href="https://synmetrix.org"><img src="https://raw.githubusercontent.com/mlcraft-io/client-v2/master/src/assets/logo_with_text.png" alt="Synmetrix" width="300px"></a></p>

<p align="center">
<a href="https://synmetrix.org">网站</a> • <a href="https://docs.synmetrix.org">文档</a> • <a href="https://cube.dev/docs/schema/getting-started">Cube.js模型文档</a> • <a href="https://hub.docker.com/u/synmetrix">Docker Hub</a> • <a href="https://join.slack.com/t/mlcraft/shared_invite/zt-1x2gxwn37-J3tTvCR5xSFVfxwUU_YKtg">Slack社区</a>
</p>

# Synmetrix

Synmetrix（前身为MLCraft）是一个开源数据工程平台和用于集中度量管理的语义层。它提供了一个完整的框架，用于在大规模下对度量数据进行建模、集成、转换、聚合和分发。

### 关键特性

- **数据建模和转换**：使用SQL和[Cube](https://github.com/cube-js/cube)数据模型灵活定义度量和维度。应用转换和聚合。
- **语义层**：将来自各种来源的度量整合到一个统一、受管理的数据模型中。消除度量定义上的差异。
- **定时报告和警报**：通过可配置的报告和警报监控度量并获得变化通知。
- **版本控制**：随时间跟踪模式变化，以确保透明度和可审计性。
- **基于角色的访问控制**：管理数据模型和度量访问权限。
- **数据探索**：通过UI分析度量，或通过SQL API与任何BI工具集成。
- **缓存**：使用[Cube](https://github.com/cube-js/cube)的预聚合和缓存优化性能。
- **团队**：跨组织合作度量建模。

![Synmetrix – 开源语义层](https://synmetrix.org/assets/6542558ce0ae954c7fb97894_Open%20Graph-min.webp)

## 概述

Synmetrix利用[Cube (Cube.js)](https://github.com/cube-js/cube)实现灵活的数据模型，可以整合来自各个仓库、数据库、API等的度量。这个统一的语义层消除了定义和计算上的差异，提供了单一真理来源。

然后可以通过SQL API将度量数据模型下游分发给任何消费者，允许集成到BI工具、报告、仪表板、数据科学等中。

通过结合数据工程的最佳实践，如缓存、编排和转换，与自助式分析能力，Synmetrix加速了从度量定义到消费的数据驱动工作流程。

### 使用案例

1. **数据民主化**: Synmetrix 使得数据对非专家用户也易于访问，使组织中的每个人都能轻松做出基于数据的决策。

2. **商务智能（BI）与报告**: 将 Synmetrix 与任何 BI 工具集成，以进行高级报告和分析，改善数据可视化和见解。
   - [将 Synmetrix 与 Apache Superset 集成](https://github.com/mlcraft-io/examples/tree/main/superset) ([视频](https://www.youtube.com/watch?v=TzLy88IAYZo))

3. **嵌入式分析**: 使用 Synmetrix API 直接将分析功能嵌入应用程序中，为用户提供其工作流程中的实时数据洞察。
   - [将 Synmetrix 与 Observable 集成：快速指南](https://github.com/mlcraft-io/examples/tree/main/observable) ([视频](https://www.youtube.com/watch?v=VcAP4vrL8cY))
   - [使用 SQL API 将 Synmetrix 与 DBeaver 连接指南](https://github.com/mlcraft-io/examples/tree/main/dbeaver) ([视频](https://www.youtube.com/watch?v=8l_Ud3IM0OQ))

4. **LLM 的语义层**: 通过 Synmetrix 的语义层提高 LLM 在数据处理和查询中的准确性，改善数据交互和精度。
   - [Synmetrix 与大型语言模型（LLM）示例](https://github.com/mlcraft-io/examples/tree/main/langchain) ([视频](https://www.youtube.com/watch?v=TtH-pFGDK84))

# 入门

### 先决条件

- [Docker](https://docs.docker.com/install)
- [Docker Compose](https://docs.docker.com/compose/install)

### 第一步：下载 docker-compose 文件

在仓库 [mlcraft-io/mlcraft/install-manifests](https://github.com/mlcraft-io/mlcraft/tree/main/install-manifests) 中包含了在任何地方部署 Synmetrix 所需的所有安装清单。你可以从这个仓库下载 docker-compose 文件：

在新目录中执行以下命令：
```
wget https://raw.githubusercontent.com/mlcraft-io/mlcraft/main/install-manifests/docker-compose/docker-compose.yml
```

或者你可以使用 curl：
```
curl https://raw.githubusercontent.com/mlcraft-io/mlcraft/main/install-manifests/docker-compose/docker-compose.yml -o docker-compose.yml
```

注意：请确保查看 docker-compose.yml 文件中的[环境变量](docs/environments.md)，并根据需要进行修改。

### 第二步：启动 Synmetrix

执行以下命令启动 Synmetrix 以及用于数据存储的 Postgres 数据库：
```
docker-compose pull stack && docker-compose up -d
```

验证容器是否正在运行：
```
docker ps
```

输出示例：
```
CONTAINER ID IMAGE                 ... CREATED STATUS PORTS          ...
c8f342d086f3 synmetrix/stack       ... 1m ago  Up 1m  80->8888/tcp ...
30ea14ddaa5e postgres:12           ... 1m ago  Up 1m  5432/tcp  
```

安装所有依赖项大约需要 5-7 分钟。等待直到你看到 `Synmetrix Stack is ready` 消息。你可以使用 `docker-compose logs -f` 查看日志，以确认过程是否完成。

#### 在 ARM64v8 架构上运行 Synmetrix

首先，建议在你的 Mac 上安装 [Rosetta 2](https://support.apple.com/en-gb/102527)。这将允许 Docker 运行 ARM64v8 容器。自 Docker [4.25 版](https://www.docker.com/blog/docker-desktop-4-25/) 起，支持原生运行 ARM64v8 容器，但一些用户在未安装 Rosetta 的情况下仍会遇到问题。

对于 ARM64v8，Cubestore 需要特定版本。在 docker-compose 文件中更新 Cubestore 版本，添加 `-arm64v8` 后缀。例如，使用 `v0.35.33-arm64v8`（参见 [Docker Hub 上的 Cubestore 标签](https://hub.docker.com/r/cubejs/cubestore/tags) 获取最新版本）。

要在 ARM64v8 上运行 docker-compose 文件，请使用以下命令：
```
docker-compose pull stack && CUBESTORE_VERSION=v0.35.33-arm64v8 docker-compose up -d
```

视频指南（MacOS，M3 Max 处理器）：

[![视频指南](https://img.youtube.com/vi/nLorFq-WpGw/0.jpg)](https://youtu.be/nLorFq-WpGw)

### 步骤3：探索Synmetrix

* 您可以在[http://localhost/](http://localhost/)访问Synmetrix
* GraphQL端点位于[http://localhost/v1/graphql](http://localhost/v1/graphql)
* 管理控制台（Hasura Console）可以在[http://localhost/console](http://localhost/console)找到
* Cube Swagger API可以在[http://localhost:4000/docs](http://localhost:4000/docs)找到

#### 重要说明

1. **管理控制台访问**：请确保在docker-compose文件中检查 `HASURA_GRAPHQL_ADMIN_SECRET`。这是访问管理控制台的必要条件。默认值为 `adminsecret`。记得在生产环境中修改此值。
2. **环境变量**：设置所有必要的环境变量。Synmetrix将按默认值运行，但某些功能可能不会按预期执行。
3. **预加载的种子数据**：该项目配备了预加载的种子数据。使用下面的凭据登录：

   - 电子邮件：`demo@synmetrix.org`
   - 密码：`demodemo`

   该账户预配置了两个演示数据源及其相应的SQL API访问权限。对于SQL操作，您可以使用以下凭证与任何PostgreSQL客户端工具（例如DBeaver或TablePlus）一起使用：

   | 主机      | 端口  | 数据库 | 用户名               | 密码                 |
   | --------- | ----- | ------ | -------------------- | -------------------- |
   | localhost | 15432 | db     | demo_pg_user         | demo_pg_pass         |
   | localhost | 15432 | db     | demo_clickhouse_user | demo_clickhouse_pass |

## 文档

- [官方文档](https://docs.synmetrix.org/)
- [Cube文档](https://cube.dev/docs)

---

## 在线演示

演示：[app.synmetrix.org](https://app.synmetrix.org)

* 登录名：`demo@synmetrix.org`
* 密码：`demodemo`

### 演示凭据

| 数据库类型 | 主机                      | 端口 | 数据库  | 用户 | 密码   | SSL   |
| ---------- | ------------------------- | ---- | ------- | ---- | ------ | ----- |
| ClickHouse | gh-api.clickhouse.tech    | 443  | default | play | 无密码 | true  |
| PostgreSQL | demo-db-examples.cube.dev | 5432 | ecom    | cube | 12345  | false |

---

## 数据建模

Synmetrix利用Cube进行灵活的数据建模和转换。

Cube实现了一个多阶段SQL数据建模架构：

- 原始数据位于源数据库中，如Postgres、MySQL等。
- 使用Cube数据模型文件将原始数据建模为可重用的数据仓库。这些模型文件允许定义度量、维度、粒度和关系。
- 模型作为原始数据和应用代码之间的抽象层。
- Cube然后根据模型生成针对原始数据的优化分析SQL查询。
- Cube Store分布式缓存通过缓存查询结果优化查询性能。

这种建模架构使得使用Cube创建快速且复杂的分析查询变得简单，这些查询被优化以针对大型数据集运行。

统一数据模型可以整合来自不同数据库和系统的度量，为最终用户提供一致的语义层。

## Cube Store

对于生产工作负载，Synmetrix使用Cube Store作为缓存和查询执行层。

Cube Store是一个为操作分析而特别构建的数据库，优化了快速聚合和时间序列数据。它提供：

- 分布式查询以实现可扩展性
- 高级缓存以实现快速查询
- 面向分析性能的列式存储
- 

 与Cube的集成以进行建模

通过将Cube Store和Cube结合使用，Synmetrix从出色的分析性能和度量建模的灵活性中受益。

#### 基准测试

- [Synmetrix 与 Cube：缓存和高负载](https://github.com/mlcraft-io/examples/tree/main/benchmarks)

---

## 生态系统

| 仓库                                                         | 描述              |
| ------------------------------------------------------------ | ----------------- |
| [mlcraft-io/mlcraft](https://github.com/mlcraft-io/mlcraft)     | Synmetrix单体仓库 |
| [mlcraft-io/client-v2](https://github.com/mlcraft-io/client-v2) | Synmetrix客户端   |
| [mlcraft-io/docs](https://github.com/mlcraft-io/docs)           | Synmetrix文档     |
| [mlcraft-io/examples](https://github.com/mlcraft-io/examples)           | Synmetrix 示例     |

## 社区支持

如需使用Synmetrix的一般帮助，请参考官方Synmetrix文档。如需额外帮助，您可以使用以下任一渠道提问：

* [Slack](https://join.slack.com/t/mlcraft/shared_invite/zt-1x2gxwn37-J3tTvCR5xSFVfxwUU_YKtg) / 与社区和Synmetrix团队进行实时讨论
* [GitHub](https://github.com/mlcraft-io/mlcraft) / 报告错误，贡献

## 路线图

查看我们的[路线图](https://github.com/mlcraft-io/mlcraft/projects)，了解我们目前正在做什么，以及我们计划在接下来的几周、几个月和几年内做什么。

## 许可证

核心Synmetrix可在[Apache许可证2.0](https://github.com/mlcraft-io/mlcraft/blob/main/LICENSE)（Apache-2.0）下获得。

**所有其他内容**均可在[MIT许可证](LICENSE-community)下获得。

## 硬件要求

| 组件         | 要求                                              |
| ------------ | ------------------------------------------------- |
| 处理器 (CPU) | 3.2 GHz或更高，现代处理器，支持多线程和虚拟化。   |
| 内存 (RAM)   | 8 GB或更多，用于处理计算任务和数据处理。          |
| 磁盘空间     | 至少30 GB的空闲空间，用于软件安装和存储工作数据。 |
| 网络         | 需要互联网连接，用于云服务和软件更新。            |

## 作者

[@ifokeev](https://github.com/ifokeev), [@Libertonius](https://github.com/Libertonius), [@ilyozzz](https://github.com/ilyozzz)

---
