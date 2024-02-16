SET check_function_bodies = false;
INSERT INTO public.users (id, created_at, updated_at, display_name, avatar_url) VALUES ('bd254cd6-ada3-4803-88ec-a47749459169', '2024-02-15 22:46:43.475355+00', '2024-02-15 22:46:43.475355+00', 'demo@synmetrix.org', NULL);
INSERT INTO auth.accounts (id, created_at, updated_at, user_id, active, email, new_email, password_hash, default_role, is_anonymous, custom_register_data, otp_secret, mfa_enabled, ticket, ticket_expires_at) VALUES ('aa5bcd9a-d827-4031-8a26-05b01a4145d6', '2024-02-15 22:46:43.475355+00', '2024-02-15 22:46:43.475355+00', 'bd254cd6-ada3-4803-88ec-a47749459169', true, 'demo@synmetrix.org', NULL, '$2a$10$GUjaAaECotHVnd3UKFqmjerLzwtLQ.7Wov3l4dIAsFlBm8d0DFA4q', 'user', false, NULL, NULL, false, 'a91f003d-499b-416e-aa2d-00668e5c57d9', '2024-02-15 23:46:43.354+00');
INSERT INTO public.teams (id, name, created_at, updated_at, user_id) VALUES ('02db13fa-37ad-4a15-a237-e4a9f400797a', 'Default team', '2024-02-15 22:46:43.914448+00', '2024-02-15 22:46:43.914448+00', 'bd254cd6-ada3-4803-88ec-a47749459169');
INSERT INTO public.datasources (id, created_at, updated_at, user_id, name, db_type, db_params, team_id) VALUES ('715dfae1-1044-42ec-ac48-dd4cefa567e6', '2024-02-15 22:47:00.593649+00', '2024-02-15 22:47:00.593649+00', 'bd254cd6-ada3-4803-88ec-a47749459169', 'gh-api.clickhouse.tech', 'CLICKHOUSE', '{"ssl": true, "host": "gh-api.clickhouse.tech", "port": "443", "user": "play", "database": "default"}', '02db13fa-37ad-4a15-a237-e4a9f400797a');
INSERT INTO public.datasources (id, created_at, updated_at, user_id, name, db_type, db_params, team_id) VALUES ('17bbf032-2e25-4b17-aa61-1d3db0a99d57', '2024-02-15 22:48:59.94719+00', '2024-02-15 22:48:59.94719+00', 'bd254cd6-ada3-4803-88ec-a47749459169', 'demo-db.cube.dev', 'POSTGRES', '{"host": "demo-db.cube.dev", "port": "5432", "user": "cube", "database": "ecom", "password": "12345"}', '02db13fa-37ad-4a15-a237-e4a9f400797a');
INSERT INTO public.branches (id, created_at, updated_at, name, user_id, datasource_id, status) VALUES ('ad1cec32-dfd4-4b5c-9bad-5f18b4ec2048', '2024-02-15 22:47:00.593649+00', '2024-02-15 22:47:00.593649+00', 'main', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'active');
INSERT INTO public.branches (id, created_at, updated_at, name, user_id, datasource_id, status) VALUES ('9db82eca-59df-494c-a54f-18a92b22e2f4', '2024-02-15 22:48:59.94719+00', '2024-02-15 22:48:59.94719+00', 'main', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'active');
INSERT INTO public.versions (id, created_at, updated_at, branch_id, checksum, user_id, markdown_doc) VALUES ('cb87a34d-87e6-45b7-9339-248c18d951e8', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'ad1cec32-dfd4-4b5c-9bad-5f18b4ec2048', '31a27e596010ad20174355b37d07ce2d', 'bd254cd6-ada3-4803-88ec-a47749459169', NULL);
INSERT INTO public.versions (id, created_at, updated_at, branch_id, checksum, user_id, markdown_doc) VALUES ('3c0301b4-6735-40d7-b4cc-0bfe5221d4c8', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:45.816942+00', 'ad1cec32-dfd4-4b5c-9bad-5f18b4ec2048', '6c8159b836f2ce61976d6dd980de20fb', 'bd254cd6-ada3-4803-88ec-a47749459169', '#  Documentation
This documentation covers version 3c0301b4-6735-40d7-b4cc-0bfe5221d4c8 from branch "main".
####  List of cubes:
<details open>
<summary>HackernewsChangesToHistory</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Hackernews Changes to History
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsChangesToHistory.count`
- &nbsp;&nbsp; **Title**: `Hackernews Changes to History Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Type
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsChangesToHistory.type`
- &nbsp;&nbsp; **Title**: `Hackernews Changes to History Type`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; By
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsChangesToHistory.by`
- &nbsp;&nbsp; **Title**: `Hackernews Changes to History By`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Text
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsChangesToHistory.text`
- &nbsp;&nbsp; **Title**: `Hackernews Changes to History Text`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Url
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsChangesToHistory.url`
- &nbsp;&nbsp; **Title**: `Hackernews Changes to History Url`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Title
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsChangesToHistory.title`
- &nbsp;&nbsp; **Title**: `Hackernews Changes to History Title`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Update Time
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsChangesToHistory.updateTime`
- &nbsp;&nbsp; **Title**: `Hackernews Changes to History Update Time`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsChangesToHistory.time`
- &nbsp;&nbsp; **Title**: `Hackernews Changes to History Time`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>Actors</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Actors.count`
- &nbsp;&nbsp; **Title**: `Actors Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Login
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Actors.login`
- &nbsp;&nbsp; **Title**: `Actors Login`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Type
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Actors.type`
- &nbsp;&nbsp; **Title**: `Actors Type`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Site Admin
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Actors.siteAdmin`
- &nbsp;&nbsp; **Title**: `Actors Site Admin`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Actors.name`
- &nbsp;&nbsp; **Title**: `Actors Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Company
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Actors.company`
- &nbsp;&nbsp; **Title**: `Actors Company`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Blog
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Actors.blog`
- &nbsp;&nbsp; **Title**: `Actors Blog`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Location
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Actors.location`
- &nbsp;&nbsp; **Title**: `Actors Location`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Email
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Actors.email`
- &nbsp;&nbsp; **Title**: `Actors Email`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hireable
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Actors.hireable`
- &nbsp;&nbsp; **Title**: `Actors Hireable`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Bio
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Actors.bio`
- &nbsp;&nbsp; **Title**: `Actors Bio`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Twitter Username
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Actors.twitterUsername`
- &nbsp;&nbsp; **Title**: `Actors Twitter Username`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Created at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Actors.createdAt`
- &nbsp;&nbsp; **Title**: `Actors Created at`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Updated at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Actors.updatedAt`
- &nbsp;&nbsp; **Title**: `Actors Updated at`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>BenchmarkResults</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Benchmark Results
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `BenchmarkResults.count`
- &nbsp;&nbsp; **Title**: `Benchmark Results Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Run Id
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `BenchmarkResults.runId`
- &nbsp;&nbsp; **Title**: `Benchmark Results Run Id`
- &nbsp;&nbsp; **Type**: `string`
</details>
<details open>
<summary>BenchmarkRuns</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Benchmark Runs
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `BenchmarkRuns.count`
- &nbsp;&nbsp; **Title**: `Benchmark Runs Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Run Id
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `BenchmarkRuns.runId`
- &nbsp;&nbsp; **Title**: `Benchmark Runs Run Id`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Version
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `BenchmarkRuns.version`
- &nbsp;&nbsp; **Title**: `Benchmark Runs Version`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Threads
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `BenchmarkRuns.threads`
- &nbsp;&nbsp; **Title**: `Benchmark Runs Threads`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cpu Model
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `BenchmarkRuns.cpuModel`
- &nbsp;&nbsp; **Title**: `Benchmark Runs Cpu Model`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cpu
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `BenchmarkRuns.cpu`
- &nbsp;&nbsp; **Title**: `Benchmark Runs Cpu`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Df
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `BenchmarkRuns.df`
- &nbsp;&nbsp; **Title**: `Benchmark Runs Df`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Memory
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `BenchmarkRuns.memory`
- &nbsp;&nbsp; **Title**: `Benchmark Runs Memory`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Memory Total
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `BenchmarkRuns.memoryTotal`
- &nbsp;&nbsp; **Title**: `Benchmark Runs Memory Total`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Blk
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `BenchmarkRuns.blk`
- &nbsp;&nbsp; **Title**: `Benchmark Runs Blk`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Mdstat
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `BenchmarkRuns.mdstat`
- &nbsp;&nbsp; **Title**: `Benchmark Runs Mdstat`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Instance
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `BenchmarkRuns.instance`
- &nbsp;&nbsp; **Title**: `Benchmark Runs Instance`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Test Time
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `BenchmarkRuns.testTime`
- &nbsp;&nbsp; **Title**: `Benchmark Runs Test Time`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>CellTowers</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Cell Towers
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `CellTowers.count`
- &nbsp;&nbsp; **Title**: `Cell Towers Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Radio
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `CellTowers.radio`
- &nbsp;&nbsp; **Title**: `Cell Towers Radio`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lon
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `CellTowers.lon`
- &nbsp;&nbsp; **Title**: `Cell Towers Lon`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lat
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `CellTowers.lat`
- &nbsp;&nbsp; **Title**: `Cell Towers Lat`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Created
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `CellTowers.created`
- &nbsp;&nbsp; **Title**: `Cell Towers Created`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Updated
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `CellTowers.updated`
- &nbsp;&nbsp; **Title**: `Cell Towers Updated`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>HackernewsHistory2</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Hackernews History2
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsHistory2.count`
- &nbsp;&nbsp; **Title**: `Hackernews History2 Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Type
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsHistory2.type`
- &nbsp;&nbsp; **Title**: `Hackernews History2 Type`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; By
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsHistory2.by`
- &nbsp;&nbsp; **Title**: `Hackernews History2 By`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Text
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsHistory2.text`
- &nbsp;&nbsp; **Title**: `Hackernews History2 Text`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Url
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsHistory2.url`
- &nbsp;&nbsp; **Title**: `Hackernews History2 Url`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Title
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsHistory2.title`
- &nbsp;&nbsp; **Title**: `Hackernews History2 Title`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Update Time
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsHistory2.updateTime`
- &nbsp;&nbsp; **Title**: `Hackernews History2 Update Time`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsHistory2.time`
- &nbsp;&nbsp; **Title**: `Hackernews History2 Time`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>HackernewsTop</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Hackernews Top
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsTop.count`
- &nbsp;&nbsp; **Title**: `Hackernews Top Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Type
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsTop.type`
- &nbsp;&nbsp; **Title**: `Hackernews Top Type`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Update Time
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsTop.updateTime`
- &nbsp;&nbsp; **Title**: `Hackernews Top Update Time`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>Checks</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Checks.count`
- &nbsp;&nbsp; **Title**: `Checks Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Pull Request Number
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Checks.pullRequestNumber`
- &nbsp;&nbsp; **Title**: `Checks Pull Request Number`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Commit Sha
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Checks.commitSha`
- &nbsp;&nbsp; **Title**: `Checks Commit Sha`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Check Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Checks.checkName`
- &nbsp;&nbsp; **Title**: `Checks Check Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Check Status
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Checks.checkStatus`
- &nbsp;&nbsp; **Title**: `Checks Check Status`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Test Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Checks.testName`
- &nbsp;&nbsp; **Title**: `Checks Test Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Test Status
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Checks.testStatus`
- &nbsp;&nbsp; **Title**: `Checks Test Status`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Report Url
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Checks.reportUrl`
- &nbsp;&nbsp; **Title**: `Checks Report Url`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Pull Request Url
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Checks.pullRequestUrl`
- &nbsp;&nbsp; **Title**: `Checks Pull Request Url`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Commit Url
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Checks.commitUrl`
- &nbsp;&nbsp; **Title**: `Checks Commit Url`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Task Url
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Checks.taskUrl`
- &nbsp;&nbsp; **Title**: `Checks Task Url`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Base Ref
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Checks.baseRef`
- &nbsp;&nbsp; **Title**: `Checks Base Ref`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Base Repo
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Checks.baseRepo`
- &nbsp;&nbsp; **Title**: `Checks Base Repo`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Head Ref
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Checks.headRef`
- &nbsp;&nbsp; **Title**: `Checks Head Ref`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Head Repo
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Checks.headRepo`
- &nbsp;&nbsp; **Title**: `Checks Head Repo`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Test Context Raw
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Checks.testContextRaw`
- &nbsp;&nbsp; **Title**: `Checks Test Context Raw`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Instance Type
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Checks.instanceType`
- &nbsp;&nbsp; **Title**: `Checks Instance Type`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Instance Id
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Checks.instanceId`
- &nbsp;&nbsp; **Title**: `Checks Instance Id`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Check Start Time
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Checks.checkStartTime`
- &nbsp;&nbsp; **Title**: `Checks Check Start Time`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>CiscoUmbrella</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Cisco Umbrella
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `CiscoUmbrella.count`
- &nbsp;&nbsp; **Title**: `Cisco Umbrella Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Domain
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `CiscoUmbrella.domain`
- &nbsp;&nbsp; **Title**: `Cisco Umbrella Domain`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `CiscoUmbrella.date`
- &nbsp;&nbsp; **Title**: `Cisco Umbrella Date`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>Covid</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Covid.count`
- &nbsp;&nbsp; **Title**: `Covid Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Location Key
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Covid.locationKey`
- &nbsp;&nbsp; **Title**: `Covid Location Key`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Covid.date`
- &nbsp;&nbsp; **Title**: `Covid Date`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>Dish</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Dish.count`
- &nbsp;&nbsp; **Title**: `Dish Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lowest Price
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Dish.lowestPrice`
- &nbsp;&nbsp; **Title**: `Dish Lowest Price`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Highest Price
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Dish.highestPrice`
- &nbsp;&nbsp; **Title**: `Dish Highest Price`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Dish.name`
- &nbsp;&nbsp; **Title**: `Dish Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Description
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Dish.description`
- &nbsp;&nbsp; **Title**: `Dish Description`
- &nbsp;&nbsp; **Type**: `string`
</details>
<details open>
<summary>Dns2</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Dns2.count`
- &nbsp;&nbsp; **Title**: `Dns2 Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Domain
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Dns2.domain`
- &nbsp;&nbsp; **Title**: `Dns2 Domain`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; A
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Dns2.a`
- &nbsp;&nbsp; **Title**: `Dns2 A`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Aaaa
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Dns2.aaaa`
- &nbsp;&nbsp; **Title**: `Dns2 Aaaa`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cname
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Dns2.cname`
- &nbsp;&nbsp; **Title**: `Dns2 Cname`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Timestamp
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Dns2.timestamp`
- &nbsp;&nbsp; **Title**: `Dns2 Timestamp`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>Dns</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Dns.count`
- &nbsp;&nbsp; **Title**: `Dns Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Domain
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Dns.domain`
- &nbsp;&nbsp; **Title**: `Dns Domain`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; A
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Dns.a`
- &nbsp;&nbsp; **Title**: `Dns A`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Aaaa
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Dns.aaaa`
- &nbsp;&nbsp; **Title**: `Dns Aaaa`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cname
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Dns.cname`
- &nbsp;&nbsp; **Title**: `Dns Cname`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Timestamp
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Dns.timestamp`
- &nbsp;&nbsp; **Title**: `Dns Timestamp`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>FoodFacts</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Food Facts
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `FoodFacts.count`
- &nbsp;&nbsp; **Title**: `Food Facts Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Data
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `FoodFacts.data`
- &nbsp;&nbsp; **Title**: `Food Facts Data`
- &nbsp;&nbsp; **Type**: `string`
</details>
<details open>
<summary>GithubEvents</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Github Events
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.count`
- &nbsp;&nbsp; **Title**: `Github Events Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Number
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.number`
- &nbsp;&nbsp; **Title**: `Github Events Number`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Event Type
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.eventType`
- &nbsp;&nbsp; **Title**: `Github Events Event Type`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Actor Login
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.actorLogin`
- &nbsp;&nbsp; **Title**: `Github Events Actor Login`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Repo Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.repoName`
- &nbsp;&nbsp; **Title**: `Github Events Repo Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Body
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.body`
- &nbsp;&nbsp; **Title**: `Github Events Body`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Path
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.path`
- &nbsp;&nbsp; **Title**: `Github Events Path`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ref
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.ref`
- &nbsp;&nbsp; **Title**: `Github Events Ref`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ref Type
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.refType`
- &nbsp;&nbsp; **Title**: `Github Events Ref Type`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Creator User Login
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.creatorUserLogin`
- &nbsp;&nbsp; **Title**: `Github Events Creator User Login`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Title
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.title`
- &nbsp;&nbsp; **Title**: `Github Events Title`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Labels
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.labels`
- &nbsp;&nbsp; **Title**: `Github Events Labels`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; State
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.state`
- &nbsp;&nbsp; **Title**: `Github Events State`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Assignee
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.assignee`
- &nbsp;&nbsp; **Title**: `Github Events Assignee`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Assignees
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.assignees`
- &nbsp;&nbsp; **Title**: `Github Events Assignees`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Author Association
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.authorAssociation`
- &nbsp;&nbsp; **Title**: `Github Events Author Association`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Merge Commit Sha
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.mergeCommitSha`
- &nbsp;&nbsp; **Title**: `Github Events Merge Commit Sha`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Requested Reviewers
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.requestedReviewers`
- &nbsp;&nbsp; **Title**: `Github Events Requested Reviewers`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Requested Teams
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.requestedTeams`
- &nbsp;&nbsp; **Title**: `Github Events Requested Teams`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Head Ref
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.headRef`
- &nbsp;&nbsp; **Title**: `Github Events Head Ref`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Head Sha
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.headSha`
- &nbsp;&nbsp; **Title**: `Github Events Head Sha`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Base Ref
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.baseRef`
- &nbsp;&nbsp; **Title**: `Github Events Base Ref`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Base Sha
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.baseSha`
- &nbsp;&nbsp; **Title**: `Github Events Base Sha`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Mergeable State
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.mergeableState`
- &nbsp;&nbsp; **Title**: `Github Events Mergeable State`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Merged by
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.mergedBy`
- &nbsp;&nbsp; **Title**: `Github Events Merged by`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Diff Hunk
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.diffHunk`
- &nbsp;&nbsp; **Title**: `Github Events Diff Hunk`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Commit Id
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.commitId`
- &nbsp;&nbsp; **Title**: `Github Events Commit Id`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Original Commit Id
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.originalCommitId`
- &nbsp;&nbsp; **Title**: `Github Events Original Commit Id`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Member Login
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.memberLogin`
- &nbsp;&nbsp; **Title**: `Github Events Member Login`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Release Tag Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.releaseTagName`
- &nbsp;&nbsp; **Title**: `Github Events Release Tag Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Release Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.releaseName`
- &nbsp;&nbsp; **Title**: `Github Events Release Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Review State
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.reviewState`
- &nbsp;&nbsp; **Title**: `Github Events Review State`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Created at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.createdAt`
- &nbsp;&nbsp; **Title**: `Github Events Created at`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Updated at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.updatedAt`
- &nbsp;&nbsp; **Title**: `Github Events Updated at`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; File Time
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.fileTime`
- &nbsp;&nbsp; **Title**: `Github Events File Time`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Action
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.action`
- &nbsp;&nbsp; **Title**: `Github Events Action`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Closed at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.closedAt`
- &nbsp;&nbsp; **Title**: `Github Events Closed at`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Merged at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `GithubEvents.mergedAt`
- &nbsp;&nbsp; **Title**: `Github Events Merged at`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>HackernewsChangesItems</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Hackernews Changes Items
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsChangesItems.count`
- &nbsp;&nbsp; **Title**: `Hackernews Changes Items Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Type
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsChangesItems.type`
- &nbsp;&nbsp; **Title**: `Hackernews Changes Items Type`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; By
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsChangesItems.by`
- &nbsp;&nbsp; **Title**: `Hackernews Changes Items By`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Text
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsChangesItems.text`
- &nbsp;&nbsp; **Title**: `Hackernews Changes Items Text`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Url
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsChangesItems.url`
- &nbsp;&nbsp; **Title**: `Hackernews Changes Items Url`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Title
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsChangesItems.title`
- &nbsp;&nbsp; **Title**: `Hackernews Changes Items Title`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Update Time
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsChangesItems.updateTime`
- &nbsp;&nbsp; **Title**: `Hackernews Changes Items Update Time`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsChangesItems.time`
- &nbsp;&nbsp; **Title**: `Hackernews Changes Items Time`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>HackernewsChangesProfiles</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Hackernews Changes Profiles
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsChangesProfiles.count`
- &nbsp;&nbsp; **Title**: `Hackernews Changes Profiles Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Submitted Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsChangesProfiles.submittedCount`
- &nbsp;&nbsp; **Title**: `Hackernews Changes Profiles Submitted Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; About
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsChangesProfiles.about`
- &nbsp;&nbsp; **Title**: `Hackernews Changes Profiles About`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Created
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsChangesProfiles.created`
- &nbsp;&nbsp; **Title**: `Hackernews Changes Profiles Created`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Update Time
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsChangesProfiles.updateTime`
- &nbsp;&nbsp; **Title**: `Hackernews Changes Profiles Update Time`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>HackernewsHistory</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Hackernews History
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsHistory.count`
- &nbsp;&nbsp; **Title**: `Hackernews History Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Type
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsHistory.type`
- &nbsp;&nbsp; **Title**: `Hackernews History Type`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; By
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsHistory.by`
- &nbsp;&nbsp; **Title**: `Hackernews History By`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Text
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsHistory.text`
- &nbsp;&nbsp; **Title**: `Hackernews History Text`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Url
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsHistory.url`
- &nbsp;&nbsp; **Title**: `Hackernews History Url`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Title
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsHistory.title`
- &nbsp;&nbsp; **Title**: `Hackernews History Title`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Update Time
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsHistory.updateTime`
- &nbsp;&nbsp; **Title**: `Hackernews History Update Time`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `HackernewsHistory.time`
- &nbsp;&nbsp; **Title**: `Hackernews History Time`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>Hackernews</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Hackernews.count`
- &nbsp;&nbsp; **Title**: `Hackernews Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Type
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Hackernews.type`
- &nbsp;&nbsp; **Title**: `Hackernews Type`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; By
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Hackernews.by`
- &nbsp;&nbsp; **Title**: `Hackernews By`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Text
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Hackernews.text`
- &nbsp;&nbsp; **Title**: `Hackernews Text`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Url
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Hackernews.url`
- &nbsp;&nbsp; **Title**: `Hackernews Url`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Title
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Hackernews.title`
- &nbsp;&nbsp; **Title**: `Hackernews Title`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Hackernews.time`
- &nbsp;&nbsp; **Title**: `Hackernews Time`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>Lineorder</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Lineorder.count`
- &nbsp;&nbsp; **Title**: `Lineorder Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lo Linenumber
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Lineorder.loLinenumber`
- &nbsp;&nbsp; **Title**: `Lineorder Lo Linenumber`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lo Quantity
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Lineorder.loQuantity`
- &nbsp;&nbsp; **Title**: `Lineorder Lo Quantity`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lo Extendedprice
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Lineorder.loExtendedprice`
- &nbsp;&nbsp; **Title**: `Lineorder Lo Extendedprice`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lo Ordtotalprice
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Lineorder.loOrdtotalprice`
- &nbsp;&nbsp; **Title**: `Lineorder Lo Ordtotalprice`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lo Discount
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Lineorder.loDiscount`
- &nbsp;&nbsp; **Title**: `Lineorder Lo Discount`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lo Supplycost
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Lineorder.loSupplycost`
- &nbsp;&nbsp; **Title**: `Lineorder Lo Supplycost`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lo Orderpriority
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Lineorder.loOrderpriority`
- &nbsp;&nbsp; **Title**: `Lineorder Lo Orderpriority`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lo Shipmode
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Lineorder.loShipmode`
- &nbsp;&nbsp; **Title**: `Lineorder Lo Shipmode`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lo Orderdate
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Lineorder.loOrderdate`
- &nbsp;&nbsp; **Title**: `Lineorder Lo Orderdate`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lo Commitdate
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Lineorder.loCommitdate`
- &nbsp;&nbsp; **Title**: `Lineorder Lo Commitdate`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>LocStats</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Loc Stats
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `LocStats.count`
- &nbsp;&nbsp; **Title**: `Loc Stats Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Repo Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `LocStats.repoName`
- &nbsp;&nbsp; **Title**: `Loc Stats Repo Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Language
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `LocStats.language`
- &nbsp;&nbsp; **Title**: `Loc Stats Language`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Path
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `LocStats.path`
- &nbsp;&nbsp; **Title**: `Loc Stats Path`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; File
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `LocStats.file`
- &nbsp;&nbsp; **Title**: `Loc Stats File`
- &nbsp;&nbsp; **Type**: `string`
</details>
<details open>
<summary>MenuItem</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Menu Item
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `MenuItem.count`
- &nbsp;&nbsp; **Title**: `Menu Item Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Price
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `MenuItem.price`
- &nbsp;&nbsp; **Title**: `Menu Item Price`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; High Price
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `MenuItem.highPrice`
- &nbsp;&nbsp; **Title**: `Menu Item High Price`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Xpos
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `MenuItem.xpos`
- &nbsp;&nbsp; **Title**: `Menu Item Xpos`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ypos
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `MenuItem.ypos`
- &nbsp;&nbsp; **Title**: `Menu Item Ypos`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Created at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `MenuItem.createdAt`
- &nbsp;&nbsp; **Title**: `Menu Item Created at`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Updated at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `MenuItem.updatedAt`
- &nbsp;&nbsp; **Title**: `Menu Item Updated at`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>MenuPage</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Menu Page
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `MenuPage.count`
- &nbsp;&nbsp; **Title**: `Menu Page Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Page Number
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `MenuPage.pageNumber`
- &nbsp;&nbsp; **Title**: `Menu Page Page Number`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Image Id
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `MenuPage.imageId`
- &nbsp;&nbsp; **Title**: `Menu Page Image Id`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Uuid
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `MenuPage.uuid`
- &nbsp;&nbsp; **Title**: `Menu Page Uuid`
- &nbsp;&nbsp; **Type**: `string`
</details>
<details open>
<summary>Menu</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Menu.count`
- &nbsp;&nbsp; **Title**: `Menu Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Page Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Menu.pageCount`
- &nbsp;&nbsp; **Title**: `Menu Page Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dish Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Menu.dishCount`
- &nbsp;&nbsp; **Title**: `Menu Dish Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Menu.name`
- &nbsp;&nbsp; **Title**: `Menu Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sponsor
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Menu.sponsor`
- &nbsp;&nbsp; **Title**: `Menu Sponsor`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Event
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Menu.event`
- &nbsp;&nbsp; **Title**: `Menu Event`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Venue
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Menu.venue`
- &nbsp;&nbsp; **Title**: `Menu Venue`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Place
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Menu.place`
- &nbsp;&nbsp; **Title**: `Menu Place`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Physical Description
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Menu.physicalDescription`
- &nbsp;&nbsp; **Title**: `Menu Physical Description`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Occasion
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Menu.occasion`
- &nbsp;&nbsp; **Title**: `Menu Occasion`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Notes
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Menu.notes`
- &nbsp;&nbsp; **Title**: `Menu Notes`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Call Number
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Menu.callNumber`
- &nbsp;&nbsp; **Title**: `Menu Call Number`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Keywords
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Menu.keywords`
- &nbsp;&nbsp; **Title**: `Menu Keywords`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Language
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Menu.language`
- &nbsp;&nbsp; **Title**: `Menu Language`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Menu.date`
- &nbsp;&nbsp; **Title**: `Menu Date`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Location
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Menu.location`
- &nbsp;&nbsp; **Title**: `Menu Location`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Location Type
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Menu.locationType`
- &nbsp;&nbsp; **Title**: `Menu Location Type`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Currency
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Menu.currency`
- &nbsp;&nbsp; **Title**: `Menu Currency`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Currency Symbol
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Menu.currencySymbol`
- &nbsp;&nbsp; **Title**: `Menu Currency Symbol`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Status
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Menu.status`
- &nbsp;&nbsp; **Title**: `Menu Status`
- &nbsp;&nbsp; **Type**: `string`
</details>
<details open>
<summary>Minicrawl</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Minicrawl.count`
- &nbsp;&nbsp; **Title**: `Minicrawl Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Domain
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Minicrawl.domain`
- &nbsp;&nbsp; **Title**: `Minicrawl Domain`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Log
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Minicrawl.log`
- &nbsp;&nbsp; **Title**: `Minicrawl Log`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Content
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Minicrawl.content`
- &nbsp;&nbsp; **Title**: `Minicrawl Content`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Is Utf8
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Minicrawl.isUtf8`
- &nbsp;&nbsp; **Title**: `Minicrawl Is Utf8`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Text
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Minicrawl.text`
- &nbsp;&nbsp; **Title**: `Minicrawl Text`
- &nbsp;&nbsp; **Type**: `string`
</details>
<details open>
<summary>Ontime</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.count`
- &nbsp;&nbsp; **Title**: `Ontime Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Reporting Airline
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.reportingAirline`
- &nbsp;&nbsp; **Title**: `Ontime Reporting Airline`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Iata Code Reporting Airline
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.iataCodeReportingAirline`
- &nbsp;&nbsp; **Title**: `Ontime Iata Code Reporting Airline`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tail Number
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.tailNumber`
- &nbsp;&nbsp; **Title**: `Ontime Tail Number`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Flight Number Reporting Airline
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.flightNumberReportingAirline`
- &nbsp;&nbsp; **Title**: `Ontime Flight Number Reporting Airline`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Origin
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.origin`
- &nbsp;&nbsp; **Title**: `Ontime Origin`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Origincityname
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.origincityname`
- &nbsp;&nbsp; **Title**: `Ontime Origincityname`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Originstate
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.originstate`
- &nbsp;&nbsp; **Title**: `Ontime Originstate`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Originstatefips
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.originstatefips`
- &nbsp;&nbsp; **Title**: `Ontime Originstatefips`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Originstatename
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.originstatename`
- &nbsp;&nbsp; **Title**: `Ontime Originstatename`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dest
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.dest`
- &nbsp;&nbsp; **Title**: `Ontime Dest`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Destcityname
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.destcityname`
- &nbsp;&nbsp; **Title**: `Ontime Destcityname`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Deststate
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.deststate`
- &nbsp;&nbsp; **Title**: `Ontime Deststate`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Deststatefips
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.deststatefips`
- &nbsp;&nbsp; **Title**: `Ontime Deststatefips`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Deststatename
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.deststatename`
- &nbsp;&nbsp; **Title**: `Ontime Deststatename`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Departuredelaygroups
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.departuredelaygroups`
- &nbsp;&nbsp; **Title**: `Ontime Departuredelaygroups`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Deptimeblk
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.deptimeblk`
- &nbsp;&nbsp; **Title**: `Ontime Deptimeblk`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Wheelsoff
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.wheelsoff`
- &nbsp;&nbsp; **Title**: `Ontime Wheelsoff`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Wheelson
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.wheelson`
- &nbsp;&nbsp; **Title**: `Ontime Wheelson`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Arrivaldelaygroups
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.arrivaldelaygroups`
- &nbsp;&nbsp; **Title**: `Ontime Arrivaldelaygroups`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Arrtimeblk
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.arrtimeblk`
- &nbsp;&nbsp; **Title**: `Ontime Arrtimeblk`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cancellationcode
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.cancellationcode`
- &nbsp;&nbsp; **Title**: `Ontime Cancellationcode`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Div1 Airport
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.div1airport`
- &nbsp;&nbsp; **Title**: `Ontime Div1 Airport`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Div1 Tailnum
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.div1tailnum`
- &nbsp;&nbsp; **Title**: `Ontime Div1 Tailnum`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Div2 Airport
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.div2airport`
- &nbsp;&nbsp; **Title**: `Ontime Div2 Airport`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Div2 Tailnum
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.div2tailnum`
- &nbsp;&nbsp; **Title**: `Ontime Div2 Tailnum`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Div3 Airport
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.div3airport`
- &nbsp;&nbsp; **Title**: `Ontime Div3 Airport`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Div3 Tailnum
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.div3tailnum`
- &nbsp;&nbsp; **Title**: `Ontime Div3 Tailnum`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Div4 Airport
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.div4airport`
- &nbsp;&nbsp; **Title**: `Ontime Div4 Airport`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Div4 Tailnum
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.div4tailnum`
- &nbsp;&nbsp; **Title**: `Ontime Div4 Tailnum`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Div5 Airport
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.div5airport`
- &nbsp;&nbsp; **Title**: `Ontime Div5 Airport`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Div5 Tailnum
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.div5tailnum`
- &nbsp;&nbsp; **Title**: `Ontime Div5 Tailnum`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Flightdate
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Ontime.flightdate`
- &nbsp;&nbsp; **Title**: `Ontime Flightdate`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>Trips</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.count`
- &nbsp;&nbsp; **Title**: `Trips Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Passenger Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.passengerCount`
- &nbsp;&nbsp; **Title**: `Trips Passenger Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Vendor Id
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.vendorId`
- &nbsp;&nbsp; **Title**: `Trips Vendor Id`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Pickup Longitude
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.pickupLongitude`
- &nbsp;&nbsp; **Title**: `Trips Pickup Longitude`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Pickup Latitude
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.pickupLatitude`
- &nbsp;&nbsp; **Title**: `Trips Pickup Latitude`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dropoff Longitude
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.dropoffLongitude`
- &nbsp;&nbsp; **Title**: `Trips Dropoff Longitude`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dropoff Latitude
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.dropoffLatitude`
- &nbsp;&nbsp; **Title**: `Trips Dropoff Latitude`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Trip Distance
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.tripDistance`
- &nbsp;&nbsp; **Title**: `Trips Trip Distance`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Fare Amount
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.fareAmount`
- &nbsp;&nbsp; **Title**: `Trips Fare Amount`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Extra
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.extra`
- &nbsp;&nbsp; **Title**: `Trips Extra`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Mta Tax
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.mtaTax`
- &nbsp;&nbsp; **Title**: `Trips Mta Tax`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tip Amount
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.tipAmount`
- &nbsp;&nbsp; **Title**: `Trips Tip Amount`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tolls Amount
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.tollsAmount`
- &nbsp;&nbsp; **Title**: `Trips Tolls Amount`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ehail Fee
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.ehailFee`
- &nbsp;&nbsp; **Title**: `Trips Ehail Fee`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Improvement Surcharge
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.improvementSurcharge`
- &nbsp;&nbsp; **Title**: `Trips Improvement Surcharge`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Total Amount
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.totalAmount`
- &nbsp;&nbsp; **Title**: `Trips Total Amount`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Payment Type
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.paymentType`
- &nbsp;&nbsp; **Title**: `Trips Payment Type`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Pickup
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.pickup`
- &nbsp;&nbsp; **Title**: `Trips Pickup`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dropoff
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.dropoff`
- &nbsp;&nbsp; **Title**: `Trips Dropoff`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cab Type
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.cabType`
- &nbsp;&nbsp; **Title**: `Trips Cab Type`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Pickup Ctlabel
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.pickupCtlabel`
- &nbsp;&nbsp; **Title**: `Trips Pickup Ctlabel`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Pickup Ct2010
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.pickupCt2010`
- &nbsp;&nbsp; **Title**: `Trips Pickup Ct2010`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Pickup Boroct2010
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.pickupBoroct2010`
- &nbsp;&nbsp; **Title**: `Trips Pickup Boroct2010`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Pickup Cdeligibil
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.pickupCdeligibil`
- &nbsp;&nbsp; **Title**: `Trips Pickup Cdeligibil`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Pickup Ntacode
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.pickupNtacode`
- &nbsp;&nbsp; **Title**: `Trips Pickup Ntacode`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Pickup Ntaname
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.pickupNtaname`
- &nbsp;&nbsp; **Title**: `Trips Pickup Ntaname`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dropoff Ctlabel
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.dropoffCtlabel`
- &nbsp;&nbsp; **Title**: `Trips Dropoff Ctlabel`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dropoff Ct2010
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.dropoffCt2010`
- &nbsp;&nbsp; **Title**: `Trips Dropoff Ct2010`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dropoff Boroct2010
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.dropoffBoroct2010`
- &nbsp;&nbsp; **Title**: `Trips Dropoff Boroct2010`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dropoff Cdeligibil
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.dropoffCdeligibil`
- &nbsp;&nbsp; **Title**: `Trips Dropoff Cdeligibil`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dropoff Ntacode
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.dropoffNtacode`
- &nbsp;&nbsp; **Title**: `Trips Dropoff Ntacode`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dropoff Ntaname
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.dropoffNtaname`
- &nbsp;&nbsp; **Title**: `Trips Dropoff Ntaname`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Pickup Date
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.pickupDate`
- &nbsp;&nbsp; **Title**: `Trips Pickup Date`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Pickup Datetime
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.pickupDatetime`
- &nbsp;&nbsp; **Title**: `Trips Pickup Datetime`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dropoff Date
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.dropoffDate`
- &nbsp;&nbsp; **Title**: `Trips Dropoff Date`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dropoff Datetime
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Trips.dropoffDatetime`
- &nbsp;&nbsp; **Title**: `Trips Dropoff Datetime`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>Opensky</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Opensky.count`
- &nbsp;&nbsp; **Title**: `Opensky Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Callsign
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Opensky.callsign`
- &nbsp;&nbsp; **Title**: `Opensky Callsign`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Number
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Opensky.number`
- &nbsp;&nbsp; **Title**: `Opensky Number`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Icao24
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Opensky.icao24`
- &nbsp;&nbsp; **Title**: `Opensky Icao24`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Registration
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Opensky.registration`
- &nbsp;&nbsp; **Title**: `Opensky Registration`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Typecode
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Opensky.typecode`
- &nbsp;&nbsp; **Title**: `Opensky Typecode`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Origin
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Opensky.origin`
- &nbsp;&nbsp; **Title**: `Opensky Origin`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Destination
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Opensky.destination`
- &nbsp;&nbsp; **Title**: `Opensky Destination`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Latitude 1
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Opensky.latitude1`
- &nbsp;&nbsp; **Title**: `Opensky Latitude 1`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Longitude 1
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Opensky.longitude1`
- &nbsp;&nbsp; **Title**: `Opensky Longitude 1`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Altitude 1
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Opensky.altitude1`
- &nbsp;&nbsp; **Title**: `Opensky Altitude 1`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Latitude 2
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Opensky.latitude2`
- &nbsp;&nbsp; **Title**: `Opensky Latitude 2`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Longitude 2
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Opensky.longitude2`
- &nbsp;&nbsp; **Title**: `Opensky Longitude 2`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Altitude 2
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Opensky.altitude2`
- &nbsp;&nbsp; **Title**: `Opensky Altitude 2`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Firstseen
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Opensky.firstseen`
- &nbsp;&nbsp; **Title**: `Opensky Firstseen`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lastseen
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Opensky.lastseen`
- &nbsp;&nbsp; **Title**: `Opensky Lastseen`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Day
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Opensky.day`
- &nbsp;&nbsp; **Title**: `Opensky Day`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>Pypi</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Pypi.count`
- &nbsp;&nbsp; **Title**: `Pypi Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Project Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Pypi.projectName`
- &nbsp;&nbsp; **Title**: `Pypi Project Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Project Version
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Pypi.projectVersion`
- &nbsp;&nbsp; **Title**: `Pypi Project Version`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Project Release
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Pypi.projectRelease`
- &nbsp;&nbsp; **Title**: `Pypi Project Release`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Path
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Pypi.path`
- &nbsp;&nbsp; **Title**: `Pypi Path`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Archive Path
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Pypi.archivePath`
- &nbsp;&nbsp; **Title**: `Pypi Archive Path`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hash
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Pypi.hash`
- &nbsp;&nbsp; **Title**: `Pypi Hash`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Skip Reason
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Pypi.skipReason`
- &nbsp;&nbsp; **Title**: `Pypi Skip Reason`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Uploaded on
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Pypi.uploadedOn`
- &nbsp;&nbsp; **Title**: `Pypi Uploaded on`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>QueryMetricsV2</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Query Metrics V2
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `QueryMetricsV2.count`
- &nbsp;&nbsp; **Title**: `Query Metrics V2 Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Pr Number
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `QueryMetricsV2.prNumber`
- &nbsp;&nbsp; **Title**: `Query Metrics V2 Pr Number`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Old Sha
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `QueryMetricsV2.oldSha`
- &nbsp;&nbsp; **Title**: `Query Metrics V2 Old Sha`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; New Sha
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `QueryMetricsV2.newSha`
- &nbsp;&nbsp; **Title**: `Query Metrics V2 New Sha`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Test
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `QueryMetricsV2.test`
- &nbsp;&nbsp; **Title**: `Query Metrics V2 Test`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Query Display Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `QueryMetricsV2.queryDisplayName`
- &nbsp;&nbsp; **Title**: `Query Metrics V2 Query Display Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Metric
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `QueryMetricsV2.metric`
- &nbsp;&nbsp; **Title**: `Query Metrics V2 Metric`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Old Value
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `QueryMetricsV2.oldValue`
- &nbsp;&nbsp; **Title**: `Query Metrics V2 Old Value`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; New Value
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `QueryMetricsV2.newValue`
- &nbsp;&nbsp; **Title**: `Query Metrics V2 New Value`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Diff
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `QueryMetricsV2.diff`
- &nbsp;&nbsp; **Title**: `Query Metrics V2 Diff`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Stat Threshold
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `QueryMetricsV2.statThreshold`
- &nbsp;&nbsp; **Title**: `Query Metrics V2 Stat Threshold`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Event Date
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `QueryMetricsV2.eventDate`
- &nbsp;&nbsp; **Title**: `Query Metrics V2 Event Date`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Event Time
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `QueryMetricsV2.eventTime`
- &nbsp;&nbsp; **Title**: `Query Metrics V2 Event Time`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>Rdns</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Rdns.count`
- &nbsp;&nbsp; **Title**: `Rdns Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Address
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Rdns.address`
- &nbsp;&nbsp; **Title**: `Rdns Address`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Domain
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Rdns.domain`
- &nbsp;&nbsp; **Title**: `Rdns Domain`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Timestamp
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Rdns.timestamp`
- &nbsp;&nbsp; **Title**: `Rdns Timestamp`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>Recipes</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Recipes.count`
- &nbsp;&nbsp; **Title**: `Recipes Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Title
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Recipes.title`
- &nbsp;&nbsp; **Title**: `Recipes Title`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ingredients
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Recipes.ingredients`
- &nbsp;&nbsp; **Title**: `Recipes Ingredients`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Directions
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Recipes.directions`
- &nbsp;&nbsp; **Title**: `Recipes Directions`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Link
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Recipes.link`
- &nbsp;&nbsp; **Title**: `Recipes Link`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Source
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Recipes.source`
- &nbsp;&nbsp; **Title**: `Recipes Source`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ner
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Recipes.ner`
- &nbsp;&nbsp; **Title**: `Recipes Ner`
- &nbsp;&nbsp; **Type**: `string`
</details>
<details open>
<summary>ReposRaw</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Repos Raw
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `ReposRaw.count`
- &nbsp;&nbsp; **Title**: `Repos Raw Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Data
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `ReposRaw.data`
- &nbsp;&nbsp; **Title**: `Repos Raw Data`
- &nbsp;&nbsp; **Type**: `string`
</details>
<details open>
<summary>Repos</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.count`
- &nbsp;&nbsp; **Title**: `Repos Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Stargazers Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.stargazersCount`
- &nbsp;&nbsp; **Title**: `Repos Stargazers Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Forks Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.forksCount`
- &nbsp;&nbsp; **Title**: `Repos Forks Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Subscribers Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.subscribersCount`
- &nbsp;&nbsp; **Title**: `Repos Subscribers Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Open Issues Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.openIssuesCount`
- &nbsp;&nbsp; **Title**: `Repos Open Issues Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Full Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.fullName`
- &nbsp;&nbsp; **Title**: `Repos Full Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Owner Type
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.ownerType`
- &nbsp;&nbsp; **Title**: `Repos Owner Type`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Description
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.description`
- &nbsp;&nbsp; **Title**: `Repos Description`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Fork
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.fork`
- &nbsp;&nbsp; **Title**: `Repos Fork`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Homepage
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.homepage`
- &nbsp;&nbsp; **Title**: `Repos Homepage`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Language
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.language`
- &nbsp;&nbsp; **Title**: `Repos Language`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Has Issues
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.hasIssues`
- &nbsp;&nbsp; **Title**: `Repos Has Issues`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Has Projects
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.hasProjects`
- &nbsp;&nbsp; **Title**: `Repos Has Projects`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Has Downloads
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.hasDownloads`
- &nbsp;&nbsp; **Title**: `Repos Has Downloads`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Has Wiki
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.hasWiki`
- &nbsp;&nbsp; **Title**: `Repos Has Wiki`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Has Pages
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.hasPages`
- &nbsp;&nbsp; **Title**: `Repos Has Pages`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Archived
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.archived`
- &nbsp;&nbsp; **Title**: `Repos Archived`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Disabled
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.disabled`
- &nbsp;&nbsp; **Title**: `Repos Disabled`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Is Template
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.isTemplate`
- &nbsp;&nbsp; **Title**: `Repos Is Template`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Allow Forking
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.allowForking`
- &nbsp;&nbsp; **Title**: `Repos Allow Forking`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; License Key
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.licenseKey`
- &nbsp;&nbsp; **Title**: `Repos License Key`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Topics
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.topics`
- &nbsp;&nbsp; **Title**: `Repos Topics`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Default Branch
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.defaultBranch`
- &nbsp;&nbsp; **Title**: `Repos Default Branch`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Created at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.createdAt`
- &nbsp;&nbsp; **Title**: `Repos Created at`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Updated at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.updatedAt`
- &nbsp;&nbsp; **Title**: `Repos Updated at`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Pushed at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Repos.pushedAt`
- &nbsp;&nbsp; **Title**: `Repos Pushed at`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>RunAttributesV1</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Run Attributes V1
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `RunAttributesV1.count`
- &nbsp;&nbsp; **Title**: `Run Attributes V1 Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Old Sha
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `RunAttributesV1.oldSha`
- &nbsp;&nbsp; **Title**: `Run Attributes V1 Old Sha`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; New Sha
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `RunAttributesV1.newSha`
- &nbsp;&nbsp; **Title**: `Run Attributes V1 New Sha`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Metric
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `RunAttributesV1.metric`
- &nbsp;&nbsp; **Title**: `Run Attributes V1 Metric`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Metric Value
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `RunAttributesV1.metricValue`
- &nbsp;&nbsp; **Title**: `Run Attributes V1 Metric Value`
- &nbsp;&nbsp; **Type**: `string`
</details>
<details open>
<summary>Stock</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Stock.count`
- &nbsp;&nbsp; **Title**: `Stock Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Price
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Stock.price`
- &nbsp;&nbsp; **Title**: `Stock Price`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Symbol
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Stock.symbol`
- &nbsp;&nbsp; **Title**: `Stock Symbol`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Stock.date`
- &nbsp;&nbsp; **Title**: `Stock Date`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>Tranco</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Tranco.count`
- &nbsp;&nbsp; **Title**: `Tranco Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Domain
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Tranco.domain`
- &nbsp;&nbsp; **Title**: `Tranco Domain`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Tranco.date`
- &nbsp;&nbsp; **Title**: `Tranco Date`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>UkPricePaidUpdater</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Uk Price Paid Updater
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaidUpdater.count`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Updater Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Price
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaidUpdater.price`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Updater Price`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Postcode1
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaidUpdater.postcode1`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Updater Postcode1`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Postcode2
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaidUpdater.postcode2`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Updater Postcode2`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Type
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaidUpdater.type`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Updater Type`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Duration
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaidUpdater.duration`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Updater Duration`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Addr1
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaidUpdater.addr1`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Updater Addr1`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Addr2
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaidUpdater.addr2`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Updater Addr2`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Street
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaidUpdater.street`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Updater Street`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Locality
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaidUpdater.locality`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Updater Locality`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Town
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaidUpdater.town`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Updater Town`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; District
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaidUpdater.district`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Updater District`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; County
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaidUpdater.county`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Updater County`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaidUpdater.date`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Updater Date`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>UkPricePaid</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Uk Price Paid
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaid.count`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Price
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaid.price`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Price`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Postcode1
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaid.postcode1`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Postcode1`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Postcode2
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaid.postcode2`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Postcode2`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Type
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaid.type`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Type`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Duration
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaid.duration`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Duration`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Addr1
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaid.addr1`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Addr1`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Addr2
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaid.addr2`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Addr2`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Street
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaid.street`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Street`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Locality
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaid.locality`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Locality`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Town
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaid.town`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Town`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; District
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaid.district`
- &nbsp;&nbsp; **Title**: `Uk Price Paid District`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; County
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaid.county`
- &nbsp;&nbsp; **Title**: `Uk Price Paid County`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `UkPricePaid.date`
- &nbsp;&nbsp; **Title**: `Uk Price Paid Date`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>Wikistat</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Wikistat.count`
- &nbsp;&nbsp; **Title**: `Wikistat Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Project
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Wikistat.project`
- &nbsp;&nbsp; **Title**: `Wikistat Project`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Subproject
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Wikistat.subproject`
- &nbsp;&nbsp; **Title**: `Wikistat Subproject`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Path
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Wikistat.path`
- &nbsp;&nbsp; **Title**: `Wikistat Path`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Wikistat.time`
- &nbsp;&nbsp; **Title**: `Wikistat Time`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>WorkflowJobs</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Workflow Jobs
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `WorkflowJobs.count`
- &nbsp;&nbsp; **Title**: `Workflow Jobs Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Workflow Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `WorkflowJobs.workflowName`
- &nbsp;&nbsp; **Title**: `Workflow Jobs Workflow Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Head Branch
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `WorkflowJobs.headBranch`
- &nbsp;&nbsp; **Title**: `Workflow Jobs Head Branch`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Run Url
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `WorkflowJobs.runUrl`
- &nbsp;&nbsp; **Title**: `Workflow Jobs Run Url`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Node Id
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `WorkflowJobs.nodeId`
- &nbsp;&nbsp; **Title**: `Workflow Jobs Node Id`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Head Sha
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `WorkflowJobs.headSha`
- &nbsp;&nbsp; **Title**: `Workflow Jobs Head Sha`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Url
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `WorkflowJobs.url`
- &nbsp;&nbsp; **Title**: `Workflow Jobs Url`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Html Url
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `WorkflowJobs.htmlUrl`
- &nbsp;&nbsp; **Title**: `Workflow Jobs Html Url`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Status
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `WorkflowJobs.status`
- &nbsp;&nbsp; **Title**: `Workflow Jobs Status`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Conclusion
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `WorkflowJobs.conclusion`
- &nbsp;&nbsp; **Title**: `Workflow Jobs Conclusion`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `WorkflowJobs.name`
- &nbsp;&nbsp; **Title**: `Workflow Jobs Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Check Run Url
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `WorkflowJobs.checkRunUrl`
- &nbsp;&nbsp; **Title**: `Workflow Jobs Check Run Url`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Labels
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `WorkflowJobs.labels`
- &nbsp;&nbsp; **Title**: `Workflow Jobs Labels`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Runner Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `WorkflowJobs.runnerName`
- &nbsp;&nbsp; **Title**: `Workflow Jobs Runner Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Runner Group Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `WorkflowJobs.runnerGroupName`
- &nbsp;&nbsp; **Title**: `Workflow Jobs Runner Group Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Repository
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `WorkflowJobs.repository`
- &nbsp;&nbsp; **Title**: `Workflow Jobs Repository`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Updated at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `WorkflowJobs.updatedAt`
- &nbsp;&nbsp; **Title**: `Workflow Jobs Updated at`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Started at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `WorkflowJobs.startedAt`
- &nbsp;&nbsp; **Title**: `Workflow Jobs Started at`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Completed at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `WorkflowJobs.completedAt`
- &nbsp;&nbsp; **Title**: `Workflow Jobs Completed at`
- &nbsp;&nbsp; **Type**: `time`
</details>
####  Version author: demo@synmetrix.org
');
INSERT INTO public.versions (id, created_at, updated_at, branch_id, checksum, user_id, markdown_doc) VALUES ('ab116697-5fa3-4cda-ac5a-f4bca5742ead', '2024-02-15 22:49:18.03242+00', '2024-02-15 22:49:18.03242+00', '9db82eca-59df-494c-a54f-18a92b22e2f4', '373552da9bd1a656a4bd42aa2271f3a9', 'bd254cd6-ada3-4803-88ec-a47749459169', NULL);
INSERT INTO public.versions (id, created_at, updated_at, branch_id, checksum, user_id, markdown_doc) VALUES ('1c71cc4f-6db9-4ae4-8530-10f4c44b81ea', '2024-02-15 22:50:34.328636+00', '2024-02-15 22:50:34.328636+00', '9db82eca-59df-494c-a54f-18a92b22e2f4', 'c712f95776f8505999b9dd3f4f71e2b5', 'bd254cd6-ada3-4803-88ec-a47749459169', NULL);
INSERT INTO public.versions (id, created_at, updated_at, branch_id, checksum, user_id, markdown_doc) VALUES ('813d5960-c531-494d-9850-5384934fefc5', '2024-02-15 22:51:03.984451+00', '2024-02-15 22:51:03.984451+00', '9db82eca-59df-494c-a54f-18a92b22e2f4', '7880279f6183d7d8669b6cc5640c432b', 'bd254cd6-ada3-4803-88ec-a47749459169', NULL);
INSERT INTO public.versions (id, created_at, updated_at, branch_id, checksum, user_id, markdown_doc) VALUES ('89bdb46a-53d1-4a98-b49d-0175bc9105a0', '2024-02-15 22:51:14.766779+00', '2024-02-15 22:51:14.766779+00', '9db82eca-59df-494c-a54f-18a92b22e2f4', 'c712f95776f8505999b9dd3f4f71e2b5', 'bd254cd6-ada3-4803-88ec-a47749459169', NULL);
INSERT INTO public.versions (id, created_at, updated_at, branch_id, checksum, user_id, markdown_doc) VALUES ('76e900ad-a007-440a-8dd6-4cf8952e45a4', '2024-02-15 22:53:53.656866+00', '2024-02-15 22:53:53.656866+00', '9db82eca-59df-494c-a54f-18a92b22e2f4', '84042c3b0fbbea6df0021c6a54e4bf0f', 'bd254cd6-ada3-4803-88ec-a47749459169', NULL);
INSERT INTO public.versions (id, created_at, updated_at, branch_id, checksum, user_id, markdown_doc) VALUES ('665de544-e30d-4769-8073-5d65fd2d03b6', '2024-02-15 22:54:44.919089+00', '2024-02-15 22:54:49.367062+00', '9db82eca-59df-494c-a54f-18a92b22e2f4', 'a35588f54e390926c199e99027378573', 'bd254cd6-ada3-4803-88ec-a47749459169', '#  Documentation
This documentation covers version 665de544-e30d-4769-8073-5d65fd2d03b6 from branch "main".
####  List of cubes:
<details open>
<summary>Companies</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Companies.count`
- &nbsp;&nbsp; **Title**: `Companies Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Email
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Companies.email`
- &nbsp;&nbsp; **Title**: `Companies Email`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Companies.name`
- &nbsp;&nbsp; **Title**: `Companies Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Phone
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Companies.phone`
- &nbsp;&nbsp; **Title**: `Companies Phone`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Address
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Companies.address`
- &nbsp;&nbsp; **Title**: `Companies Address`
- &nbsp;&nbsp; **Type**: `string`
</details>
<details open>
<summary>LineItems</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Line Items
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `LineItems.count`
- &nbsp;&nbsp; **Title**: `Line Items Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Quantity
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `LineItems.quantity`
- &nbsp;&nbsp; **Title**: `Line Items Quantity`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Price
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `LineItems.price`
- &nbsp;&nbsp; **Title**: `Line Items Price`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Created at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `LineItems.createdAt`
- &nbsp;&nbsp; **Title**: `Line Items Created at`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>LineItemsCountByStates</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Line Items Count by States
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `LineItemsCountByStates.count`
- &nbsp;&nbsp; **Title**: `Line Items Count by States Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Line Items Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `LineItemsCountByStates.lineItemsCount`
- &nbsp;&nbsp; **Title**: `Line Items Count by States Line Items Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Users State
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `LineItemsCountByStates.usersState`
- &nbsp;&nbsp; **Title**: `Line Items Count by States Users State`
- &nbsp;&nbsp; **Type**: `string`
</details>
<details open>
<summary>LineItemsEval</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Line Items Eval
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `LineItemsEval.count`
- &nbsp;&nbsp; **Title**: `Line Items Eval Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Quantity
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `LineItemsEval.quantity`
- &nbsp;&nbsp; **Title**: `Line Items Eval Quantity`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Price
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `LineItemsEval.price`
- &nbsp;&nbsp; **Title**: `Line Items Eval Price`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Created at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `LineItemsEval.createdAt`
- &nbsp;&nbsp; **Title**: `Line Items Eval Created at`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>LineItemsEval1</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Line Items Eval1
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `LineItemsEval1.count`
- &nbsp;&nbsp; **Title**: `Line Items Eval1 Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Quantity
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `LineItemsEval1.quantity`
- &nbsp;&nbsp; **Title**: `Line Items Eval1 Quantity`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Price
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `LineItemsEval1.price`
- &nbsp;&nbsp; **Title**: `Line Items Eval1 Price`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Created at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `LineItemsEval1.createdAt`
- &nbsp;&nbsp; **Title**: `Line Items Eval1 Created at`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>LineItemsEval2</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Line Items Eval2
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `LineItemsEval2.count`
- &nbsp;&nbsp; **Title**: `Line Items Eval2 Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Quantity
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `LineItemsEval2.quantity`
- &nbsp;&nbsp; **Title**: `Line Items Eval2 Quantity`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `sum`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Price
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `LineItemsEval2.price`
- &nbsp;&nbsp; **Title**: `Line Items Eval2 Price`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Created at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `LineItemsEval2.createdAt`
- &nbsp;&nbsp; **Title**: `Line Items Eval2 Created at`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>Orders</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Orders.count`
- &nbsp;&nbsp; **Title**: `Orders Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Orders.name`
- &nbsp;&nbsp; **Title**: `Orders Name`
- &nbsp;&nbsp; **Type**: `string`
</details>
<details open>
<summary>OrdersEval</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Orders Eval
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `OrdersEval.count`
- &nbsp;&nbsp; **Title**: `Orders Eval Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sum
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `OrdersEval.sum`
- &nbsp;&nbsp; **Title**: `Orders Eval Sum`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Status
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `OrdersEval.status`
- &nbsp;&nbsp; **Title**: `Orders Eval Status`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Created at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `OrdersEval.createdAt`
- &nbsp;&nbsp; **Title**: `Orders Eval Created at`
- &nbsp;&nbsp; **Type**: `time`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Completed at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `OrdersEval.completedAt`
- &nbsp;&nbsp; **Title**: `Orders Eval Completed at`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>PolyLessons</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Poly Lessons
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `PolyLessons.count`
- &nbsp;&nbsp; **Title**: `Poly Lessons Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `PolyLessons.name`
- &nbsp;&nbsp; **Title**: `Poly Lessons Name`
- &nbsp;&nbsp; **Type**: `string`
</details>
<details open>
<summary>PolyUsers</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Poly Users
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `PolyUsers.count`
- &nbsp;&nbsp; **Title**: `Poly Users Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Type
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `PolyUsers.type`
- &nbsp;&nbsp; **Title**: `Poly Users Type`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `PolyUsers.name`
- &nbsp;&nbsp; **Title**: `Poly Users Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; School
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `PolyUsers.school`
- &nbsp;&nbsp; **Title**: `Poly Users School`
- &nbsp;&nbsp; **Type**: `string`
</details>
<details open>
<summary>ProductCategories</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Product Categories
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `ProductCategories.count`
- &nbsp;&nbsp; **Title**: `Product Categories Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `ProductCategories.name`
- &nbsp;&nbsp; **Title**: `Product Categories Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Created at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `ProductCategories.createdAt`
- &nbsp;&nbsp; **Title**: `Product Categories Created at`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>Products</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Products.count`
- &nbsp;&nbsp; **Title**: `Products Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Products.name`
- &nbsp;&nbsp; **Title**: `Products Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Description
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Products.description`
- &nbsp;&nbsp; **Title**: `Products Description`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Created at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Products.createdAt`
- &nbsp;&nbsp; **Title**: `Products Created at`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>Student</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Student.count`
- &nbsp;&nbsp; **Title**: `Student Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Student.name`
- &nbsp;&nbsp; **Title**: `Student Name`
- &nbsp;&nbsp; **Type**: `string`
</details>
<details open>
<summary>StudentTeacher</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Student Teacher
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `StudentTeacher.count`
- &nbsp;&nbsp; **Title**: `Student Teacher Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
</details>
<details open>
<summary>Suppliers</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Suppliers.count`
- &nbsp;&nbsp; **Title**: `Suppliers Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Address
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Suppliers.address`
- &nbsp;&nbsp; **Title**: `Suppliers Address`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Company
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Suppliers.company`
- &nbsp;&nbsp; **Title**: `Suppliers Company`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Email
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Suppliers.email`
- &nbsp;&nbsp; **Title**: `Suppliers Email`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Created at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Suppliers.createdAt`
- &nbsp;&nbsp; **Title**: `Suppliers Created at`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>Teacher</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Teacher.count`
- &nbsp;&nbsp; **Title**: `Teacher Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Teacher.name`
- &nbsp;&nbsp; **Title**: `Teacher Name`
- &nbsp;&nbsp; **Type**: `string`
</details>
<details open>
<summary>Teachers</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Teachers.count`
- &nbsp;&nbsp; **Title**: `Teachers Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Salary
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Teachers.salary`
- &nbsp;&nbsp; **Title**: `Teachers Salary`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; First Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Teachers.firstName`
- &nbsp;&nbsp; **Title**: `Teachers First Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Last Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Teachers.lastName`
- &nbsp;&nbsp; **Title**: `Teachers Last Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; School
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Teachers.school`
- &nbsp;&nbsp; **Title**: `Teachers School`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hire Date
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Teachers.hireDate`
- &nbsp;&nbsp; **Title**: `Teachers Hire Date`
- &nbsp;&nbsp; **Type**: `time`
</details>
<details open>
<summary>TmpNewtable</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Tmp Newtable
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `TmpNewtable.count`
- &nbsp;&nbsp; **Title**: `Tmp Newtable Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Address
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `TmpNewtable.address`
- &nbsp;&nbsp; **Title**: `Tmp Newtable Address`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `TmpNewtable.name`
- &nbsp;&nbsp; **Title**: `Tmp Newtable Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Email
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `TmpNewtable.email`
- &nbsp;&nbsp; **Title**: `Tmp Newtable Email`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Phone
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `TmpNewtable.phone`
- &nbsp;&nbsp; **Title**: `Tmp Newtable Phone`
- &nbsp;&nbsp; **Type**: `string`
</details>
<details open>
<summary>Users</summary>
#### &nbsp;&nbsp;&nbsp;&nbsp; Measures
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Count
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Users.count`
- &nbsp;&nbsp; **Title**: `Users Count`
- &nbsp;&nbsp; **Type**: `number`
- &nbsp;&nbsp; **Aggregation Type**: `count`
- &nbsp;&nbsp; **Drill Members**: ``
#### &nbsp;&nbsp;&nbsp;&nbsp; Dimensions
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Gender
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Users.gender`
- &nbsp;&nbsp; **Title**: `Users Gender`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; First Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Users.firstName`
- &nbsp;&nbsp; **Title**: `Users First Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; State
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Users.state`
- &nbsp;&nbsp; **Title**: `Users State`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Last Name
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Users.lastName`
- &nbsp;&nbsp; **Title**: `Users Last Name`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; City
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Users.city`
- &nbsp;&nbsp; **Title**: `Users City`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Company
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Users.company`
- &nbsp;&nbsp; **Title**: `Users Company`
- &nbsp;&nbsp; **Type**: `string`
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Created at
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No description provided
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Parameters:**
- &nbsp;&nbsp; **Name**: `Users.createdAt`
- &nbsp;&nbsp; **Title**: `Users Created at`
- &nbsp;&nbsp; **Type**: `time`
</details>
####  Version author: demo@synmetrix.org
');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('01950050-132f-4fbd-9177-1bd3e22aa3be', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Actors.yml', 'cubes:
  - name: Actors
    sql: SELECT * FROM default.actors
    joins: []
    dimensions:
      - name: login
        sql: login
        type: string
      - name: type
        sql: type
        type: string
      - name: siteAdmin
        sql: site_admin
        type: string
      - name: name
        sql: name
        type: string
      - name: company
        sql: company
        type: string
      - name: blog
        sql: blog
        type: string
      - name: location
        sql: location
        type: string
      - name: email
        sql: email
        type: string
      - name: hireable
        sql: hireable
        type: string
      - name: bio
        sql: bio
        type: string
      - name: twitterUsername
        sql: twitter_username
        type: string
      - name: createdAt
        sql: created_at
        type: time
      - name: updatedAt
        sql: updated_at
        type: time
    measures:
      - name: count
        type: count
', '9bff96f8da2a6472881356445643ce90', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('72756093-ae19-485f-869d-ca4eca233c02', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'BenchmarkResults.yml', 'cubes:
  - name: BenchmarkResults
    sql: SELECT * FROM default.benchmark_results
    joins: []
    dimensions:
      - name: runId
        sql: run_id
        type: string
    measures:
      - name: count
        type: count
', '943fd8bb010e9339a4ca672001787192', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('48956c99-fbf0-43ea-b78e-99e9969a8f04', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'BenchmarkRuns.yml', 'cubes:
  - name: BenchmarkRuns
    sql: SELECT * FROM default.benchmark_runs
    joins: []
    dimensions:
      - name: runId
        sql: run_id
        type: string
      - name: version
        sql: version
        type: string
      - name: threads
        sql: threads
        type: string
      - name: cpuModel
        sql: cpu_model
        type: string
      - name: cpu
        sql: cpu
        type: string
      - name: df
        sql: df
        type: string
      - name: memory
        sql: memory
        type: string
      - name: memoryTotal
        sql: memory_total
        type: string
      - name: blk
        sql: blk
        type: string
      - name: mdstat
        sql: mdstat
        type: string
      - name: instance
        sql: instance
        type: string
      - name: testTime
        sql: test_time
        type: time
    measures:
      - name: count
        type: count
', '45d50ff2873c42b580f945b56ccf8121', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('e31517a4-95d4-45b4-9ce7-09a36f6fed09', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'CellTowers.yml', 'cubes:
  - name: CellTowers
    sql: SELECT * FROM default.cell_towers
    joins: []
    dimensions:
      - name: radio
        sql: radio
        type: string
      - name: lon
        sql: lon
        type: string
      - name: lat
        sql: lat
        type: string
      - name: created
        sql: created
        type: time
      - name: updated
        sql: updated
        type: time
    measures:
      - name: count
        type: count
', '35bbf31c1fff95d2dc2b58b3f897ef5b', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('330d4796-a5ff-44a9-a32a-9f47571fab23', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Checks.yml', 'cubes:
  - name: Checks
    sql: SELECT * FROM default.checks
    joins: []
    dimensions:
      - name: commitSha
        sql: commit_sha
        type: string
      - name: checkName
        sql: check_name
        type: string
      - name: checkStatus
        sql: check_status
        type: string
      - name: testName
        sql: test_name
        type: string
      - name: testStatus
        sql: test_status
        type: string
      - name: reportUrl
        sql: report_url
        type: string
      - name: pullRequestUrl
        sql: pull_request_url
        type: string
      - name: commitUrl
        sql: commit_url
        type: string
      - name: taskUrl
        sql: task_url
        type: string
      - name: baseRef
        sql: base_ref
        type: string
      - name: baseRepo
        sql: base_repo
        type: string
      - name: headRef
        sql: head_ref
        type: string
      - name: headRepo
        sql: head_repo
        type: string
      - name: testContextRaw
        sql: test_context_raw
        type: string
      - name: instanceType
        sql: instance_type
        type: string
      - name: instanceId
        sql: instance_id
        type: string
      - name: checkStartTime
        sql: check_start_time
        type: time
    measures:
      - name: count
        type: count
      - name: pullRequestNumber
        sql: pull_request_number
        type: sum
', 'fb715d72490287cafacf3a68987d9bf4', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('406611d5-b850-458b-aa48-5f6435b04359', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'CiscoUmbrella.yml', 'cubes:
  - name: CiscoUmbrella
    sql: SELECT * FROM default.cisco_umbrella
    joins: []
    dimensions:
      - name: domain
        sql: domain
        type: string
      - name: date
        sql: date
        type: time
    measures:
      - name: count
        type: count
', '42f7fe5d7745cd31eea4d35c6c9d88a1', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('b3590ede-5686-4592-a775-625707a95910', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Covid.yml', 'cubes:
  - name: Covid
    sql: SELECT * FROM default.covid
    joins: []
    dimensions:
      - name: locationKey
        sql: location_key
        type: string
      - name: date
        sql: date
        type: time
    measures:
      - name: count
        type: count
', 'bb177bdf53f9e4b52878da32dfd81050', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('6900dab6-cefe-4085-af0a-ec72fca06418', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Dish.yml', 'cubes:
  - name: Dish
    sql: SELECT * FROM default.dish
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
      - name: description
        sql: description
        type: string
    measures:
      - name: count
        type: count
      - name: lowestPrice
        sql: lowest_price
        type: sum
      - name: highestPrice
        sql: highest_price
        type: sum
', '979bebe792207f418dd67b7307206e3f', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('70418e6c-62a4-4961-a0ab-dcadf6ddfe6e', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Dns.yml', 'cubes:
  - name: Dns
    sql: SELECT * FROM default.dns
    joins: []
    dimensions:
      - name: domain
        sql: domain
        type: string
      - name: a
        sql: a
        type: string
      - name: aaaa
        sql: aaaa
        type: string
      - name: cname
        sql: cname
        type: string
      - name: timestamp
        sql: timestamp
        type: time
    measures:
      - name: count
        type: count
', 'f9614384ba3785ea70f4ecaa6fd583f6', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('3c7a077d-4a25-4506-82d1-011ea1d1712a', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Dns2.yml', 'cubes:
  - name: Dns2
    sql: SELECT * FROM default.dns2
    joins: []
    dimensions:
      - name: domain
        sql: domain
        type: string
      - name: a
        sql: a
        type: string
      - name: aaaa
        sql: aaaa
        type: string
      - name: cname
        sql: cname
        type: string
      - name: timestamp
        sql: timestamp
        type: time
    measures:
      - name: count
        type: count
', '1a6bdc887f3a02eda0f490591186c774', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('cf86c2cb-1bd3-4b2c-9139-5807d827c028', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'FoodFacts.yml', 'cubes:
  - name: FoodFacts
    sql: SELECT * FROM default.food_facts
    joins: []
    dimensions:
      - name: data
        sql: data
        type: string
    measures:
      - name: count
        type: count
', '1eab2e65bc7ff72f9c12a8781a1d2bd1', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('c1a5c1d7-0ab3-4db9-80fe-1bfbc86f4a7f', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'GithubEvents.yml', 'cubes:
  - name: GithubEvents
    sql: SELECT * FROM default.github_events
    joins: []
    dimensions:
      - name: eventType
        sql: event_type
        type: string
      - name: actorLogin
        sql: actor_login
        type: string
      - name: repoName
        sql: repo_name
        type: string
      - name: body
        sql: body
        type: string
      - name: path
        sql: path
        type: string
      - name: ref
        sql: ref
        type: string
      - name: refType
        sql: ref_type
        type: string
      - name: creatorUserLogin
        sql: creator_user_login
        type: string
      - name: title
        sql: title
        type: string
      - name: labels
        sql: labels
        type: string
      - name: state
        sql: state
        type: string
      - name: assignee
        sql: assignee
        type: string
      - name: assignees
        sql: assignees
        type: string
      - name: authorAssociation
        sql: author_association
        type: string
      - name: mergeCommitSha
        sql: merge_commit_sha
        type: string
      - name: requestedReviewers
        sql: requested_reviewers
        type: string
      - name: requestedTeams
        sql: requested_teams
        type: string
      - name: headRef
        sql: head_ref
        type: string
      - name: headSha
        sql: head_sha
        type: string
      - name: baseRef
        sql: base_ref
        type: string
      - name: baseSha
        sql: base_sha
        type: string
      - name: mergeableState
        sql: mergeable_state
        type: string
      - name: mergedBy
        sql: merged_by
        type: string
      - name: diffHunk
        sql: diff_hunk
        type: string
      - name: commitId
        sql: commit_id
        type: string
      - name: originalCommitId
        sql: original_commit_id
        type: string
      - name: memberLogin
        sql: member_login
        type: string
      - name: releaseTagName
        sql: release_tag_name
        type: string
      - name: releaseName
        sql: release_name
        type: string
      - name: reviewState
        sql: review_state
        type: string
      - name: createdAt
        sql: created_at
        type: time
      - name: updatedAt
        sql: updated_at
        type: time
      - name: fileTime
        sql: file_time
        type: time
      - name: action
        sql: action
        type: time
      - name: closedAt
        sql: closed_at
        type: time
      - name: mergedAt
        sql: merged_at
        type: time
    measures:
      - name: count
        type: count
      - name: number
        sql: number
        type: sum
', 'ce6bcfc497ba80dfc8473e996c07f602', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('10483937-eb5f-45bc-af25-d3c793571152', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Hackernews.yml', 'cubes:
  - name: Hackernews
    sql: SELECT * FROM default.hackernews
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: type
        sql: type
        type: string
      - name: by
        sql: by
        type: string
      - name: text
        sql: text
        type: string
      - name: url
        sql: url
        type: string
      - name: title
        sql: title
        type: string
      - name: time
        sql: time
        type: time
    measures:
      - name: count
        type: count
', 'aebd55ff7939101cdb62a5fe12742e2e', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('d98d5289-a6f8-4a7b-a48c-d43b8a4cbe42', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'HackernewsChangesItems.yml', 'cubes:
  - name: HackernewsChangesItems
    sql: SELECT * FROM default.hackernews_changes_items
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: type
        sql: type
        type: string
      - name: by
        sql: by
        type: string
      - name: text
        sql: text
        type: string
      - name: url
        sql: url
        type: string
      - name: title
        sql: title
        type: string
      - name: updateTime
        sql: update_time
        type: time
      - name: time
        sql: time
        type: time
    measures:
      - name: count
        type: count
', '7d38a7e67809577d2a64514baaf7440b', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('cdeb6878-f3ae-4164-b5fb-83dd95e22afa', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'HackernewsChangesProfiles.yml', 'cubes:
  - name: HackernewsChangesProfiles
    sql: SELECT * FROM default.hackernews_changes_profiles
    joins: []
    dimensions:
      - name: id
        sql: id
        type: string
        primaryKey: true
      - name: about
        sql: about
        type: string
      - name: created
        sql: created
        type: time
      - name: updateTime
        sql: update_time
        type: time
    measures:
      - name: count
        type: count
      - name: submittedCount
        sql: submitted_count
        type: sum
', 'd47ae40f037f41fddba1d5cab427e5d6', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('24a05b0a-7b49-488f-b56b-ae46aa7be23f', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'HackernewsChangesToHistory.yml', 'cubes:
  - name: HackernewsChangesToHistory
    sql: SELECT * FROM default.hackernews_changes_to_history
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: type
        sql: type
        type: string
      - name: by
        sql: by
        type: string
      - name: text
        sql: text
        type: string
      - name: url
        sql: url
        type: string
      - name: title
        sql: title
        type: string
      - name: updateTime
        sql: update_time
        type: time
      - name: time
        sql: time
        type: time
    measures:
      - name: count
        type: count
', '0eed92ae78e83db07750ca3983c7f3b9', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('66817c0d-0052-4ce4-8e62-747f57b92296', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'HackernewsHistory.yml', 'cubes:
  - name: HackernewsHistory
    sql: SELECT * FROM default.hackernews_history
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: type
        sql: type
        type: string
      - name: by
        sql: by
        type: string
      - name: text
        sql: text
        type: string
      - name: url
        sql: url
        type: string
      - name: title
        sql: title
        type: string
      - name: updateTime
        sql: update_time
        type: time
      - name: time
        sql: time
        type: time
    measures:
      - name: count
        type: count
', '0c758fcfdfa84be0d51a8ea13415d94a', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('fcebbab8-62ff-4ee6-b4c3-e88dfe50803f', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'HackernewsHistory2.yml', 'cubes:
  - name: HackernewsHistory2
    sql: SELECT * FROM default.hackernews_history_2
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: type
        sql: type
        type: string
      - name: by
        sql: by
        type: string
      - name: text
        sql: text
        type: string
      - name: url
        sql: url
        type: string
      - name: title
        sql: title
        type: string
      - name: updateTime
        sql: update_time
        type: time
      - name: time
        sql: time
        type: time
    measures:
      - name: count
        type: count
', '8535148873e7bc09e3e3d9c66ae33189', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('132b6a7d-b3af-4bd1-8156-1ee36252d6c0', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'HackernewsTop.yml', 'cubes:
  - name: HackernewsTop
    sql: SELECT * FROM default.hackernews_top
    joins: []
    dimensions:
      - name: type
        sql: type
        type: string
      - name: updateTime
        sql: update_time
        type: time
    measures:
      - name: count
        type: count
', 'ebb13d5dc64e1a9a77f9a56b98393e5a', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('a4300a71-6b18-42ed-b97c-d1c43f5e619d', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Lineorder.yml', 'cubes:
  - name: Lineorder
    sql: SELECT * FROM default.lineorder
    joins: []
    dimensions:
      - name: loOrderpriority
        sql: LO_ORDERPRIORITY
        type: string
      - name: loShipmode
        sql: LO_SHIPMODE
        type: string
      - name: loOrderdate
        sql: LO_ORDERDATE
        type: time
      - name: loCommitdate
        sql: LO_COMMITDATE
        type: time
    measures:
      - name: count
        type: count
      - name: loLinenumber
        sql: LO_LINENUMBER
        type: sum
      - name: loQuantity
        sql: LO_QUANTITY
        type: sum
      - name: loExtendedprice
        sql: LO_EXTENDEDPRICE
        type: sum
      - name: loOrdtotalprice
        sql: LO_ORDTOTALPRICE
        type: sum
      - name: loDiscount
        sql: LO_DISCOUNT
        type: sum
      - name: loSupplycost
        sql: LO_SUPPLYCOST
        type: sum
', '56bcce41157aa5624d52e4e05a3622c8', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('12a2a347-37df-4ac8-8e16-b0ce6f9095a7', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'LocStats.yml', 'cubes:
  - name: LocStats
    sql: SELECT * FROM default.loc_stats
    joins: []
    dimensions:
      - name: repoName
        sql: repo_name
        type: string
      - name: language
        sql: language
        type: string
      - name: path
        sql: path
        type: string
      - name: file
        sql: file
        type: string
    measures:
      - name: count
        type: count
', 'd9ef1bbc5f2a568a24646b064e7882f8', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('2381bf8c-3c35-4b82-be8a-106180d7dc3e', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Menu.yml', 'cubes:
  - name: Menu
    sql: SELECT * FROM default.menu
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
      - name: sponsor
        sql: sponsor
        type: string
      - name: event
        sql: event
        type: string
      - name: venue
        sql: venue
        type: string
      - name: place
        sql: place
        type: string
      - name: physicalDescription
        sql: physical_description
        type: string
      - name: occasion
        sql: occasion
        type: string
      - name: notes
        sql: notes
        type: string
      - name: callNumber
        sql: call_number
        type: string
      - name: keywords
        sql: keywords
        type: string
      - name: language
        sql: language
        type: string
      - name: date
        sql: date
        type: string
      - name: location
        sql: location
        type: string
      - name: locationType
        sql: location_type
        type: string
      - name: currency
        sql: currency
        type: string
      - name: currencySymbol
        sql: currency_symbol
        type: string
      - name: status
        sql: status
        type: string
    measures:
      - name: count
        type: count
      - name: pageCount
        sql: page_count
        type: sum
      - name: dishCount
        sql: dish_count
        type: sum
', 'ef33f2ca0e3be2be33025fce7bb1b84c', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('0aa3fbf5-f5d6-4fb3-9834-df005421133a', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'MenuItem.yml', 'cubes:
  - name: MenuItem
    sql: SELECT * FROM default.menu_item
    joins:
      - name: MenuPage
        sql: "{CUBE}.menu_page_id = {MenuPage}.id"
        relationship: belongsTo
      - name: Dish
        sql: "{CUBE}.dish_id = {Dish}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: xpos
        sql: xpos
        type: string
      - name: ypos
        sql: ypos
        type: string
      - name: createdAt
        sql: created_at
        type: time
      - name: updatedAt
        sql: updated_at
        type: time
    measures:
      - name: count
        type: count
      - name: price
        sql: price
        type: sum
      - name: highPrice
        sql: high_price
        type: sum
', 'bb639575476d83f9b58c22d4d257f505', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('be4f3c14-15cf-4799-8a66-de5134b5b2ce', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'MenuItemDenorm.yml', 'cubes:
  - name: MenuItemDenorm
    sql: SELECT * FROM default.menu_item_denorm
    joins:
      - name: Dish
        sql: "{CUBE}.dish_id = {Dish}.id"
        relationship: belongsTo
      - name: Menu
        sql: "{CUBE}.menu_id = {Menu}.id"
        relationship: belongsTo
    dimensions:
      - name: xpos
        sql: xpos
        type: string
      - name: ypos
        sql: ypos
        type: string
      - name: dishName
        sql: dish_name
        type: string
      - name: dishDescription
        sql: dish_description
        type: string
      - name: menuName
        sql: menu_name
        type: string
      - name: menuSponsor
        sql: menu_sponsor
        type: string
      - name: menuEvent
        sql: menu_event
        type: string
      - name: menuVenue
        sql: menu_venue
        type: string
      - name: menuPlace
        sql: menu_place
        type: string
      - name: menuPhysicalDescription
        sql: menu_physical_description
        type: string
      - name: menuOccasion
        sql: menu_occasion
        type: string
      - name: menuNotes
        sql: menu_notes
        type: string
      - name: menuCallNumber
        sql: menu_call_number
        type: string
      - name: menuKeywords
        sql: menu_keywords
        type: string
      - name: menuLanguage
        sql: menu_language
        type: string
      - name: menuDate
        sql: menu_date
        type: string
      - name: menuLocation
        sql: menu_location
        type: string
      - name: menuLocationType
        sql: menu_location_type
        type: string
      - name: menuCurrency
        sql: menu_currency
        type: string
      - name: menuCurrencySymbol
        sql: menu_currency_symbol
        type: string
      - name: menuStatus
        sql: menu_status
        type: string
      - name: createdAt
        sql: created_at
        type: time
      - name: updatedAt
        sql: updated_at
        type: time
    measures:
      - name: count
        type: count
      - name: price
        sql: price
        type: sum
      - name: highPrice
        sql: high_price
        type: sum
      - name: dishLowestPrice
        sql: dish_lowest_price
        type: sum
      - name: dishHighestPrice
        sql: dish_highest_price
        type: sum
      - name: menuPageCount
        sql: menu_page_count
        type: sum
      - name: menuDishCount
        sql: menu_dish_count
        type: sum
', '43ec459781b87a6d13b2df38798efd76', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('6780b074-ea70-428e-a9cf-f7186fe895ad', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'MenuPage.yml', 'cubes:
  - name: MenuPage
    sql: SELECT * FROM default.menu_page
    joins:
      - name: Menu
        sql: "{CUBE}.menu_id = {Menu}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: imageId
        sql: image_id
        type: string
      - name: uuid
        sql: uuid
        type: string
    measures:
      - name: count
        type: count
      - name: pageNumber
        sql: page_number
        type: sum
', '68322aa53493790b1e73900a73b76306', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('8be1db8d-5163-40c1-b1b2-f9a18aa2458a', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Minicrawl.yml', 'cubes:
  - name: Minicrawl
    sql: SELECT * FROM default.minicrawl
    joins: []
    dimensions:
      - name: domain
        sql: domain
        type: string
      - name: log
        sql: log
        type: string
      - name: content
        sql: content
        type: string
      - name: isUtf8
        sql: is_utf8
        type: string
      - name: text
        sql: text
        type: string
    measures:
      - name: count
        type: count
', 'e55af900c1f264126334e84cda8d9fa0', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('d7801d88-4460-4e42-b23f-1ae2c17a76f5', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Ontime.yml', 'cubes:
  - name: Ontime
    sql: SELECT * FROM default.ontime
    joins: []
    dimensions:
      - name: reportingAirline
        sql: Reporting_Airline
        type: string
      - name: iataCodeReportingAirline
        sql: IATA_CODE_Reporting_Airline
        type: string
      - name: tailNumber
        sql: Tail_Number
        type: string
      - name: flightNumberReportingAirline
        sql: Flight_Number_Reporting_Airline
        type: string
      - name: origin
        sql: Origin
        type: string
      - name: origincityname
        sql: OriginCityName
        type: string
      - name: originstate
        sql: OriginState
        type: string
      - name: originstatefips
        sql: OriginStateFips
        type: string
      - name: originstatename
        sql: OriginStateName
        type: string
      - name: dest
        sql: Dest
        type: string
      - name: destcityname
        sql: DestCityName
        type: string
      - name: deststate
        sql: DestState
        type: string
      - name: deststatefips
        sql: DestStateFips
        type: string
      - name: deststatename
        sql: DestStateName
        type: string
      - name: departuredelaygroups
        sql: DepartureDelayGroups
        type: string
      - name: deptimeblk
        sql: DepTimeBlk
        type: string
      - name: wheelsoff
        sql: WheelsOff
        type: string
      - name: wheelson
        sql: WheelsOn
        type: string
      - name: arrivaldelaygroups
        sql: ArrivalDelayGroups
        type: string
      - name: arrtimeblk
        sql: ArrTimeBlk
        type: string
      - name: cancellationcode
        sql: CancellationCode
        type: string
      - name: div1airport
        sql: Div1Airport
        type: string
      - name: div1tailnum
        sql: Div1TailNum
        type: string
      - name: div2airport
        sql: Div2Airport
        type: string
      - name: div2tailnum
        sql: Div2TailNum
        type: string
      - name: div3airport
        sql: Div3Airport
        type: string
      - name: div3tailnum
        sql: Div3TailNum
        type: string
      - name: div4airport
        sql: Div4Airport
        type: string
      - name: div4tailnum
        sql: Div4TailNum
        type: string
      - name: div5airport
        sql: Div5Airport
        type: string
      - name: div5tailnum
        sql: Div5TailNum
        type: string
      - name: flightdate
        sql: FlightDate
        type: time
    measures:
      - name: count
        type: count
', '7fcf78af1467502bd113b3e269ae5cdb', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('a85e57a5-065d-4916-80f1-b8e2ab434402', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Opensky.yml', 'cubes:
  - name: Opensky
    sql: SELECT * FROM default.opensky
    joins: []
    dimensions:
      - name: callsign
        sql: callsign
        type: string
      - name: number
        sql: number
        type: string
      - name: icao24
        sql: icao24
        type: string
      - name: registration
        sql: registration
        type: string
      - name: typecode
        sql: typecode
        type: string
      - name: origin
        sql: origin
        type: string
      - name: destination
        sql: destination
        type: string
      - name: latitude1
        sql: latitude_1
        type: string
        title: Latitude 1
      - name: longitude1
        sql: longitude_1
        type: string
        title: Longitude 1
      - name: altitude1
        sql: altitude_1
        type: string
        title: Altitude 1
      - name: latitude2
        sql: latitude_2
        type: string
        title: Latitude 2
      - name: longitude2
        sql: longitude_2
        type: string
        title: Longitude 2
      - name: altitude2
        sql: altitude_2
        type: string
        title: Altitude 2
      - name: firstseen
        sql: firstseen
        type: time
      - name: lastseen
        sql: lastseen
        type: time
      - name: day
        sql: day
        type: time
    measures:
      - name: count
        type: count
', '7654d3d3cee36517e3679f01ec268e06', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('49e48cc9-46be-46a4-a01a-87b7375d77d0', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Pypi.yml', 'cubes:
  - name: Pypi
    sql: SELECT * FROM default.pypi
    joins: []
    dimensions:
      - name: projectName
        sql: project_name
        type: string
      - name: projectVersion
        sql: project_version
        type: string
      - name: projectRelease
        sql: project_release
        type: string
      - name: path
        sql: path
        type: string
      - name: archivePath
        sql: archive_path
        type: string
      - name: hash
        sql: hash
        type: string
      - name: skipReason
        sql: skip_reason
        type: string
      - name: uploadedOn
        sql: uploaded_on
        type: time
    measures:
      - name: count
        type: count
', '54ed5ed38394dcf530364fb8a4f4c920', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('db1a3367-7682-45c7-bc03-436e430db038', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'QueryMetricsV2.yml', 'cubes:
  - name: QueryMetricsV2
    sql: SELECT * FROM default.query_metrics_v2
    joins: []
    dimensions:
      - name: oldSha
        sql: old_sha
        type: string
      - name: newSha
        sql: new_sha
        type: string
      - name: test
        sql: test
        type: string
      - name: queryDisplayName
        sql: query_display_name
        type: string
      - name: metric
        sql: metric
        type: string
      - name: oldValue
        sql: old_value
        type: string
      - name: newValue
        sql: new_value
        type: string
      - name: diff
        sql: diff
        type: string
      - name: statThreshold
        sql: stat_threshold
        type: string
      - name: eventDate
        sql: event_date
        type: time
      - name: eventTime
        sql: event_time
        type: time
    measures:
      - name: count
        type: count
      - name: prNumber
        sql: pr_number
        type: sum
', '7b29c1abc60d3d709e9cf0e109cfd40c', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('6e40ed18-634a-4065-82d1-5aef7d858e9a', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Rdns.yml', 'cubes:
  - name: Rdns
    sql: SELECT * FROM default.rdns
    joins: []
    dimensions:
      - name: address
        sql: address
        type: string
      - name: domain
        sql: domain
        type: string
      - name: timestamp
        sql: timestamp
        type: time
    measures:
      - name: count
        type: count
', '743c9de0722412875116910de75da3b7', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('f3c15964-0ecd-4685-8976-ef392d81e072', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Recipes.yml', 'cubes:
  - name: Recipes
    sql: SELECT * FROM default.recipes
    joins: []
    dimensions:
      - name: title
        sql: title
        type: string
      - name: ingredients
        sql: ingredients
        type: string
      - name: directions
        sql: directions
        type: string
      - name: link
        sql: link
        type: string
      - name: source
        sql: source
        type: string
      - name: ner
        sql: NER
        type: string
    measures:
      - name: count
        type: count
', 'f9fe1b2408e0f739947324f25dcd4625', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('207e28eb-9287-4929-bb54-b98f56a8d7c3', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Repos.yml', 'cubes:
  - name: Repos
    sql: SELECT * FROM default.repos
    joins: []
    dimensions:
      - name: fullName
        sql: full_name
        type: string
      - name: ownerType
        sql: owner_type
        type: string
      - name: description
        sql: description
        type: string
      - name: fork
        sql: fork
        type: string
      - name: homepage
        sql: homepage
        type: string
      - name: language
        sql: language
        type: string
      - name: hasIssues
        sql: has_issues
        type: string
      - name: hasProjects
        sql: has_projects
        type: string
      - name: hasDownloads
        sql: has_downloads
        type: string
      - name: hasWiki
        sql: has_wiki
        type: string
      - name: hasPages
        sql: has_pages
        type: string
      - name: archived
        sql: archived
        type: string
      - name: disabled
        sql: disabled
        type: string
      - name: isTemplate
        sql: is_template
        type: string
      - name: allowForking
        sql: allow_forking
        type: string
      - name: licenseKey
        sql: license_key
        type: string
      - name: topics
        sql: topics
        type: string
      - name: defaultBranch
        sql: default_branch
        type: string
      - name: createdAt
        sql: created_at
        type: time
      - name: updatedAt
        sql: updated_at
        type: time
      - name: pushedAt
        sql: pushed_at
        type: time
    measures:
      - name: count
        type: count
      - name: stargazersCount
        sql: stargazers_count
        type: sum
      - name: forksCount
        sql: forks_count
        type: sum
      - name: subscribersCount
        sql: subscribers_count
        type: sum
      - name: openIssuesCount
        sql: open_issues_count
        type: sum
', '3781edcbc87e1309cad9caee37b90f26', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('aa79764e-1937-4a68-8d18-38ed45e47c3e', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'ReposRaw.yml', 'cubes:
  - name: ReposRaw
    sql: SELECT * FROM default.repos_raw
    joins: []
    dimensions:
      - name: data
        sql: data
        type: string
    measures:
      - name: count
        type: count
', '3227a76f8814097623fec473ed5f6070', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('ab0f367d-dfba-435d-8fdd-a77335e597d1', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'RunAttributesV1.yml', 'cubes:
  - name: RunAttributesV1
    sql: SELECT * FROM default.run_attributes_v1
    joins: []
    dimensions:
      - name: oldSha
        sql: old_sha
        type: string
      - name: newSha
        sql: new_sha
        type: string
      - name: metric
        sql: metric
        type: string
      - name: metricValue
        sql: metric_value
        type: string
    measures:
      - name: count
        type: count
', '37a99db8347e71c4b32e3cde01141cbb', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('036f85f2-3075-437c-95f8-7c5be34da9bc', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Stock.yml', 'cubes:
  - name: Stock
    sql: SELECT * FROM default.stock
    joins: []
    dimensions:
      - name: symbol
        sql: symbol
        type: string
      - name: date
        sql: date
        type: time
    measures:
      - name: count
        type: count
      - name: price
        sql: price
        type: sum
', '3050c9db7efba7a14b53f3b1ba27081a', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('a125d431-6f39-4209-b3d1-de9e160de954', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Tranco.yml', 'cubes:
  - name: Tranco
    sql: SELECT * FROM default.tranco
    joins: []
    dimensions:
      - name: domain
        sql: domain
        type: string
      - name: date
        sql: date
        type: time
    measures:
      - name: count
        type: count
', '6907e63c004919e5de57289965082dc3', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('9d5675c0-04a7-446b-84d6-2f0382a64c19', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Trips.yml', 'cubes:
  - name: Trips
    sql: SELECT * FROM default.trips
    joins: []
    dimensions:
      - name: vendorId
        sql: vendor_id
        type: string
      - name: pickupLongitude
        sql: pickup_longitude
        type: string
      - name: pickupLatitude
        sql: pickup_latitude
        type: string
      - name: dropoffLongitude
        sql: dropoff_longitude
        type: string
      - name: dropoffLatitude
        sql: dropoff_latitude
        type: string
      - name: tripDistance
        sql: trip_distance
        type: string
      - name: fareAmount
        sql: fare_amount
        type: string
      - name: extra
        sql: extra
        type: string
      - name: mtaTax
        sql: mta_tax
        type: string
      - name: tipAmount
        sql: tip_amount
        type: string
      - name: tollsAmount
        sql: tolls_amount
        type: string
      - name: ehailFee
        sql: ehail_fee
        type: string
      - name: improvementSurcharge
        sql: improvement_surcharge
        type: string
      - name: totalAmount
        sql: total_amount
        type: string
      - name: paymentType
        sql: payment_type_
        type: string
        title: Payment Type 
      - name: pickup
        sql: pickup
        type: string
      - name: dropoff
        sql: dropoff
        type: string
      - name: cabType
        sql: cab_type
        type: string
      - name: pickupCtlabel
        sql: pickup_ctlabel
        type: string
      - name: pickupCt2010
        sql: pickup_ct2010
        type: string
      - name: pickupBoroct2010
        sql: pickup_boroct2010
        type: string
      - name: pickupCdeligibil
        sql: pickup_cdeligibil
        type: string
      - name: pickupNtacode
        sql: pickup_ntacode
        type: string
      - name: pickupNtaname
        sql: pickup_ntaname
        type: string
      - name: dropoffCtlabel
        sql: dropoff_ctlabel
        type: string
      - name: dropoffCt2010
        sql: dropoff_ct2010
        type: string
      - name: dropoffBoroct2010
        sql: dropoff_boroct2010
        type: string
      - name: dropoffCdeligibil
        sql: dropoff_cdeligibil
        type: string
      - name: dropoffNtacode
        sql: dropoff_ntacode
        type: string
      - name: dropoffNtaname
        sql: dropoff_ntaname
        type: string
      - name: pickupDate
        sql: pickup_date
        type: time
      - name: pickupDatetime
        sql: pickup_datetime
        type: time
      - name: dropoffDate
        sql: dropoff_date
        type: time
      - name: dropoffDatetime
        sql: dropoff_datetime
        type: time
    measures:
      - name: count
        type: count
      - name: passengerCount
        sql: passenger_count
        type: sum
', 'b7ace91310c65214b3a7187abac12c93', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('89157801-8089-4db1-b4da-53fece28eb1f', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'UkPricePaid.yml', 'cubes:
  - name: UkPricePaid
    sql: SELECT * FROM default.uk_price_paid
    joins: []
    dimensions:
      - name: postcode1
        sql: postcode1
        type: string
      - name: postcode2
        sql: postcode2
        type: string
      - name: type
        sql: type
        type: string
      - name: duration
        sql: duration
        type: string
      - name: addr1
        sql: addr1
        type: string
      - name: addr2
        sql: addr2
        type: string
      - name: street
        sql: street
        type: string
      - name: locality
        sql: locality
        type: string
      - name: town
        sql: town
        type: string
      - name: district
        sql: district
        type: string
      - name: county
        sql: county
        type: string
      - name: date
        sql: date
        type: time
    measures:
      - name: count
        type: count
      - name: price
        sql: price
        type: sum
', '667b2c10a49ab383627f9c4949b0d3cc', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('ba401364-474a-4818-84f7-e322f1090ee1', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'HackernewsChangesToHistory.yml', 'cubes:
  - name: HackernewsChangesToHistory
    sql: SELECT * FROM default.hackernews_changes_to_history
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: type
        sql: type
        type: string
      - name: by
        sql: by
        type: string
      - name: text
        sql: text
        type: string
      - name: url
        sql: url
        type: string
      - name: title
        sql: title
        type: string
      - name: updateTime
        sql: update_time
        type: time
      - name: time
        sql: time
        type: time
    measures:
      - name: count
        type: count
', '0eed92ae78e83db07750ca3983c7f3b9', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('b0f331dc-d95d-4458-94b4-d5a650c2afcc', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'UkPricePaidUpdater.yml', 'cubes:
  - name: UkPricePaidUpdater
    sql: SELECT * FROM default.uk_price_paid_updater
    joins: []
    dimensions:
      - name: postcode1
        sql: postcode1
        type: string
      - name: postcode2
        sql: postcode2
        type: string
      - name: type
        sql: type
        type: string
      - name: duration
        sql: duration
        type: string
      - name: addr1
        sql: addr1
        type: string
      - name: addr2
        sql: addr2
        type: string
      - name: street
        sql: street
        type: string
      - name: locality
        sql: locality
        type: string
      - name: town
        sql: town
        type: string
      - name: district
        sql: district
        type: string
      - name: county
        sql: county
        type: string
      - name: date
        sql: date
        type: time
    measures:
      - name: count
        type: count
      - name: price
        sql: price
        type: sum
', '49c465588361c4b18ee32c3df0a44e3b', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('a0d3e5b5-563e-456a-be4c-c8f542659fe6', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Wikistat.yml', 'cubes:
  - name: Wikistat
    sql: SELECT * FROM default.wikistat
    joins: []
    dimensions:
      - name: project
        sql: project
        type: string
      - name: subproject
        sql: subproject
        type: string
      - name: path
        sql: path
        type: string
      - name: time
        sql: time
        type: time
    measures:
      - name: count
        type: count
', '6015f667fcbe0a47fa9efcd24227ca13', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('74636ef0-5aa2-4ca7-84e4-843a2e6db68f', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'WorkflowJobs.yml', 'cubes:
  - name: WorkflowJobs
    sql: SELECT * FROM default.workflow_jobs
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: workflowName
        sql: workflow_name
        type: string
      - name: headBranch
        sql: head_branch
        type: string
      - name: runUrl
        sql: run_url
        type: string
      - name: nodeId
        sql: node_id
        type: string
      - name: headSha
        sql: head_sha
        type: string
      - name: url
        sql: url
        type: string
      - name: htmlUrl
        sql: html_url
        type: string
      - name: status
        sql: status
        type: string
      - name: conclusion
        sql: conclusion
        type: string
      - name: name
        sql: name
        type: string
      - name: checkRunUrl
        sql: check_run_url
        type: string
      - name: labels
        sql: labels
        type: string
      - name: runnerName
        sql: runner_name
        type: string
      - name: runnerGroupName
        sql: runner_group_name
        type: string
      - name: repository
        sql: repository
        type: string
      - name: updatedAt
        sql: updated_at
        type: time
      - name: startedAt
        sql: started_at
        type: time
      - name: completedAt
        sql: completed_at
        type: time
    measures:
      - name: count
        type: count
', '38a0e74b1fbd85398d3bbdb8c8eb936e', 'cb87a34d-87e6-45b7-9339-248c18d951e8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('b315390f-9868-466f-a682-cfba0a9e7efe', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Actors.yml', 'cubes:
  - name: Actors
    sql: SELECT * FROM default.actors
    joins: []
    dimensions:
      - name: login
        sql: login
        type: string
      - name: type
        sql: type
        type: string
      - name: siteAdmin
        sql: site_admin
        type: string
      - name: name
        sql: name
        type: string
      - name: company
        sql: company
        type: string
      - name: blog
        sql: blog
        type: string
      - name: location
        sql: location
        type: string
      - name: email
        sql: email
        type: string
      - name: hireable
        sql: hireable
        type: string
      - name: bio
        sql: bio
        type: string
      - name: twitterUsername
        sql: twitter_username
        type: string
      - name: createdAt
        sql: created_at
        type: time
      - name: updatedAt
        sql: updated_at
        type: time
    measures:
      - name: count
        type: count
', '9bff96f8da2a6472881356445643ce90', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('6574f85d-8206-497c-b031-248c3215d213', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'BenchmarkResults.yml', 'cubes:
  - name: BenchmarkResults
    sql: SELECT * FROM default.benchmark_results
    joins: []
    dimensions:
      - name: runId
        sql: run_id
        type: string
    measures:
      - name: count
        type: count
', '943fd8bb010e9339a4ca672001787192', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('2315be95-92a3-437d-b082-8e0634d70f55', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'BenchmarkRuns.yml', 'cubes:
  - name: BenchmarkRuns
    sql: SELECT * FROM default.benchmark_runs
    joins: []
    dimensions:
      - name: runId
        sql: run_id
        type: string
      - name: version
        sql: version
        type: string
      - name: threads
        sql: threads
        type: string
      - name: cpuModel
        sql: cpu_model
        type: string
      - name: cpu
        sql: cpu
        type: string
      - name: df
        sql: df
        type: string
      - name: memory
        sql: memory
        type: string
      - name: memoryTotal
        sql: memory_total
        type: string
      - name: blk
        sql: blk
        type: string
      - name: mdstat
        sql: mdstat
        type: string
      - name: instance
        sql: instance
        type: string
      - name: testTime
        sql: test_time
        type: time
    measures:
      - name: count
        type: count
', '45d50ff2873c42b580f945b56ccf8121', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('e347786a-d556-4163-9292-e46bda4f9fdf', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'CellTowers.yml', 'cubes:
  - name: CellTowers
    sql: SELECT * FROM default.cell_towers
    joins: []
    dimensions:
      - name: radio
        sql: radio
        type: string
      - name: lon
        sql: lon
        type: string
      - name: lat
        sql: lat
        type: string
      - name: created
        sql: created
        type: time
      - name: updated
        sql: updated
        type: time
    measures:
      - name: count
        type: count
', '35bbf31c1fff95d2dc2b58b3f897ef5b', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('e562ea60-a14e-44d8-9015-0b7b4e70f220', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'HackernewsHistory2.yml', 'cubes:
  - name: HackernewsHistory2
    sql: SELECT * FROM default.hackernews_history_2
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: type
        sql: type
        type: string
      - name: by
        sql: by
        type: string
      - name: text
        sql: text
        type: string
      - name: url
        sql: url
        type: string
      - name: title
        sql: title
        type: string
      - name: updateTime
        sql: update_time
        type: time
      - name: time
        sql: time
        type: time
    measures:
      - name: count
        type: count
', '8535148873e7bc09e3e3d9c66ae33189', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('1fc25ac9-31f0-4df1-8c98-fbdab21fd4f8', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'HackernewsTop.yml', 'cubes:
  - name: HackernewsTop
    sql: SELECT * FROM default.hackernews_top
    joins: []
    dimensions:
      - name: type
        sql: type
        type: string
      - name: updateTime
        sql: update_time
        type: time
    measures:
      - name: count
        type: count
', 'ebb13d5dc64e1a9a77f9a56b98393e5a', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('2a13e111-8c72-48ac-af53-3e62db7b6497', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Checks.yml', 'cubes:
  - name: Checks
    sql: SELECT * FROM default.checks
    joins: []
    dimensions:
      - name: commitSha
        sql: commit_sha
        type: string
      - name: checkName
        sql: check_name
        type: string
      - name: checkStatus
        sql: check_status
        type: string
      - name: testName
        sql: test_name
        type: string
      - name: testStatus
        sql: test_status
        type: string
      - name: reportUrl
        sql: report_url
        type: string
      - name: pullRequestUrl
        sql: pull_request_url
        type: string
      - name: commitUrl
        sql: commit_url
        type: string
      - name: taskUrl
        sql: task_url
        type: string
      - name: baseRef
        sql: base_ref
        type: string
      - name: baseRepo
        sql: base_repo
        type: string
      - name: headRef
        sql: head_ref
        type: string
      - name: headRepo
        sql: head_repo
        type: string
      - name: testContextRaw
        sql: test_context_raw
        type: string
      - name: instanceType
        sql: instance_type
        type: string
      - name: instanceId
        sql: instance_id
        type: string
      - name: checkStartTime
        sql: check_start_time
        type: time
    measures:
      - name: count
        type: count
      - name: pullRequestNumber
        sql: pull_request_number
        type: sum
', 'fb715d72490287cafacf3a68987d9bf4', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('6dc87fb2-0452-464a-bc03-71631b4e28f3', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'CiscoUmbrella.yml', 'cubes:
  - name: CiscoUmbrella
    sql: SELECT * FROM default.cisco_umbrella
    joins: []
    dimensions:
      - name: domain
        sql: domain
        type: string
      - name: date
        sql: date
        type: time
    measures:
      - name: count
        type: count
', '42f7fe5d7745cd31eea4d35c6c9d88a1', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('e9bda3fd-f160-466f-bbe5-362ab5926d96', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Covid.yml', 'cubes:
  - name: Covid
    sql: SELECT * FROM default.covid
    joins: []
    dimensions:
      - name: locationKey
        sql: location_key
        type: string
      - name: date
        sql: date
        type: time
    measures:
      - name: count
        type: count
', 'bb177bdf53f9e4b52878da32dfd81050', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('a2db9c33-fb83-4d39-b88d-bd383bc86cb1', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Dish.yml', 'cubes:
  - name: Dish
    sql: SELECT * FROM default.dish
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
      - name: description
        sql: description
        type: string
    measures:
      - name: count
        type: count
      - name: lowestPrice
        sql: lowest_price
        type: sum
      - name: highestPrice
        sql: highest_price
        type: sum
', '979bebe792207f418dd67b7307206e3f', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('fe787b95-1022-41d1-9bcf-d3d0d8fffb07', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Dns2.yml', 'cubes:
  - name: Dns2
    sql: SELECT * FROM default.dns2
    joins: []
    dimensions:
      - name: domain
        sql: domain
        type: string
      - name: a
        sql: a
        type: string
      - name: aaaa
        sql: aaaa
        type: string
      - name: cname
        sql: cname
        type: string
      - name: timestamp
        sql: timestamp
        type: time
    measures:
      - name: count
        type: count
', '1a6bdc887f3a02eda0f490591186c774', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('86e8b7d3-3827-4d91-8d5c-9752dc3953c0', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Dns.yml', 'cubes:
  - name: Dns
    sql: SELECT * FROM default.dns
    joins: []
    dimensions:
      - name: domain
        sql: domain
        type: string
      - name: a
        sql: a
        type: string
      - name: aaaa
        sql: aaaa
        type: string
      - name: cname
        sql: cname
        type: string
      - name: timestamp
        sql: timestamp
        type: time
    measures:
      - name: count
        type: count
', 'f9614384ba3785ea70f4ecaa6fd583f6', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('d6f08689-ee70-41d6-9dd1-14f1b01a7bf6', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'FoodFacts.yml', 'cubes:
  - name: FoodFacts
    sql: SELECT * FROM default.food_facts
    joins: []
    dimensions:
      - name: data
        sql: data
        type: string
    measures:
      - name: count
        type: count
', '1eab2e65bc7ff72f9c12a8781a1d2bd1', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('c20960c0-8e75-4448-a0f6-0d46f7e80822', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'GithubEvents.yml', 'cubes:
  - name: GithubEvents
    sql: SELECT * FROM default.github_events
    joins: []
    dimensions:
      - name: eventType
        sql: event_type
        type: string
      - name: actorLogin
        sql: actor_login
        type: string
      - name: repoName
        sql: repo_name
        type: string
      - name: body
        sql: body
        type: string
      - name: path
        sql: path
        type: string
      - name: ref
        sql: ref
        type: string
      - name: refType
        sql: ref_type
        type: string
      - name: creatorUserLogin
        sql: creator_user_login
        type: string
      - name: title
        sql: title
        type: string
      - name: labels
        sql: labels
        type: string
      - name: state
        sql: state
        type: string
      - name: assignee
        sql: assignee
        type: string
      - name: assignees
        sql: assignees
        type: string
      - name: authorAssociation
        sql: author_association
        type: string
      - name: mergeCommitSha
        sql: merge_commit_sha
        type: string
      - name: requestedReviewers
        sql: requested_reviewers
        type: string
      - name: requestedTeams
        sql: requested_teams
        type: string
      - name: headRef
        sql: head_ref
        type: string
      - name: headSha
        sql: head_sha
        type: string
      - name: baseRef
        sql: base_ref
        type: string
      - name: baseSha
        sql: base_sha
        type: string
      - name: mergeableState
        sql: mergeable_state
        type: string
      - name: mergedBy
        sql: merged_by
        type: string
      - name: diffHunk
        sql: diff_hunk
        type: string
      - name: commitId
        sql: commit_id
        type: string
      - name: originalCommitId
        sql: original_commit_id
        type: string
      - name: memberLogin
        sql: member_login
        type: string
      - name: releaseTagName
        sql: release_tag_name
        type: string
      - name: releaseName
        sql: release_name
        type: string
      - name: reviewState
        sql: review_state
        type: string
      - name: createdAt
        sql: created_at
        type: time
      - name: updatedAt
        sql: updated_at
        type: time
      - name: fileTime
        sql: file_time
        type: time
      - name: action
        sql: action
        type: time
      - name: closedAt
        sql: closed_at
        type: time
      - name: mergedAt
        sql: merged_at
        type: time
    measures:
      - name: count
        type: count
      - name: number
        sql: number
        type: sum
', 'ce6bcfc497ba80dfc8473e996c07f602', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('423d16f2-c6ee-4dcd-a7be-9a7cbc59794c', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'HackernewsChangesItems.yml', 'cubes:
  - name: HackernewsChangesItems
    sql: SELECT * FROM default.hackernews_changes_items
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: type
        sql: type
        type: string
      - name: by
        sql: by
        type: string
      - name: text
        sql: text
        type: string
      - name: url
        sql: url
        type: string
      - name: title
        sql: title
        type: string
      - name: updateTime
        sql: update_time
        type: time
      - name: time
        sql: time
        type: time
    measures:
      - name: count
        type: count
', '7d38a7e67809577d2a64514baaf7440b', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('659656a7-89f5-4ec1-8fb2-651c4600db8c', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'HackernewsChangesProfiles.yml', 'cubes:
  - name: HackernewsChangesProfiles
    sql: SELECT * FROM default.hackernews_changes_profiles
    joins: []
    dimensions:
      - name: id
        sql: id
        type: string
        primaryKey: true
      - name: about
        sql: about
        type: string
      - name: created
        sql: created
        type: time
      - name: updateTime
        sql: update_time
        type: time
    measures:
      - name: count
        type: count
      - name: submittedCount
        sql: submitted_count
        type: sum
', 'd47ae40f037f41fddba1d5cab427e5d6', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('213436dc-6221-41b6-9c47-df52a3b94334', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'HackernewsHistory.yml', 'cubes:
  - name: HackernewsHistory
    sql: SELECT * FROM default.hackernews_history
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: type
        sql: type
        type: string
      - name: by
        sql: by
        type: string
      - name: text
        sql: text
        type: string
      - name: url
        sql: url
        type: string
      - name: title
        sql: title
        type: string
      - name: updateTime
        sql: update_time
        type: time
      - name: time
        sql: time
        type: time
    measures:
      - name: count
        type: count
', '0c758fcfdfa84be0d51a8ea13415d94a', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('d1ce8c78-6217-4d1f-aecc-5069c13708b6', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Hackernews.yml', 'cubes:
  - name: Hackernews
    sql: SELECT * FROM default.hackernews
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: type
        sql: type
        type: string
      - name: by
        sql: by
        type: string
      - name: text
        sql: text
        type: string
      - name: url
        sql: url
        type: string
      - name: title
        sql: title
        type: string
      - name: time
        sql: time
        type: time
    measures:
      - name: count
        type: count
', 'aebd55ff7939101cdb62a5fe12742e2e', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('5f64bf22-bed5-427c-9aad-1d311670dbb2', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Lineorder.yml', 'cubes:
  - name: Lineorder
    sql: SELECT * FROM default.lineorder
    joins: []
    dimensions:
      - name: loOrderpriority
        sql: LO_ORDERPRIORITY
        type: string
      - name: loShipmode
        sql: LO_SHIPMODE
        type: string
      - name: loOrderdate
        sql: LO_ORDERDATE
        type: time
      - name: loCommitdate
        sql: LO_COMMITDATE
        type: time
    measures:
      - name: count
        type: count
      - name: loLinenumber
        sql: LO_LINENUMBER
        type: sum
      - name: loQuantity
        sql: LO_QUANTITY
        type: sum
      - name: loExtendedprice
        sql: LO_EXTENDEDPRICE
        type: sum
      - name: loOrdtotalprice
        sql: LO_ORDTOTALPRICE
        type: sum
      - name: loDiscount
        sql: LO_DISCOUNT
        type: sum
      - name: loSupplycost
        sql: LO_SUPPLYCOST
        type: sum
', '56bcce41157aa5624d52e4e05a3622c8', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('354faa7e-6505-4b50-92c1-354f178c9ecd', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'LocStats.yml', 'cubes:
  - name: LocStats
    sql: SELECT * FROM default.loc_stats
    joins: []
    dimensions:
      - name: repoName
        sql: repo_name
        type: string
      - name: language
        sql: language
        type: string
      - name: path
        sql: path
        type: string
      - name: file
        sql: file
        type: string
    measures:
      - name: count
        type: count
', 'd9ef1bbc5f2a568a24646b064e7882f8', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('f18d81d2-fc4f-4130-aba0-8dfdd04249f6', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'MenuItem.yml', 'cubes:
  - name: MenuItem
    sql: SELECT * FROM default.menu_item
    joins:
      - name: MenuPage
        sql: "{CUBE}.menu_page_id = {MenuPage}.id"
        relationship: belongsTo
      - name: Dish
        sql: "{CUBE}.dish_id = {Dish}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: xpos
        sql: xpos
        type: string
      - name: ypos
        sql: ypos
        type: string
      - name: createdAt
        sql: created_at
        type: time
      - name: updatedAt
        sql: updated_at
        type: time
    measures:
      - name: count
        type: count
      - name: price
        sql: price
        type: sum
      - name: highPrice
        sql: high_price
        type: sum
', 'bb639575476d83f9b58c22d4d257f505', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('a94da64b-0051-4e12-aad2-97cd6f80a682', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'MenuPage.yml', 'cubes:
  - name: MenuPage
    sql: SELECT * FROM default.menu_page
    joins:
      - name: Menu
        sql: "{CUBE}.menu_id = {Menu}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: imageId
        sql: image_id
        type: string
      - name: uuid
        sql: uuid
        type: string
    measures:
      - name: count
        type: count
      - name: pageNumber
        sql: page_number
        type: sum
', '68322aa53493790b1e73900a73b76306', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('e3b83d9c-554c-44cb-97b2-71b6a58e42ec', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Menu.yml', 'cubes:
  - name: Menu
    sql: SELECT * FROM default.menu
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
      - name: sponsor
        sql: sponsor
        type: string
      - name: event
        sql: event
        type: string
      - name: venue
        sql: venue
        type: string
      - name: place
        sql: place
        type: string
      - name: physicalDescription
        sql: physical_description
        type: string
      - name: occasion
        sql: occasion
        type: string
      - name: notes
        sql: notes
        type: string
      - name: callNumber
        sql: call_number
        type: string
      - name: keywords
        sql: keywords
        type: string
      - name: language
        sql: language
        type: string
      - name: date
        sql: date
        type: string
      - name: location
        sql: location
        type: string
      - name: locationType
        sql: location_type
        type: string
      - name: currency
        sql: currency
        type: string
      - name: currencySymbol
        sql: currency_symbol
        type: string
      - name: status
        sql: status
        type: string
    measures:
      - name: count
        type: count
      - name: pageCount
        sql: page_count
        type: sum
      - name: dishCount
        sql: dish_count
        type: sum
', 'ef33f2ca0e3be2be33025fce7bb1b84c', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('15e49196-2b9b-4923-90ed-575444e6e7d9', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Minicrawl.yml', 'cubes:
  - name: Minicrawl
    sql: SELECT * FROM default.minicrawl
    joins: []
    dimensions:
      - name: domain
        sql: domain
        type: string
      - name: log
        sql: log
        type: string
      - name: content
        sql: content
        type: string
      - name: isUtf8
        sql: is_utf8
        type: string
      - name: text
        sql: text
        type: string
    measures:
      - name: count
        type: count
', 'e55af900c1f264126334e84cda8d9fa0', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('1751d2e0-b729-4476-8849-5d39e686540e', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Ontime.yml', 'cubes:
  - name: Ontime
    sql: SELECT * FROM default.ontime
    joins: []
    dimensions:
      - name: reportingAirline
        sql: Reporting_Airline
        type: string
      - name: iataCodeReportingAirline
        sql: IATA_CODE_Reporting_Airline
        type: string
      - name: tailNumber
        sql: Tail_Number
        type: string
      - name: flightNumberReportingAirline
        sql: Flight_Number_Reporting_Airline
        type: string
      - name: origin
        sql: Origin
        type: string
      - name: origincityname
        sql: OriginCityName
        type: string
      - name: originstate
        sql: OriginState
        type: string
      - name: originstatefips
        sql: OriginStateFips
        type: string
      - name: originstatename
        sql: OriginStateName
        type: string
      - name: dest
        sql: Dest
        type: string
      - name: destcityname
        sql: DestCityName
        type: string
      - name: deststate
        sql: DestState
        type: string
      - name: deststatefips
        sql: DestStateFips
        type: string
      - name: deststatename
        sql: DestStateName
        type: string
      - name: departuredelaygroups
        sql: DepartureDelayGroups
        type: string
      - name: deptimeblk
        sql: DepTimeBlk
        type: string
      - name: wheelsoff
        sql: WheelsOff
        type: string
      - name: wheelson
        sql: WheelsOn
        type: string
      - name: arrivaldelaygroups
        sql: ArrivalDelayGroups
        type: string
      - name: arrtimeblk
        sql: ArrTimeBlk
        type: string
      - name: cancellationcode
        sql: CancellationCode
        type: string
      - name: div1airport
        sql: Div1Airport
        type: string
      - name: div1tailnum
        sql: Div1TailNum
        type: string
      - name: div2airport
        sql: Div2Airport
        type: string
      - name: div2tailnum
        sql: Div2TailNum
        type: string
      - name: div3airport
        sql: Div3Airport
        type: string
      - name: div3tailnum
        sql: Div3TailNum
        type: string
      - name: div4airport
        sql: Div4Airport
        type: string
      - name: div4tailnum
        sql: Div4TailNum
        type: string
      - name: div5airport
        sql: Div5Airport
        type: string
      - name: div5tailnum
        sql: Div5TailNum
        type: string
      - name: flightdate
        sql: FlightDate
        type: time
    measures:
      - name: count
        type: count
', '7fcf78af1467502bd113b3e269ae5cdb', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('87615f56-6524-4110-b5b1-bf3414987852', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Trips.yml', 'cubes:
  - name: Trips
    sql: SELECT * FROM default.trips
    joins: []
    dimensions:
      - name: vendorId
        sql: vendor_id
        type: string
      - name: pickupLongitude
        sql: pickup_longitude
        type: string
      - name: pickupLatitude
        sql: pickup_latitude
        type: string
      - name: dropoffLongitude
        sql: dropoff_longitude
        type: string
      - name: dropoffLatitude
        sql: dropoff_latitude
        type: string
      - name: tripDistance
        sql: trip_distance
        type: string
      - name: fareAmount
        sql: fare_amount
        type: string
      - name: extra
        sql: extra
        type: string
      - name: mtaTax
        sql: mta_tax
        type: string
      - name: tipAmount
        sql: tip_amount
        type: string
      - name: tollsAmount
        sql: tolls_amount
        type: string
      - name: ehailFee
        sql: ehail_fee
        type: string
      - name: improvementSurcharge
        sql: improvement_surcharge
        type: string
      - name: totalAmount
        sql: total_amount
        type: string
      - name: paymentType
        sql: payment_type_
        type: string
        title: Payment Type 
      - name: pickup
        sql: pickup
        type: string
      - name: dropoff
        sql: dropoff
        type: string
      - name: cabType
        sql: cab_type
        type: string
      - name: pickupCtlabel
        sql: pickup_ctlabel
        type: string
      - name: pickupCt2010
        sql: pickup_ct2010
        type: string
      - name: pickupBoroct2010
        sql: pickup_boroct2010
        type: string
      - name: pickupCdeligibil
        sql: pickup_cdeligibil
        type: string
      - name: pickupNtacode
        sql: pickup_ntacode
        type: string
      - name: pickupNtaname
        sql: pickup_ntaname
        type: string
      - name: dropoffCtlabel
        sql: dropoff_ctlabel
        type: string
      - name: dropoffCt2010
        sql: dropoff_ct2010
        type: string
      - name: dropoffBoroct2010
        sql: dropoff_boroct2010
        type: string
      - name: dropoffCdeligibil
        sql: dropoff_cdeligibil
        type: string
      - name: dropoffNtacode
        sql: dropoff_ntacode
        type: string
      - name: dropoffNtaname
        sql: dropoff_ntaname
        type: string
      - name: pickupDate
        sql: pickup_date
        type: time
      - name: pickupDatetime
        sql: pickup_datetime
        type: time
      - name: dropoffDate
        sql: dropoff_date
        type: time
      - name: dropoffDatetime
        sql: dropoff_datetime
        type: time
    measures:
      - name: count
        type: count
      - name: passengerCount
        sql: passenger_count
        type: sum
', 'b7ace91310c65214b3a7187abac12c93', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('bd45db01-76ff-421e-a993-594220ff1bcf', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Opensky.yml', 'cubes:
  - name: Opensky
    sql: SELECT * FROM default.opensky
    joins: []
    dimensions:
      - name: callsign
        sql: callsign
        type: string
      - name: number
        sql: number
        type: string
      - name: icao24
        sql: icao24
        type: string
      - name: registration
        sql: registration
        type: string
      - name: typecode
        sql: typecode
        type: string
      - name: origin
        sql: origin
        type: string
      - name: destination
        sql: destination
        type: string
      - name: latitude1
        sql: latitude_1
        type: string
        title: Latitude 1
      - name: longitude1
        sql: longitude_1
        type: string
        title: Longitude 1
      - name: altitude1
        sql: altitude_1
        type: string
        title: Altitude 1
      - name: latitude2
        sql: latitude_2
        type: string
        title: Latitude 2
      - name: longitude2
        sql: longitude_2
        type: string
        title: Longitude 2
      - name: altitude2
        sql: altitude_2
        type: string
        title: Altitude 2
      - name: firstseen
        sql: firstseen
        type: time
      - name: lastseen
        sql: lastseen
        type: time
      - name: day
        sql: day
        type: time
    measures:
      - name: count
        type: count
', '7654d3d3cee36517e3679f01ec268e06', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('7380f056-910c-4636-a170-2c3bd6346178', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Pypi.yml', 'cubes:
  - name: Pypi
    sql: SELECT * FROM default.pypi
    joins: []
    dimensions:
      - name: projectName
        sql: project_name
        type: string
      - name: projectVersion
        sql: project_version
        type: string
      - name: projectRelease
        sql: project_release
        type: string
      - name: path
        sql: path
        type: string
      - name: archivePath
        sql: archive_path
        type: string
      - name: hash
        sql: hash
        type: string
      - name: skipReason
        sql: skip_reason
        type: string
      - name: uploadedOn
        sql: uploaded_on
        type: time
    measures:
      - name: count
        type: count
', '54ed5ed38394dcf530364fb8a4f4c920', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('8687d61b-81cc-4635-b0f8-e41d1f2f80e2', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'QueryMetricsV2.yml', 'cubes:
  - name: QueryMetricsV2
    sql: SELECT * FROM default.query_metrics_v2
    joins: []
    dimensions:
      - name: oldSha
        sql: old_sha
        type: string
      - name: newSha
        sql: new_sha
        type: string
      - name: test
        sql: test
        type: string
      - name: queryDisplayName
        sql: query_display_name
        type: string
      - name: metric
        sql: metric
        type: string
      - name: oldValue
        sql: old_value
        type: string
      - name: newValue
        sql: new_value
        type: string
      - name: diff
        sql: diff
        type: string
      - name: statThreshold
        sql: stat_threshold
        type: string
      - name: eventDate
        sql: event_date
        type: time
      - name: eventTime
        sql: event_time
        type: time
    measures:
      - name: count
        type: count
      - name: prNumber
        sql: pr_number
        type: sum
', '7b29c1abc60d3d709e9cf0e109cfd40c', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('9a818473-8ff9-41c8-9081-0981669ed2e7', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Rdns.yml', 'cubes:
  - name: Rdns
    sql: SELECT * FROM default.rdns
    joins: []
    dimensions:
      - name: address
        sql: address
        type: string
      - name: domain
        sql: domain
        type: string
      - name: timestamp
        sql: timestamp
        type: time
    measures:
      - name: count
        type: count
', '743c9de0722412875116910de75da3b7', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('6f94b498-8d30-44ad-a43e-e769fa42b55b', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Recipes.yml', 'cubes:
  - name: Recipes
    sql: SELECT * FROM default.recipes
    joins: []
    dimensions:
      - name: title
        sql: title
        type: string
      - name: ingredients
        sql: ingredients
        type: string
      - name: directions
        sql: directions
        type: string
      - name: link
        sql: link
        type: string
      - name: source
        sql: source
        type: string
      - name: ner
        sql: NER
        type: string
    measures:
      - name: count
        type: count
', 'f9fe1b2408e0f739947324f25dcd4625', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('f978162f-7ec4-454a-be01-fc0a19c5a402', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'ReposRaw.yml', 'cubes:
  - name: ReposRaw
    sql: SELECT * FROM default.repos_raw
    joins: []
    dimensions:
      - name: data
        sql: data
        type: string
    measures:
      - name: count
        type: count
', '3227a76f8814097623fec473ed5f6070', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('5bde8e04-20fa-4756-a02d-a8842232f3d2', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Repos.yml', 'cubes:
  - name: Repos
    sql: SELECT * FROM default.repos
    joins: []
    dimensions:
      - name: fullName
        sql: full_name
        type: string
      - name: ownerType
        sql: owner_type
        type: string
      - name: description
        sql: description
        type: string
      - name: fork
        sql: fork
        type: string
      - name: homepage
        sql: homepage
        type: string
      - name: language
        sql: language
        type: string
      - name: hasIssues
        sql: has_issues
        type: string
      - name: hasProjects
        sql: has_projects
        type: string
      - name: hasDownloads
        sql: has_downloads
        type: string
      - name: hasWiki
        sql: has_wiki
        type: string
      - name: hasPages
        sql: has_pages
        type: string
      - name: archived
        sql: archived
        type: string
      - name: disabled
        sql: disabled
        type: string
      - name: isTemplate
        sql: is_template
        type: string
      - name: allowForking
        sql: allow_forking
        type: string
      - name: licenseKey
        sql: license_key
        type: string
      - name: topics
        sql: topics
        type: string
      - name: defaultBranch
        sql: default_branch
        type: string
      - name: createdAt
        sql: created_at
        type: time
      - name: updatedAt
        sql: updated_at
        type: time
      - name: pushedAt
        sql: pushed_at
        type: time
    measures:
      - name: count
        type: count
      - name: stargazersCount
        sql: stargazers_count
        type: sum
      - name: forksCount
        sql: forks_count
        type: sum
      - name: subscribersCount
        sql: subscribers_count
        type: sum
      - name: openIssuesCount
        sql: open_issues_count
        type: sum
', '3781edcbc87e1309cad9caee37b90f26', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('6ced4fe6-ff1a-4ee8-82b0-94c1f5bb2dc5', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'RunAttributesV1.yml', 'cubes:
  - name: RunAttributesV1
    sql: SELECT * FROM default.run_attributes_v1
    joins: []
    dimensions:
      - name: oldSha
        sql: old_sha
        type: string
      - name: newSha
        sql: new_sha
        type: string
      - name: metric
        sql: metric
        type: string
      - name: metricValue
        sql: metric_value
        type: string
    measures:
      - name: count
        type: count
', '37a99db8347e71c4b32e3cde01141cbb', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('21642ca1-a3cb-4ffd-af09-29bcb108ec2b', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Stock.yml', 'cubes:
  - name: Stock
    sql: SELECT * FROM default.stock
    joins: []
    dimensions:
      - name: symbol
        sql: symbol
        type: string
      - name: date
        sql: date
        type: time
    measures:
      - name: count
        type: count
      - name: price
        sql: price
        type: sum
', '3050c9db7efba7a14b53f3b1ba27081a', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('ef8a5e3b-6b19-49c7-9699-71cfb80d5282', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Tranco.yml', 'cubes:
  - name: Tranco
    sql: SELECT * FROM default.tranco
    joins: []
    dimensions:
      - name: domain
        sql: domain
        type: string
      - name: date
        sql: date
        type: time
    measures:
      - name: count
        type: count
', '6907e63c004919e5de57289965082dc3', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('b8ad6d46-3bd0-485d-9f07-d0650cf80361', '2024-02-15 22:49:18.03242+00', '2024-02-15 22:49:18.03242+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'TmpNewtable.yml', 'cubes:
  - name: TmpNewtable
    sql: SELECT * FROM public.tmp_newtable
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: address
        sql: address
        type: string
      - name: name
        sql: name
        type: string
      - name: email
        sql: email
        type: string
      - name: phone
        sql: phone
        type: string
    measures:
      - name: count
        type: count
', '111353e2d946fcaf3644e0cf5770b5c2', 'ab116697-5fa3-4cda-ac5a-f4bca5742ead');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('584c3063-5eeb-4b76-a8e5-166bac8a8317', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'UkPricePaidUpdater.yml', 'cubes:
  - name: UkPricePaidUpdater
    sql: SELECT * FROM default.uk_price_paid_updater
    joins: []
    dimensions:
      - name: postcode1
        sql: postcode1
        type: string
      - name: postcode2
        sql: postcode2
        type: string
      - name: type
        sql: type
        type: string
      - name: duration
        sql: duration
        type: string
      - name: addr1
        sql: addr1
        type: string
      - name: addr2
        sql: addr2
        type: string
      - name: street
        sql: street
        type: string
      - name: locality
        sql: locality
        type: string
      - name: town
        sql: town
        type: string
      - name: district
        sql: district
        type: string
      - name: county
        sql: county
        type: string
      - name: date
        sql: date
        type: time
    measures:
      - name: count
        type: count
      - name: price
        sql: price
        type: sum
', '49c465588361c4b18ee32c3df0a44e3b', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('bdc3d6ea-4efe-43b9-9291-073faa8fdc3b', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'UkPricePaid.yml', 'cubes:
  - name: UkPricePaid
    sql: SELECT * FROM default.uk_price_paid
    joins: []
    dimensions:
      - name: postcode1
        sql: postcode1
        type: string
      - name: postcode2
        sql: postcode2
        type: string
      - name: type
        sql: type
        type: string
      - name: duration
        sql: duration
        type: string
      - name: addr1
        sql: addr1
        type: string
      - name: addr2
        sql: addr2
        type: string
      - name: street
        sql: street
        type: string
      - name: locality
        sql: locality
        type: string
      - name: town
        sql: town
        type: string
      - name: district
        sql: district
        type: string
      - name: county
        sql: county
        type: string
      - name: date
        sql: date
        type: time
    measures:
      - name: count
        type: count
      - name: price
        sql: price
        type: sum
', '667b2c10a49ab383627f9c4949b0d3cc', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('342cebc8-52ef-44c2-a286-d8cc3f88dce9', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'Wikistat.yml', 'cubes:
  - name: Wikistat
    sql: SELECT * FROM default.wikistat
    joins: []
    dimensions:
      - name: project
        sql: project
        type: string
      - name: subproject
        sql: subproject
        type: string
      - name: path
        sql: path
        type: string
      - name: time
        sql: time
        type: time
    measures:
      - name: count
        type: count
', '6015f667fcbe0a47fa9efcd24227ca13', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('4035210a-c7bf-441c-84aa-f1a6747985c9', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:42.855225+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'WorkflowJobs.yml', 'cubes:
  - name: WorkflowJobs
    sql: SELECT * FROM default.workflow_jobs
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: workflowName
        sql: workflow_name
        type: string
      - name: headBranch
        sql: head_branch
        type: string
      - name: runUrl
        sql: run_url
        type: string
      - name: nodeId
        sql: node_id
        type: string
      - name: headSha
        sql: head_sha
        type: string
      - name: url
        sql: url
        type: string
      - name: htmlUrl
        sql: html_url
        type: string
      - name: status
        sql: status
        type: string
      - name: conclusion
        sql: conclusion
        type: string
      - name: name
        sql: name
        type: string
      - name: checkRunUrl
        sql: check_run_url
        type: string
      - name: labels
        sql: labels
        type: string
      - name: runnerName
        sql: runner_name
        type: string
      - name: runnerGroupName
        sql: runner_group_name
        type: string
      - name: repository
        sql: repository
        type: string
      - name: updatedAt
        sql: updated_at
        type: time
      - name: startedAt
        sql: started_at
        type: time
      - name: completedAt
        sql: completed_at
        type: time
    measures:
      - name: count
        type: count
', '38a0e74b1fbd85398d3bbdb8c8eb936e', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('f8a432ef-dda2-41a3-adc7-f89966ee8cd3', '2024-02-15 22:49:18.03242+00', '2024-02-15 22:49:18.03242+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Companies.yml', 'cubes:
  - name: Companies
    sql: SELECT * FROM public.companies
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: email
        sql: email
        type: string
      - name: name
        sql: name
        type: string
      - name: phone
        sql: phone
        type: string
      - name: address
        sql: address
        type: string
    measures:
      - name: count
        type: count
', '73d3a69114afa1dd90fb90053fc23caf', 'ab116697-5fa3-4cda-ac5a-f4bca5742ead');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('7ad30d2a-a895-4d28-ae0a-3c0636ea2820', '2024-02-15 22:49:18.03242+00', '2024-02-15 22:49:18.03242+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItems.yml', 'cubes:
  - name: LineItems
    sql: SELECT * FROM public.line_items
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
      - name: quantity
        sql: quantity
        type: sum
      - name: price
        sql: price
        type: sum
', 'b5603719550035b0cf93106e8c608902', 'ab116697-5fa3-4cda-ac5a-f4bca5742ead');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('ca7c9e4e-4abb-4322-a30e-ff5659473ee3', '2024-02-15 22:49:18.03242+00', '2024-02-15 22:49:18.03242+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItemsCountByStates.yml', 'cubes:
  - name: LineItemsCountByStates
    sql: SELECT * FROM public.line_items_count_by_states
    joins: []
    dimensions:
      - name: usersState
        sql: users_state
        type: string
    measures:
      - name: count
        type: count
      - name: lineItemsCount
        sql: line_items_count
        type: sum
', '9263cb82160a4f840ff980c02213cd12', 'ab116697-5fa3-4cda-ac5a-f4bca5742ead');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('80ddd5bc-aec2-4770-b21d-4ef2ee24d3bc', '2024-02-15 22:49:18.03242+00', '2024-02-15 22:49:18.03242+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItemsEval.yml', 'cubes:
  - name: LineItemsEval
    sql: SELECT * FROM public.line_items_eval
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
    dimensions:
      - name: price
        sql: price
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
      - name: quantity
        sql: quantity
        type: sum
', '8cd950fef518b17f49c7850d930c45b5', 'ab116697-5fa3-4cda-ac5a-f4bca5742ead');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('1a64cca8-94d8-4f08-a5f0-9db783aabae0', '2024-02-15 22:49:18.03242+00', '2024-02-15 22:49:18.03242+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItemsEval1.yml', 'cubes:
  - name: LineItemsEval1
    sql: SELECT * FROM public.line_items_eval_1
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: price
        sql: price
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
      - name: quantity
        sql: quantity
        type: sum
', 'fb89e818c1c418c3896321020ee30bcb', 'ab116697-5fa3-4cda-ac5a-f4bca5742ead');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('c229219a-ceeb-40d8-a9f1-5aaac49c6f75', '2024-02-15 22:49:18.03242+00', '2024-02-15 22:49:18.03242+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItemsEval2.yml', 'cubes:
  - name: LineItemsEval2
    sql: SELECT * FROM public.line_items_eval_2
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
    dimensions:
      - name: price
        sql: price
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
      - name: quantity
        sql: quantity
        type: sum
', 'b82d9ce2bde6f8c4660fbca5f0670b90', 'ab116697-5fa3-4cda-ac5a-f4bca5742ead');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('dc33749c-f813-4a40-9d17-2e65a3ccd037', '2024-02-15 22:49:18.03242+00', '2024-02-15 22:49:18.03242+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Orders.yml', 'cubes:
  - name: Orders
    sql: SELECT * FROM other.orders
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
    measures:
      - name: count
        type: count
', '0f4179b4db2b5197afe5040cf5175123', 'ab116697-5fa3-4cda-ac5a-f4bca5742ead');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('41c930d7-fcaf-4cd2-b522-7ba32e821951', '2024-02-15 22:49:18.03242+00', '2024-02-15 22:49:18.03242+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'OrdersEval.yml', 'cubes:
  - name: OrdersEval
    sql: SELECT * FROM public.orders_eval
    joins:
      - name: Users
        sql: "{CUBE}.user_id = {Users}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: sum
        sql: sum
        type: string
      - name: status
        sql: status
        type: string
      - name: createdAt
        sql: created_at
        type: time
      - name: completedAt
        sql: completed_at
        type: time
    measures:
      - name: count
        type: count
', 'c9ef2d7f047720ed49bc502d7c02d1ea', 'ab116697-5fa3-4cda-ac5a-f4bca5742ead');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('f679a5c6-8c57-481d-9429-d361739410fb', '2024-02-15 22:49:18.03242+00', '2024-02-15 22:49:18.03242+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'PolyLessons.yml', 'cubes:
  - name: PolyLessons
    sql: SELECT * FROM public.poly_lessons
    joins:
      - name: Teacher
        sql: "{CUBE}.teacher_id = {Teacher}.id"
        relationship: belongsTo
      - name: Student
        sql: "{CUBE}.student_id = {Student}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
    measures:
      - name: count
        type: count
', 'd423963a68aedcfca2dbee3923f57328', 'ab116697-5fa3-4cda-ac5a-f4bca5742ead');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('43a9769a-2044-414c-9fc3-3337c09b9ee7', '2024-02-15 22:49:18.03242+00', '2024-02-15 22:49:18.03242+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'PolyUsers.yml', 'cubes:
  - name: PolyUsers
    sql: SELECT * FROM public.poly_users
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: type
        sql: type
        type: string
      - name: name
        sql: name
        type: string
      - name: school
        sql: school
        type: string
    measures:
      - name: count
        type: count
', '1f178c3186c4dda2ca9029f115c04743', 'ab116697-5fa3-4cda-ac5a-f4bca5742ead');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('1b52d2b2-4753-4256-bd5d-ba708e4ce755', '2024-02-15 22:49:18.03242+00', '2024-02-15 22:49:18.03242+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'ProductCategories.yml', 'cubes:
  - name: ProductCategories
    sql: SELECT * FROM public.product_categories
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', '84c89b49880214ad72dd34eb4c9aa771', 'ab116697-5fa3-4cda-ac5a-f4bca5742ead');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('044f21f2-c629-418c-abca-6dd85d6cab6b', '2024-02-15 22:49:18.03242+00', '2024-02-15 22:49:18.03242+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Products.yml', 'cubes:
  - name: Products
    sql: SELECT * FROM public.products
    joins:
      - name: Suppliers
        sql: "{CUBE}.supplier_id = {Suppliers}.id"
        relationship: belongsTo
      - name: ProductCategories
        sql: "{CUBE}.product_category_id = {ProductCategories}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
      - name: description
        sql: description
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', 'a3f0e338c7edccf7166acdf4a62fe807', 'ab116697-5fa3-4cda-ac5a-f4bca5742ead');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('e6e20a93-c675-4538-bdf4-4ba931974834', '2024-02-15 22:49:18.03242+00', '2024-02-15 22:49:18.03242+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Student.yml', 'cubes:
  - name: Student
    sql: SELECT * FROM public.student
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
    measures:
      - name: count
        type: count
', '5eafe7c98f36d7e89a40ef190201fb4e', 'ab116697-5fa3-4cda-ac5a-f4bca5742ead');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('d343f798-d8e3-4f7f-a70d-57846d9b2b8a', '2024-02-15 22:49:18.03242+00', '2024-02-15 22:49:18.03242+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'StudentTeacher.yml', 'cubes:
  - name: StudentTeacher
    sql: SELECT * FROM public.student_teacher
    joins:
      - name: Student
        sql: "{CUBE}.student_id = {Student}.id"
        relationship: belongsTo
      - name: Teacher
        sql: "{CUBE}.teacher_id = {Teacher}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
    measures:
      - name: count
        type: count
', 'b30c612b2dd113b6996f8c7c053d4b95', 'ab116697-5fa3-4cda-ac5a-f4bca5742ead');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('2edf72fa-d479-4a19-98ea-0908db23d8bb', '2024-02-15 22:49:18.03242+00', '2024-02-15 22:49:18.03242+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Suppliers.yml', 'cubes:
  - name: Suppliers
    sql: SELECT * FROM public.suppliers
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: address
        sql: address
        type: string
      - name: company
        sql: company
        type: string
      - name: email
        sql: email
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', '26857fc670d0914751a10f13829fff28', 'ab116697-5fa3-4cda-ac5a-f4bca5742ead');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('0a111a5a-5915-4b35-a47d-22e816474de1', '2024-02-15 22:49:18.03242+00', '2024-02-15 22:49:18.03242+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Teacher.yml', 'cubes:
  - name: Teacher
    sql: SELECT * FROM public.teacher
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
    measures:
      - name: count
        type: count
', '560bf0a3ad49aeaec7cb5a35965e05f9', 'ab116697-5fa3-4cda-ac5a-f4bca5742ead');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('223c9452-8dbb-4ee0-8c4b-c46d341fcb2a', '2024-02-15 22:49:18.03242+00', '2024-02-15 22:49:18.03242+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Teachers.yml', 'cubes:
  - name: Teachers
    sql: SELECT * FROM public.teachers
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: salary
        sql: salary
        type: string
      - name: firstName
        sql: first_name
        type: string
      - name: lastName
        sql: last_name
        type: string
      - name: school
        sql: school
        type: string
      - name: hireDate
        sql: hire_date
        type: time
    measures:
      - name: count
        type: count
', 'ed292830b5057b97613cdb17a7416464', 'ab116697-5fa3-4cda-ac5a-f4bca5742ead');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('a36e3202-a62d-479c-8f1e-2816689ee07b', '2024-02-15 22:49:18.03242+00', '2024-02-15 22:49:18.03242+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Users.yml', 'cubes:
  - name: Users
    sql: SELECT * FROM public.users
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: gender
        sql: gender
        type: string
      - name: firstName
        sql: first_name
        type: string
      - name: state
        sql: state
        type: string
      - name: lastName
        sql: last_name
        type: string
      - name: city
        sql: city
        type: string
      - name: company
        sql: company
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', '412df880a505c372aef064606bfb7e5a', 'ab116697-5fa3-4cda-ac5a-f4bca5742ead');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('490264fa-6eef-41aa-850c-2296e497ccb4', '2024-02-15 22:50:34.328636+00', '2024-02-15 22:50:34.328636+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Companies.yml', 'cubes:
  - name: Companies
    sql: SELECT * FROM public.companies
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: email
        sql: email
        type: string
      - name: name
        sql: name
        type: string
      - name: phone
        sql: phone
        type: string
      - name: address
        sql: address
        type: string
    measures:
      - name: count
        type: count
', '73d3a69114afa1dd90fb90053fc23caf', '1c71cc4f-6db9-4ae4-8530-10f4c44b81ea');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('e268a1ab-2494-4863-be8c-ec04e1399e6a', '2024-02-15 22:50:34.328636+00', '2024-02-15 22:50:34.328636+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItems.yml', 'cubes:
  - name: LineItems
    sql: SELECT * FROM public.line_items
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
      - name: quantity
        sql: quantity
        type: sum
      - name: price
        sql: price
        type: sum
', 'b5603719550035b0cf93106e8c608902', '1c71cc4f-6db9-4ae4-8530-10f4c44b81ea');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('eb5b6ad4-ec35-4644-8ee1-37e9fae7c4ae', '2024-02-15 22:50:34.328636+00', '2024-02-15 22:50:34.328636+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItemsCountByStates.yml', 'cubes:
  - name: LineItemsCountByStates
    sql: SELECT * FROM public.line_items_count_by_states
    joins: []
    dimensions:
      - name: usersState
        sql: users_state
        type: string
    measures:
      - name: count
        type: count
      - name: lineItemsCount
        sql: line_items_count
        type: sum
', '9263cb82160a4f840ff980c02213cd12', '1c71cc4f-6db9-4ae4-8530-10f4c44b81ea');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('55ad2a56-41ad-4579-9b25-38ae79124275', '2024-02-15 22:50:34.328636+00', '2024-02-15 22:50:34.328636+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItemsEval.yml', 'cubes:
  - name: LineItemsEval
    sql: SELECT * FROM public.line_items_eval
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
    dimensions:
      - name: price
        sql: price
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
      - name: quantity
        sql: quantity
        type: sum
', '8cd950fef518b17f49c7850d930c45b5', '1c71cc4f-6db9-4ae4-8530-10f4c44b81ea');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('b48d68de-a560-4d99-ba2f-2f054f4ba2d6', '2024-02-15 22:50:34.328636+00', '2024-02-15 22:50:34.328636+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItemsEval1.yml', 'cubes:
  - name: LineItemsEval1
    sql: SELECT * FROM public.line_items_eval_1
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: price
        sql: price
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
      - name: quantity
        sql: quantity
        type: sum
', 'fb89e818c1c418c3896321020ee30bcb', '1c71cc4f-6db9-4ae4-8530-10f4c44b81ea');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('99908761-9cbf-4f14-a9dc-a90115374e00', '2024-02-15 22:50:34.328636+00', '2024-02-15 22:50:34.328636+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItemsEval2.yml', 'cubes:
  - name: LineItemsEval2
    sql: SELECT * FROM public.line_items_eval_2
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
    dimensions:
      - name: price
        sql: price
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
      - name: quantity
        sql: quantity
        type: sum
', 'b82d9ce2bde6f8c4660fbca5f0670b90', '1c71cc4f-6db9-4ae4-8530-10f4c44b81ea');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('177cb4d8-bca5-4eab-9588-d268568c2e8b', '2024-02-15 22:50:34.328636+00', '2024-02-15 22:50:34.328636+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Orders.yml', 'cubes:
  - name: Orders
    sql: SELECT * FROM other.orders
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
    measures:
      - name: count
        type: count
', '0f4179b4db2b5197afe5040cf5175123', '1c71cc4f-6db9-4ae4-8530-10f4c44b81ea');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('683c240f-ad10-4170-b9e4-cd0f8a514567', '2024-02-15 22:50:34.328636+00', '2024-02-15 22:50:34.328636+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'OrdersEval.yml', 'cubes:
  - name: OrdersEval
    sql: SELECT * FROM public.orders_eval
    joins:
      - name: Users
        sql: "{CUBE}.user_id = {Users}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: sum
        sql: sum
        type: string
      - name: status
        sql: status
        type: string
      - name: createdAt
        sql: created_at
        type: time
      - name: completedAt
        sql: completed_at
        type: time
    measures:
      - name: count
        type: count
', 'c9ef2d7f047720ed49bc502d7c02d1ea', '1c71cc4f-6db9-4ae4-8530-10f4c44b81ea');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('a52c0ee4-d3df-42aa-9c65-3a53730f309e', '2024-02-15 22:50:34.328636+00', '2024-02-15 22:50:34.328636+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'PolyLessons.yml', 'cubes:
  - name: PolyLessons
    sql: SELECT * FROM public.poly_lessons
    joins:
      - name: Teacher
        sql: "{CUBE}.teacher_id = {Teacher}.id"
        relationship: belongsTo
      - name: Student
        sql: "{CUBE}.student_id = {Student}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
    measures:
      - name: count
        type: count
', 'd423963a68aedcfca2dbee3923f57328', '1c71cc4f-6db9-4ae4-8530-10f4c44b81ea');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('629bb02d-9dcd-41e3-b34d-122a186ae03e', '2024-02-15 22:50:34.328636+00', '2024-02-15 22:50:34.328636+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'PolyUsers.yml', 'cubes:
  - name: PolyUsers
    sql: SELECT * FROM public.poly_users
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: type
        sql: type
        type: string
      - name: name
        sql: name
        type: string
      - name: school
        sql: school
        type: string
    measures:
      - name: count
        type: count
', '1f178c3186c4dda2ca9029f115c04743', '1c71cc4f-6db9-4ae4-8530-10f4c44b81ea');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('2cb8254f-fe3f-47ec-9a58-327b29994bb7', '2024-02-15 22:50:34.328636+00', '2024-02-15 22:50:34.328636+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'ProductCategories.yml', 'cubes:
  - name: ProductCategories
    sql: SELECT * FROM public.product_categories
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', '84c89b49880214ad72dd34eb4c9aa771', '1c71cc4f-6db9-4ae4-8530-10f4c44b81ea');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('6673dd41-e2cb-40e2-9a60-4fc2c06276fe', '2024-02-15 22:50:34.328636+00', '2024-02-15 22:50:34.328636+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Products.yml', 'cubes:
  - name: Products
    sql: SELECT * FROM public.products
    joins:
      - name: Suppliers
        sql: "{CUBE}.supplier_id = {Suppliers}.id"
        relationship: belongsTo
      - name: ProductCategories
        sql: "{CUBE}.product_category_id = {ProductCategories}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
      - name: description
        sql: description
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', 'a3f0e338c7edccf7166acdf4a62fe807', '1c71cc4f-6db9-4ae4-8530-10f4c44b81ea');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('220d1dbd-db1a-46eb-b0a8-43e290302f93', '2024-02-15 22:50:34.328636+00', '2024-02-15 22:50:34.328636+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Student.yml', 'cubes:
  - name: Student
    sql: SELECT * FROM public.student
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
    measures:
      - name: count
        type: count
', '5eafe7c98f36d7e89a40ef190201fb4e', '1c71cc4f-6db9-4ae4-8530-10f4c44b81ea');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('72842aab-b964-45c7-aa47-16b10ff4d884', '2024-02-15 22:50:34.328636+00', '2024-02-15 22:50:34.328636+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'StudentTeacher.yml', 'cubes:
  - name: StudentTeacher
    sql: SELECT * FROM public.student_teacher
    joins:
      - name: Student
        sql: "{CUBE}.student_id = {Student}.id"
        relationship: belongsTo
      - name: Teacher
        sql: "{CUBE}.teacher_id = {Teacher}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
    measures:
      - name: count
        type: count
', 'b30c612b2dd113b6996f8c7c053d4b95', '1c71cc4f-6db9-4ae4-8530-10f4c44b81ea');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('2f666d37-9392-4b8b-be82-228c92ad9358', '2024-02-15 22:50:34.328636+00', '2024-02-15 22:50:34.328636+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Suppliers.yml', 'cubes:
  - name: Suppliers
    sql: SELECT * FROM public.suppliers
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: address
        sql: address
        type: string
      - name: company
        sql: company
        type: string
      - name: email
        sql: email
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', '26857fc670d0914751a10f13829fff28', '1c71cc4f-6db9-4ae4-8530-10f4c44b81ea');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('7a587c5b-27d1-4c23-8b39-90f67c7d646d', '2024-02-15 22:50:34.328636+00', '2024-02-15 22:50:34.328636+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Teacher.yml', 'cubes:
  - name: Teacher
    sql: SELECT * FROM public.teacher
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
    measures:
      - name: count
        type: count
', '560bf0a3ad49aeaec7cb5a35965e05f9', '1c71cc4f-6db9-4ae4-8530-10f4c44b81ea');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('25013bc5-0927-46b4-94c1-f5caf4123f31', '2024-02-15 22:50:34.328636+00', '2024-02-15 22:50:34.328636+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Teachers.yml', 'cubes:
  - name: Teachers
    sql: SELECT * FROM public.teachers
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: salary
        sql: salary
        type: string
      - name: firstName
        sql: first_name
        type: string
      - name: lastName
        sql: last_name
        type: string
      - name: school
        sql: school
        type: string
      - name: hireDate
        sql: hire_date
        type: time
    measures:
      - name: count
        type: count
', 'ed292830b5057b97613cdb17a7416464', '1c71cc4f-6db9-4ae4-8530-10f4c44b81ea');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('e76e164e-6625-4c6d-b8a8-5bd7697d2c27', '2024-02-15 22:50:34.328636+00', '2024-02-15 22:50:34.328636+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'TmpNewtable.yml', 'cubes:
  - name: TmpNewtable
    sql: SELECT * FROM public.tmp_newtable
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: address
        sql: address
        type: string
      - name: name
        sql: name
        type: string
      - name: email
        sql: email
        type: string
      - name: phone
        sql: phone
        type: string
    measures:
      - name: count
        type: count
', '111353e2d946fcaf3644e0cf5770b5c2', '1c71cc4f-6db9-4ae4-8530-10f4c44b81ea');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('f657ee55-1d5c-49a5-a9d4-f963afcb7f9e', '2024-02-15 22:50:34.328636+00', '2024-02-15 22:50:34.328636+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Users.yml', 'cubes:
  - name: Users
    sql: SELECT * FROM public.users
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: gender
        sql: gender
        type: string
      - name: firstName
        sql: first_name
        type: string
      - name: state
        sql: state
        type: string
      - name: lastName
        sql: last_name
        type: string
      - name: city
        sql: city
        type: string
      - name: company
        sql: company
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', '412df880a505c372aef064606bfb7e5a', '1c71cc4f-6db9-4ae4-8530-10f4c44b81ea');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('a968d551-fe55-4199-9135-f488fd30de38', '2024-02-15 22:51:03.984451+00', '2024-02-15 22:51:03.984451+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Companies.yml', 'cubes:
  - name: Companies
    sql: SELECT * FROM public.companies
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: email
        sql: email
        type: string
      - name: name
        sql: name
        type: string
      - name: phone
        sql: phone
        type: string
      - name: address
        sql: address
        type: string
    measures:
      - name: count
        type: count
', '73d3a69114afa1dd90fb90053fc23caf', '813d5960-c531-494d-9850-5384934fefc5');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('e4e5c12f-754f-441f-854d-19742218ae8e', '2024-02-15 22:51:03.984451+00', '2024-02-15 22:51:03.984451+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItems.yml', 'cubes:
  - name: LineItems
    sql: SELECT * FROM public.line_items
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
      - name: quantity
        sql: quantity
        type: sum
      - name: price
        sql: price
        type: sum
', 'b5603719550035b0cf93106e8c608902', '813d5960-c531-494d-9850-5384934fefc5');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('b42ef00b-4301-463a-8a6a-4fcdf122f1a6', '2024-02-15 22:51:03.984451+00', '2024-02-15 22:51:03.984451+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItemsCountByStates.yml', 'cubes:
  - name: LineItemsCountByStates
    sql: SELECT * FROM public.line_items_count_by_states
    joins: []
    dimensions:
      - name: usersState
        sql: users_state
        type: string
    measures:
      - name: count
        type: count
      - name: lineItemsCount
        sql: line_items_count
        type: sum
', '9263cb82160a4f840ff980c02213cd12', '813d5960-c531-494d-9850-5384934fefc5');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('d2c1afba-b458-4c9b-8b17-3414cf85df5f', '2024-02-15 22:51:03.984451+00', '2024-02-15 22:51:03.984451+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItemsEval.yml', 'cubes:
  - name: LineItemsEval
    sql: SELECT * FROM public.line_items_eval
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
    dimensions:
      - name: price
        sql: price
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
      - name: quantity
        sql: quantity
        type: sum
', '8cd950fef518b17f49c7850d930c45b5', '813d5960-c531-494d-9850-5384934fefc5');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('edd22d24-425c-4d3d-8a2f-2e83d84fffd7', '2024-02-15 22:51:03.984451+00', '2024-02-15 22:51:03.984451+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItemsEval1.yml', 'cubes:
  - name: LineItemsEval1
    sql: SELECT * FROM public.line_items_eval_1
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primary_key: true
      - name: price
        sql: price
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
      - name: quantity
        sql: quantity
        type: sum
', '7efd6a8e29ef939010cb3004782f5b66', '813d5960-c531-494d-9850-5384934fefc5');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('e31ace83-1ed2-4cfd-a22d-76d0f9f9a8d9', '2024-02-15 22:51:03.984451+00', '2024-02-15 22:51:03.984451+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItemsEval2.yml', 'cubes:
  - name: LineItemsEval2
    sql: SELECT * FROM public.line_items_eval_2
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
    dimensions:
      - name: price
        sql: price
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
      - name: quantity
        sql: quantity
        type: sum
', 'b82d9ce2bde6f8c4660fbca5f0670b90', '813d5960-c531-494d-9850-5384934fefc5');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('27872538-1ed0-4085-ac32-9daa0532623e', '2024-02-15 22:51:03.984451+00', '2024-02-15 22:51:03.984451+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Orders.yml', 'cubes:
  - name: Orders
    sql: SELECT * FROM other.orders
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
    measures:
      - name: count
        type: count
', '0f4179b4db2b5197afe5040cf5175123', '813d5960-c531-494d-9850-5384934fefc5');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('e3228d8d-aa15-4efb-84b6-8fc6255d2931', '2024-02-15 22:51:03.984451+00', '2024-02-15 22:51:03.984451+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'OrdersEval.yml', 'cubes:
  - name: OrdersEval
    sql: SELECT * FROM public.orders_eval
    joins:
      - name: Users
        sql: "{CUBE}.user_id = {Users}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: sum
        sql: sum
        type: string
      - name: status
        sql: status
        type: string
      - name: createdAt
        sql: created_at
        type: time
      - name: completedAt
        sql: completed_at
        type: time
    measures:
      - name: count
        type: count
', 'c9ef2d7f047720ed49bc502d7c02d1ea', '813d5960-c531-494d-9850-5384934fefc5');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('5d551623-3bcf-4211-8c82-af26472c11d7', '2024-02-15 22:51:03.984451+00', '2024-02-15 22:51:03.984451+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'PolyLessons.yml', 'cubes:
  - name: PolyLessons
    sql: SELECT * FROM public.poly_lessons
    joins:
      - name: Teacher
        sql: "{CUBE}.teacher_id = {Teacher}.id"
        relationship: belongsTo
      - name: Student
        sql: "{CUBE}.student_id = {Student}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
    measures:
      - name: count
        type: count
', 'd423963a68aedcfca2dbee3923f57328', '813d5960-c531-494d-9850-5384934fefc5');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('83eac130-1f57-4669-815f-d78f106989a0', '2024-02-15 22:51:03.984451+00', '2024-02-15 22:51:03.984451+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'PolyUsers.yml', 'cubes:
  - name: PolyUsers
    sql: SELECT * FROM public.poly_users
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: type
        sql: type
        type: string
      - name: name
        sql: name
        type: string
      - name: school
        sql: school
        type: string
    measures:
      - name: count
        type: count
', '1f178c3186c4dda2ca9029f115c04743', '813d5960-c531-494d-9850-5384934fefc5');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('eed204ca-4969-4948-bb6c-e6c0932d1249', '2024-02-15 22:51:03.984451+00', '2024-02-15 22:51:03.984451+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'ProductCategories.yml', 'cubes:
  - name: ProductCategories
    sql: SELECT * FROM public.product_categories
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', '84c89b49880214ad72dd34eb4c9aa771', '813d5960-c531-494d-9850-5384934fefc5');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('33411e81-9b70-49d4-953e-c3bf2bbbdcb2', '2024-02-15 22:51:03.984451+00', '2024-02-15 22:51:03.984451+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Products.yml', 'cubes:
  - name: Products
    sql: SELECT * FROM public.products
    joins:
      - name: Suppliers
        sql: "{CUBE}.supplier_id = {Suppliers}.id"
        relationship: belongsTo
      - name: ProductCategories
        sql: "{CUBE}.product_category_id = {ProductCategories}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
      - name: description
        sql: description
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', 'a3f0e338c7edccf7166acdf4a62fe807', '813d5960-c531-494d-9850-5384934fefc5');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('dec8648b-f84a-4d87-a6f1-894df5a9af1a', '2024-02-15 22:51:03.984451+00', '2024-02-15 22:51:03.984451+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Student.yml', 'cubes:
  - name: Student
    sql: SELECT * FROM public.student
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
    measures:
      - name: count
        type: count
', '5eafe7c98f36d7e89a40ef190201fb4e', '813d5960-c531-494d-9850-5384934fefc5');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('10b62d00-da8b-4ea2-ad4c-7427fd916699', '2024-02-15 22:51:03.984451+00', '2024-02-15 22:51:03.984451+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'StudentTeacher.yml', 'cubes:
  - name: StudentTeacher
    sql: SELECT * FROM public.student_teacher
    joins:
      - name: Student
        sql: "{CUBE}.student_id = {Student}.id"
        relationship: belongsTo
      - name: Teacher
        sql: "{CUBE}.teacher_id = {Teacher}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
    measures:
      - name: count
        type: count
', 'b30c612b2dd113b6996f8c7c053d4b95', '813d5960-c531-494d-9850-5384934fefc5');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('d8290c6d-ad9c-4fb4-ace4-752aa786dbcb', '2024-02-15 22:51:03.984451+00', '2024-02-15 22:51:03.984451+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Suppliers.yml', 'cubes:
  - name: Suppliers
    sql: SELECT * FROM public.suppliers
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: address
        sql: address
        type: string
      - name: company
        sql: company
        type: string
      - name: email
        sql: email
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', '26857fc670d0914751a10f13829fff28', '813d5960-c531-494d-9850-5384934fefc5');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('26b924ef-c128-4b86-912e-011e1d80bb30', '2024-02-15 22:51:03.984451+00', '2024-02-15 22:51:03.984451+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Teacher.yml', 'cubes:
  - name: Teacher
    sql: SELECT * FROM public.teacher
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
    measures:
      - name: count
        type: count
', '560bf0a3ad49aeaec7cb5a35965e05f9', '813d5960-c531-494d-9850-5384934fefc5');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('51d9a0a0-9aaf-4e5f-acd5-ec3e7724fdd7', '2024-02-15 22:51:03.984451+00', '2024-02-15 22:51:03.984451+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Teachers.yml', 'cubes:
  - name: Teachers
    sql: SELECT * FROM public.teachers
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: salary
        sql: salary
        type: string
      - name: firstName
        sql: first_name
        type: string
      - name: lastName
        sql: last_name
        type: string
      - name: school
        sql: school
        type: string
      - name: hireDate
        sql: hire_date
        type: time
    measures:
      - name: count
        type: count
', 'ed292830b5057b97613cdb17a7416464', '813d5960-c531-494d-9850-5384934fefc5');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('80c5abf3-3f5f-44dc-a74c-cdb0f499e700', '2024-02-15 22:51:03.984451+00', '2024-02-15 22:51:03.984451+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'TmpNewtable.yml', 'cubes:
  - name: TmpNewtable
    sql: SELECT * FROM public.tmp_newtable
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: address
        sql: address
        type: string
      - name: name
        sql: name
        type: string
      - name: email
        sql: email
        type: string
      - name: phone
        sql: phone
        type: string
    measures:
      - name: count
        type: count
', '111353e2d946fcaf3644e0cf5770b5c2', '813d5960-c531-494d-9850-5384934fefc5');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('6fb2a795-54b8-4beb-8808-b2adfc16f78f', '2024-02-15 22:51:03.984451+00', '2024-02-15 22:51:03.984451+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Users.yml', 'cubes:
  - name: Users
    sql: SELECT * FROM public.users
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: gender
        sql: gender
        type: string
      - name: firstName
        sql: first_name
        type: string
      - name: state
        sql: state
        type: string
      - name: lastName
        sql: last_name
        type: string
      - name: city
        sql: city
        type: string
      - name: company
        sql: company
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', '412df880a505c372aef064606bfb7e5a', '813d5960-c531-494d-9850-5384934fefc5');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('b113ab1e-e203-43dc-83e9-6566eb618c3f', '2024-02-15 22:51:14.766779+00', '2024-02-15 22:51:14.766779+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Companies.yml', 'cubes:
  - name: Companies
    sql: SELECT * FROM public.companies
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: email
        sql: email
        type: string
      - name: name
        sql: name
        type: string
      - name: phone
        sql: phone
        type: string
      - name: address
        sql: address
        type: string
    measures:
      - name: count
        type: count
', '73d3a69114afa1dd90fb90053fc23caf', '89bdb46a-53d1-4a98-b49d-0175bc9105a0');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('7d082b21-7d5a-495f-a29f-2e11adc503a4', '2024-02-15 22:51:14.766779+00', '2024-02-15 22:51:14.766779+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItems.yml', 'cubes:
  - name: LineItems
    sql: SELECT * FROM public.line_items
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
      - name: quantity
        sql: quantity
        type: sum
      - name: price
        sql: price
        type: sum
', 'b5603719550035b0cf93106e8c608902', '89bdb46a-53d1-4a98-b49d-0175bc9105a0');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('2e205635-7eb0-4a94-8df1-077fb358fdc6', '2024-02-15 22:51:14.766779+00', '2024-02-15 22:51:14.766779+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItemsCountByStates.yml', 'cubes:
  - name: LineItemsCountByStates
    sql: SELECT * FROM public.line_items_count_by_states
    joins: []
    dimensions:
      - name: usersState
        sql: users_state
        type: string
    measures:
      - name: count
        type: count
      - name: lineItemsCount
        sql: line_items_count
        type: sum
', '9263cb82160a4f840ff980c02213cd12', '89bdb46a-53d1-4a98-b49d-0175bc9105a0');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('ef167149-e2ad-412e-b15d-3ff02af2c962', '2024-02-15 22:51:14.766779+00', '2024-02-15 22:51:14.766779+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItemsEval.yml', 'cubes:
  - name: LineItemsEval
    sql: SELECT * FROM public.line_items_eval
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
    dimensions:
      - name: price
        sql: price
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
      - name: quantity
        sql: quantity
        type: sum
', '8cd950fef518b17f49c7850d930c45b5', '89bdb46a-53d1-4a98-b49d-0175bc9105a0');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('ee5ab3ee-6042-492f-a53c-f609ae247ecc', '2024-02-15 22:51:14.766779+00', '2024-02-15 22:51:14.766779+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItemsEval1.yml', 'cubes:
  - name: LineItemsEval1
    sql: SELECT * FROM public.line_items_eval_1
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: price
        sql: price
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
      - name: quantity
        sql: quantity
        type: sum
', 'fb89e818c1c418c3896321020ee30bcb', '89bdb46a-53d1-4a98-b49d-0175bc9105a0');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('a737f5d9-b9cf-420a-b2e2-a20fd25a729b', '2024-02-15 22:51:14.766779+00', '2024-02-15 22:51:14.766779+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItemsEval2.yml', 'cubes:
  - name: LineItemsEval2
    sql: SELECT * FROM public.line_items_eval_2
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
    dimensions:
      - name: price
        sql: price
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
      - name: quantity
        sql: quantity
        type: sum
', 'b82d9ce2bde6f8c4660fbca5f0670b90', '89bdb46a-53d1-4a98-b49d-0175bc9105a0');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('96d17118-2571-4fea-9b14-8527f1ed1cdd', '2024-02-15 22:51:14.766779+00', '2024-02-15 22:51:14.766779+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Orders.yml', 'cubes:
  - name: Orders
    sql: SELECT * FROM other.orders
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
    measures:
      - name: count
        type: count
', '0f4179b4db2b5197afe5040cf5175123', '89bdb46a-53d1-4a98-b49d-0175bc9105a0');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('4465d4b6-43fd-4717-8ca4-4e8bf4ac7881', '2024-02-15 22:51:14.766779+00', '2024-02-15 22:51:14.766779+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'OrdersEval.yml', 'cubes:
  - name: OrdersEval
    sql: SELECT * FROM public.orders_eval
    joins:
      - name: Users
        sql: "{CUBE}.user_id = {Users}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: sum
        sql: sum
        type: string
      - name: status
        sql: status
        type: string
      - name: createdAt
        sql: created_at
        type: time
      - name: completedAt
        sql: completed_at
        type: time
    measures:
      - name: count
        type: count
', 'c9ef2d7f047720ed49bc502d7c02d1ea', '89bdb46a-53d1-4a98-b49d-0175bc9105a0');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('153e9c56-75b3-4e89-8490-c4eb4885565c', '2024-02-15 22:51:14.766779+00', '2024-02-15 22:51:14.766779+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'PolyLessons.yml', 'cubes:
  - name: PolyLessons
    sql: SELECT * FROM public.poly_lessons
    joins:
      - name: Teacher
        sql: "{CUBE}.teacher_id = {Teacher}.id"
        relationship: belongsTo
      - name: Student
        sql: "{CUBE}.student_id = {Student}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
    measures:
      - name: count
        type: count
', 'd423963a68aedcfca2dbee3923f57328', '89bdb46a-53d1-4a98-b49d-0175bc9105a0');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('e8fae49c-eb5d-4d1c-bea6-8ca266ad2b31', '2024-02-15 22:51:14.766779+00', '2024-02-15 22:51:14.766779+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'PolyUsers.yml', 'cubes:
  - name: PolyUsers
    sql: SELECT * FROM public.poly_users
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: type
        sql: type
        type: string
      - name: name
        sql: name
        type: string
      - name: school
        sql: school
        type: string
    measures:
      - name: count
        type: count
', '1f178c3186c4dda2ca9029f115c04743', '89bdb46a-53d1-4a98-b49d-0175bc9105a0');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('7a784e48-3c65-4c1c-9455-ee39b861afa6', '2024-02-15 22:51:14.766779+00', '2024-02-15 22:51:14.766779+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'ProductCategories.yml', 'cubes:
  - name: ProductCategories
    sql: SELECT * FROM public.product_categories
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', '84c89b49880214ad72dd34eb4c9aa771', '89bdb46a-53d1-4a98-b49d-0175bc9105a0');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('faa0056f-7967-459c-ae69-d3bc16921c48', '2024-02-15 22:51:14.766779+00', '2024-02-15 22:51:14.766779+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Products.yml', 'cubes:
  - name: Products
    sql: SELECT * FROM public.products
    joins:
      - name: Suppliers
        sql: "{CUBE}.supplier_id = {Suppliers}.id"
        relationship: belongsTo
      - name: ProductCategories
        sql: "{CUBE}.product_category_id = {ProductCategories}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
      - name: description
        sql: description
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', 'a3f0e338c7edccf7166acdf4a62fe807', '89bdb46a-53d1-4a98-b49d-0175bc9105a0');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('52abe108-0dda-4016-8d93-1edc5a9a9db9', '2024-02-15 22:51:14.766779+00', '2024-02-15 22:51:14.766779+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Student.yml', 'cubes:
  - name: Student
    sql: SELECT * FROM public.student
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
    measures:
      - name: count
        type: count
', '5eafe7c98f36d7e89a40ef190201fb4e', '89bdb46a-53d1-4a98-b49d-0175bc9105a0');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('4feb11f8-7fe7-4a5d-ba59-315b24cdd68e', '2024-02-15 22:51:14.766779+00', '2024-02-15 22:51:14.766779+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'StudentTeacher.yml', 'cubes:
  - name: StudentTeacher
    sql: SELECT * FROM public.student_teacher
    joins:
      - name: Student
        sql: "{CUBE}.student_id = {Student}.id"
        relationship: belongsTo
      - name: Teacher
        sql: "{CUBE}.teacher_id = {Teacher}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
    measures:
      - name: count
        type: count
', 'b30c612b2dd113b6996f8c7c053d4b95', '89bdb46a-53d1-4a98-b49d-0175bc9105a0');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('b9089895-4c0c-4a76-ab90-5b97eb798106', '2024-02-15 22:51:14.766779+00', '2024-02-15 22:51:14.766779+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Suppliers.yml', 'cubes:
  - name: Suppliers
    sql: SELECT * FROM public.suppliers
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: address
        sql: address
        type: string
      - name: company
        sql: company
        type: string
      - name: email
        sql: email
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', '26857fc670d0914751a10f13829fff28', '89bdb46a-53d1-4a98-b49d-0175bc9105a0');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('891e54e0-49b8-4df9-aefb-204ea6ddd6fe', '2024-02-15 22:51:14.766779+00', '2024-02-15 22:51:14.766779+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Teacher.yml', 'cubes:
  - name: Teacher
    sql: SELECT * FROM public.teacher
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
    measures:
      - name: count
        type: count
', '560bf0a3ad49aeaec7cb5a35965e05f9', '89bdb46a-53d1-4a98-b49d-0175bc9105a0');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('0fd68e44-7700-40f3-87bf-9bf87d1e94c3', '2024-02-15 22:51:14.766779+00', '2024-02-15 22:51:14.766779+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Teachers.yml', 'cubes:
  - name: Teachers
    sql: SELECT * FROM public.teachers
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: salary
        sql: salary
        type: string
      - name: firstName
        sql: first_name
        type: string
      - name: lastName
        sql: last_name
        type: string
      - name: school
        sql: school
        type: string
      - name: hireDate
        sql: hire_date
        type: time
    measures:
      - name: count
        type: count
', 'ed292830b5057b97613cdb17a7416464', '89bdb46a-53d1-4a98-b49d-0175bc9105a0');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('e0645801-3cbd-4d8f-9d4f-e6016bf9acdf', '2024-02-15 22:51:14.766779+00', '2024-02-15 22:51:14.766779+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'TmpNewtable.yml', 'cubes:
  - name: TmpNewtable
    sql: SELECT * FROM public.tmp_newtable
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: address
        sql: address
        type: string
      - name: name
        sql: name
        type: string
      - name: email
        sql: email
        type: string
      - name: phone
        sql: phone
        type: string
    measures:
      - name: count
        type: count
', '111353e2d946fcaf3644e0cf5770b5c2', '89bdb46a-53d1-4a98-b49d-0175bc9105a0');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('8b030c83-6789-49cb-b801-4c189f8e17d3', '2024-02-15 22:51:14.766779+00', '2024-02-15 22:51:14.766779+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Users.yml', 'cubes:
  - name: Users
    sql: SELECT * FROM public.users
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: gender
        sql: gender
        type: string
      - name: firstName
        sql: first_name
        type: string
      - name: state
        sql: state
        type: string
      - name: lastName
        sql: last_name
        type: string
      - name: city
        sql: city
        type: string
      - name: company
        sql: company
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', '412df880a505c372aef064606bfb7e5a', '89bdb46a-53d1-4a98-b49d-0175bc9105a0');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('e46e9abe-4dd5-45cb-a462-416b1863d3ba', '2024-02-15 22:53:53.656866+00', '2024-02-15 22:53:53.656866+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Companies.yml', 'cubes:
  - name: Companies
    sql: SELECT * FROM public.companies
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: email
        sql: email
        type: string
      - name: name
        sql: name
        type: string
      - name: phone
        sql: phone
        type: string
      - name: address
        sql: address
        type: string
    measures:
      - name: count
        type: count
', '73d3a69114afa1dd90fb90053fc23caf', '76e900ad-a007-440a-8dd6-4cf8952e45a4');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('551e4c8d-359f-4334-834c-a309f8bbd7ff', '2024-02-15 22:53:53.656866+00', '2024-02-15 22:53:53.656866+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItems.yml', 'cubes:
  - name: LineItems
    sql: SELECT * FROM public.line_items
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
      - name: quantity
        sql: quantity
        type: sum
      - name: price
        sql: price
        type: sum
', 'b5603719550035b0cf93106e8c608902', '76e900ad-a007-440a-8dd6-4cf8952e45a4');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('2cc88b87-cef4-4e6f-85a9-cec7a3e00c79', '2024-02-15 22:53:53.656866+00', '2024-02-15 22:53:53.656866+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItemsCountByStates.yml', 'cubes:
  - name: LineItemsCountByStates
    sql: SELECT * FROM public.line_items_count_by_states
    joins: []
    dimensions:
      - name: usersState
        sql: users_state
        type: string
    measures:
      - name: count
        type: count
      - name: lineItemsCount
        sql: line_items_count
        type: sum
', '9263cb82160a4f840ff980c02213cd12', '76e900ad-a007-440a-8dd6-4cf8952e45a4');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('8cab4b55-705a-4fd6-9666-724f2dc9918b', '2024-02-15 22:53:53.656866+00', '2024-02-15 22:53:53.656866+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItemsEval.yml', 'cubes:
  - name: LineItemsEval
    sql: SELECT * FROM public.line_items_eval
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
    dimensions:
      - name: price
        sql: price
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
      - name: quantity
        sql: quantity
        type: sum
', '8cd950fef518b17f49c7850d930c45b5', '76e900ad-a007-440a-8dd6-4cf8952e45a4');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('0128cfef-51e6-48a4-901c-d4c4fcd4aaba', '2024-02-15 22:53:53.656866+00', '2024-02-15 22:53:53.656866+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItemsEval1.yml', 'cubes:
  - name: LineItemsEval1
    sql: SELECT * FROM public.line_items_eval_1
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: price
        sql: price
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
      - name: quantity
        sql: quantity
        type: sum
', 'fb89e818c1c418c3896321020ee30bcb', '76e900ad-a007-440a-8dd6-4cf8952e45a4');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('a3b36929-b390-45dd-9143-f8b8dddf2fa3', '2024-02-15 22:53:53.656866+00', '2024-02-15 22:53:53.656866+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItemsEval2.yml', 'cubes:
  - name: LineItemsEval2
    sql: SELECT * FROM public.line_items_eval_2
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
    dimensions:
      - name: price
        sql: price
        type: string
      - name: orderId
        sql: order_id
        type: string
        primaryKey: true
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
      - name: quantity
        sql: quantity
        type: sum
', '4f94844a31cb9d28c819c04a5f437336', '76e900ad-a007-440a-8dd6-4cf8952e45a4');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('41f89aef-cbc1-44a9-a5b5-c1bd88be4300', '2024-02-15 22:53:53.656866+00', '2024-02-15 22:53:53.656866+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Orders.yml', 'cubes:
  - name: Orders
    sql: SELECT * FROM other.orders
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
    measures:
      - name: count
        type: count
', '0f4179b4db2b5197afe5040cf5175123', '76e900ad-a007-440a-8dd6-4cf8952e45a4');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('199c3b97-0120-45dd-b1fe-5a3fe3b139ef', '2024-02-15 22:53:53.656866+00', '2024-02-15 22:53:53.656866+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'OrdersEval.yml', 'cubes:
  - name: OrdersEval
    sql: SELECT * FROM public.orders_eval
    joins:
      - name: Users
        sql: "{CUBE}.user_id = {Users}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: sum
        sql: sum
        type: string
      - name: status
        sql: status
        type: string
      - name: createdAt
        sql: created_at
        type: time
      - name: completedAt
        sql: completed_at
        type: time
    measures:
      - name: count
        type: count
', 'c9ef2d7f047720ed49bc502d7c02d1ea', '76e900ad-a007-440a-8dd6-4cf8952e45a4');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('bba09a97-43c8-4a58-ae98-9b493a7e62c0', '2024-02-15 22:53:53.656866+00', '2024-02-15 22:53:53.656866+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'PolyLessons.yml', 'cubes:
  - name: PolyLessons
    sql: SELECT * FROM public.poly_lessons
    joins:
      - name: Teacher
        sql: "{CUBE}.teacher_id = {Teacher}.id"
        relationship: belongsTo
      - name: Student
        sql: "{CUBE}.student_id = {Student}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
    measures:
      - name: count
        type: count
', 'd423963a68aedcfca2dbee3923f57328', '76e900ad-a007-440a-8dd6-4cf8952e45a4');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('7e96a5c3-df9d-4e43-b16f-b070da39699c', '2024-02-15 22:53:53.656866+00', '2024-02-15 22:53:53.656866+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'PolyUsers.yml', 'cubes:
  - name: PolyUsers
    sql: SELECT * FROM public.poly_users
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: type
        sql: type
        type: string
      - name: name
        sql: name
        type: string
      - name: school
        sql: school
        type: string
    measures:
      - name: count
        type: count
', '1f178c3186c4dda2ca9029f115c04743', '76e900ad-a007-440a-8dd6-4cf8952e45a4');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('995becb8-4874-44c9-b7bc-91018c858773', '2024-02-15 22:53:53.656866+00', '2024-02-15 22:53:53.656866+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'ProductCategories.yml', 'cubes:
  - name: ProductCategories
    sql: SELECT * FROM public.product_categories
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', '84c89b49880214ad72dd34eb4c9aa771', '76e900ad-a007-440a-8dd6-4cf8952e45a4');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('9fabf5dc-c9c6-4737-9f44-939a36a6427b', '2024-02-15 22:53:53.656866+00', '2024-02-15 22:53:53.656866+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Products.yml', 'cubes:
  - name: Products
    sql: SELECT * FROM public.products
    joins:
      - name: Suppliers
        sql: "{CUBE}.supplier_id = {Suppliers}.id"
        relationship: belongsTo
      - name: ProductCategories
        sql: "{CUBE}.product_category_id = {ProductCategories}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
      - name: description
        sql: description
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', 'a3f0e338c7edccf7166acdf4a62fe807', '76e900ad-a007-440a-8dd6-4cf8952e45a4');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('06b5ea07-b010-43da-8d0d-095902c6bd99', '2024-02-15 22:53:53.656866+00', '2024-02-15 22:53:53.656866+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Student.yml', 'cubes:
  - name: Student
    sql: SELECT * FROM public.student
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
    measures:
      - name: count
        type: count
', '5eafe7c98f36d7e89a40ef190201fb4e', '76e900ad-a007-440a-8dd6-4cf8952e45a4');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('95658344-39df-4a4e-b7b3-280b7bbe07fa', '2024-02-15 22:53:53.656866+00', '2024-02-15 22:53:53.656866+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'StudentTeacher.yml', 'cubes:
  - name: StudentTeacher
    sql: SELECT * FROM public.student_teacher
    joins:
      - name: Student
        sql: "{CUBE}.student_id = {Student}.id"
        relationship: belongsTo
      - name: Teacher
        sql: "{CUBE}.teacher_id = {Teacher}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
    measures:
      - name: count
        type: count
', 'b30c612b2dd113b6996f8c7c053d4b95', '76e900ad-a007-440a-8dd6-4cf8952e45a4');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('676862d4-d07b-455b-8fe9-43d6ad66c9ca', '2024-02-15 22:53:53.656866+00', '2024-02-15 22:53:53.656866+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Suppliers.yml', 'cubes:
  - name: Suppliers
    sql: SELECT * FROM public.suppliers
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: address
        sql: address
        type: string
      - name: company
        sql: company
        type: string
      - name: email
        sql: email
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', '26857fc670d0914751a10f13829fff28', '76e900ad-a007-440a-8dd6-4cf8952e45a4');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('a3b23075-0ade-498e-b3b5-5954b754140f', '2024-02-15 22:53:53.656866+00', '2024-02-15 22:53:53.656866+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Teacher.yml', 'cubes:
  - name: Teacher
    sql: SELECT * FROM public.teacher
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
    measures:
      - name: count
        type: count
', '560bf0a3ad49aeaec7cb5a35965e05f9', '76e900ad-a007-440a-8dd6-4cf8952e45a4');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('c1144b77-eb85-4b92-be53-c3c8c1bc5eb4', '2024-02-15 22:53:53.656866+00', '2024-02-15 22:53:53.656866+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Teachers.yml', 'cubes:
  - name: Teachers
    sql: SELECT * FROM public.teachers
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: salary
        sql: salary
        type: string
      - name: firstName
        sql: first_name
        type: string
      - name: lastName
        sql: last_name
        type: string
      - name: school
        sql: school
        type: string
      - name: hireDate
        sql: hire_date
        type: time
    measures:
      - name: count
        type: count
', 'ed292830b5057b97613cdb17a7416464', '76e900ad-a007-440a-8dd6-4cf8952e45a4');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('0394bab9-22f0-4a14-8296-68d85b7fa46c', '2024-02-15 22:53:53.656866+00', '2024-02-15 22:53:53.656866+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'TmpNewtable.yml', 'cubes:
  - name: TmpNewtable
    sql: SELECT * FROM public.tmp_newtable
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: address
        sql: address
        type: string
      - name: name
        sql: name
        type: string
      - name: email
        sql: email
        type: string
      - name: phone
        sql: phone
        type: string
    measures:
      - name: count
        type: count
', '111353e2d946fcaf3644e0cf5770b5c2', '76e900ad-a007-440a-8dd6-4cf8952e45a4');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('e84361e3-54e6-4055-8442-166b06044376', '2024-02-15 22:53:53.656866+00', '2024-02-15 22:53:53.656866+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Users.yml', 'cubes:
  - name: Users
    sql: SELECT * FROM public.users
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: gender
        sql: gender
        type: string
      - name: firstName
        sql: first_name
        type: string
      - name: state
        sql: state
        type: string
      - name: lastName
        sql: last_name
        type: string
      - name: city
        sql: city
        type: string
      - name: company
        sql: company
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', '412df880a505c372aef064606bfb7e5a', '76e900ad-a007-440a-8dd6-4cf8952e45a4');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('f4e0d259-a0ba-4010-beaf-1642909c1ae6', '2024-02-15 22:54:44.919089+00', '2024-02-15 22:54:44.919089+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Companies.yml', 'cubes:
  - name: Companies
    sql: SELECT * FROM public.companies
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: email
        sql: email
        type: string
      - name: name
        sql: name
        type: string
      - name: phone
        sql: phone
        type: string
      - name: address
        sql: address
        type: string
    measures:
      - name: count
        type: count
', '73d3a69114afa1dd90fb90053fc23caf', '665de544-e30d-4769-8073-5d65fd2d03b6');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('fbbb3dfa-ed00-4169-a723-447d8a7bf0c6', '2024-02-15 22:54:44.919089+00', '2024-02-15 22:54:44.919089+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItems.yml', 'cubes:
  - name: LineItems
    sql: SELECT * FROM public.line_items
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
      - name: quantity
        sql: quantity
        type: sum
      - name: price
        sql: price
        type: sum
', 'b5603719550035b0cf93106e8c608902', '665de544-e30d-4769-8073-5d65fd2d03b6');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('3be3a8bb-db52-4eef-b337-f649b565c089', '2024-02-15 22:54:44.919089+00', '2024-02-15 22:54:44.919089+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItemsCountByStates.yml', 'cubes:
  - name: LineItemsCountByStates
    sql: SELECT * FROM public.line_items_count_by_states
    joins: []
    dimensions:
      - name: usersState
        sql: users_state
        type: string
    measures:
      - name: count
        type: count
      - name: lineItemsCount
        sql: line_items_count
        type: sum
', '9263cb82160a4f840ff980c02213cd12', '665de544-e30d-4769-8073-5d65fd2d03b6');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('5e1cae3a-9348-4a33-852a-5150bfba6962', '2024-02-15 22:54:44.919089+00', '2024-02-15 22:54:44.919089+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItemsEval.yml', 'cubes:
  - name: LineItemsEval
    sql: SELECT * FROM public.line_items_eval
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
    dimensions:
      - name: price
        sql: price
        type: string
      - name: orderId
        sql: order_id
        type: string
        primaryKey: true
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
      - name: quantity
        sql: quantity
        type: sum
', '5c19200404acc9f87699f2a1ead28a9d', '665de544-e30d-4769-8073-5d65fd2d03b6');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('3b8dcef5-218e-4c0f-85ca-1ac78a76b8ed', '2024-02-15 22:54:44.919089+00', '2024-02-15 22:54:44.919089+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItemsEval1.yml', 'cubes:
  - name: LineItemsEval1
    sql: SELECT * FROM public.line_items_eval_1
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: price
        sql: price
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
      - name: quantity
        sql: quantity
        type: sum
', 'fb89e818c1c418c3896321020ee30bcb', '665de544-e30d-4769-8073-5d65fd2d03b6');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('6636e9c0-a183-4bd7-ad11-1c0d02a955ba', '2024-02-15 22:54:44.919089+00', '2024-02-15 22:54:44.919089+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'LineItemsEval2.yml', 'cubes:
  - name: LineItemsEval2
    sql: SELECT * FROM public.line_items_eval_2
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
    dimensions:
      - name: price
        sql: price
        type: string
      - name: orderId
        sql: order_id
        type: string
        primaryKey: true
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
      - name: quantity
        sql: quantity
        type: sum
', '4f94844a31cb9d28c819c04a5f437336', '665de544-e30d-4769-8073-5d65fd2d03b6');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('45cc5636-5fdf-4943-997e-c44856dc88d1', '2024-02-15 22:54:44.919089+00', '2024-02-15 22:54:44.919089+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Orders.yml', 'cubes:
  - name: Orders
    sql: SELECT * FROM other.orders
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
    measures:
      - name: count
        type: count
', '0f4179b4db2b5197afe5040cf5175123', '665de544-e30d-4769-8073-5d65fd2d03b6');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('398d2a23-d9af-4087-9b5f-cea0dff87c00', '2024-02-15 22:54:44.919089+00', '2024-02-15 22:54:44.919089+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'OrdersEval.yml', 'cubes:
  - name: OrdersEval
    sql: SELECT * FROM public.orders_eval
    joins:
      - name: Users
        sql: "{CUBE}.user_id = {Users}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: sum
        sql: sum
        type: string
      - name: status
        sql: status
        type: string
      - name: createdAt
        sql: created_at
        type: time
      - name: completedAt
        sql: completed_at
        type: time
    measures:
      - name: count
        type: count
', 'c9ef2d7f047720ed49bc502d7c02d1ea', '665de544-e30d-4769-8073-5d65fd2d03b6');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('8450995d-0290-4f09-b455-bcecaef0fe0c', '2024-02-15 22:54:44.919089+00', '2024-02-15 22:54:44.919089+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'PolyLessons.yml', 'cubes:
  - name: PolyLessons
    sql: SELECT * FROM public.poly_lessons
    joins:
      - name: Teacher
        sql: "{CUBE}.teacher_id = {Teacher}.id"
        relationship: belongsTo
      - name: Student
        sql: "{CUBE}.student_id = {Student}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
    measures:
      - name: count
        type: count
', 'd423963a68aedcfca2dbee3923f57328', '665de544-e30d-4769-8073-5d65fd2d03b6');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('7891e7a6-7f19-4898-aca5-5ee95b2f8967', '2024-02-15 22:54:44.919089+00', '2024-02-15 22:54:44.919089+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'PolyUsers.yml', 'cubes:
  - name: PolyUsers
    sql: SELECT * FROM public.poly_users
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: type
        sql: type
        type: string
      - name: name
        sql: name
        type: string
      - name: school
        sql: school
        type: string
    measures:
      - name: count
        type: count
', '1f178c3186c4dda2ca9029f115c04743', '665de544-e30d-4769-8073-5d65fd2d03b6');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('f4df5ce9-a2db-4f4c-88a0-0eaef92c9ed6', '2024-02-15 22:54:44.919089+00', '2024-02-15 22:54:44.919089+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'ProductCategories.yml', 'cubes:
  - name: ProductCategories
    sql: SELECT * FROM public.product_categories
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', '84c89b49880214ad72dd34eb4c9aa771', '665de544-e30d-4769-8073-5d65fd2d03b6');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('3d10c98b-625e-4023-89bc-52d61ddfd8ac', '2024-02-15 22:54:44.919089+00', '2024-02-15 22:54:44.919089+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Products.yml', 'cubes:
  - name: Products
    sql: SELECT * FROM public.products
    joins:
      - name: Suppliers
        sql: "{CUBE}.supplier_id = {Suppliers}.id"
        relationship: belongsTo
      - name: ProductCategories
        sql: "{CUBE}.product_category_id = {ProductCategories}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
      - name: description
        sql: description
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', 'a3f0e338c7edccf7166acdf4a62fe807', '665de544-e30d-4769-8073-5d65fd2d03b6');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('86810b9d-5955-45fa-b604-ed2e967ff807', '2024-02-15 22:54:44.919089+00', '2024-02-15 22:54:44.919089+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Student.yml', 'cubes:
  - name: Student
    sql: SELECT * FROM public.student
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
    measures:
      - name: count
        type: count
', '5eafe7c98f36d7e89a40ef190201fb4e', '665de544-e30d-4769-8073-5d65fd2d03b6');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('10cf1178-0800-4aef-8f5f-e52ad1446c61', '2024-02-15 22:54:44.919089+00', '2024-02-15 22:54:44.919089+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'StudentTeacher.yml', 'cubes:
  - name: StudentTeacher
    sql: SELECT * FROM public.student_teacher
    joins:
      - name: Student
        sql: "{CUBE}.student_id = {Student}.id"
        relationship: belongsTo
      - name: Teacher
        sql: "{CUBE}.teacher_id = {Teacher}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
    measures:
      - name: count
        type: count
', 'b30c612b2dd113b6996f8c7c053d4b95', '665de544-e30d-4769-8073-5d65fd2d03b6');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('8fa5ffa1-5f37-4da8-a303-5196dba5368f', '2024-02-15 22:54:44.919089+00', '2024-02-15 22:54:44.919089+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Suppliers.yml', 'cubes:
  - name: Suppliers
    sql: SELECT * FROM public.suppliers
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: address
        sql: address
        type: string
      - name: company
        sql: company
        type: string
      - name: email
        sql: email
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', '26857fc670d0914751a10f13829fff28', '665de544-e30d-4769-8073-5d65fd2d03b6');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('c8bb8d3e-c577-4787-a853-92f42cd866bf', '2024-02-15 22:54:44.919089+00', '2024-02-15 22:54:44.919089+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Teacher.yml', 'cubes:
  - name: Teacher
    sql: SELECT * FROM public.teacher
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: name
        sql: name
        type: string
    measures:
      - name: count
        type: count
', '560bf0a3ad49aeaec7cb5a35965e05f9', '665de544-e30d-4769-8073-5d65fd2d03b6');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('e86da650-eb04-4b9b-902c-3a23b97a5db5', '2024-02-15 22:54:44.919089+00', '2024-02-15 22:54:44.919089+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Teachers.yml', 'cubes:
  - name: Teachers
    sql: SELECT * FROM public.teachers
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: salary
        sql: salary
        type: string
      - name: firstName
        sql: first_name
        type: string
      - name: lastName
        sql: last_name
        type: string
      - name: school
        sql: school
        type: string
      - name: hireDate
        sql: hire_date
        type: time
    measures:
      - name: count
        type: count
', 'ed292830b5057b97613cdb17a7416464', '665de544-e30d-4769-8073-5d65fd2d03b6');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('ac018827-70bd-4fd6-8fd0-1569098977ab', '2024-02-15 22:54:44.919089+00', '2024-02-15 22:54:44.919089+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'TmpNewtable.yml', 'cubes:
  - name: TmpNewtable
    sql: SELECT * FROM public.tmp_newtable
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: address
        sql: address
        type: string
      - name: name
        sql: name
        type: string
      - name: email
        sql: email
        type: string
      - name: phone
        sql: phone
        type: string
    measures:
      - name: count
        type: count
', '111353e2d946fcaf3644e0cf5770b5c2', '665de544-e30d-4769-8073-5d65fd2d03b6');
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('e12aa956-a793-40ad-8d2f-d354dbd6d472', '2024-02-15 22:54:44.919089+00', '2024-02-15 22:54:44.919089+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '17bbf032-2e25-4b17-aa61-1d3db0a99d57', 'Users.yml', 'cubes:
  - name: Users
    sql: SELECT * FROM public.users
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: gender
        sql: gender
        type: string
      - name: firstName
        sql: first_name
        type: string
      - name: state
        sql: state
        type: string
      - name: lastName
        sql: last_name
        type: string
      - name: city
        sql: city
        type: string
      - name: company
        sql: company
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', '412df880a505c372aef064606bfb7e5a', '665de544-e30d-4769-8073-5d65fd2d03b6');
INSERT INTO public.members (id, created_at, updated_at, user_id, team_id) VALUES ('4eb5d9f8-d1b0-40a9-ae5c-d85743ba62c3', '2024-02-15 22:46:43.921517+00', '2024-02-15 22:46:43.921517+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '02db13fa-37ad-4a15-a237-e4a9f400797a');
INSERT INTO public.member_roles (id, member_id, team_role, access_list_id, created_at, updated_at) VALUES ('96267609-4fc2-464c-86cc-4d31546436cd', '4eb5d9f8-d1b0-40a9-ae5c-d85743ba62c3', 'owner', NULL, '2024-02-15 23:06:43.096277+00', '2024-02-15 23:06:43.096277+00');