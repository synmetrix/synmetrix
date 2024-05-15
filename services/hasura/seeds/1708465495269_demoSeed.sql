SET check_function_bodies = false;
INSERT INTO public.users (id, created_at, updated_at, display_name, avatar_url) VALUES ('bd254cd6-ada3-4803-88ec-a47749459169', '2024-02-15 22:46:43.475355+00', '2024-02-15 22:46:43.475355+00', 'demo@synmetrix.org', NULL) ON CONFLICT DO NOTHING;
INSERT INTO auth.accounts (id, created_at, updated_at, user_id, active, email, new_email, password_hash, default_role, is_anonymous, custom_register_data, otp_secret, mfa_enabled, ticket, ticket_expires_at) VALUES ('aa5bcd9a-d827-4031-8a26-05b01a4145d6', '2024-02-15 22:46:43.475355+00', '2024-02-15 22:46:43.475355+00', 'bd254cd6-ada3-4803-88ec-a47749459169', true, 'demo@synmetrix.org', NULL, '$2a$10$GUjaAaECotHVnd3UKFqmjerLzwtLQ.7Wov3l4dIAsFlBm8d0DFA4q', 'user', false, NULL, NULL, false, 'a91f003d-499b-416e-aa2d-00668e5c57d9', '2024-02-15 23:46:43.354+00') ON CONFLICT DO NOTHING;
INSERT INTO public.teams (id, name, created_at, updated_at, user_id) VALUES ('02db13fa-37ad-4a15-a237-e4a9f400797a', 'Default team', '2024-02-15 22:46:43.914448+00', '2024-02-15 22:46:43.914448+00', 'bd254cd6-ada3-4803-88ec-a47749459169') ON CONFLICT DO NOTHING;
INSERT INTO public.datasources (id, created_at, updated_at, user_id, name, db_type, db_params, team_id) VALUES ('715dfae1-1044-42ec-ac48-dd4cefa567e6', '2024-02-15 22:47:00.593649+00', '2024-02-15 22:47:00.593649+00', 'bd254cd6-ada3-4803-88ec-a47749459169', 'gh-api.clickhouse.tech', 'CLICKHOUSE', '{"ssl": true, "host": "gh-api.clickhouse.tech", "port": "443", "user": "play", "database": "default"}', '02db13fa-37ad-4a15-a237-e4a9f400797a') ON CONFLICT DO NOTHING;
INSERT INTO public.datasources (id, created_at, updated_at, user_id, name, db_type, db_params, team_id) VALUES ('f9401258-4630-4005-8d47-1a682ae94cf3', '2024-02-20 20:50:58.78422+00', '2024-02-20 20:50:58.78422+00', 'bd254cd6-ada3-4803-88ec-a47749459169', 'demo-db-examples.cube.dev', 'POSTGRES', '{"host": "demo-db-examples.cube.dev", "port": "5432", "user": "cube", "database": "ecom", "password": "12345"}', '02db13fa-37ad-4a15-a237-e4a9f400797a') ON CONFLICT DO NOTHING;
INSERT INTO public.branches (id, created_at, updated_at, name, user_id, datasource_id, status) VALUES ('ad1cec32-dfd4-4b5c-9bad-5f18b4ec2048', '2024-02-15 22:47:00.593649+00', '2024-02-15 22:47:00.593649+00', 'main', 'bd254cd6-ada3-4803-88ec-a47749459169', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'active') ON CONFLICT DO NOTHING;
INSERT INTO public.branches (id, created_at, updated_at, name, user_id, datasource_id, status) VALUES ('4709c40a-9c6f-4b7d-ab41-c1f9c003975f', '2024-02-20 20:50:58.78422+00', '2024-02-20 20:50:58.78422+00', 'main', 'bd254cd6-ada3-4803-88ec-a47749459169', 'f9401258-4630-4005-8d47-1a682ae94cf3', 'active') ON CONFLICT DO NOTHING;
INSERT INTO public.versions (id, created_at, updated_at, branch_id, checksum, user_id, markdown_doc) VALUES ('cb87a34d-87e6-45b7-9339-248c18d951e8', '2024-02-15 22:47:16.524155+00', '2024-02-15 22:47:16.524155+00', 'ad1cec32-dfd4-4b5c-9bad-5f18b4ec2048', '31a27e596010ad20174355b37d07ce2d', 'bd254cd6-ada3-4803-88ec-a47749459169', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.versions (id, created_at, updated_at, branch_id, checksum, user_id, markdown_doc) VALUES ('3c0301b4-6735-40d7-b4cc-0bfe5221d4c8', '2024-02-15 22:47:42.855225+00', '2024-02-15 22:47:45.816942+00', 'ad1cec32-dfd4-4b5c-9bad-5f18b4ec2048', '6c8159b836f2ce61976d6dd980de20fb', 'bd254cd6-ada3-4803-88ec-a47749459169', '#  Documentation [EMPTY BECUSE OF SEEDS] do regenerate') ON CONFLICT DO NOTHING;
INSERT INTO public.versions (id, created_at, updated_at, branch_id, checksum, user_id, markdown_doc) VALUES ('8ac5b66e-aca9-4845-b009-74127cbb6c00', '2024-02-20 20:51:08.458633+00', '2024-02-20 20:51:09.855315+00', '4709c40a-9c6f-4b7d-ab41-c1f9c003975f', 'a3aa4c400773b0e8ce899590065689d8', 'bd254cd6-ada3-4803-88ec-a47749459169', '#  Documentation [EMPTY BECUSE OF SEEDS] do regenerate') ON CONFLICT DO NOTHING;
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
', '11f01ee06eeaf53edab9daf7811c3881', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '75737ff54c8e62d349602e79b9a485b6', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '1aaf9f6c24ee00568bcc6c47f85b7578', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '34e36dcec45c7df50920e3af1d1125ed', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '7bd5f2968cfd7aa99445b37dfb05f9ce', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '02db08669f39207c3f76720666a85cf2', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '9a2ecd92b3912cf5a4ac6179a1849b6e', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '3e6a62263ad4013584429965ade60b33', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '1d3380292f8866e8108e79e196873ecf', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '00a86bc2f4f0268997ad7633f99106e8', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '5a642ab8f44bf184acd8cab90e54b6f2', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', 'a58195bfe680b54f8553fb440265b449', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '2e2e3f2a10bfaf95d36af9274ce29c64', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '86bbe159793194e2dea6cfbc794ccd5f', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '07729fbd31aa77f3f936a984bf26cf4c', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', 'f351431b56729fad3eba0471cc5abb30', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '6ddc72b22c3c4b7192d180ea13fe6bfb', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '127b5405a42f0c6ccb22d18e79a3eec8', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', 'edba9681261e654d56cb73f45f19f247', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '2c70543cac84d0a370c9cacd13ec16d7', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', 'fa78c182f3202af811e410b9423d5712', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '04a00da22fae4388f1f81202d399586f', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '1b960c9022af1256574265c038b16259', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '6af3f540465dd612f67d6ca3ef2a8d6c', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', 'eb1504a128adb6f144c2ec4e4ce98d06', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', 'fd9d810a4f7a0608aeef7fe3643e1e86', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '61ceac55ec579fbe707a87acfe963bf2', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '9d8c5b2b5f356568712991bff203b5af', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '5c9cd10e0e56fd6e451c880c6eb220e7', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', 'f8b9d3420f4852355ce97d1a44957773', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', 'b9abbe6bcc60c457035e1fb03fb1b28a', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '59307913db8b2d273c76f85db0e8c84f', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '39c4b6c22c2be1d2b89511e4279472b5', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '7637132852dacb8dd423af59e3a24f56', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '10043a50dd0509fb285c29ac687876cc', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', 'f04c5b91366614f628c6b6e886cd89ca', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', 'e045e5b18963fc37e05a9552bac70f80', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', 'a93523aa639f35cc3dbed26e0e98a916', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', 'b9d57542e6f1de2522ce733e85d76cd6', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', 'f351431b56729fad3eba0471cc5abb30', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '55a8fc5ab8d50258bf51ecb56cd43e8e', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', 'dc200014dfa9994fdbfb4fa6b40362f6', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '0781834c1d8b0364fcd3f74b428287d0', 'cb87a34d-87e6-45b7-9339-248c18d951e8') ON CONFLICT DO NOTHING;
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
', '11f01ee06eeaf53edab9daf7811c3881', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '75737ff54c8e62d349602e79b9a485b6', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '1aaf9f6c24ee00568bcc6c47f85b7578', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '34e36dcec45c7df50920e3af1d1125ed', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '127b5405a42f0c6ccb22d18e79a3eec8', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', 'edba9681261e654d56cb73f45f19f247', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '7bd5f2968cfd7aa99445b37dfb05f9ce', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '02db08669f39207c3f76720666a85cf2', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '9a2ecd92b3912cf5a4ac6179a1849b6e', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '3e6a62263ad4013584429965ade60b33', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '00a86bc2f4f0268997ad7633f99106e8', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '1d3380292f8866e8108e79e196873ecf', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '5a642ab8f44bf184acd8cab90e54b6f2', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', 'a58195bfe680b54f8553fb440265b449', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '86bbe159793194e2dea6cfbc794ccd5f', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '07729fbd31aa77f3f936a984bf26cf4c', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '6ddc72b22c3c4b7192d180ea13fe6bfb', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '2e2e3f2a10bfaf95d36af9274ce29c64', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '2c70543cac84d0a370c9cacd13ec16d7', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', 'fa78c182f3202af811e410b9423d5712', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '1b960c9022af1256574265c038b16259', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', 'eb1504a128adb6f144c2ec4e4ce98d06', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '04a00da22fae4388f1f81202d399586f', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', 'fd9d810a4f7a0608aeef7fe3643e1e86', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '61ceac55ec579fbe707a87acfe963bf2', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', 'a93523aa639f35cc3dbed26e0e98a916', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '9d8c5b2b5f356568712991bff203b5af', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '5c9cd10e0e56fd6e451c880c6eb220e7', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', 'f8b9d3420f4852355ce97d1a44957773', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', 'b9abbe6bcc60c457035e1fb03fb1b28a', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '59307913db8b2d273c76f85db0e8c84f', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '7637132852dacb8dd423af59e3a24f56', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '39c4b6c22c2be1d2b89511e4279472b5', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '10043a50dd0509fb285c29ac687876cc', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', 'f04c5b91366614f628c6b6e886cd89ca', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', 'e045e5b18963fc37e05a9552bac70f80', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '55a8fc5ab8d50258bf51ecb56cd43e8e', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', 'b9d57542e6f1de2522ce733e85d76cd6', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', 'dc200014dfa9994fdbfb4fa6b40362f6', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
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
', '0781834c1d8b0364fcd3f74b428287d0', '3c0301b4-6735-40d7-b4cc-0bfe5221d4c8') ON CONFLICT DO NOTHING;
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('01571fc2-55d2-41f2-832f-6d8f11bbd8f7', '2024-02-20 20:51:08.458633+00', '2024-02-20 20:51:08.458633+00', 'bd254cd6-ada3-4803-88ec-a47749459169', 'f9401258-4630-4005-8d47-1a682ae94cf3', 'ActiveWorkspaceDetails.yml', 'cubes:
  - name: ActiveWorkspaceDetails
    sql: SELECT * FROM public.active_workspace_details
    joins: []
    dimensions:
      - name: isActive
        sql: is_active
        type: string
      - name: reportingDay
        sql: reporting_day
        type: time
    measures:
      - name: count
        type: count
', 'bf9e07886a75f3a9cd62a33818150acd', '8ac5b66e-aca9-4845-b009-74127cbb6c00') ON CONFLICT DO NOTHING;
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('98f9d2c5-cedc-4258-9adf-6be049449351', '2024-02-20 20:51:08.458633+00', '2024-02-20 20:51:08.458633+00', 'bd254cd6-ada3-4803-88ec-a47749459169', 'f9401258-4630-4005-8d47-1a682ae94cf3', 'LineItems.yml', 'cubes:
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
      - name: price
        sql: price
        type: sum
      - name: quantity
        sql: quantity
        type: sum
', '05c5029567d685b727c83787848a665d', '8ac5b66e-aca9-4845-b009-74127cbb6c00') ON CONFLICT DO NOTHING;
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('5024b010-f8a0-444b-868b-75a129ff0686', '2024-02-20 20:51:08.458633+00', '2024-02-20 20:51:08.458633+00', 'bd254cd6-ada3-4803-88ec-a47749459169', 'f9401258-4630-4005-8d47-1a682ae94cf3', 'LineItemsCopy.yml', 'cubes:
  - name: LineItemsCopy
    sql: SELECT * FROM public.line_items_copy
    joins:
      - name: Orders
        sql: "{CUBE}.order_id = {Orders}.id"
        relationship: belongsTo
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
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
', '65c76b9ab9ce89c1fcb3d24f6a3645c5', '8ac5b66e-aca9-4845-b009-74127cbb6c00') ON CONFLICT DO NOTHING;
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('59cf349c-3e86-4cae-bdd5-84ef01b5150c', '2024-02-20 20:51:08.458633+00', '2024-02-20 20:51:08.458633+00', 'bd254cd6-ada3-4803-88ec-a47749459169', 'f9401258-4630-4005-8d47-1a682ae94cf3', 'Orders.yml', 'cubes:
  - name: Orders
    sql: SELECT * FROM public.orders
    joins:
      - name: Users
        sql: "{CUBE}.user_id = {Users}.id"
        relationship: belongsTo
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
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
      - name: number
        sql: number
        type: sum
', '58a373cf050e7154f4a0e4d4c83a11c4', '8ac5b66e-aca9-4845-b009-74127cbb6c00') ON CONFLICT DO NOTHING;
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('166125ae-d69b-46b9-bcff-e5fa2171a095', '2024-02-20 20:51:08.458633+00', '2024-02-20 20:51:08.458633+00', 'bd254cd6-ada3-4803-88ec-a47749459169', 'f9401258-4630-4005-8d47-1a682ae94cf3', 'OrdersCopy.yml', 'cubes:
  - name: OrdersCopy
    sql: SELECT * FROM public.orders_copy
    joins:
      - name: Products
        sql: "{CUBE}.product_id = {Products}.id"
        relationship: belongsTo
      - name: Users
        sql: "{CUBE}.user_id = {Users}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
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
      - name: number
        sql: number
        type: sum
', '8be5c63c91b76324c0e9dd6615632037', '8ac5b66e-aca9-4845-b009-74127cbb6c00') ON CONFLICT DO NOTHING;
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('1ce4212d-072c-45cf-a6ed-f9904dbd6674', '2024-02-20 20:51:08.458633+00', '2024-02-20 20:51:08.458633+00', 'bd254cd6-ada3-4803-88ec-a47749459169', 'f9401258-4630-4005-8d47-1a682ae94cf3', 'ProductCategories.yml', 'cubes:
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
', '84c89b49880214ad72dd34eb4c9aa771', '8ac5b66e-aca9-4845-b009-74127cbb6c00') ON CONFLICT DO NOTHING;
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('fe14627c-3b89-45a2-8328-b0209636fc1a', '2024-02-20 20:51:08.458633+00', '2024-02-20 20:51:08.458633+00', 'bd254cd6-ada3-4803-88ec-a47749459169', 'f9401258-4630-4005-8d47-1a682ae94cf3', 'Products.yml', 'cubes:
  - name: Products
    sql: SELECT * FROM public.products
    joins:
      - name: ProductCategories
        sql: "{CUBE}.product_category_id = {ProductCategories}.id"
        relationship: belongsTo
      - name: Suppliers
        sql: "{CUBE}.supplier_id = {Suppliers}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: description
        sql: description
        type: string
      - name: name
        sql: name
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', '12bb21403a3499a03348264675ae4e2a', '8ac5b66e-aca9-4845-b009-74127cbb6c00') ON CONFLICT DO NOTHING;
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('a397e28d-a595-47d2-b912-daf70acbe758', '2024-02-20 20:51:08.458633+00', '2024-02-20 20:51:08.458633+00', 'bd254cd6-ada3-4803-88ec-a47749459169', 'f9401258-4630-4005-8d47-1a682ae94cf3', 'ProductsCopy.yml', 'cubes:
  - name: ProductsCopy
    sql: SELECT * FROM public.products_copy
    joins:
      - name: ProductCategories
        sql: "{CUBE}.product_category_id = {ProductCategories}.id"
        relationship: belongsTo
      - name: Suppliers
        sql: "{CUBE}.supplier_id = {Suppliers}.id"
        relationship: belongsTo
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: description
        sql: description
        type: string
      - name: name
        sql: name
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', 'd67fc47e2e9bd4efda0a2cc9974a0431', '8ac5b66e-aca9-4845-b009-74127cbb6c00') ON CONFLICT DO NOTHING;
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('beb66bd7-f5fb-418f-82dd-bd0a6302da0d', '2024-02-20 20:51:08.458633+00', '2024-02-20 20:51:08.458633+00', 'bd254cd6-ada3-4803-88ec-a47749459169', 'f9401258-4630-4005-8d47-1a682ae94cf3', 'Suppliers.yml', 'cubes:
  - name: Suppliers
    sql: SELECT * FROM public.suppliers
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: company
        sql: company
        type: string
      - name: address
        sql: address
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
', '7028133b0987608515999afbb809adf3', '8ac5b66e-aca9-4845-b009-74127cbb6c00') ON CONFLICT DO NOTHING;
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('251ba10b-72c4-4332-bcb4-3d5ef08c3d3d', '2024-02-20 20:51:08.458633+00', '2024-02-20 20:51:08.458633+00', 'bd254cd6-ada3-4803-88ec-a47749459169', 'f9401258-4630-4005-8d47-1a682ae94cf3', 'Users.yml', 'cubes:
  - name: Users
    sql: SELECT * FROM public.users
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: state
        sql: state
        type: string
      - name: company
        sql: company
        type: string
      - name: gender
        sql: gender
        type: string
      - name: city
        sql: city
        type: string
      - name: firstName
        sql: first_name
        type: string
      - name: lastName
        sql: last_name
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', '1e922cfb06cb09962c71b544a4f495a5', '8ac5b66e-aca9-4845-b009-74127cbb6c00') ON CONFLICT DO NOTHING;
INSERT INTO public.dataschemas (id, created_at, updated_at, user_id, datasource_id, name, code, checksum, version_id) VALUES ('6a27e466-70d9-45c1-932d-0c8f548740cc', '2024-02-20 20:51:08.458633+00', '2024-02-20 20:51:08.458633+00', 'bd254cd6-ada3-4803-88ec-a47749459169', 'f9401258-4630-4005-8d47-1a682ae94cf3', 'UsersCopy.yml', 'cubes:
  - name: UsersCopy
    sql: SELECT * FROM public.users_copy
    joins: []
    dimensions:
      - name: id
        sql: id
        type: number
        primaryKey: true
      - name: lastName
        sql: last_name
        type: string
      - name: firstName
        sql: first_name
        type: string
      - name: state
        sql: state
        type: string
      - name: company
        sql: company
        type: string
      - name: city
        sql: city
        type: string
      - name: gender
        sql: gender
        type: string
      - name: createdAt
        sql: created_at
        type: time
    measures:
      - name: count
        type: count
', '35b385290a8fe596a0280511ed79a0b9', '8ac5b66e-aca9-4845-b009-74127cbb6c00') ON CONFLICT DO NOTHING;
INSERT INTO public.members (id, created_at, updated_at, user_id, team_id) VALUES ('4eb5d9f8-d1b0-40a9-ae5c-d85743ba62c3', '2024-02-15 22:46:43.921517+00', '2024-02-15 22:46:43.921517+00', 'bd254cd6-ada3-4803-88ec-a47749459169', '02db13fa-37ad-4a15-a237-e4a9f400797a') ON CONFLICT DO NOTHING;
INSERT INTO public.member_roles (id, member_id, team_role, access_list_id, created_at, updated_at) VALUES ('96267609-4fc2-464c-86cc-4d31546436cd', '4eb5d9f8-d1b0-40a9-ae5c-d85743ba62c3', 'owner', NULL, '2024-02-15 23:06:43.096277+00', '2024-02-15 23:06:43.096277+00') ON CONFLICT DO NOTHING;
INSERT INTO public.sql_credentials (id, created_at, updated_at, datasource_id, user_id, username, password) VALUES ('fa839ee5-9d27-4f54-97a8-4e8118ba9b05', '2024-02-20 20:59:39.105882+00', '2024-02-20 20:59:39.105882+00', '715dfae1-1044-42ec-ac48-dd4cefa567e6', 'bd254cd6-ada3-4803-88ec-a47749459169', 'demo_clickhouse_user', 'demo_clickhouse_pass') ON CONFLICT DO NOTHING;
INSERT INTO public.sql_credentials (id, created_at, updated_at, datasource_id, user_id, username, password) VALUES ('9e62b8fd-19e1-4bf4-a732-7f02501657dd', '2024-02-20 20:59:22.836483+00', '2024-02-20 21:43:57.281308+00', 'f9401258-4630-4005-8d47-1a682ae94cf3', 'bd254cd6-ada3-4803-88ec-a47749459169', 'demo_pg_user', 'demo_pg_pass') ON CONFLICT DO NOTHING;
