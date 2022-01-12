## [1.34.4](https://github.com/Pocket/web-client/compare/v1.34.3...v1.34.4) (2022-01-12)


### Bug Fixes

* **ArrowLink:** pass id and data-cy attributes through ([dfa6f9e](https://github.com/Pocket/web-client/commit/dfa6f9e42be4242714bcf092d5f9b5ba962040f7))
* **constants:** add new premium url ([df29d69](https://github.com/Pocket/web-client/commit/df29d69bb963591fc7d953ecf9d92a2b9c19614c))
* **constants:** update PREMIUM_URL link ([1cd4106](https://github.com/Pocket/web-client/commit/1cd4106b17176409fcc100f476be6ac03d907da6))
* **data-cy:** pass data-cy info to ArrowLink ([ffc4eeb](https://github.com/Pocket/web-client/commit/ffc4eeb3b7e0a6486f911311c3b5d0cfc9e8d05f))
* **global nav:** add utm params to premium link ([6681918](https://github.com/Pocket/web-client/commit/6681918417bbae38cfca8a306a353a4e3558b3e1))
* **premium links:** add utm params to premium links ([98b82b9](https://github.com/Pocket/web-client/commit/98b82b92bf9e2360dc4dd3d1bd0877bf793639fd))
* **TagUpsell:** add new utm params, pass data-cy through to ArrowLink ([1fbd1a9](https://github.com/Pocket/web-client/commit/1fbd1a92931697f3a97d7bb63927a95e7847698b))

## [1.34.3](https://github.com/Pocket/web-client/compare/v1.34.2...v1.34.3) (2022-01-11)


### Bug Fixes

* **item:** remove itemEnrichment url from analytics ([bffa768](https://github.com/Pocket/web-client/commit/bffa76878e2e031e004fde3da3f25fcc89e2340d))

## [1.34.2](https://github.com/Pocket/web-client/compare/v1.34.1...v1.34.2) (2022-01-10)


### Bug Fixes

* **collections:** remove offset for de ([4273769](https://github.com/Pocket/web-client/commit/427376978fcec88faeae1436a41d67b370407485))

## [1.34.1](https://github.com/Pocket/web-client/compare/v1.34.0...v1.34.1) (2022-01-07)


### Bug Fixes

* **waypoint:** strip access token from query param ([530a107](https://github.com/Pocket/web-client/commit/530a1078319475f818f3767885bdc335f852e355))

# [1.34.0](https://github.com/Pocket/web-client/compare/v1.33.1...v1.34.0) (2022-01-07)


### Features

* **dependency:** update nextjs to 12 ([ca91333](https://github.com/Pocket/web-client/commit/ca913335578eeb6609864f1da99125d919722cb3))

## [1.33.1](https://github.com/Pocket/web-client/compare/v1.33.0...v1.33.1) (2022-01-06)


### Bug Fixes

* **data-cy:** add data-cy attributes to side nav and account ([b99fa34](https://github.com/Pocket/web-client/commit/b99fa34a914365c7ca6d1810731e79337f855b34))
* **tags page:** add my-list type to SideNav so it renders the tags ([eb8c81e](https://github.com/Pocket/web-client/commit/eb8c81eab7cd85a72055a2ce8c7c7a36a1a6fb02))
* **TopicsSideNav:** use index instead of topic.topic_slug for key ([25ec58c](https://github.com/Pocket/web-client/commit/25ec58c367be9a517d5fbf5276a7c90748c0df47))

# [1.33.0](https://github.com/Pocket/web-client/compare/v1.32.3...v1.33.0) (2022-01-06)


### Bug Fixes

* **discover:** add defaults to slate arrays ([ad35fae](https://github.com/Pocket/web-client/commit/ad35faec4b2e2724185b23d18f919e92d3bdddb9))
* **item:** add profile/tags ([152907c](https://github.com/Pocket/web-client/commit/152907cfe22cfb354a04036cd61daabac0849b8b))
* **item:** reader updates ([8ac1468](https://github.com/Pocket/web-client/commit/8ac1468c75b97db5a1ac874f125db2629670b9ac))
* **item:** tags and tagging ([55761f6](https://github.com/Pocket/web-client/commit/55761f671a65179348f1675587b6517e71780c13))
* **item:** update confirmations ([a6da8bd](https://github.com/Pocket/web-client/commit/a6da8bd91f29d98fa2d74976a7e11b3cc0ef2d70))
* **item:** update connections with item expectations ([308eb0e](https://github.com/Pocket/web-client/commit/308eb0ef52857e34d22b4349c08def172e3d8760))
* **item:** update image for double encoding ([38499e0](https://github.com/Pocket/web-client/commit/38499e082be009d46af2a6ffc79c46f0485e73ae))
* **item:** update render attributes ([0bfb988](https://github.com/Pocket/web-client/commit/0bfb9887f24de16a78e47915c780b513b0cd0006))
* **item:** update render params ([bdb312c](https://github.com/Pocket/web-client/commit/bdb312c636e225e1c66a42153a4787e9a27460b9))


### Features

* **items:** update grapql to use itemFragment ([cf83147](https://github.com/Pocket/web-client/commit/cf8314760b69e04951f436512978af0e9b2e85a6))
* **item:** use new derivers ([1428db5](https://github.com/Pocket/web-client/commit/1428db5a82af1f4aba5e78dbb9a106b27a23c33d))
* **lineups:** add central processing functions ([8ef53b3](https://github.com/Pocket/web-client/commit/8ef53b39e1075e68479f3c6429e20f6952ec7149))

## [1.32.3](https://github.com/Pocket/web-client/compare/v1.32.2...v1.32.3) (2022-01-06)


### Bug Fixes

* **account:** add impression to premium button on account settings page ([5d8f733](https://github.com/Pocket/web-client/commit/5d8f733ca317c97d27f1b4ff5641751f90a41a92))

## [1.32.2](https://github.com/Pocket/web-client/compare/v1.32.1...v1.32.2) (2022-01-05)


### Bug Fixes

* **snowplow:** update collector path to getpocket.com ([42e242c](https://github.com/Pocket/web-client/commit/42e242cd7e7c49099a861b014b0ad272074a5504))

## [1.32.1](https://github.com/Pocket/web-client/compare/v1.32.0...v1.32.1) (2022-01-04)


### Bug Fixes

* **account:** localization files for account page ([a26f413](https://github.com/Pocket/web-client/commit/a26f4134e089a089dacc9139b558779dfb2ef2a7))
* **account:** update localization namespace ([3013271](https://github.com/Pocket/web-client/commit/3013271e7d9802905d868cf2b2def7f161544f30))
* **localization:** bump to latest ([7b4fd7f](https://github.com/Pocket/web-client/commit/7b4fd7f4442de2580517daac2b2a8ee5a7771ace))

# [1.32.0](https://github.com/Pocket/web-client/compare/v1.31.1...v1.32.0) (2022-01-04)


### Bug Fixes

* **unleash:** adding a default for user models ([f2a812e](https://github.com/Pocket/web-client/commit/f2a812e6ce834a124a85e344f85d7dd356a9cbc1))


### Features

* **unleash:** recit user models ([c939d22](https://github.com/Pocket/web-client/commit/c939d22c4052e131526a7bcc4e09afbed49081f0))

## [1.31.1](https://github.com/Pocket/web-client/compare/v1.31.0...v1.31.1) (2022-01-04)


### Reverts

* Revert "feat(home): get lineup ids from feature flags" ([5a0a745](https://github.com/Pocket/web-client/commit/5a0a7450ca342701fb65d94019a7d35449804179))
* Revert "fix(home): remove personalized marker" ([66c8bfe](https://github.com/Pocket/web-client/commit/66c8bfed03111bea6cd0b07d9b3cede5e06e8b2a))
* Revert "feat(user): add reccit profile call for user models" ([289d771](https://github.com/Pocket/web-client/commit/289d771cc52463e5c7a5ac40cd6afb0f0e11117b))
* Revert "feat(user): include reccit profile in feature flags" ([cba47df](https://github.com/Pocket/web-client/commit/cba47df6da6f70ea374af2a380e3ef72eacca40b))
* Revert "fix(unleash): user model shape" ([0d19a7f](https://github.com/Pocket/web-client/commit/0d19a7f730b0a0ce96b8f530424b42321c724fa5))
* Revert "fix(unleash): recit query shape" ([3af3b72](https://github.com/Pocket/web-client/commit/3af3b720e2bbbb9824f33da56305caf54508db12))
* Revert "chore(home): code format" ([08710de](https://github.com/Pocket/web-client/commit/08710de2475da4568c20075b107e0f3c8ccc3f0d))

# [1.31.0](https://github.com/Pocket/web-client/compare/v1.30.3...v1.31.0) (2022-01-04)


### Bug Fixes

* **home:** remove personalized marker ([0602d0d](https://github.com/Pocket/web-client/commit/0602d0d03b58338f1fd06ac20f4808d8e1870d90))
* **unleash:** recit query shape ([28ae677](https://github.com/Pocket/web-client/commit/28ae677164f15947ced64cbf0fc9ed8813f8b2d6))
* **unleash:** user model shape ([a568c3e](https://github.com/Pocket/web-client/commit/a568c3e830f7c589a5dab75aa72b1883013924a6))


### Features

* **home:** get lineup ids from feature flags ([0011f8a](https://github.com/Pocket/web-client/commit/0011f8a9a6535f8e7b700277a47db144dcf6d28e))
* **user:** add reccit profile call for user models ([77dde28](https://github.com/Pocket/web-client/commit/77dde28d723a2822ca26f0e26698e4c0b6f71960))
* **user:** include reccit profile in feature flags ([8d838d1](https://github.com/Pocket/web-client/commit/8d838d1456b1c8a964d00789f75799fc1671bbc6))

## [1.30.3](https://github.com/Pocket/web-client/compare/v1.30.2...v1.30.3) (2022-01-03)


### Bug Fixes

* **collections:** no need to destructure response ([59089a2](https://github.com/Pocket/web-client/commit/59089a259d580e2f4e22bb2d500be1cf2b5fe444))
* **eoy:** remove eoy banners, callouts, and pinned articles ([c9f8c65](https://github.com/Pocket/web-client/commit/c9f8c65771e91416f95eadd55f723b138a93db3e))

## [1.30.2](https://github.com/Pocket/web-client/compare/v1.30.1...v1.30.2) (2021-12-15)


### Bug Fixes

* **syndicated:** ensure query params are passed to page ([4a39d66](https://github.com/Pocket/web-client/commit/4a39d6606640b920e819cf6e5864a1e29814317c))

## [1.30.1](https://github.com/Pocket/web-client/compare/v1.30.0...v1.30.1) (2021-12-15)


### Bug Fixes

* **collection:** remove externalId as itemId ([b453156](https://github.com/Pocket/web-client/commit/b4531564fa9ecdd8aa6a9f7d00941f76de8d9df7))
* **discover:** future forward response variables ([6689d9c](https://github.com/Pocket/web-client/commit/6689d9c36b222d5298fa8f7af13dd9701a6ffc56))
* **item:** update analytics data ([66ab288](https://github.com/Pocket/web-client/commit/66ab2884fabc6d7d3461eb2951ad508b6279419a))
* **snowplow:** create validator with warnings ([0db2d62](https://github.com/Pocket/web-client/commit/0db2d622ed8452a485877e4d768a9561af51ea7b))
* **snowplow:** sane defaults for validation ([abb9851](https://github.com/Pocket/web-client/commit/abb985147a5d8bc585f28fd6e9eb820daa33a072))
* **snowplow:** validate expected has value ([c5d4a94](https://github.com/Pocket/web-client/commit/c5d4a94230d2bfe1ea30d6de4a2f457feabe2bef))

# [1.30.0](https://github.com/Pocket/web-client/compare/v1.29.2...v1.30.0) (2021-12-14)


### Features

* **rollback:** format trigger deployment ([8c43e7f](https://github.com/Pocket/web-client/commit/8c43e7f638aae8077977073d6ba4cccf7deae837))


### Reverts

* Revert "refactor(graphql): add/use item fragment" ([7e4bd3e](https://github.com/Pocket/web-client/commit/7e4bd3e24e44ee66e285e5dded5be02e0248e6aa))
* Revert "fix(collection): use new deriver for stories" ([21c6d49](https://github.com/Pocket/web-client/commit/21c6d495d3488093e39c67e0496b95561ae887b9))
* Revert "fix(collections): use new deriver for pages" ([ad9f89c](https://github.com/Pocket/web-client/commit/ad9f89c822c4046bf986a83dba3f03b27f00e642))
* Revert "fix(discover): use new deriver for recs" ([58c1b79](https://github.com/Pocket/web-client/commit/58c1b79dfecc5683f75b5d5f6b203751af85dda5))
* Revert "fix(slate gql): alias analytics names" ([7760171](https://github.com/Pocket/web-client/commit/7760171d6a7b5ee0829ff63db007299f30f4c636))
* Revert "fix(home): derive items with new derivers" ([ca0c78b](https://github.com/Pocket/web-client/commit/ca0c78b49bcc80aa0e2f2c9025003a9c4771cb6c))
* Revert "fix(topic): use new deriver for topic pages" ([8a7f4b1](https://github.com/Pocket/web-client/commit/8a7f4b12a1e17dbd712b73d9a47851fd46a60dce))
* Revert "fix(my-list): moderinze sort/filter functions" ([c457e1d](https://github.com/Pocket/web-client/commit/c457e1d3502f5d5d8c03b42d42eec6547a8d7d62))
* Revert "fix(my-list): use new derivers for list items" ([afc4c4b](https://github.com/Pocket/web-client/commit/afc4c4baca345212018b6788ea011422b5794db5))
* Revert "chore(derivers): remove old derivers" ([074f50f](https://github.com/Pocket/web-client/commit/074f50fae78b97dbeb9f63bfbb34fd7395be993a))
* Revert "fix(card): don't pass item data" ([26158f4](https://github.com/Pocket/web-client/commit/26158f40d2b0f0620e25f8a92052b3ec7ceac713))
* Revert "fix(items): update item card expectations" ([ed1c6a3](https://github.com/Pocket/web-client/commit/ed1c6a325e25aba0cfc3cd10f0c83b00d4277bc1))
* Revert "fix(item): add fromPartner" ([8ca0bf3](https://github.com/Pocket/web-client/commit/8ca0bf3620dde4bcf6afe9215cba026114b49e7b))
* Revert "fix(item): add annotations" ([fd768e0](https://github.com/Pocket/web-client/commit/fd768e0b762dfc4c188e84fe2019f124cc3405eb))
* Revert "fix(item): update discover/reccit card/actions" ([e01cbeb](https://github.com/Pocket/web-client/commit/e01cbeb1d43f055ecca5a3229b397ea9327b022f))
* Revert "fix(item): no item pass to frompartner function" ([fe29ff5](https://github.com/Pocket/web-client/commit/fe29ff5aefcc0e01ba9cd98c9be499bb7d85c301))
* Revert "fix(item): rectify inequities in the item render" ([dfe511f](https://github.com/Pocket/web-client/commit/dfe511f05472e1d59aca5e4e43e33e538f290dc5))
* Revert "test(item): updating snap shots to use new deriver" ([b7e55d4](https://github.com/Pocket/web-client/commit/b7e55d44e8a238c3ed9127a5fd41bb2bf802be91))
* Revert "fix(item): default to false for authors" ([8324dca](https://github.com/Pocket/web-client/commit/8324dca223bdbd7688cdaffce53cf3532b278c82))
* Revert "refactor(card): adding props" ([98bf4e9](https://github.com/Pocket/web-client/commit/98bf4e98ca9315c6f8d46f4535cb04aa2633dfbe))
* Revert "chore(partner overline): auto formatting" ([2bcc829](https://github.com/Pocket/web-client/commit/2bcc8292dc2e1f49dee8abde0bd26c6a0cbc525d))
* Revert "refactor(stories): adding item action stories" ([bb6af86](https://github.com/Pocket/web-client/commit/bb6af86f3b1be4cd9af4f447183b6db53111563e))
* Revert "refactor(storybook): adding next api mock data" ([39d9bf3](https://github.com/Pocket/web-client/commit/39d9bf302394f86c34d0ddc97ca6641eb3e2a813))
* Revert "test(stories): updating list stories" ([9de54f0](https://github.com/Pocket/web-client/commit/9de54f0a365b653869ae996af32502e03733eddc))
* Revert "test(stories): updating card story" ([1a1a7f6](https://github.com/Pocket/web-client/commit/1a1a7f6fc8cbe2b60bd6f905a99ae25e8deb9549))
* Revert "fix(item tags): adjust format for display" ([4624f0d](https://github.com/Pocket/web-client/commit/4624f0d586fdfb5c77a3de71b1d3c809952b5ca3))
* Revert "fix(items): profile and tags" ([9e11683](https://github.com/Pocket/web-client/commit/9e116834edc1fe1cbc315031c5ba75894d7d9cf6))
* Revert "test(item): add profile item" ([b12643f](https://github.com/Pocket/web-client/commit/b12643f7cb461db93d068d9737db37e10b6bb573))
* Revert "fix(item): refactor share for new item shape" ([fe175c7](https://github.com/Pocket/web-client/commit/fe175c76c8c671a64c836d96ed4f8265401fc4b9))
* Revert "fix(item): recently tagged items" ([31a3a36](https://github.com/Pocket/web-client/commit/31a3a36978ed89189dea479a134c21c4e171fc60))
* Revert "fix(home): get correct slate meta [FRONT-1510]" ([ded2482](https://github.com/Pocket/web-client/commit/ded2482d18e3056e88f6122ed790aa16d2c45d58))
* Revert "fix(collections): use deriver for takeover content" ([1b275f8](https://github.com/Pocket/web-client/commit/1b275f84f1371aba3a876785a15e938f339b53b0))
* Revert "fix(item): update item expectation propegation" ([b39ae73](https://github.com/Pocket/web-client/commit/b39ae73452fa88938cd35208a85bda2e640fe8c6))
* Revert "fix(item): add collection data to fragment" ([4039a5b](https://github.com/Pocket/web-client/commit/4039a5b10d91b61ea5a479745fda568144e1594b))
* Revert "test(item): update snapshots for non double encode" ([627d643](https://github.com/Pocket/web-client/commit/627d643b4c6f65a11b2c09b042976ce4fc2afe52))
* Revert "test(items): update snapshot to reflect cache function" ([6dc40ba](https://github.com/Pocket/web-client/commit/6dc40baad7bc76a1b572f274b7ee86dd5996620e))
* Revert "chore(release): 1.28.15 [skip ci]" ([fa14db5](https://github.com/Pocket/web-client/commit/fa14db5bf47b5c6002d58b0c6f8e1359f37ec85f))
* Revert "chore(release): 1.28.16 [skip ci]" ([701cd82](https://github.com/Pocket/web-client/commit/701cd823837461d6add79e9fb52f1cc453a838c9))
* Revert "chore(dependencies): updating safe dependencies" ([f84e10b](https://github.com/Pocket/web-client/commit/f84e10b93fe45839a7485f3b62d04aacebf64e36))
* Revert "chore(dependencies): update semi-safe dependencies" ([0f9fc9c](https://github.com/Pocket/web-client/commit/0f9fc9cf07055910b77b3f96da40c8c2013857a9))
* Revert "chore(dependency): update eslint/jsdom" ([cd13f46](https://github.com/Pocket/web-client/commit/cd13f46bcbdc8ca8ed2ada2b01dca5db5ccc49a7))
* Revert "chore(dependencies): update storybook" ([fc8615b](https://github.com/Pocket/web-client/commit/fc8615bb00d0997c34379b05c0ff3ed422501bad))
* Revert "feat(dependencies): upgrade nextjs  major version" ([725d71d](https://github.com/Pocket/web-client/commit/725d71db4e5b559b89a2a5ba06b806f19d308113))
* Revert "chore(release): 1.29.0 [skip ci]" ([5a64cd3](https://github.com/Pocket/web-client/commit/5a64cd369771ff826ca76b6c3db46d23eb875652))
* Revert "fix(reader): mark v3 reader item data as legacy" ([face0e4](https://github.com/Pocket/web-client/commit/face0e40130088c9101a2e4534c6d832f686a3d2))
* Revert "fix(reader): update to itemId" ([07c3c87](https://github.com/Pocket/web-client/commit/07c3c870d9d69efb043a6d23b01ca5506bf12a33))
* Revert "fix(reader): udpate header to use new item data" ([1e35c8c](https://github.com/Pocket/web-client/commit/1e35c8c2d3ef957c94267d5dd607adb4cf0539e9))
* Revert "fix(reader): adding missing item_id shift" ([cc8da99](https://github.com/Pocket/web-client/commit/cc8da99b972f1ccb5aa4fe4f65cfa8b41fc44438))
* Revert "chore(release): 1.29.1 [skip ci]" ([91f7592](https://github.com/Pocket/web-client/commit/91f759230114d76ad391d7561b86dca937dfaf34))
* Revert "fix(tagging): adjust how we grab stored tags" ([d133555](https://github.com/Pocket/web-client/commit/d133555061610afd6714429eec21ad3ec862dc7e))
* Revert "fix(tagging): adjust reconciler on tag action" ([c81db8b](https://github.com/Pocket/web-client/commit/c81db8b021c95bdeffe2592edd7577fe5a571571))
* Revert "fix(tags): _untagged_ logic update" ([b4ae14d](https://github.com/Pocket/web-client/commit/b4ae14d9f7fbb37dd2190190c5b93f873b409117))
* Revert "chore(release): 1.29.2 [skip ci]" ([004e9a9](https://github.com/Pocket/web-client/commit/004e9a908f8fc7b212a024d58a04564e96f9f3a1))

## [1.28.14](https://github.com/Pocket/web-client/compare/v1.28.13...v1.28.14) (2021-12-09)


### Bug Fixes

* **image url:** add some comments and regex ref ([929a809](https://github.com/Pocket/web-client/commit/929a80962bcc67bc1440bba885c27cc57c4cc696))
* **image url:** dont make dimensions additive ([f71de6e](https://github.com/Pocket/web-client/commit/f71de6e4e2bcf74b7b2450e6d3436b9da31bfb11))

## [1.28.13](https://github.com/Pocket/web-client/compare/v1.28.12...v1.28.13) (2021-12-09)


### Bug Fixes

* **account:** adjust malformed endpoint ([d35e6cb](https://github.com/Pocket/web-client/commit/d35e6cbacd0592b643c49cd32bbde25cbee6c21f))

## [1.28.12](https://github.com/Pocket/web-client/compare/v1.28.11...v1.28.12) (2021-12-09)


### Bug Fixes

* **account:** add resend confirmations ([6051575](https://github.com/Pocket/web-client/commit/60515759eb64bc95676bf87a75f32057f88966dc))

## [1.28.11](https://github.com/Pocket/web-client/compare/v1.28.10...v1.28.11) (2021-12-08)


### Bug Fixes

* **urls:** add and update tests and snapshots ([da46e16](https://github.com/Pocket/web-client/commit/da46e168c6df8d5beda12b8d51e4b948483dd433))
* **urls:** don't re-encode images if they've already been encoded ([d01ebd8](https://github.com/Pocket/web-client/commit/d01ebd859a459ab9ca949af3d3dd3fa9692a2378))

## [1.28.10](https://github.com/Pocket/web-client/compare/v1.28.9...v1.28.10) (2021-12-07)


### Bug Fixes

* **sentry:** turn back on sentry ([3e0860b](https://github.com/Pocket/web-client/commit/3e0860b5a77f85b286817809d6e232db09234d48))

## [1.28.9](https://github.com/Pocket/web-client/compare/v1.28.8...v1.28.9) (2021-12-06)


### Bug Fixes

* **sentry:** disable transactions for now ([7920404](https://github.com/Pocket/web-client/commit/79204044febccae4b4fbe17e560cbd5e72304981))
* **sentry:** disable transactions for now on the server ([90dc455](https://github.com/Pocket/web-client/commit/90dc4550bd2637bf1e643d5735efd275e11ec1a4))

## [1.28.8](https://github.com/Pocket/web-client/compare/v1.28.7...v1.28.8) (2021-12-06)


### Bug Fixes

* **qa:** adding data-cy attributes for automated testing ([e52d917](https://github.com/Pocket/web-client/commit/e52d917903209342d8075920f596b768c1db0f55))

## [1.28.7](https://github.com/Pocket/web-client/compare/v1.28.6...v1.28.7) (2021-12-01)


### Bug Fixes

* **eoy:** adding eoy specific sign up module on collections page for en users ([723ee6e](https://github.com/Pocket/web-client/commit/723ee6e35e951bc034f0314ba2045f371d0490a9))
* **eoy:** adding non breaking hyphen to best-of ([19eb95f](https://github.com/Pocket/web-client/commit/19eb95f5ec85180147be3be48eb7ce0dab575627))

## [1.28.6](https://github.com/Pocket/web-client/compare/v1.28.5...v1.28.6) (2021-12-01)


### Bug Fixes

* **eoy:** only fire impression for en and de locales ([96f50f5](https://github.com/Pocket/web-client/commit/96f50f59bff8b2671757e19e4f9dff7791823501))
* **eoy:** remove feature flag wrapper ([dea1c5d](https://github.com/Pocket/web-client/commit/dea1c5dcdbff54d460a88e08c843f115baf8a152))

## [1.28.5](https://github.com/Pocket/web-client/compare/v1.28.4...v1.28.5) (2021-12-01)


### Bug Fixes

* **home:** use collection image if it exists ([7ec6552](https://github.com/Pocket/web-client/commit/7ec65529bc9c3d1a5ead8cb66c5978272a309bf1))

## [1.28.4](https://github.com/Pocket/web-client/compare/v1.28.3...v1.28.4) (2021-12-01)


### Bug Fixes

* **heros:** show heros at top of page for all locales ([58eede4](https://github.com/Pocket/web-client/commit/58eede421c4c3b4f7833e00f9e8ff1804378d1e4))

## [1.28.3](https://github.com/Pocket/web-client/compare/v1.28.2...v1.28.3) (2021-12-01)


### Bug Fixes

* **collections:** remove eoy feature flag ([02c7469](https://github.com/Pocket/web-client/commit/02c74697c6c0517d015a77b9bbe6138f4506569b))

## [1.28.2](https://github.com/Pocket/web-client/compare/v1.28.1...v1.28.2) (2021-12-01)


### Bug Fixes

* **collection:** hero images format ([6aadb9d](https://github.com/Pocket/web-client/commit/6aadb9db0a919e21014dd6f82fddca8a6ec37696))

## [1.28.1](https://github.com/Pocket/web-client/compare/v1.28.0...v1.28.1) (2021-11-29)


### Bug Fixes

* **collections:** offset should fully propegate ([7f14192](https://github.com/Pocket/web-client/commit/7f14192317c32db3eb1420891a33436969c37e58))

# [1.28.0](https://github.com/Pocket/web-client/compare/v1.27.3...v1.28.0) (2021-11-29)


### Features

* **feature-flags:** add locale to call ([57c39da](https://github.com/Pocket/web-client/commit/57c39da779456b3defe3e66e5bebfd3ba51f02f2))
* **onboarding:** add onboarding experiment feature flag check ([7ebc81c](https://github.com/Pocket/web-client/commit/7ebc81cfe6ff23fb8960d55625e2cc196c425798))
* **onboarding:** remove console.log ([0159eba](https://github.com/Pocket/web-client/commit/0159eba6d2cffb23a404eee8bbf7dc0434b47de6))

## [1.27.3](https://github.com/Pocket/web-client/compare/v1.27.2...v1.27.3) (2021-11-29)


### Bug Fixes

* **collections:** exclude `de` from eoy takeover ([55e3cb6](https://github.com/Pocket/web-client/commit/55e3cb695812202a4471fd042048c287e3b07ee0))
* **collections:** update last story in eoy takeover ([c8797e6](https://github.com/Pocket/web-client/commit/c8797e65d8d2f577ffa03ec907d56f5a7c406e3b))

## [1.27.2](https://github.com/Pocket/web-client/compare/v1.27.1...v1.27.2) (2021-11-29)


### Bug Fixes

* **best-of:** add proper params to collections links ([89c48f4](https://github.com/Pocket/web-client/commit/89c48f4b6f9d2681a7e00ef2ae421c444d1d5e08))
* **best-of:** adding best of banner behind feature flag ([77a2245](https://github.com/Pocket/web-client/commit/77a224562686b0c52f3e8996eee0b73564d33f74))
* **bestof:** moving ref to div instead of sectionwrapper ([ba84b2a](https://github.com/Pocket/web-client/commit/ba84b2a95706d56f16273271bc4cf382e7363b46))
* **home:** removing locale prop which wasnt being used ([6d02664](https://github.com/Pocket/web-client/commit/6d026647a5a229e95190ad86481e7961c643005e))

## [1.27.1](https://github.com/Pocket/web-client/compare/v1.27.0...v1.27.1) (2021-11-29)


### Bug Fixes

* **collections:** fixing maoz effect ([9bd3641](https://github.com/Pocket/web-client/commit/9bd364120377e49003df95f7e8156ae572dd9d37))

# [1.27.0](https://github.com/Pocket/web-client/compare/v1.26.0...v1.27.0) (2021-11-29)


### Bug Fixes

* **collections:** add thumbnail field ([2263e77](https://github.com/Pocket/web-client/commit/2263e778b739804c663fb7c5ec99480910718a8e))


### Features

* **collections:** eoy 2021 takeover ([15e8844](https://github.com/Pocket/web-client/commit/15e88448dc3ec3e3c9db04f38e8a1f10ef50a921))

# [1.26.0](https://github.com/Pocket/web-client/compare/v1.25.9...v1.26.0) (2021-11-29)


### Features

* **collections:** force web view on collections ([2f6886c](https://github.com/Pocket/web-client/commit/2f6886c241ffae1f6d2af19f5a6b60fa77bf121a))

## [1.25.9](https://github.com/Pocket/web-client/compare/v1.25.8...v1.25.9) (2021-11-18)


### Bug Fixes

* **flyaway:** adjust placement of flyaway if cookie consent banner is showing ([81b3428](https://github.com/Pocket/web-client/commit/81b3428fe7be419b2e7ac076f39853a0d1117d37))
* **flyaway:** remove useEffect hook ([4f73aa7](https://github.com/Pocket/web-client/commit/4f73aa74c6dd9ad81815798880bacb9782414271))
* **flyaway:** useEffect to update bannerHeight on window resize ([937830a](https://github.com/Pocket/web-client/commit/937830abfb38d3bc9b96abca9ee2f8a16a27629d))
* **home:** don't load onboarding flyaways until after slates have loaded ([83ce73c](https://github.com/Pocket/web-client/commit/83ce73cafe7aac85c8b93a68151e9488c256c9b1))
* **onboarding:** remove locale check, add onboardingRelease check ([b0bb5a3](https://github.com/Pocket/web-client/commit/b0bb5a3aaee16305de9b0ce6311d1db937380acd))
* **onboarding:** remove onboarding.release feature flag check ([fb3498b](https://github.com/Pocket/web-client/commit/fb3498b8c7f601d14c399ef82d48916f3e45d025))
* **packages:** bump web-localization to grab new translations ([ae83d9c](https://github.com/Pocket/web-client/commit/ae83d9cec40783ed04c2a21e028e7de758de67ed))
* **section wrapper:** pass rest of props in order to set inline style ([f09787e](https://github.com/Pocket/web-client/commit/f09787e768b67480150a2c6212d0ffe47942fb72))

## [1.25.8](https://github.com/Pocket/web-client/compare/v1.25.7...v1.25.8) (2021-11-17)


### Bug Fixes

* **waypoint:** update waypoint to use 'home.release' instead of 'onboarding.release' feature flag ([b942d2f](https://github.com/Pocket/web-client/commit/b942d2faafac2ff174b2c2b769d557b0233db95e))

## [1.25.7](https://github.com/Pocket/web-client/compare/v1.25.6...v1.25.7) (2021-11-15)


### Bug Fixes

* **ads:** removing ads.txt file in favor of hosting it in dotcom-gateway ([4e04781](https://github.com/Pocket/web-client/commit/4e047818c8c462e7ef15150209fad27311eba65a))

## [1.25.6](https://github.com/Pocket/web-client/compare/v1.25.5...v1.25.6) (2021-11-10)


### Bug Fixes

* **ads:** adding adds.txt file ([e1a5e56](https://github.com/Pocket/web-client/commit/e1a5e567ff158e5c30cc3645a45ae44a37ded9da))

## [1.25.5](https://github.com/Pocket/web-client/compare/v1.25.4...v1.25.5) (2021-11-10)


### Bug Fixes

* **apps flyaway:** remove styleOverrides ([86eb037](https://github.com/Pocket/web-client/commit/86eb037ef0148fe8238e281b255914abfdd8086a))
* **extensions flyaway:** remove safari and edge extension links and analytic events ([efb5e35](https://github.com/Pocket/web-client/commit/efb5e3567e980cedb07ae96eceab24746958029c))
* **extensions flyaway:** update title translation keys for desktop vs mobile ([713271e](https://github.com/Pocket/web-client/commit/713271e47716378f94324d62eaa40bcb890e77e3))
* **extensions flyaway:** update titles, remove description text ([14d0110](https://github.com/Pocket/web-client/commit/14d01101cf6eed5d07a6de9e75e808dd4b2db52b))
* **flyaway:** layout and styling fixes ([0f1d2ca](https://github.com/Pocket/web-client/commit/0f1d2ca2013e88e9a9127ddb2feebaaab1f2a675))
* **flyaways on my list:** fix flyaways sitting too high on my list page ([3b389b5](https://github.com/Pocket/web-client/commit/3b389b5608c178e4afb66aef10d7956874b83c15))
* **flyaways:** add styleOverrides to flyaways that are on My List ([8dedb18](https://github.com/Pocket/web-client/commit/8dedb18cd20cf795c4559156819d6433a1745829))
* **flyaways:** updating copy ([1a4a8ee](https://github.com/Pocket/web-client/commit/1a4a8ee7ed6023597709f69cd6ddab182634b2d3))
* **home:** add onboarding flyaways back to home ([049a96e](https://github.com/Pocket/web-client/commit/049a96e0bf9178771fbfddec7518b59d7e74e9c2))
* **mobile menu:** remove onboarding highlight from My List item in mobile menu ([3186fb7](https://github.com/Pocket/web-client/commit/3186fb7baf5e0b7bf7784a09df1e24a383fe0d49))
* **my list flyaway:** update highlight to be on top nav item ([d276ebd](https://github.com/Pocket/web-client/commit/d276ebd8d4ca8013288f62ad4231a1dee3aded4f))
* **onboarding:** showOnboarding if enrolled in onboarding.dev feature flag ([07b19b9](https://github.com/Pocket/web-client/commit/07b19b984ae6bd632d8db6b7175bc68bd3c6a6a5))
* **save flyaway:** change save button highlight when on tiny tablet and below ([8e151f6](https://github.com/Pocket/web-client/commit/8e151f66bc629279d505d4b8c3ff4afcb230f5ec))
* **save flyaway:** update highlighted element, update flyawayReady to not be dependent on welcome modal ([368d4e0](https://github.com/Pocket/web-client/commit/368d4e0226978628a67983110759ef71249a816a))

## [1.25.4](https://github.com/Pocket/web-client/compare/v1.25.3...v1.25.4) (2021-11-10)


### Bug Fixes

* **collection:** match deriver updates ([9d0c0b7](https://github.com/Pocket/web-client/commit/9d0c0b7192da4b793cc9549e1d6c6faec8279cbc))

## [1.25.3](https://github.com/Pocket/web-client/compare/v1.25.2...v1.25.3) (2021-11-09)


### Bug Fixes

* **collections:** resolved_url for deriving open ([46fad0d](https://github.com/Pocket/web-client/commit/46fad0dd59e73a3860e8b9b96848fee2bfab915b))

## [1.25.2](https://github.com/Pocket/web-client/compare/v1.25.1...v1.25.2) (2021-11-09)


### Bug Fixes

* **api:** remove getTopicList and getHomeTopicFeed ([e58cf66](https://github.com/Pocket/web-client/commit/e58cf667c13a71392459d9b30aa307166db65a30))
* **api:** use new TOPICS constant in getNewTopicFeed ([f3e973a](https://github.com/Pocket/web-client/commit/f3e973a0506fd4dc1a58dde9c62813661ec00e90))
* **collections:** remove topics from collection index - no longer used ([3ea1b44](https://github.com/Pocket/web-client/commit/3ea1b44e4a29b4e7b8b7207842193aa3299e42c1))
* **constants:** add new TOPICS object ([ba37034](https://github.com/Pocket/web-client/commit/ba37034e018261bc52b59b3931d748644569f2f2))
* **constants:** remove duplicate named topics from TOPIC_IDS ([c4cbba8](https://github.com/Pocket/web-client/commit/c4cbba8b5842fb2c07241f6d7f98712902a88616))
* **constants:** rename TOPICS to be TOPICS_BY_NAME ([9ceefac](https://github.com/Pocket/web-client/commit/9ceefac4830bc0811dbf20dd9341999014732322))
* **discover:** use TOPICS constant, dispatch setActiveTopic instead of hydrateTopicList ([3d24513](https://github.com/Pocket/web-client/commit/3d24513d6c5d025fb19bff96d3fc4a3f1b3a3d10))
* **topicList:** fetchTopicList is no longer async ([e075f4e](https://github.com/Pocket/web-client/commit/e075f4e46378737a2dc7dcba4a1ebfcc15d9600d))
* **topicList:** pass slug directly to set activeTopic ([01f6c33](https://github.com/Pocket/web-client/commit/01f6c33cf30b7725115473d2b09971a58b366429))
* **topicList:** use new TOPICS constant to fetch topic list ([27520c9](https://github.com/Pocket/web-client/commit/27520c99165979094b26ddd4590140533b2fea2d))
* **topics:** use TOPICS constant for initialState, remove unnecessary functions ([db5da88](https://github.com/Pocket/web-client/commit/db5da88bb447f3ba41dc807fc0552f2231ff02ac))

## [1.25.1](https://github.com/Pocket/web-client/compare/v1.25.0...v1.25.1) (2021-11-03)


### Bug Fixes

* **snowplow:** updating snowplow postpath for test env ([3fc95be](https://github.com/Pocket/web-client/commit/3fc95bec17bd8bfba0bcfd771d7e813d6fd40f5a))
* **test:** adding environment variable to next config ([aa36728](https://github.com/Pocket/web-client/commit/aa367288ec7962ccdfe3210613108d1038b6ba87))
* **test:** adding script to point snowplow events to dev url ([2070b55](https://github.com/Pocket/web-client/commit/2070b55fccfbf885e9afa60f5065b2a1323ece9c))

# [1.25.0](https://github.com/Pocket/web-client/compare/v1.24.13...v1.25.0) (2021-11-01)


### Bug Fixes

* **derivers:** better collection behavior ([a638922](https://github.com/Pocket/web-client/commit/a6389223d8abb745849b32d84a3a5d7fb6a71632))
* **derivers:** better enrichment for urls/images ([a9afcbe](https://github.com/Pocket/web-client/commit/a9afcbec45b73ea6b22b5138ce7275b41c3269ce))


### Features

* **derivers:** adding analytics to derivers ([90157f2](https://github.com/Pocket/web-client/commit/90157f20e446177c1a4a14e66de0fbb1f8f2586a))
* **derivers:** adding common item derivers ([f687ac9](https://github.com/Pocket/web-client/commit/f687ac91fbac133100ebd6ba60b480daecf22196))

## [1.24.13](https://github.com/Pocket/web-client/compare/v1.24.12...v1.24.13) (2021-10-26)


### Bug Fixes

* **collections:** optional chaining on ad category ([c7e7818](https://github.com/Pocket/web-client/commit/c7e7818de3e240535b43972c7e39ce45b8e7cc62))

## [1.24.12](https://github.com/Pocket/web-client/compare/v1.24.11...v1.24.12) (2021-10-26)


### Bug Fixes

* **account:** google connected app ([bf0a145](https://github.com/Pocket/web-client/commit/bf0a14571cab3d00e598ea77bf31f245598749a9))

## [1.24.11](https://github.com/Pocket/web-client/compare/v1.24.10...v1.24.11) (2021-10-26)


### Bug Fixes

* **collections:** updating data request and story page to display targeted ads ([bbeffa1](https://github.com/Pocket/web-client/commit/bbeffa1c7189d202de695a2e988bd511f11c4753))

## [1.24.10](https://github.com/Pocket/web-client/compare/v1.24.9...v1.24.10) (2021-10-26)


### Bug Fixes

* **footer:** add support for en and de locales ([978979e](https://github.com/Pocket/web-client/commit/978979e2cae76824a2e3b8c7f683c1e3b8f00359))
* **footer:** update link for Daily Newsletter in Footer ([aba8fcb](https://github.com/Pocket/web-client/commit/aba8fcbab0dd45a0ca8e45e42274e25d7f0dc540))
* **onboarding:** do not show onboarding highlight in side nav ([ba91374](https://github.com/Pocket/web-client/commit/ba913744c6edafc560e8ff85606c78b50a556395))

## [1.24.9](https://github.com/Pocket/web-client/compare/v1.24.8...v1.24.9) (2021-10-25)


### Bug Fixes

* **utilities:** update getpublisheddate function to return correct day of month ([b961d8b](https://github.com/Pocket/web-client/commit/b961d8b2f35c58c57f9bf7634258936d770fa1ab))

## [1.24.8](https://github.com/Pocket/web-client/compare/v1.24.7...v1.24.8) (2021-10-20)


### Bug Fixes

* **home:** cleanup legacy cards ([18efac1](https://github.com/Pocket/web-client/commit/18efac1bf461576fafc8b4d15661fc1c7eb5b6c1))
* **home:** cleanup old home files ([57e7fcf](https://github.com/Pocket/web-client/commit/57e7fcf82c991b1427a3fac901c649d8d04903da))

## [1.24.7](https://github.com/Pocket/web-client/compare/v1.24.6...v1.24.7) (2021-10-19)


### Bug Fixes

* **account:** explicit checkbox styles ([90f65cb](https://github.com/Pocket/web-client/commit/90f65cb7a0da6f3cc23864560fa15f4f97429a56))
* **account:** premium image on safari ([150e82e](https://github.com/Pocket/web-client/commit/150e82e911ebe94904d0133b17430fe3a637ffe5))
* **account:** remove extra set ([b90b356](https://github.com/Pocket/web-client/commit/b90b3560a9e1fa7355f9b428012d8d00607b9e32))
* **account:** safe fallback images ([54755ea](https://github.com/Pocket/web-client/commit/54755eaddffa46df59d08df476383f6ff1b25677))
* **dev-tools:** update dev tools format ([762b0e7](https://github.com/Pocket/web-client/commit/762b0e76843a67a0312915a477b0acf5c1f9ecce))

## [1.24.6](https://github.com/Pocket/web-client/compare/v1.24.5...v1.24.6) (2021-10-19)


### Bug Fixes

* **account:** switch link to new account page ([97b7a69](https://github.com/Pocket/web-client/commit/97b7a69711b4d4e7390827a9efd06ae2f09152c6))

## [1.24.5](https://github.com/Pocket/web-client/compare/v1.24.4...v1.24.5) (2021-10-19)


### Bug Fixes

* **home:** remove similar on navigation ([e941f89](https://github.com/Pocket/web-client/commit/e941f891188daa7a3f7bb2e8f623beef9f921984))

## [1.24.4](https://github.com/Pocket/web-client/compare/v1.24.3...v1.24.4) (2021-10-19)


### Bug Fixes

* **account:** typos and wording ([936ea12](https://github.com/Pocket/web-client/commit/936ea12354cf274d5e7a2f25bd069d3927d68dfa))
* **account:** wrap localization ([038625a](https://github.com/Pocket/web-client/commit/038625ab347144cd48ac89855f5903fc11b2a039))

## [1.24.3](https://github.com/Pocket/web-client/compare/v1.24.2...v1.24.3) (2021-10-18)


### Bug Fixes

* **optinmonster:** omit during dev ([1eee678](https://github.com/Pocket/web-client/commit/1eee6785447c8fb89a03a954607068ed9075701a))

## [1.24.2](https://github.com/Pocket/web-client/compare/v1.24.1...v1.24.2) (2021-10-18)


### Bug Fixes

* **HomeSimilarHeader:** align close icon to top of title ([e54067a](https://github.com/Pocket/web-client/commit/e54067a59b254c02b5034741262b3c0848e93317))
* **HomeSimilarRecs:** fix NoResults on mobile ([4775d2e](https://github.com/Pocket/web-client/commit/4775d2eeef9fd65f1fed519a4202ce7242bae010))

## [1.24.1](https://github.com/Pocket/web-client/compare/v1.24.0...v1.24.1) (2021-10-14)


### Bug Fixes

* **footer:** add instagram icon & link to footer ([aad6ad6](https://github.com/Pocket/web-client/commit/aad6ad6767773e906d11a014cc53248fe3e785ad))
* **package:** bump web-ui to 2.36.4 ([c12ed2b](https://github.com/Pocket/web-client/commit/c12ed2b30068354e29b40ac0b52b412f9425105c))

# [1.24.0](https://github.com/Pocket/web-client/compare/v1.23.16...v1.24.0) (2021-10-14)


### Bug Fixes

* **home:** update greeting ([44b5233](https://github.com/Pocket/web-client/commit/44b52333a2dba0356bdc2ad3373a4e846aa016f8))


### Features

* **home:** make personalized home the default ([6a6de8e](https://github.com/Pocket/web-client/commit/6a6de8e7f9724022b8a3cb1464af6aae79d2dfea))

## [1.23.16](https://github.com/Pocket/web-client/compare/v1.23.15...v1.23.16) (2021-10-14)


### Bug Fixes

* **cards:** allow for unclamped titles ([38bbc9a](https://github.com/Pocket/web-client/commit/38bbc9aca4bdeec207f23340c80408b724b704b0))

## [1.23.15](https://github.com/Pocket/web-client/compare/v1.23.14...v1.23.15) (2021-10-14)


### Bug Fixes

* **home:** adjust ipad breakpoint for display card ([67e8513](https://github.com/Pocket/web-client/commit/67e85132383f6c483512011d75a27e3a02171d23))
* **home:** analytics for similar footer actions ([530b4b2](https://github.com/Pocket/web-client/commit/530b4b2b506a33a42b80eaf74f5c2b124c714529))

## [1.23.14](https://github.com/Pocket/web-client/compare/v1.23.13...v1.23.14) (2021-10-13)


### Bug Fixes

* **home:** snowplow add domain actions and missing ([a4c7279](https://github.com/Pocket/web-client/commit/a4c727913dc6f687b97a4ca6401bdd081e0cf782))
* **home:** update snowplow for home ([0a62601](https://github.com/Pocket/web-client/commit/0a626015d0faeecc64155819eb02f89f2246fa8a))

## [1.23.13](https://github.com/Pocket/web-client/compare/v1.23.12...v1.23.13) (2021-10-13)


### Bug Fixes

* **syndicated:** wrap bottom ad in its own section tag ([a7f0df1](https://github.com/Pocket/web-client/commit/a7f0df13fc5d9fe20580882f824c2967208ae894))

## [1.23.12](https://github.com/Pocket/web-client/compare/v1.23.11...v1.23.12) (2021-10-12)


### Bug Fixes

* **home:** add empty result state for similar recs ([d87f056](https://github.com/Pocket/web-client/commit/d87f056a91ef38a76d842a1cfcf3328b5cc69c54))
* **home:** add onboarding for personalized home ([dbf2f8d](https://github.com/Pocket/web-client/commit/dbf2f8d414fb2775bce4033a6ac0bc38828df388))
* **home:** mobile friendly similar/recent ([9076e45](https://github.com/Pocket/web-client/commit/9076e45c5da2cab4a25b7085523ca6eb60922c88))
* **home:** remove personalized onboarding ([dcc6f22](https://github.com/Pocket/web-client/commit/dcc6f228e393c46cc4c0b6e25679017fa3de328c))
* **home:** remove topic squash in deriver ([901ce2e](https://github.com/Pocket/web-client/commit/901ce2e98e9e5c72f7843bf64c9816e45aa58f33))

## [1.23.11](https://github.com/Pocket/web-client/compare/v1.23.10...v1.23.11) (2021-10-12)


### Reverts

* Revert "fix(syndicated): fix bottm ad breaking layout of page" ([1373765](https://github.com/Pocket/web-client/commit/1373765042ecb2247941e92250f8b451f4d40d9c))

## [1.23.10](https://github.com/Pocket/web-client/compare/v1.23.9...v1.23.10) (2021-10-12)


### Bug Fixes

* **syndicated:** fix bottm ad breaking layout of page ([458ac70](https://github.com/Pocket/web-client/commit/458ac7057368e20f32bc9052b9d5fd373bfc5e6c))

## [1.23.9](https://github.com/Pocket/web-client/compare/v1.23.8...v1.23.9) (2021-10-12)


### Bug Fixes

* **account:** add warnings and completions ([3cd338e](https://github.com/Pocket/web-client/commit/3cd338ebe6ab341ab023563dd916e8c03b1cf9d1))
* **account:** appropriate endpoint clear/delete ([4e7db4a](https://github.com/Pocket/web-client/commit/4e7db4a9ed20f1e754212362605e10cd7922e692))
* **account:** privacy warnings and actions ([e803cd5](https://github.com/Pocket/web-client/commit/e803cd5f5d6a1fda22fc0539c4cbdc01499833d4))

## [1.23.8](https://github.com/Pocket/web-client/compare/v1.23.7...v1.23.8) (2021-10-12)


### Bug Fixes

* **chyron:**  make imports test-safe ([ef25ba1](https://github.com/Pocket/web-client/commit/ef25ba13ab53fcbd1375faccd0de977c2b7799ad))
* **chyron:** image loading direct ([8ec8617](https://github.com/Pocket/web-client/commit/8ec8617f2180f10e357bcc28f0ed058cb7ce9671))
* **dependency:** node-fetch ([ed39a9f](https://github.com/Pocket/web-client/commit/ed39a9f60a9cfdbad45e45fea361fa44edb11450))
* **dependency:** react-markdown/webpack5 ([84b51ba](https://github.com/Pocket/web-client/commit/84b51ba574e919f450eb7608c1de464c081ed923))
* **dependency:** remove @pocket/web-utilites ([77080bd](https://github.com/Pocket/web-client/commit/77080bd9d4c9e197c7bf5bb167254200b38fddec))
* **lint:** adjust to use next config ([cee73db](https://github.com/Pocket/web-client/commit/cee73db3a876d9cf91421e80ba0eef24139cdfdc))
* **storybook:** working storybooks ([c4a64a9](https://github.com/Pocket/web-client/commit/c4a64a9581c0e50c92ec21886d9ce11021f558bc))

## [1.23.7](https://github.com/Pocket/web-client/compare/v1.23.6...v1.23.7) (2021-10-05)


### Bug Fixes

* **home:** make rec save more specific ([7a92e17](https://github.com/Pocket/web-client/commit/7a92e1774050bd09ba5fd665efc4d77453f70620))
* **home:** show save status on similar items ([87cec63](https://github.com/Pocket/web-client/commit/87cec638fa931f033278deb9e34d0929a46a9855))

## [1.23.6](https://github.com/Pocket/web-client/compare/v1.23.5...v1.23.6) (2021-10-05)


### Bug Fixes

* **app:** build locale friendly canonical ([e932a70](https://github.com/Pocket/web-client/commit/e932a702f4e090199e10e1706c58c366094230fb))
* **app:** centralized head over specific meta ([47764ca](https://github.com/Pocket/web-client/commit/47764caf8005faa14123e55d9ac786ecfb843441))
* **app:** make sure locale is an available prop ([53b8a44](https://github.com/Pocket/web-client/commit/53b8a44d9309b13d879406308477b7de3c60a388))
* **meta:** set a default metadata ([f325371](https://github.com/Pocket/web-client/commit/f3253716932ee58aaec5216d74cc727123132365))

## [1.23.5](https://github.com/Pocket/web-client/compare/v1.23.4...v1.23.5) (2021-10-04)


### Bug Fixes

* **account:** clear email fields on cancel/confirm ([21fb9d7](https://github.com/Pocket/web-client/commit/21fb9d7bd7cd25a9e6ec67f3ec38c425ded22281))
* **account:** warn on profile images above 2mb ([dcb8f24](https://github.com/Pocket/web-client/commit/dcb8f24e784ea60842ba224faf5a119a9db06ee1))

## [1.23.4](https://github.com/Pocket/web-client/compare/v1.23.3...v1.23.4) (2021-10-04)


### Bug Fixes

* **account:** premium state/component updates ([cccfb98](https://github.com/Pocket/web-client/commit/cccfb98504c876a62ece672b06889c7bc5ed3aa6))

## [1.23.3](https://github.com/Pocket/web-client/compare/v1.23.2...v1.23.3) (2021-10-04)


### Bug Fixes

* **account:** add privacy module ([95ff381](https://github.com/Pocket/web-client/commit/95ff381196efe1ab8bdac8cf1d9f549b63984ae6))

## [1.23.2](https://github.com/Pocket/web-client/compare/v1.23.1...v1.23.2) (2021-09-29)


### Bug Fixes

* **graphql:** adding slate count ([f57f3ea](https://github.com/Pocket/web-client/commit/f57f3ea4710501af5b4acc9c192bd5cfff7739aa))
* **home:** split topics from general slates ([f755338](https://github.com/Pocket/web-client/commit/f75533809061b1ba2aefe759b6645d9cd5dfce60))
* **layout:** adding padding to uncontained ([c9b87d4](https://github.com/Pocket/web-client/commit/c9b87d41234d072d3e0e9bcaea3e0618c5f91aa7))

## [1.23.1](https://github.com/Pocket/web-client/compare/v1.23.0...v1.23.1) (2021-09-29)


### Bug Fixes

* **home:** force unpersonalized home ([7a11433](https://github.com/Pocket/web-client/commit/7a114333e6d84be77884ddcf12d44993965e046a))

# [1.23.0](https://github.com/Pocket/web-client/compare/v1.22.1...v1.23.0) (2021-09-28)


### Bug Fixes

* **account:** add connections ([ecbd0ad](https://github.com/Pocket/web-client/commit/ecbd0ad7538ee2b50609af8cb023fc277c73556f))


### Features

* **account:** add connected services ([f59c761](https://github.com/Pocket/web-client/commit/f59c761991c5ae30c6b29f76d2b7f35f099d2052))

## [1.22.1](https://github.com/Pocket/web-client/compare/v1.22.0...v1.22.1) (2021-09-28)


### Bug Fixes

* **account:** add rss feed section ([e5c5cd6](https://github.com/Pocket/web-client/commit/e5c5cd639642179e7a748a4f9102453ee4b63df7))

# [1.22.0](https://github.com/Pocket/web-client/compare/v1.21.5...v1.22.0) (2021-09-21)


### Features

* **account:** adding notification settings ([46e29b6](https://github.com/Pocket/web-client/commit/46e29b6cf90582732393edc1b448790071500ba1))

## [1.21.5](https://github.com/Pocket/web-client/compare/v1.21.4...v1.21.5) (2021-09-20)


### Bug Fixes

* **card:** update display layout ([ffb014f](https://github.com/Pocket/web-client/commit/ffb014f8d1c75d961cb5ff4b30458c779d008b25))
* **home:** add collection snowplow detail ([f6d84be](https://github.com/Pocket/web-client/commit/f6d84be23beccad3bdba7e6d442d402dfde33d26))
* **home:** add slate meta (temporary) ([cffd05a](https://github.com/Pocket/web-client/commit/cffd05a318753262801e64ee9055bfa21d898f6b))
* **home:** similar remove lineup - add to recent ([73d537b](https://github.com/Pocket/web-client/commit/73d537bee82790570e1d4cd2f5e00d7b1943ea5b))
* **home:** update headers to use slate meta ([7940320](https://github.com/Pocket/web-client/commit/794032092a9592e1190e0047b6ca01bbbab15100))
* **show similar:** add copy options ([f20ff97](https://github.com/Pocket/web-client/commit/f20ff97d0b01f7d3e3ea0aff0972663eda3c71cd))

## [1.21.4](https://github.com/Pocket/web-client/compare/v1.21.3...v1.21.4) (2021-09-20)


### Bug Fixes

* **display settings:** remove chevron icon on mobile ([f8135d5](https://github.com/Pocket/web-client/commit/f8135d51a6c139e262fae79070cb822ae8429419))
* **reader:** adjust size of icons in toolbar on mobile ([a673fc3](https://github.com/Pocket/web-client/commit/a673fc3e774d5903695df02a723a979dc36572d6))

## [1.21.3](https://github.com/Pocket/web-client/compare/v1.21.2...v1.21.3) (2021-09-20)


### Bug Fixes

* **account:** add email state / component update ([29a048b](https://github.com/Pocket/web-client/commit/29a048ba236b2ab0002b41a360913597d61641fe))
* **account:** copy fixes ([ff26f6f](https://github.com/Pocket/web-client/commit/ff26f6f698bee5d06dc933b4b891611f6d24c54f))

## [1.21.2](https://github.com/Pocket/web-client/compare/v1.21.1...v1.21.2) (2021-09-17)


### Bug Fixes

* **account:** add profile container ([f5b4943](https://github.com/Pocket/web-client/commit/f5b4943bf1cbb85748e1bdefe0cf837710a54c74))
* **account:** cleanup data-cy and regression ([614f1fc](https://github.com/Pocket/web-client/commit/614f1fc8f267cce66a35f401a7014ac8739ef161))
* **account:** profile actions ([e9d3627](https://github.com/Pocket/web-client/commit/e9d3627d0ab629df303bc90912b7ad462008aa64))
* **account:** profile api ([f6f6ba0](https://github.com/Pocket/web-client/commit/f6f6ba0e9e0e1a63e1cc5c1e47816ab4d2ecc956))
* **account:** update profile/avatar components ([db3ebc0](https://github.com/Pocket/web-client/commit/db3ebc07e7c688915748ec89f12f387a7eee35fc))
* **acount:** cleanup profile ([e648a34](https://github.com/Pocket/web-client/commit/e648a34b0ff39c951dac18865b3d3d6d95889b71))
* **acount:** profile details actions ([bc7c3d8](https://github.com/Pocket/web-client/commit/bc7c3d80379b173f16138955313e5a065f568272))
* **errors:** add error keys from backend ([c2e96f4](https://github.com/Pocket/web-client/commit/c2e96f42149a55b49893ae58c46441bf849ec3ed))

## [1.21.1](https://github.com/Pocket/web-client/compare/v1.21.0...v1.21.1) (2021-09-16)


### Bug Fixes

* **account:** add component scaffold and stories ([3df70a6](https://github.com/Pocket/web-client/commit/3df70a672522070bd489e194694e9d7d59b95080))
* **account:** remove extraneous divs / cleanup ([120bbf5](https://github.com/Pocket/web-client/commit/120bbf588479d9aae90591391e11e5af399416fb))

# [1.21.0](https://github.com/Pocket/web-client/compare/v1.20.17...v1.21.0) (2021-09-16)


### Features

* **account:** adding account page /w sidenav ([7754a8c](https://github.com/Pocket/web-client/commit/7754a8cf5223c827301560cf16319f4d58f02647))

## [1.20.17](https://github.com/Pocket/web-client/compare/v1.20.16...v1.20.17) (2021-09-16)


### Bug Fixes

* **list-sort:** add data-cy ([3e6a06d](https://github.com/Pocket/web-client/commit/3e6a06da1ad8c94f37985c73b5484a145beb6a31))

## [1.20.16](https://github.com/Pocket/web-client/compare/v1.20.15...v1.20.16) (2021-09-16)


### Bug Fixes

* **collections:** updating raw // ([5bd6402](https://github.com/Pocket/web-client/commit/5bd6402bcc0c551a02fd7e429e4669d38b9e1165))

## [1.20.15](https://github.com/Pocket/web-client/compare/v1.20.14...v1.20.15) (2021-09-15)


### Bug Fixes

* **report:** disable submit button until options are selected ([17c2df4](https://github.com/Pocket/web-client/commit/17c2df4bffc0e5beae7edab205723e00233020e3))

## [1.20.14](https://github.com/Pocket/web-client/compare/v1.20.13...v1.20.14) (2021-09-15)


### Bug Fixes

* **home:** prefer syndicated article publisher ([383bfde](https://github.com/Pocket/web-client/commit/383bfde281dd7c7590f748bf68e66cffc3ac30b5))

## [1.20.13](https://github.com/Pocket/web-client/compare/v1.20.12...v1.20.13) (2021-09-14)


### Bug Fixes

* **extensions flyaway:** reorder browsers ([4802bab](https://github.com/Pocket/web-client/commit/4802bab8a89a972b1001475e0f7aa73fd4d122aa))
* **image:** update firefox icon to new version ([20525eb](https://github.com/Pocket/web-client/commit/20525eb1f490e7c32331b00db9c6f291aab8e3ba))

## [1.20.12](https://github.com/Pocket/web-client/compare/v1.20.11...v1.20.12) (2021-09-13)


### Bug Fixes

* **package:** bump web-ui package to latest ([3de503b](https://github.com/Pocket/web-client/commit/3de503bc30fef51e5403cad59512c68e208358ca))
* **search:** add APP_SORT_ORDER_RELEVANCE to state and update my list ([0ebab28](https://github.com/Pocket/web-client/commit/0ebab28a9533413e6ead98e76298e45c7ae6264a))
* **search:** add back sortIcon ([1366975](https://github.com/Pocket/web-client/commit/1366975fc63e03ed6f25eb8f512e960f715b0895))
* **search:** add empty array to useEffect hook ([3408ca0](https://github.com/Pocket/web-client/commit/3408ca0208d754f22a3a21ea62670d850eb48d06))
* **search:** add keyboard support for SearchSortPremium ([f29273b](https://github.com/Pocket/web-client/commit/f29273b3d21eeb75b58318ef49f2f3817e937cb0))
* **search:** add SearchSortPremium component ([eae945b](https://github.com/Pocket/web-client/commit/eae945b6a5ad81e4c6c46e6f0288880f0067b30f))
* **search:** focus on search input immediately ([2c25862](https://github.com/Pocket/web-client/commit/2c2586251eb34b00bebdcb08b278cbfa40621e0b))
* **search:** pass isPremium ([ec17e81](https://github.com/Pocket/web-client/commit/ec17e817b500ddd1254b5586c9fd514f4f3b1a89))
* **search:** remove SearchSortPremium ([a67a038](https://github.com/Pocket/web-client/commit/a67a038a61212ef47955ea4244eb4ea610a7f8fd))
* **search:** use ListSort component, use isPremium to determine showRelevance ([1aaf04e](https://github.com/Pocket/web-client/commit/1aaf04e126253d2497497731b1873f6f929d6244))
* **sorting:** dispatch actions from containers, pass events to list-sort component ([0d2456e](https://github.com/Pocket/web-client/commit/0d2456eba6c56f8484662235ee8b306ddb6b1c38))
* **sorting:** remove APP_SORT_ORDER_TOGGLE, using only explicit sorting actions now ([0e34e88](https://github.com/Pocket/web-client/commit/0e34e8837f8dc0ed9e430b2a2d10fbdad82b8732))
* **sorting:** remove superfluous sortIconWithRelevance, console.log ([94f249a](https://github.com/Pocket/web-client/commit/94f249a494e7110ff128174ff68fd419bd62148a))
* **sorting:** remove toggleSortOrder - no longer used by ListSort ([09d14ac](https://github.com/Pocket/web-client/commit/09d14ace9ccb578325d3790cd05d8881d0bd02c2))
* **sorting:** update ListSort to use PopupMenu for displaying options ([66ae008](https://github.com/Pocket/web-client/commit/66ae008fb4ca577be7e98afb78abd81a36e65c42))
* **sorting:** update translation keys ([3f17e2c](https://github.com/Pocket/web-client/commit/3f17e2c41f6b2eb677c2f9757ed90e36789ca541))

## [1.20.11](https://github.com/Pocket/web-client/compare/v1.20.10...v1.20.11) (2021-09-09)


### Bug Fixes

* **localization:** updating localization package for onboarding messages ([5ee79a6](https://github.com/Pocket/web-client/commit/5ee79a6f77ee46bd39a9aeb6eec4f108a73dc8f6))

## [1.20.10](https://github.com/Pocket/web-client/compare/v1.20.9...v1.20.10) (2021-09-09)


### Bug Fixes

* **footer:** add language selector for all users ([3dc4100](https://github.com/Pocket/web-client/commit/3dc4100837477adeeadcd5f26fd9d56444cf0967))

## [1.20.9](https://github.com/Pocket/web-client/compare/v1.20.8...v1.20.9) (2021-09-08)


### Bug Fixes

* **qa:** adding data-cy element to qa panel ([40350dd](https://github.com/Pocket/web-client/commit/40350dd38fe3a416043cddc4a1be2eb1e0144f93))

## [1.20.8](https://github.com/Pocket/web-client/compare/v1.20.7...v1.20.8) (2021-09-07)


### Bug Fixes

* **home:** add proper personalized lineup ([280831a](https://github.com/Pocket/web-client/commit/280831a15259df3a85bf5af2fc2da95cc8fa8815))

## [1.20.7](https://github.com/Pocket/web-client/compare/v1.20.6...v1.20.7) (2021-09-02)


### Bug Fixes

* **snowplow:** update snowplow post path for dev enviroments ([a181b80](https://github.com/Pocket/web-client/commit/a181b804219104812a92ed23b385c8cfd96ed18b))

## [1.20.6](https://github.com/Pocket/web-client/compare/v1.20.5...v1.20.6) (2021-09-02)


### Bug Fixes

* **flyaway:** update extension flyaway for mobile view ([a070567](https://github.com/Pocket/web-client/commit/a0705677206c31b9abd153116d476cd93860c921))
* **onboarding:** adding extensions flyaway ([7f07fa4](https://github.com/Pocket/web-client/commit/7f07fa4da212fd7db7645c4581f883028d7b36ca))
* **onboarding:** update edge extension link ([732815a](https://github.com/Pocket/web-client/commit/732815a6c6e53456f35648c6ee5447595a1af4b8))

## [1.20.5](https://github.com/Pocket/web-client/compare/v1.20.4...v1.20.5) (2021-09-02)


### Bug Fixes

* **dependencies:** update next-redux-wrapper ([c31ca24](https://github.com/Pocket/web-client/commit/c31ca24cda57c988e805f03b33cead21675a7218))

## [1.20.4](https://github.com/Pocket/web-client/compare/v1.20.3...v1.20.4) (2021-09-01)


### Bug Fixes

* **localization:** bump localization for missing flyaway translation ([a45ec43](https://github.com/Pocket/web-client/commit/a45ec433c820bfedd06de412439c832486192362))

## [1.20.3](https://github.com/Pocket/web-client/compare/v1.20.2...v1.20.3) (2021-08-31)


### Bug Fixes

* **reader:** hide sidebar until content is loaded to prevent flash ([29896ea](https://github.com/Pocket/web-client/commit/29896ea92c2804bfcda801b226825aea2cb4ea1d))
* **reader:** remove opacity on sidebar ([a5dace0](https://github.com/Pocket/web-client/commit/a5dace060f00d66c9e80b332f78fa5094b314aeb))

## [1.20.2](https://github.com/Pocket/web-client/compare/v1.20.1...v1.20.2) (2021-08-30)


### Bug Fixes

* **search:** encode search term ([a581091](https://github.com/Pocket/web-client/commit/a581091180d5820922ebf676da7cee760e2386c1))

## [1.20.1](https://github.com/Pocket/web-client/compare/v1.20.0...v1.20.1) (2021-08-30)


### Bug Fixes

* **sidebar:** encode tags link in sidebar ([8c95d84](https://github.com/Pocket/web-client/commit/8c95d84879f50b126e902e1d36977d3d872539e8))

# [1.20.0](https://github.com/Pocket/web-client/compare/v1.19.9...v1.20.0) (2021-08-30)


### Bug Fixes

* **languages:** language selector behind a flag ([5e50b59](https://github.com/Pocket/web-client/commit/5e50b596ce2318e32a5dcb557283137bf0a17741))


### Features

* **app:** add language selector to footer ([1427e57](https://github.com/Pocket/web-client/commit/1427e57bd6c72d02e83b07bbe4759c40d8116422))

## [1.19.9](https://github.com/Pocket/web-client/compare/v1.19.8...v1.19.9) (2021-08-30)


### Bug Fixes

* **home:** wrap all home text with translation function ([527bace](https://github.com/Pocket/web-client/commit/527baceccad4dc43e57b2fdbcbf1ca366bdf640e))
* **localization:** bump localization in package and update consts and wrapper on flyaway ([5abed8f](https://github.com/Pocket/web-client/commit/5abed8fcb8444866a233fd274175a2735a69fe21))

## [1.19.8](https://github.com/Pocket/web-client/compare/v1.19.7...v1.19.8) (2021-08-30)


### Bug Fixes

* **global-nav:** update pocket logo link depending on logged in status ([c8932c6](https://github.com/Pocket/web-client/commit/c8932c67948251c9343c7581b50e0eb1daa19853))

## [1.19.7](https://github.com/Pocket/web-client/compare/v1.19.6...v1.19.7) (2021-08-25)


### Bug Fixes

* **flyaway:** add default data-cy string ([91c3ec2](https://github.com/Pocket/web-client/commit/91c3ec21efe7c606cfa3cde37288488256164e8f))
* **flyaway:** fix pointer events conflict ([314b56e](https://github.com/Pocket/web-client/commit/314b56e217947f9dbde8f510f540ab41d7606c03))
* **flyaways:** add data-cy elements to all flyaways ([76ae268](https://github.com/Pocket/web-client/commit/76ae268b28a9a9737aeceaf746654662989a88a0))

## [1.19.6](https://github.com/Pocket/web-client/compare/v1.19.5...v1.19.6) (2021-08-25)


### Bug Fixes

* **onboarding:** add ability to pass style overrides to flyaway component ([b21cc70](https://github.com/Pocket/web-client/commit/b21cc70bdfd2eb117199c8ffea3b0dd52180f5fa))
* **onboarding:** add Apps Flyaway to reader ([f1da377](https://github.com/Pocket/web-client/commit/f1da377ad940897379297b78b200447f3fc6094b))
* **onboarding:** add reader flyaway to my list page ([a8db928](https://github.com/Pocket/web-client/commit/a8db9282eb7e4f45a04ca37992346b5c5a44633e))
* **onboarding:** add snowplow events when apple or google badge is opened ([64ac8f6](https://github.com/Pocket/web-client/commit/64ac8f63f24f228da68c770d818f1e4fa573d248))
* **onboarding:** cleanup flyaway styles, wrappers ([15aa382](https://github.com/Pocket/web-client/commit/15aa382aa1288d32c2ca7e13ef9e89eaa266207f))
* **onboarding:** close reader flyaway when user opens an item in reader ([ee2cac7](https://github.com/Pocket/web-client/commit/ee2cac72a7bf671393fa50519dfe2b87ca4097ca))
* **onboarding:** fix translation ([e017d98](https://github.com/Pocket/web-client/commit/e017d989dbac92820ff9be139ce6d1ff947da3fc))
* **onboarding:** forgot some more whitespace ([d01c284](https://github.com/Pocket/web-client/commit/d01c284ad90cf64e243df7c39bd9ff29e677be8d))
* **onboarding:** remove extra <> ([cc83b1b](https://github.com/Pocket/web-client/commit/cc83b1b8e40d94b5787d312504c4ac2eb7e1b08f))
* **onboarding:** remove unnecessary props being passed to flyaway ([c8249c0](https://github.com/Pocket/web-client/commit/c8249c0e1af9cd398fdb8ea47b65600fda8ebf49))
* **onboarding:** remove whitespace ([173ca1e](https://github.com/Pocket/web-client/commit/173ca1e6955e240ce1e05b9e4b9fb99cdece8e01))
* **onboarding:** removing more whitespace ([f5e2d66](https://github.com/Pocket/web-client/commit/f5e2d66d3d3945b6b48b628726c9fc4dcb233fb9))
* **onboarding:** update My List flyaway to close based on MYLIST_UPDATE_REQUEST ([0e08a85](https://github.com/Pocket/web-client/commit/0e08a85062a33fbc9a2dd99ccb22147c8e2a9e89))

## [1.19.5](https://github.com/Pocket/web-client/compare/v1.19.4...v1.19.5) (2021-08-25)


### Bug Fixes

* **collections:** update localization file for german translation of collections ([1fbc633](https://github.com/Pocket/web-client/commit/1fbc6335c58e685c0b017fd91b5a86a9d63ea469))

## [1.19.4](https://github.com/Pocket/web-client/compare/v1.19.3...v1.19.4) (2021-08-25)


### Bug Fixes

* **partner:** styling fixes for dark and sepia modes ([0c78921](https://github.com/Pocket/web-client/commit/0c7892104a2066af3365f92f2c5a6e7d2918e872))

## [1.19.3](https://github.com/Pocket/web-client/compare/v1.19.2...v1.19.3) (2021-08-25)


### Bug Fixes

* **collection:** remove unnecessary check of partnership presence ([7e45749](https://github.com/Pocket/web-client/commit/7e457493048c4c5e647db97cb383fc35ba48b828))
* **collections:** add partner components and stories ([7dcea61](https://github.com/Pocket/web-client/commit/7dcea61dceff3f1592d99caad406a7479cbb52bd))
* **collections:** add partner locale to constants ([e9991fb](https://github.com/Pocket/web-client/commit/e9991fb68d8fe72428da38d0cddd1ed9cc5085ba))
* **collections:** add partnership info to collection page ([6db9d7a](https://github.com/Pocket/web-client/commit/6db9d7a7b340fcdc740306c0dc2bcb2cef05910c))
* **collections:** update getCollectionBySlug graphQL query to grab partnership info ([3435692](https://github.com/Pocket/web-client/commit/34356926eb235341d10c380657b73f6788b65651))
* **partner:** refactor to allow for more partner types in the future ([350d32b](https://github.com/Pocket/web-client/commit/350d32b157aeb363a101ad0b50bbaef16d204f2c))
* **save-article:** fix localization pulling the wrong text ([e73489c](https://github.com/Pocket/web-client/commit/e73489ced46265181a2fed2d5ef58591cb32db6c))

## [1.19.2](https://github.com/Pocket/web-client/compare/v1.19.1...v1.19.2) (2021-08-24)


### Bug Fixes

* **home:** adjust similar recs shape ([3463985](https://github.com/Pocket/web-client/commit/3463985d055c8c3374754d0ffe4f561e4dca3462))

## [1.19.1](https://github.com/Pocket/web-client/compare/v1.19.0...v1.19.1) (2021-08-24)


### Bug Fixes

* **collections:** display collections card excerpt on mobile screen sizes ([509a46d](https://github.com/Pocket/web-client/commit/509a46d97da158868a2f05b14e28ca53f0faef87))
* **collections:** update card style to be grid style on mobile ([6e3d031](https://github.com/Pocket/web-client/commit/6e3d031a99479534574988d02f00d42d71d72da1))

# [1.19.0](https://github.com/Pocket/web-client/compare/v1.18.5...v1.19.0) (2021-08-24)


### Bug Fixes

* **card:** add `display` type ([ffa83b6](https://github.com/Pocket/web-client/commit/ffa83b6c07dbd9cefde84533299e684493a62878))
* **home:** filter bad data from similar recs ([0db273b](https://github.com/Pocket/web-client/commit/0db273bd47abe95ee40e0afc9e11e618cb4be432))
* **home:** seperate layouts / better experiments ([1adb891](https://github.com/Pocket/web-client/commit/1adb8911b94059dfafb1e3541c6049ea80e7bc12))


### Features

* **home:** recent saves/similar content modules ([a9137bd](https://github.com/Pocket/web-client/commit/a9137bd8cb6c185fff3b12241244500274a74c85))

## [1.18.5](https://github.com/Pocket/web-client/compare/v1.18.4...v1.18.5) (2021-08-23)


### Bug Fixes

* **onetrust:** add comment on global function ([a74d464](https://github.com/Pocket/web-client/commit/a74d46430b08639dff99949aec465d5efdac38af))
* **onetrust:** only init snowplow after onetrust is ready ([53abf61](https://github.com/Pocket/web-client/commit/53abf61a33db061a88ce9759c7fd30a9c3ec4b20))

## [1.18.4](https://github.com/Pocket/web-client/compare/v1.18.3...v1.18.4) (2021-08-23)


### Bug Fixes

* **mylist:** update my list when navigating from other area of app ([d73823e](https://github.com/Pocket/web-client/commit/d73823ec9060ebb7a9d04ad72aa3fac0cda82fcd))

## [1.18.3](https://github.com/Pocket/web-client/compare/v1.18.2...v1.18.3) (2021-08-23)


### Bug Fixes

* **flyaway:** add fade in animation on flyaway ([0b71fa0](https://github.com/Pocket/web-client/commit/0b71fa0784d6d91718dac0bec77f6b9184f1433b))
* **flyaway:** update animation to ease-in-out ([e385aa9](https://github.com/Pocket/web-client/commit/e385aa90716167133847ae7b4fc1d780c607958a))
* **flyaway:** update flyaway to take show prop and use that for animation ([54e857f](https://github.com/Pocket/web-client/commit/54e857f98b9458ba78d15016c2247793c2cf2797))
* **onboarding:** add ability to show onboarding highlight in mobile nav menu ([e463d3b](https://github.com/Pocket/web-client/commit/e463d3b776e1c4210c7897672660846065106ec7))
* **onboarding:** add component to fix impression event ([1bd2c99](https://github.com/Pocket/web-client/commit/1bd2c995e025489e112ef1e96b62083fc858bcc3))
* **onboarding:** add HomeFlyawayMyList ([3ba7568](https://github.com/Pocket/web-client/commit/3ba75688e6ce106e0efaa1eca280f88eab72b82b))
* **onboarding:** extract onboarding highlight animation so it can be reused ([63135e0](https://github.com/Pocket/web-client/commit/63135e07b87985398441f8c552c8c942fffbf233))
* **onboarding:** rename saveFlyaway to homeFlyawaySave for consistency ([b5a5e42](https://github.com/Pocket/web-client/commit/b5a5e421b68b2675dc1cf8d9e1855362789228f5))
* **onboarding:** save settings when My List Flyaway is closed ([e53c3b7](https://github.com/Pocket/web-client/commit/e53c3b7964315ec97cc04b781c53c682281421eb))

## [1.18.2](https://github.com/Pocket/web-client/compare/v1.18.1...v1.18.2) (2021-08-19)


### Bug Fixes

* **reader:** hide sidebar unless open ([139f751](https://github.com/Pocket/web-client/commit/139f751a0a7847cf3ca929870cb3aec57a7c8802))

## [1.18.1](https://github.com/Pocket/web-client/compare/v1.18.0...v1.18.1) (2021-08-19)


### Bug Fixes

* **snowplow:** upgrade snowplow to 3.1.2 and update onetrust toggle ([1ac1665](https://github.com/Pocket/web-client/commit/1ac1665e6075cce50325edb8d53b94a32c8465f3))

# [1.18.0](https://github.com/Pocket/web-client/compare/v1.17.9...v1.18.0) (2021-08-18)


### Bug Fixes

* **cards:** cards/layouts/headers for lineups ([b848e00](https://github.com/Pocket/web-client/commit/b848e00118381179562d550f113bb0ab91157343))
* **greeting:** revert greeting to an addendum ([b02106a](https://github.com/Pocket/web-client/commit/b02106a6e550fcd184c77ac3630bac62cb3084a3))
* **home:** add lineup snowplow action ([55560ee](https://github.com/Pocket/web-client/commit/55560ee2b96d4b4a71d6dacb4a9cbbfd2df4621c))
* **home:** passing proper lineup data to analytics ([31f9387](https://github.com/Pocket/web-client/commit/31f9387ba6ae7b49bf5d47a272fa7586f0b71c74))
* **home:** split classic from profile driven ([c894ff5](https://github.com/Pocket/web-client/commit/c894ff505b9794f99895309c60c86bbd4672bbe3))
* **offset list:** pass through showExcerpt ([4e3135c](https://github.com/Pocket/web-client/commit/4e3135cad19b503e971b6ff3ea10ef8de2030add))


### Features

* **home:** adding lineup cards/actions ([59cf346](https://github.com/Pocket/web-client/commit/59cf34694f150add38d01fa8dbb239617c425eb2))
* **home:** adding lineup state ([cdac7d8](https://github.com/Pocket/web-client/commit/cdac7d82c1858572d209310492de438e88afeb63))
* **home:** better separation of files ([353fc1b](https://github.com/Pocket/web-client/commit/353fc1b2579807699b88b7cb343b184d434c2dbe))

## [1.17.9](https://github.com/Pocket/web-client/compare/v1.17.8...v1.17.9) (2021-08-18)


### Bug Fixes

* **close-button:** extract CloseButton out from Modal so it can be reused ([dca9bd2](https://github.com/Pocket/web-client/commit/dca9bd229b2c73482a77e16f560481f42c287b90))
* **flyaway:** add flyaway component and story ([657cad1](https://github.com/Pocket/web-client/commit/657cad19a9bfa05e35b8bd09eb60a60ad88b98a1))
* **flyaway:** add highlight feature to save flyaway ([fd40191](https://github.com/Pocket/web-client/commit/fd40191962bfafa7637b59f6d7fea82f9a17f5b9))
* **flyaway:** add pulse animation, cleanup css ([69ac588](https://github.com/Pocket/web-client/commit/69ac5881c851a28a18dd923ce3785901960f54ea))
* **flyaway:** className instead of class ([caaa524](https://github.com/Pocket/web-client/commit/caaa52405690eeccf5a6cb81098750a9d5fcf79c))
* **flyaway:** close button should sit at top when there is a long title ([6bf43b1](https://github.com/Pocket/web-client/commit/6bf43b1672f067e52c834e77a51f36bc20471be9))
* **flyaway:** update placement, grid column sizing and responsiveness ([963e576](https://github.com/Pocket/web-client/commit/963e576bfa904b3dcc272844ff5d48fdb2418fc1))
* **onboarding:** add analytics event for flyaway.save.close ([da89ce8](https://github.com/Pocket/web-client/commit/da89ce8c7b57762c1eb0bb1883ab5a4326acac5b))
* **onboarding:** add component to onboarding.flyaway.save.impression snowplow event ([4c383db](https://github.com/Pocket/web-client/commit/4c383db55f437bfd8c8ce66f0ddbe4137596e1dd))
* **onboarding:** add translations and snowplow events ([c6890e9](https://github.com/Pocket/web-client/commit/c6890e9b61a2441961e524ef61376dc1b9cfbcb3))
* **onboarding:** adjusting styles per VQA session ([f0196a5](https://github.com/Pocket/web-client/commit/f0196a53e8d50e6c2ffc5d655d59bddd1b8445ab))
* **onboarding:** hook save flyaway up to onboarding state, allow for dismissal of message ([a558eb7](https://github.com/Pocket/web-client/commit/a558eb772ae1238885a584696cc19c666f28350b))
* **onboarding:** pass handleClose to Flyaway ([0265f5e](https://github.com/Pocket/web-client/commit/0265f5e0a9fa121504be4c23c195326fd9fddd0c))
* **onboarding:** remove flyaway import from home ([1ed8a02](https://github.com/Pocket/web-client/commit/1ed8a023d99cd884f4d5233bf01bfbf549bbbdfe))
* **onboarding:** rename OnboardingModal to be HomeWelcomeModal ([7487166](https://github.com/Pocket/web-client/commit/7487166c8a3d4b1f5fe354a739cab1a0a0ba4cad))
* **onboarding:** show home.flyaway.save via the onboarding connector ([5a95fbc](https://github.com/Pocket/web-client/commit/5a95fbc59f57405b856e9227bdc88024bf8812b2))
* **onboarding:** temporarily add flyaway to home to test it ([54a25e7](https://github.com/Pocket/web-client/commit/54a25e75d7f15577e5792180904b0ffc8b2d761a))
* **onboarding:** update save flyaway impression event to be dialog uiType ([30d6b5f](https://github.com/Pocket/web-client/commit/30d6b5fb8d3f76f84ddd996514a354642feba521))

## [1.17.8](https://github.com/Pocket/web-client/compare/v1.17.7...v1.17.8) (2021-08-16)


### Bug Fixes

* **dev tools:** adjust toggle and state ([eb64005](https://github.com/Pocket/web-client/commit/eb64005035d659a514b59f797b89a723f4896de0))
* **dev tools:** language selector ([b8a9450](https://github.com/Pocket/web-client/commit/b8a945011db14d781716c431c68f104cbf23e597))
* **dev tools:** suppress snowplow dev messaging ([d2a1179](https://github.com/Pocket/web-client/commit/d2a11790bd53488e38a9c8f831422889c26926b4))

## [1.17.7](https://github.com/Pocket/web-client/compare/v1.17.6...v1.17.7) (2021-08-11)


### Bug Fixes

* **onboarding:** amend comment to document the issue is occurring on smaller devices ([f8146af](https://github.com/Pocket/web-client/commit/f8146af12ca163dcb9926cd7096b8f968b7ade77))
* **onboarding:** fix onboarding modal being too tall and getting cut off on mobile chrome/safari ([08b31eb](https://github.com/Pocket/web-client/commit/08b31ebe12ad56d414aebb7f05e48f66df7592dd))

## [1.17.6](https://github.com/Pocket/web-client/compare/v1.17.5...v1.17.6) (2021-08-10)


### Bug Fixes

* **collections:** update revalidation config ([84c8959](https://github.com/Pocket/web-client/commit/84c89592e505a7ed13f4c120703e0f2107ce4f01))

## [1.17.5](https://github.com/Pocket/web-client/compare/v1.17.4...v1.17.5) (2021-08-10)


### Bug Fixes

* **home:** rename home function back to home after random renaming ([235d0b3](https://github.com/Pocket/web-client/commit/235d0b3519ac7b31859a0b656c004452d93cb8ce))
* **waypoint:** detect browser language and send to mylist if not en ([fbace2b](https://github.com/Pocket/web-client/commit/fbace2b38860db24b387a60c7ed3abbe99f19444))

## [1.17.4](https://github.com/Pocket/web-client/compare/v1.17.3...v1.17.4) (2021-08-09)


### Bug Fixes

* **devtools:** add devtools on production for labs users ([d547dfd](https://github.com/Pocket/web-client/commit/d547dfd5acfd4df8d3986141830196490b21c4ee))

## [1.17.3](https://github.com/Pocket/web-client/compare/v1.17.2...v1.17.3) (2021-08-09)


### Bug Fixes

* **profile analytics:** rec event use resolved url ([cb004ab](https://github.com/Pocket/web-client/commit/cb004abc58c1dfd63bc22de4755d6bb5290eafbb))

## [1.17.2](https://github.com/Pocket/web-client/compare/v1.17.1...v1.17.2) (2021-08-09)


### Bug Fixes

* **onboarding:** move onboarding modal to own component to ease checking flags ([c7fc92e](https://github.com/Pocket/web-client/commit/c7fc92e92bb86a7b2b51b8002e2d9da4dd3b4bef))
* **waypoint:** add onboarding.release flag ([41ac453](https://github.com/Pocket/web-client/commit/41ac45344314c80ce51577b23cfe323c07711f33))

## [1.17.1](https://github.com/Pocket/web-client/compare/v1.17.0...v1.17.1) (2021-08-09)


### Bug Fixes

* **feature:** add fallback hydration on bad data ([fdb3e9e](https://github.com/Pocket/web-client/commit/fdb3e9e210615cc9f86d048434276fd895c2b5bd))
* **nav:** remove reliance on flags for nav render ([cc134c3](https://github.com/Pocket/web-client/commit/cc134c3f48c2195121c0d034741c95dc9fdb711d))

# [1.17.0](https://github.com/Pocket/web-client/compare/v1.16.10...v1.17.0) (2021-08-09)


### Bug Fixes

* **collections:** omit topics on non en ([bc94017](https://github.com/Pocket/web-client/commit/bc94017687d62c6276dc0d29d1b0f2801e8d54f5))


### Features

* **collections:** add locale to request ([beb20b7](https://github.com/Pocket/web-client/commit/beb20b73353c35f94e9fc95b1a46e9481655a1ca))
* **collections:** pass locale from fetch ([c429c03](https://github.com/Pocket/web-client/commit/c429c03597648916010614f2b1878b772ffc6efe))

## [1.16.10](https://github.com/Pocket/web-client/compare/v1.16.9...v1.16.10) (2021-08-06)


### Bug Fixes

* **onboarding:** add snowplow event for skipping onboarding modal ([fde0b9b](https://github.com/Pocket/web-client/commit/fde0b9b02ba74be71d42a437402469d0f4d3b7bf))

## [1.16.9](https://github.com/Pocket/web-client/compare/v1.16.8...v1.16.9) (2021-08-05)


### Bug Fixes

* **filterSettings:** return empty object if no settings ([fd2cf58](https://github.com/Pocket/web-client/commit/fd2cf586536c76f69ed64337ea3a06a02d7a7618))
* **filterSettings:** return empty object if no settings ([63dccc1](https://github.com/Pocket/web-client/commit/63dccc192463a15c326abb687b09c7fb49f19031))
* **home:** check for onboardingDev feature flag & then show onboarding modal ([77fcfd2](https://github.com/Pocket/web-client/commit/77fcfd2e34226d6794033a2c67d5416d9b261922))
* **home:** check for onboardingDev feature flag & then show onboarding modal ([478ee84](https://github.com/Pocket/web-client/commit/478ee84beea251e7fbd8468f6154d71138b9da04))
* **home:** update padding on mobile sizes for topic selector ([4849590](https://github.com/Pocket/web-client/commit/4849590eeba48de8184e664026c3198a8f83aacc))
* **home:** update page headings and topic selector placement ([ec6606c](https://github.com/Pocket/web-client/commit/ec6606c18ceb975eb3dbf7c92e02c7db970c6602))
* **home:** update page headings and topic selector placement ([3b4c6ff](https://github.com/Pocket/web-client/commit/3b4c6ff5f171f7d86c248bfebd0b2366c0be5c81))
* **onboarding:** add topic toggle events for onboarding ([db8da4d](https://github.com/Pocket/web-client/commit/db8da4df38676706f13df0df6fd94cce273ac51f))
* **onboarding:** add topic toggle events for onboarding ([cf72375](https://github.com/Pocket/web-client/commit/cf72375d5068ce2b12049c49c606161f4eabc1ac))
* **onboarding:** adding snowplow events for onboarding welcome modal ([65a265b](https://github.com/Pocket/web-client/commit/65a265b321d5c825f8185321569d2dba58dbe71c))
* **onboarding:** adding snowplow events for onboarding welcome modal ([3e498e9](https://github.com/Pocket/web-client/commit/3e498e91455d2cc780b41d48e59d90ccf2d7eff5))
* **onboarding:** allow devs to reset onboarding via dev tools panel ([eae3cf6](https://github.com/Pocket/web-client/commit/eae3cf6c7467864d94039fb550ea00318b95ae08))
* **onboarding:** allow devs to reset onboarding via dev tools panel ([03dae6e](https://github.com/Pocket/web-client/commit/03dae6e453fce9011ce3d349972af8e8d555db39))
* **onboarding:** change modal button type based on if topics are selected ([9ea7083](https://github.com/Pocket/web-client/commit/9ea708356ed055d23d4be22cda8310676a613cfc))
* **onboarding:** change modal button type based on if topics are selected ([ecb8cd1](https://github.com/Pocket/web-client/commit/ecb8cd197dfc2bdfb8d8c42e5d9221d94d649285))
* **onboarding:** show onboarding topics modal on home ([d0210a2](https://github.com/Pocket/web-client/commit/d0210a26c2e35ebb8b131c5240a9439a0fee3783))
* **onboarding:** show onboarding topics modal on home ([8a6fdf7](https://github.com/Pocket/web-client/commit/8a6fdf72a721b104eb82c23d2007258a8777b156))
* **onboarding:** update background color for dark theme ([11ab339](https://github.com/Pocket/web-client/commit/11ab3392aa98f46bb7bd06c1810e6a316afb98a2))
* **onboarding:** update background color for dark theme ([f8bad3b](https://github.com/Pocket/web-client/commit/f8bad3b6f7011eee63b76eba6863963964cd5416))
* **onboarding:** update modal styles with proper graphics ([24c3878](https://github.com/Pocket/web-client/commit/24c38789bfcd137d5b0595a3d3e2471eeb3ed3c1))
* **onboarding:** update modal styles with proper graphics ([a213ecf](https://github.com/Pocket/web-client/commit/a213ecf86c301ec11c3d483d4155d3538afd4843))
* **onboarding modal:** add copy ([7e81d4e](https://github.com/Pocket/web-client/commit/7e81d4e77450e54eb0135b074f3a57ec92dccff0))
* **onboarding modal:** add copy ([91d332c](https://github.com/Pocket/web-client/commit/91d332c70d81a94b59b75ae80117ce23c1f9eab7))
* **svg:** fix rainbow-reader-transparent.svg to not have top swoop ([abbf4c4](https://github.com/Pocket/web-client/commit/abbf4c45ca7085e468b5d7585ae9720861111f73))
* **svg:** fix rainbow-reader-transparent.svg to not have top swoop ([f022151](https://github.com/Pocket/web-client/commit/f022151cdbdbb3caba076666eae8df2e920be473))
* **topicSelector:** pull topicSelector into separate connector ([933f403](https://github.com/Pocket/web-client/commit/933f403a36a2c2602e82c6847f1dbd9e02ae8d5c))
* **topicSelector:** pull topicSelector into separate connector ([164c00c](https://github.com/Pocket/web-client/commit/164c00c312f1eade3af00a57e37936967e02860d))

## [1.16.8](https://github.com/Pocket/web-client/compare/v1.16.7...v1.16.8) (2021-08-02)


### Bug Fixes

* **collections:** add signup callout to collections for logged out users ([c66765b](https://github.com/Pocket/web-client/commit/c66765b5438dd790e423a00e25dcabc1ad0245d0))

## [1.16.7](https://github.com/Pocket/web-client/compare/v1.16.6...v1.16.7) (2021-07-29)


### Bug Fixes

* **home:** display two latest collections ([37322e7](https://github.com/Pocket/web-client/commit/37322e716084c2c55cf1369819e3d5453a8fcf56))

## [1.16.6](https://github.com/Pocket/web-client/compare/v1.16.5...v1.16.6) (2021-07-29)


### Bug Fixes

* **home:** remove padding on topic selector for mobile ([60ebd6d](https://github.com/Pocket/web-client/commit/60ebd6d1dcd6ac89bd60c9a4eb536b8a5f6c24c4))

## [1.16.5](https://github.com/Pocket/web-client/compare/v1.16.4...v1.16.5) (2021-07-28)


### Bug Fixes

* **syndicated:** pass article title to layout component ([5783e87](https://github.com/Pocket/web-client/commit/5783e8700856d4298f49a43911d392e8483408da))

## [1.16.4](https://github.com/Pocket/web-client/compare/v1.16.3...v1.16.4) (2021-07-28)


### Bug Fixes

* **filterSettiings:** add param comment for initial state ([5b6b8fe](https://github.com/Pocket/web-client/commit/5b6b8feb938bfec833379e1d78b7bf6155268443))
* **filterSettings:** move filterSettings function to utilities ([97f707a](https://github.com/Pocket/web-client/commit/97f707a4c71626b4445a60ef97d47c8c1174ad04))
* **onboarding:** add onboarding connector ([3e3a44b](https://github.com/Pocket/web-client/commit/3e3a44bcb48de423e57dde854ad84ff81fa7ace8))
* **onboarding:** fetch onboarding settings ([1bd057f](https://github.com/Pocket/web-client/commit/1bd057f96361301c13d18f910dd292dcc2a10957))

## [1.16.3](https://github.com/Pocket/web-client/compare/v1.16.2...v1.16.3) (2021-07-28)


### Bug Fixes

* **collections:** add custom events for collection stories ([c0e9204](https://github.com/Pocket/web-client/commit/c0e92046eadb33c173b421cfe629a3acbd30f35f))

## [1.16.2](https://github.com/Pocket/web-client/compare/v1.16.1...v1.16.2) (2021-07-27)


### Bug Fixes

* **home:** update hydration to run when topics settings are updated ([88111f3](https://github.com/Pocket/web-client/commit/88111f353db4daf47a1eaad2e935798a5ee5c456))

## [1.16.1](https://github.com/Pocket/web-client/compare/v1.16.0...v1.16.1) (2021-07-27)


### Bug Fixes

* **onboarding:** adding the dev unleash feature flag for the waypoint ([9558089](https://github.com/Pocket/web-client/commit/9558089b31a3eabb3f1ee0dda701a0f396df7492))

# [1.16.0](https://github.com/Pocket/web-client/compare/v1.15.34...v1.16.0) (2021-07-27)


### Bug Fixes

* **analytics:** adding batch items for snowplow ([ec4d7d5](https://github.com/Pocket/web-client/commit/ec4d7d5b8f2709b7dfc3ddc01e673b6a8f6acc10))
* **analytics:** adding batch items for snowplow ([0061eee](https://github.com/Pocket/web-client/commit/0061eee971ddb461a5d53cc0e5c6ff3459bd635a))
* **analytics:** adding report analytics event ([931bed3](https://github.com/Pocket/web-client/commit/931bed3dd2b032768cbdf3f38bdb47341918ebca))
* **analytics:** update legacy and google analytics ([6a0839c](https://github.com/Pocket/web-client/commit/6a0839c0ae24b563d1befa9b2340b98bd2039569))
* **discover:** update discover card so slate and sladeid info is conditional ([877863e](https://github.com/Pocket/web-client/commit/877863e83e670a9b216e4c42a62c785d8ab9c4a7))
* **snowplow:** reconcile all updates into branch after a month of staleness ([9965a76](https://github.com/Pocket/web-client/commit/9965a7622546be3a7b72eacb923603298aa6bec2))
* **snowplow:** remove unneeded actions and home impression state ([e0a1688](https://github.com/Pocket/web-client/commit/e0a1688424467fb40335eccd768fb12e7c388f32))


### Features

* **snowplow:** analytics overhaul ([6393f4c](https://github.com/Pocket/web-client/commit/6393f4c30754f2a193991fb6563e2e0290e48ec1))

## [1.15.34](https://github.com/Pocket/web-client/compare/v1.15.33...v1.15.34) (2021-07-22)


### Bug Fixes

* **dependency:** update to latest ([c6230c5](https://github.com/Pocket/web-client/commit/c6230c57bbbdb46d74a45ac680762b456ec38ade))

## [1.15.33](https://github.com/Pocket/web-client/compare/v1.15.32...v1.15.33) (2021-07-22)


### Bug Fixes

* **app:** only get settings on valid users ([19f1885](https://github.com/Pocket/web-client/commit/19f18850f4813fed7ca0038cd24a583fd9e51902))
* **discover:** stop throwing 503 item render ([9183b11](https://github.com/Pocket/web-client/commit/9183b11fd47223bbfe451b9386c42077349e0139))
* **next:** rewrite should be async ([41675f9](https://github.com/Pocket/web-client/commit/41675f93deaf1424d6cc6c42dc8413e7ed8eb935))
* **next:** webpack4 for until image issues are sorted ([b9314dd](https://github.com/Pocket/web-client/commit/b9314ddb5ab5bec6a3c9ffa1208da66c1af633c3))
* **sentry:** update sentry node error ([281b133](https://github.com/Pocket/web-client/commit/281b133c5c9716c31ee3fddd2d9b86eb6924ef0e))

## [1.15.32](https://github.com/Pocket/web-client/compare/v1.15.31...v1.15.32) (2021-07-21)


### Bug Fixes

* **sentry:** improve ignoring for unrelated errors ([86b78ea](https://github.com/Pocket/web-client/commit/86b78eae9cf2ef57686f8d6f8bffc936cc5b4831))
* **sentry:** one more major offender of sentry ([a6cc1e2](https://github.com/Pocket/web-client/commit/a6cc1e2e37d6bac06c86bc1fa27efa6e034029e8))

## [1.15.31](https://github.com/Pocket/web-client/compare/v1.15.30...v1.15.31) (2021-07-20)


### Bug Fixes

* **sentry:** typo in conditon ([3f12003](https://github.com/Pocket/web-client/commit/3f1200311664c042dac25f8a8fd181b2900910ca))

## [1.15.30](https://github.com/Pocket/web-client/compare/v1.15.29...v1.15.30) (2021-07-20)


### Bug Fixes

* **sentry:** group mobile webview errors ([cdbeaed](https://github.com/Pocket/web-client/commit/cdbeaed5f6d0389a96991f18228b0f2bb51349a6))

## [1.15.29](https://github.com/Pocket/web-client/compare/v1.15.28...v1.15.29) (2021-07-20)


### Bug Fixes

* **sentry:** ignore ios injection errors ([ed47b0f](https://github.com/Pocket/web-client/commit/ed47b0f8fc0e210f72dcf3dd5aa50d3ba3a50b48))

## [1.15.28](https://github.com/Pocket/web-client/compare/v1.15.27...v1.15.28) (2021-07-20)


### Bug Fixes

* **setry:** limit pubads errors ([df68a29](https://github.com/Pocket/web-client/commit/df68a2954c9cc4ebc856b7975b704f0c35e5f9f1))

## [1.15.27](https://github.com/Pocket/web-client/compare/v1.15.26...v1.15.27) (2021-07-20)


### Bug Fixes

* **collections:** validate collection stories ([6f171af](https://github.com/Pocket/web-client/commit/6f171af307d8303e13c8a6ac30774194341713ea))

## [1.15.26](https://github.com/Pocket/web-client/compare/v1.15.25...v1.15.26) (2021-07-19)


### Bug Fixes

* **ads:** adding some try/catch/scope to errors ([c0b6dcf](https://github.com/Pocket/web-client/commit/c0b6dcfff8cf7f05cab1ed30e6aa044658fdecd3))

## [1.15.25](https://github.com/Pocket/web-client/compare/v1.15.24...v1.15.25) (2021-07-19)


### Bug Fixes

* **build:** adding start local with https ([d8f86f8](https://github.com/Pocket/web-client/commit/d8f86f8f01a54d8ad1389be5f49b1caa7e8a6487))
* **pwa:** move meta back to document ([5cbac1f](https://github.com/Pocket/web-client/commit/5cbac1ff4962c788b9fc7ebfa0365308042b333e))

## [1.15.24](https://github.com/Pocket/web-client/compare/v1.15.23...v1.15.24) (2021-07-17)


### Bug Fixes

* **sentry:** third party errors ([94145e5](https://github.com/Pocket/web-client/commit/94145e51a2a8c22ad2c814f8fda0f39f769663d0))

## [1.15.23](https://github.com/Pocket/web-client/compare/v1.15.22...v1.15.23) (2021-07-16)


### Bug Fixes

* **sentry:** only accept 50% of errors ([33484f7](https://github.com/Pocket/web-client/commit/33484f787e3586c599c13fb9ebb5466fbe591f81))
* **sentry:** re-add sentry deployment in ci ([20703a3](https://github.com/Pocket/web-client/commit/20703a3a1fa4cae3b58679ec873ef7f55bbaabd6))
* **sentry:** trace sampling to 0.5 / whitelist url ([534a4a1](https://github.com/Pocket/web-client/commit/534a4a18fa1b35ab347f7164574890d8f68f708d))
* **syndicated article:** return on no page ([99e9516](https://github.com/Pocket/web-client/commit/99e951658c82d3b7f3ed18ca10a30d6f276d3e55))

## [1.15.22](https://github.com/Pocket/web-client/compare/v1.15.21...v1.15.22) (2021-07-16)


### Bug Fixes

* **GlobalNavSearch:** fix GlobalNavSearch story to show closeIcon correctly ([cf689f5](https://github.com/Pocket/web-client/commit/cf689f5c6658825da2f3ef076a675bae0b959f1b))
* **PublisherRecs:** fix PublisherRecs import so story renders properly ([7ec82f3](https://github.com/Pocket/web-client/commit/7ec82f3263f64b87a06fc1abc72df19aee53c008))
* **ShortCutsView:** fix ShortCutsView story not rendering ([d452a95](https://github.com/Pocket/web-client/commit/d452a959307121a2918e30aaebc8adab8ef31b68))
* **tagging stories:** fix tagging stories ([7be1348](https://github.com/Pocket/web-client/commit/7be13489e3ca49e26288bb96fa72fb0492410fb0))

## [1.15.21](https://github.com/Pocket/web-client/compare/v1.15.20...v1.15.21) (2021-07-16)


### Bug Fixes

* **sentry:** remove userAgent block - add release ([72fde73](https://github.com/Pocket/web-client/commit/72fde73d28d300d4867c3e000836f942a3274205))

## [1.15.20](https://github.com/Pocket/web-client/compare/v1.15.19...v1.15.20) (2021-07-15)


### Bug Fixes

* **sentry:** add some filtering client side ([82378df](https://github.com/Pocket/web-client/commit/82378df6e2d75c2b3471aa119855b674fe67a939))

## [1.15.19](https://github.com/Pocket/web-client/compare/v1.15.18...v1.15.19) (2021-07-15)


### Bug Fixes

* **bookmark:** refactor css to avoid compile errors ([df87fff](https://github.com/Pocket/web-client/commit/df87fffd8bc8650f6fcb9a64fae140fda23a9063))
* **dependencies:** update nextJS ([07033f7](https://github.com/Pocket/web-client/commit/07033f7286bdc23a298219f47780c83ecc72c5c4))
* **dependency:** update web-utilities sendBeacon ([3656029](https://github.com/Pocket/web-client/commit/36560297284956054f66efeb6301ff55c82fa2e4))
* **lint:** update lint errors ([4a509fc](https://github.com/Pocket/web-client/commit/4a509fc1b378bacf56d4ef5f9e5ebbb23709e991))
* **next:** updating sentry/linaria config ([4f2eaaf](https://github.com/Pocket/web-client/commit/4f2eaafbccd183dc043ce86ae78388de4a5431ab))
* **scroll tracker:** refactor to hook ([7e8f83e](https://github.com/Pocket/web-client/commit/7e8f83ecdb44fc8196c4bef5be43e9bf334cea42))

## [1.15.18](https://github.com/Pocket/web-client/compare/v1.15.17...v1.15.18) (2021-07-14)


### Bug Fixes

* **search:** update search total for free users ([f1f30e4](https://github.com/Pocket/web-client/commit/f1f30e423ae04b9627b81b1422cef38055c4ed50))

## [1.15.17](https://github.com/Pocket/web-client/compare/v1.15.16...v1.15.17) (2021-07-14)


### Bug Fixes

* **document:** move progressive meta to app ([c6bb7ab](https://github.com/Pocket/web-client/commit/c6bb7abeceab77490485bb69cf53b236d6df6faf))
* **layout:** add social metaData as req for PWA ([0743a9f](https://github.com/Pocket/web-client/commit/0743a9f843ae103a2fbd034366ec8949aa07f22b))

## [1.15.16](https://github.com/Pocket/web-client/compare/v1.15.15...v1.15.16) (2021-07-07)


### Bug Fixes

* **item:** don’t open in new tab ([1b2c93e](https://github.com/Pocket/web-client/commit/1b2c93ef47f9752fcae942ec093caacbd765be86))
* **item:** use open external where required ([be5677c](https://github.com/Pocket/web-client/commit/be5677c528244a567e0ca95a1819b5e0e7c33ecb))
* **redirects:** no newtab/redirect for links (save profile) ([4a3c7c7](https://github.com/Pocket/web-client/commit/4a3c7c7eddbe233d73f4b7527177cfecda3069ed))
* **replaceUTM:** exception for craigslist ([e477245](https://github.com/Pocket/web-client/commit/e47724596397fcd75ba19fd44642ba0f8e1c777f))
* **utilities:** adding replaceUTM function ([7416c42](https://github.com/Pocket/web-client/commit/7416c423d40cab2b0ac8458770ed8787aac4c5fc))

## [1.15.15](https://github.com/Pocket/web-client/compare/v1.15.14...v1.15.15) (2021-07-07)


### Bug Fixes

* **snowplow:** copy items to avoid mutation ([7eaa057](https://github.com/Pocket/web-client/commit/7eaa05703a5fbf52c2309aff852255af95641d33))

## [1.15.14](https://github.com/Pocket/web-client/compare/v1.15.13...v1.15.14) (2021-07-07)


### Bug Fixes

* **cypress:** adding data-cy attributes for publisher, save popup, and unpin tags ([f84d8db](https://github.com/Pocket/web-client/commit/f84d8dbf1d394b886b121a19978038e6bc034661))

## [1.15.13](https://github.com/Pocket/web-client/compare/v1.15.12...v1.15.13) (2021-07-07)


### Bug Fixes

* **search:** adding search lazy load ([4093df6](https://github.com/Pocket/web-client/commit/4093df6d81024f4c3b9d57c94f5fe5be94fc95ce))

## [1.15.12](https://github.com/Pocket/web-client/compare/v1.15.11...v1.15.12) (2021-07-06)


### Bug Fixes

* **app:** allow page to be saved as a progressive web app ([2582e8b](https://github.com/Pocket/web-client/commit/2582e8bbd9874bfd6e80ffbc0c7bb23cfcdf73a4))

## [1.15.11](https://github.com/Pocket/web-client/compare/v1.15.10...v1.15.11) (2021-07-06)


### Bug Fixes

* **actions:** add width to pocket-share icon ([d583d93](https://github.com/Pocket/web-client/commit/d583d93da564e4efee8229cfd1968f71addeb979))
* **article-actions:** update styles on pocket icon ([99a1193](https://github.com/Pocket/web-client/commit/99a119377f42820b18d965524c78b900b82a2a29))
* **share:** update errors thrown by the share process ([95c5771](https://github.com/Pocket/web-client/commit/95c57712ac440df566eafecf8ee7ad53f4f01bf0))
* **share-actions:** add width to actions container ([1eedf24](https://github.com/Pocket/web-client/commit/1eedf245868b752123e13177be686b02bbf2ffc2))

## [1.15.10](https://github.com/Pocket/web-client/compare/v1.15.9...v1.15.10) (2021-07-06)


### Bug Fixes

* **localization:** adding headers to common locale const ([ad46056](https://github.com/Pocket/web-client/commit/ad4605663b78981396b813d573114d81aae20c3e))

## [1.15.9](https://github.com/Pocket/web-client/compare/v1.15.8...v1.15.9) (2021-07-06)


### Bug Fixes

* **localization:** bumping localization package to include home and release notes ([207310b](https://github.com/Pocket/web-client/commit/207310bd97da2d0280dd138fc0a3df654087965b))
* **package-lock:** installed updated localization directory ([033b45d](https://github.com/Pocket/web-client/commit/033b45d841b07145b1b818fba14fcfc7908d9e77))

## [1.15.8](https://github.com/Pocket/web-client/compare/v1.15.7...v1.15.8) (2021-06-25)


### Bug Fixes

* **home:** update collection subheading ([93f4c38](https://github.com/Pocket/web-client/commit/93f4c38f00d408f0011257bf5ac73092cdd818e8))

## [1.15.7](https://github.com/Pocket/web-client/compare/v1.15.6...v1.15.7) (2021-06-25)


### Bug Fixes

* **localization:** call out to common namespace ([bac4db9](https://github.com/Pocket/web-client/commit/bac4db962fd171fd16bb4640a2a63ac69f64155d))

## [1.15.6](https://github.com/Pocket/web-client/compare/v1.15.5...v1.15.6) (2021-06-25)


### Bug Fixes

* **release-notes:** update date for home and collections release notes ([df93bcd](https://github.com/Pocket/web-client/commit/df93bcd9d0231e2257dd5c03c44b445dfd0550d6))

## [1.15.5](https://github.com/Pocket/web-client/compare/v1.15.4...v1.15.5) (2021-06-24)


### Bug Fixes

* **card:** add ul and ol to allowed elements for markdown in excerpt ([2a0926e](https://github.com/Pocket/web-client/commit/2a0926e1053f4c4cb8933abf46b43f58fe7c31b8))
* **card:** adjust styles for links in markdown ([bffbfaf](https://github.com/Pocket/web-client/commit/bffbfafdedb4f56607c14b59b85c8f78420abf5d))
* **card:** pass className to reactMarkdown instead of creating a new div ([d5b26c4](https://github.com/Pocket/web-client/commit/d5b26c49adaacfe9b63ff69a2a7227a085b50518))
* **content-intro:** add blockquote styling ([9af7a6e](https://github.com/Pocket/web-client/commit/9af7a6e6ae1b8d0bcf4af69d0148ff36c8a994a6))
* **content-intro:** use rem instead of spacing variable ([37776f9](https://github.com/Pocket/web-client/commit/37776f97c89c9e75104c59484d2b0285bfd85770))

## [1.15.4](https://github.com/Pocket/web-client/compare/v1.15.3...v1.15.4) (2021-06-24)


### Bug Fixes

* **whats-new:** adding home and collections release notes ([1eb9b1f](https://github.com/Pocket/web-client/commit/1eb9b1fcfed22ce77380c00afe6cbe63fd2cd400))

## [1.15.3](https://github.com/Pocket/web-client/compare/v1.15.2...v1.15.3) (2021-06-24)


### Bug Fixes

* **constants:** add collections namespace to locale common ([ada4882](https://github.com/Pocket/web-client/commit/ada4882eac17a0779c20ce673676690a39fc0d80))
* **version:** use web-localization 0.10.5 ([dafad0f](https://github.com/Pocket/web-client/commit/dafad0f19a8f6de06425d08f4c58613445af5ea0))

## [1.15.2](https://github.com/Pocket/web-client/compare/v1.15.1...v1.15.2) (2021-06-24)


### Bug Fixes

* **header:** remove extra line breaks ([30c5a84](https://github.com/Pocket/web-client/commit/30c5a84f490da921bed9591c415078f30c76d7e2))
* **headers:** add header translations wrappers ([aa6d32e](https://github.com/Pocket/web-client/commit/aa6d32ef0dec0c4fdc7c735ef033d492b71681c2))
* **trans:** update trans component to use t function ([7ecba57](https://github.com/Pocket/web-client/commit/7ecba57952b86755f9a5c66f7ee643d79a2f9eb9))

## [1.15.1](https://github.com/Pocket/web-client/compare/v1.15.0...v1.15.1) (2021-06-24)


### Bug Fixes

* **collections:** update item data passed to snowplow ([e8ffa89](https://github.com/Pocket/web-client/commit/e8ffa890bc7f6321242cbd853f9dbd74b440ed63))

# [1.15.0](https://github.com/Pocket/web-client/compare/v1.14.58...v1.15.0) (2021-06-23)


### Bug Fixes

* **beta:** adding reusable beta tag component ([57bb208](https://github.com/Pocket/web-client/commit/57bb20818d702ceb5c3e2210b7c1e49ca2389ca4))
* **beta:** update beta class to use border radius variable ([c6b5d65](https://github.com/Pocket/web-client/commit/c6b5d654b16c19f5516eb608a929ddf45ec4daef))
* **home:** add beta option to global nav links ([0fd88bc](https://github.com/Pocket/web-client/commit/0fd88bc9da6cbeb2443ecd03ab630a6579586ef6))
* **home:** remove unused component and update analytics id ([45484cf](https://github.com/Pocket/web-client/commit/45484cf8d393a55d6406f6459482e25c1f518d6b))
* **home:** update beta styles on global nav ([8a4c874](https://github.com/Pocket/web-client/commit/8a4c874b2423058a86a8a2fadb3b950bc928a0d5))


### Features

* **home:** adding home for all users ([8e6481d](https://github.com/Pocket/web-client/commit/8e6481d1316206da454fbe281a5a191d9300c0c2))

## [1.14.58](https://github.com/Pocket/web-client/compare/v1.14.57...v1.14.58) (2021-06-22)


### Bug Fixes

* **home:** don’t allow read-now ([a2a7eaa](https://github.com/Pocket/web-client/commit/a2a7eaa47fe76a4856e8d85b34551450e7a84197))

## [1.14.57](https://github.com/Pocket/web-client/compare/v1.14.56...v1.14.57) (2021-06-22)


### Bug Fixes

* **localizations:** globa footer localizations ([d148c20](https://github.com/Pocket/web-client/commit/d148c20f60ba5bbb84be1428aa78c921ede69483))

## [1.14.56](https://github.com/Pocket/web-client/compare/v1.14.55...v1.14.56) (2021-06-22)


### Bug Fixes

* **card:** adjust divider in between author & publisher to not show if publisher is empty ([dd9e054](https://github.com/Pocket/web-client/commit/dd9e054f61c5bf812f89c6f6443e38a49d0ea429))
* **card:** allow for conditional explicit actionId ([16df925](https://github.com/Pocket/web-client/commit/16df925300913a0de14bdfe18add6be77946bd56))
* **collection page share:** pass url to ArticleActions so sharing works ([1c831f5](https://github.com/Pocket/web-client/commit/1c831f5164ce9f1f30b0c83d6e27d0ae15e502dd))
* **collection-card:** don't mutate item, improve lockup condition check ([871a93e](https://github.com/Pocket/web-client/commit/871a93eee1c6c92ae5605209951fd394859af7c1))
* **collection-card:** use heroImage instead of thumbnail for the first item in a lockup ([21baf81](https://github.com/Pocket/web-client/commit/21baf81db67e9e46bc035fe5b9ddb6cb39a0658c))
* **collections:** add  itemId to collection story ([19919bf](https://github.com/Pocket/web-client/commit/19919bfb49ffbf5a53062e667f775b797545e65a))
* **collections:** add collections items request actions & state ([3da1ab8](https://github.com/Pocket/web-client/commit/3da1ab8769580d6a670ce3bd8df1067b0c5122a5))
* **collections:** add deriver for collection items by id ([d06ec90](https://github.com/Pocket/web-client/commit/d06ec906a94a0e1208a1acf44b3a7151f1318c21))
* **collections:** add item_id to collection item deriver so the SaveToPocket gets the id ([686f650](https://github.com/Pocket/web-client/commit/686f650aa39eb0ee8c7433e6e62e24e0f358e6ff))
* **collections:** adding collections to nav ([2421e61](https://github.com/Pocket/web-client/commit/2421e6134a70f397815bf4b09779a1bc99a2e25b))
* **collections:** collection story as item ([b25e2d8](https://github.com/Pocket/web-client/commit/b25e2d87fd77cbe9042567b972b2834ab28e8e6f))
* **collections:** create collections specific card ([3b3791a](https://github.com/Pocket/web-client/commit/3b3791ae78c24c2cb1ca9d75d50022d2b84c24fc))
* **collections:** don't show publisher as it will always be Pocket ([c5b0945](https://github.com/Pocket/web-client/commit/c5b0945232f80711cf7b343163b386bf8291acd3))
* **collections:** fix saving collection page & updating SaveToPocket save status ([5e9ce2e](https://github.com/Pocket/web-client/commit/5e9ce2edc306f641bce3e139e712394a3593ff4f))
* **collections:** heroImage is the collection item thumbnail ([7f6c006](https://github.com/Pocket/web-client/commit/7f6c006881c40dc43ef7d3b6735b562cdf79bbd4))
* **collections:** initial collection index page ([d833ce3](https://github.com/Pocket/web-client/commit/d833ce33227ab01ba40b695e597988683da2aab3))
* **collections:** remove mini deriver from home collection card ([68328c1](https://github.com/Pocket/web-client/commit/68328c160d55d692cb9aabc4f4f7a7406b95048a))
* **collections:** remove the last Lockup & OffsetList to show only 20 items ([8f5d8c5](https://github.com/Pocket/web-client/commit/8f5d8c5e5cf01e7f26ef6100782882bf0baf1fad))
* **collections:** save button should save collection to My List ([3e20c74](https://github.com/Pocket/web-client/commit/3e20c742e5edf9ba2a1704cee9e9f0a22c1a7fe5))
* **collections:** show the rest of the collections ([d7d9046](https://github.com/Pocket/web-client/commit/d7d9046ca8848ac30e47a791cae2e1cb5e9d94a6))
* **collections:** state for collections index ([65c9591](https://github.com/Pocket/web-client/commit/65c9591f789d4562a0e9040d4def158fd95064ee))
* **collections:** update collection item card to use params and correct url ([88d92ed](https://github.com/Pocket/web-client/commit/88d92ed9ac28e9a11ce84b8de5606b301a9e7519))
* **collections:** update copy for collections index ([75fd996](https://github.com/Pocket/web-client/commit/75fd996a27e99da1a47fdb101853a12bfe923443))
* **collections:** use stories over items ([99f3491](https://github.com/Pocket/web-client/commit/99f349150cc96b168886cd4d96bf5dedd03cbd29))
* **collections:** use thumbmail instead of imageUrl in getCollections query ([c1f0ced](https://github.com/Pocket/web-client/commit/c1f0cedbe0aef24e1bda356f3ae52b79175c9092))
* **collections page:** fix story links not working ([2fb8d25](https://github.com/Pocket/web-client/commit/2fb8d2571087d0934b75bbc800eea46d39636d16))
* **list-lockup:** add lockup flag to heroType instead of passing it through on its own ([384275d](https://github.com/Pocket/web-client/commit/384275dab7fa83cc0ceab7743b2c6406ab66ee6b))
* **my-list:** determine openUrl and build isCollection urls to keep from being sent to production site ([189d314](https://github.com/Pocket/web-client/commit/189d314d79f61d42121abdb28bdd6da833251db7))
* **my-list:** determine openUrl and then pass to Card component ([a73ae8c](https://github.com/Pocket/web-client/commit/a73ae8c6b72c43b5ed758a337e10d5e56060602b))
* **my-list:** forgot to delete these ([432df95](https://github.com/Pocket/web-client/commit/432df95b6af98035b52f15765067af303a6ba73c))
* **my-list:** if item is a collection, open the original url ([7ec824c](https://github.com/Pocket/web-client/commit/7ec824cdd6fbc45638bfc6dcea0e1bab72ab2f33))
* **my-list:** remove extra whitespace ([0bd4c0e](https://github.com/Pocket/web-client/commit/0bd4c0e0211bad45a7adf5f9dd3276401c819e9e))
* **my-list:** use new determineOpenUrl utility function ([20b633d](https://github.com/Pocket/web-client/commit/20b633d3a631a5ab4b89bd7d31d6112748724e10))
* **my-list deriver:** coerce regex match to boolean ([4f4a18f](https://github.com/Pocket/web-client/commit/4f4a18fa2af8dc5a6ca31e7f30d89891011c9345))
* **my-list deriver:** determine if item is a collection ([bcbd2a4](https://github.com/Pocket/web-client/commit/bcbd2a427f0c911c8a8271d7505cc6e21834b0a9))
* **my-list deriver:** modify isCollection regex to be more explicit about localizations ([b8b57a4](https://github.com/Pocket/web-client/commit/b8b57a43193f84c5ce52ab9746cefe9ec08d9348))
* **my-list deriver:** regex - turn the captures into non-capturing groups ([f25a5c4](https://github.com/Pocket/web-client/commit/f25a5c4bf152fbfd13611f3b0000d6756fefeeee))
* **my-list spec:** add isCollection to assertion ([ba1a1dd](https://github.com/Pocket/web-client/commit/ba1a1dd2df03c3678122ab5202e1b1eb3c288666))
* **side-nav:** add ?src=sidebar to all side-nav links ([d965860](https://github.com/Pocket/web-client/commit/d9658604c3a2386d47a3249a54f543b7d570d09f))
* **url utilities:** add determineOpenUrl to url utilities ([35eb444](https://github.com/Pocket/web-client/commit/35eb444eed07a648402023f786741102a8f388a8))

## [1.14.55](https://github.com/Pocket/web-client/compare/v1.14.54...v1.14.55) (2021-06-21)


### Bug Fixes

* **release-notes:** release notes for june 21, 2021 ([c6703f1](https://github.com/Pocket/web-client/commit/c6703f1ab6227925fda4c2aa2ab7b64b34e38373))
* **release-notes:** release notes for june 21, 2021 ([81a6146](https://github.com/Pocket/web-client/commit/81a61468dd8af711afa66e59900176a07237c1ad))

## [1.14.54](https://github.com/Pocket/web-client/compare/v1.14.53...v1.14.54) (2021-06-21)


### Bug Fixes

* **global-footer:** use natively ([91c2ce7](https://github.com/Pocket/web-client/commit/91c2ce71454a1d40e646a92d981623d4cf75ce18))
* **global-footer:** use proper id for localization ([fc77bdd](https://github.com/Pocket/web-client/commit/fc77bddd6503cc9338542e8f2ad8641e20423652))

## [1.14.53](https://github.com/Pocket/web-client/compare/v1.14.52...v1.14.53) (2021-06-16)


### Bug Fixes

* **qa:** adding new data-cy attributes to headers, report form, and toasts ([781a9a6](https://github.com/Pocket/web-client/commit/781a9a6a4f95594c880c451e47ebbd5c20dbfe5c))

## [1.14.52](https://github.com/Pocket/web-client/compare/v1.14.51...v1.14.52) (2021-06-14)


### Bug Fixes

* **home:** switch topics to slates ([19b5675](https://github.com/Pocket/web-client/commit/19b5675038a044d1866e0d41479874e90b12b04b))

## [1.14.51](https://github.com/Pocket/web-client/compare/v1.14.50...v1.14.51) (2021-06-10)


### Bug Fixes

* **highlights:** dates needed double curlies for localization ([ffa09c1](https://github.com/Pocket/web-client/commit/ffa09c184fc08e9e9bb82461245a17e99eeae6d1))
* **version:** use web-localization version 0.10.1 ([93fbb1d](https://github.com/Pocket/web-client/commit/93fbb1db35018e5fc1f41d511549d23abd97b025))
* **version:** use web-localization version 0.10.2 ([4fa464e](https://github.com/Pocket/web-client/commit/4fa464e94f74511012be41b286b03f43efdea270))

## [1.14.50](https://github.com/Pocket/web-client/compare/v1.14.49...v1.14.50) (2021-06-10)


### Bug Fixes

* **ga:** track google analytics pageview with router.aspath ([7450bf6](https://github.com/Pocket/web-client/commit/7450bf60e6d0505b62e1be5ff467c843c2a6c3c6))

## [1.14.49](https://github.com/Pocket/web-client/compare/v1.14.48...v1.14.49) (2021-06-07)


### Bug Fixes

* **discover:** remove nbsp for widows in localized ([7e1ef3b](https://github.com/Pocket/web-client/commit/7e1ef3b1145d2d4ab4708e8b80348d5a6d2125a8))
* **syndicated:** explicit embed width for FF ([4d38e9f](https://github.com/Pocket/web-client/commit/4d38e9f3cbd3212e13a0bce0dfdec82f9a53bdbf))

## [1.14.48](https://github.com/Pocket/web-client/compare/v1.14.47...v1.14.48) (2021-06-04)


### Bug Fixes

* **snowplow:** update item object passed to collection impression ([27564cb](https://github.com/Pocket/web-client/commit/27564cb08f8bf185581c245b7a57067fbf1f1fe3))

## [1.14.47](https://github.com/Pocket/web-client/compare/v1.14.46...v1.14.47) (2021-06-04)


### Bug Fixes

* **discover:** localize callouts ([4dd2e78](https://github.com/Pocket/web-client/commit/4dd2e78ff835ee4865b76387ef207a7fa3a720e1))

## [1.14.46](https://github.com/Pocket/web-client/compare/v1.14.45...v1.14.46) (2021-06-04)


### Bug Fixes

* **features:** hydrate features with empty object when logged out ([f37c0d2](https://github.com/Pocket/web-client/commit/f37c0d2eaaa94a36d951eb8dc7a3f2aa31f1dc40))

## [1.14.45](https://github.com/Pocket/web-client/compare/v1.14.44...v1.14.45) (2021-06-03)


### Bug Fixes

* **list:** update spacing on detail mode ([4cc2e04](https://github.com/Pocket/web-client/commit/4cc2e0495caccc3b6f6ae50d3bac0f3ee45668c8))
* **my-list:** use lazy-loading instead of polling ([ac11f0c](https://github.com/Pocket/web-client/commit/ac11f0c8d0eaef945304b01f16b0f5546c238cd2))

## [1.14.44](https://github.com/Pocket/web-client/compare/v1.14.43...v1.14.44) (2021-06-03)


### Bug Fixes

* **analytics:** update collections events to pass in custom items ([94c5184](https://github.com/Pocket/web-client/commit/94c518427e81bd3d6f90aff465d1e85febb660d3))

## [1.14.43](https://github.com/Pocket/web-client/compare/v1.14.42...v1.14.43) (2021-06-03)


### Bug Fixes

* **locale:** include discover in common ([32760f0](https://github.com/Pocket/web-client/commit/32760f01b98cd3afdee1a84cd4fee9b83006a04b))
* **locale:** infer international languages ([e611f58](https://github.com/Pocket/web-client/commit/e611f589baeb24ed6279b17eadbe9256912892d6))

## [1.14.42](https://github.com/Pocket/web-client/compare/v1.14.41...v1.14.42) (2021-06-03)


### Bug Fixes

* **git:** update git ignore ([8e9d544](https://github.com/Pocket/web-client/commit/8e9d54470648d849682aeefd51077e378f3c1a22))
* **local:** allow ssl cert on local dev ([2570a4e](https://github.com/Pocket/web-client/commit/2570a4ea02f5916dc554b9b59f366cdd77141f11))
* **server:** add local server to root ([a820d69](https://github.com/Pocket/web-client/commit/a820d69458c8bf4c028fbd82b320b35fa9de62ab))
* **server:** update to run http(s) from dev ([84aca06](https://github.com/Pocket/web-client/commit/84aca06232bee60e463ac12e41daf2534bb79d9b))

## [1.14.41](https://github.com/Pocket/web-client/compare/v1.14.40...v1.14.41) (2021-06-02)


### Bug Fixes

* **collections:** don't pass slug through as id ([80f2ef7](https://github.com/Pocket/web-client/commit/80f2ef760e53a6d817ea3527b45bc1e85772cd1c))
* **snowplow:** run item id through parseint ([fb63ed2](https://github.com/Pocket/web-client/commit/fb63ed28be851b6516f406481de6e3a314fc80f0))

## [1.14.40](https://github.com/Pocket/web-client/compare/v1.14.39...v1.14.40) (2021-06-02)


### Bug Fixes

* **one-trust:** init snowplow even when user is logged out ([d9aaa10](https://github.com/Pocket/web-client/commit/d9aaa101870b67a3bb97df1b6bc350fb7fa3bd82))

## [1.14.39](https://github.com/Pocket/web-client/compare/v1.14.38...v1.14.39) (2021-06-02)


### Bug Fixes

* **nav:** update nav links to use next/link component ([d428f9b](https://github.com/Pocket/web-client/commit/d428f9b72d8d7c66641c38a7b3f72eb846b953f5))
* **nav:** update tests for new link components ([2370e3d](https://github.com/Pocket/web-client/commit/2370e3d36c3104a2a4f4740532c30be4e7fbea7c))

## [1.14.38](https://github.com/Pocket/web-client/compare/v1.14.37...v1.14.38) (2021-06-02)


### Bug Fixes

* **collections:** add conditonal author bio ([591292c](https://github.com/Pocket/web-client/commit/591292cc8a13e6651a60188af1dfc0612db232db))
* **collections:** allow for bio without image ([1992c75](https://github.com/Pocket/web-client/commit/1992c754934c42a402f9d82aa9dd558780511fb8))

## [1.14.37](https://github.com/Pocket/web-client/compare/v1.14.36...v1.14.37) (2021-06-02)


### Bug Fixes

* **print:** sneaking in update to hide bottom upsell when printing ([0f2d4d7](https://github.com/Pocket/web-client/commit/0f2d4d7ae776b06891117b9210fc2d5f55dd9023))
* **snowplow:** fixing snowplow errors from the migration ([26e73c0](https://github.com/Pocket/web-client/commit/26e73c00ec9fb41c4efb97a851097122d6dcf3c6))

## [1.14.36](https://github.com/Pocket/web-client/compare/v1.14.35...v1.14.36) (2021-06-02)


### Bug Fixes

* **settings:** re-add settings ([d4449a4](https://github.com/Pocket/web-client/commit/d4449a4c42063d7faf0459a91f442d82f13ea7e4))
* **settings:** re-add settings ([3fc7873](https://github.com/Pocket/web-client/commit/3fc7873c8205f68874c6bb8fb5c6a9d4091ac178))
* **snowplow:** add postpath to snowplow config ([92166a5](https://github.com/Pocket/web-client/commit/92166a55c948189a14e599c6213dc1a3e5e0832d))
* **snowplow:** add postpath to snowplow config ([0b857ca](https://github.com/Pocket/web-client/commit/0b857caae8c91d56ec2f58c85c3a65ee2a31ddce))
* **snowplow:** add postpath to snowplow config ([ee7883b](https://github.com/Pocket/web-client/commit/ee7883b91b7787f3d6ea778edf029e1aa9af2458))
* **snowplow:** update snowplow config to handle anonymous tracking ([a5e070f](https://github.com/Pocket/web-client/commit/a5e070fa142e9c1f537d62ed12063456c2c39d58))
* **snowplow:** update snowplow config to handle anonymous tracking ([ca48fd7](https://github.com/Pocket/web-client/commit/ca48fd78a35067cf19f2c1626b30b42b12270d3c))
* **snowplow:** update snowplow config to handle anonymous tracking ([de6b6e0](https://github.com/Pocket/web-client/commit/de6b6e084ce8032936939260c720ba6e7e43b300))

## [1.14.35](https://github.com/Pocket/web-client/compare/v1.14.34...v1.14.35) (2021-06-01)


### Bug Fixes

* **card layouts:** add responsive to discover layouts ([ab7d5ba](https://github.com/Pocket/web-client/commit/ab7d5bac1529cf459c73a975014d377bbe8f30ba))
* **layouts:** lockup/offset stories ([55efdee](https://github.com/Pocket/web-client/commit/55efdeed92e0cf37398798618b2946a29b9be0ed))
* **stories:** update content-parsed ([ebb546a](https://github.com/Pocket/web-client/commit/ebb546aeffaf17e538e51e71f17f99bc5bb9e344))
* **stories:** update parsed-content stories ([6ee16d0](https://github.com/Pocket/web-client/commit/6ee16d0c03c59cf4e9fb33935b41ae992c2f005b))
* **storybook:** add viewport ([5fe4848](https://github.com/Pocket/web-client/commit/5fe4848b89ea19d815e619bb0109c71590366d68))

## [1.14.34](https://github.com/Pocket/web-client/compare/v1.14.33...v1.14.34) (2021-06-01)


### Bug Fixes

* **settings:** adding pinned topics from home to settings ([98c44a0](https://github.com/Pocket/web-client/commit/98c44a0b2f254a457e8d06e5bca73d339868c603))
* **settings:** adding server storage for pinned tags ([ce50c6d](https://github.com/Pocket/web-client/commit/ce50c6d7b412922079a31c0136fdcdecf98b45d7))
* **settings:** adding settings state ([0a2926e](https://github.com/Pocket/web-client/commit/0a2926edb26b2604e8c3ad6b870fe2fff6eeda81))
* **settings:** make sure to save immediately after converting ([7910ab4](https://github.com/Pocket/web-client/commit/7910ab452d308279ac4fe972e9a00fa107a534d5))
* **tags-state:** removing uneeded imports ([a2b078a](https://github.com/Pocket/web-client/commit/a2b078a509d43ed36d8a7fc15146e3484ccbe833))
* **utilities:** remove outdated comment ([8946dbb](https://github.com/Pocket/web-client/commit/8946dbb3ec9c956f76861a123c4809e0e3134497))

## [1.14.33](https://github.com/Pocket/web-client/compare/v1.14.32...v1.14.33) (2021-05-29)


### Bug Fixes

* **cards:** use markdown excerpts explicitly ([bafc975](https://github.com/Pocket/web-client/commit/bafc97574ebaa8af3b61e47117ca670a52f000af))
* **collections:** allow some styling in header ([4306392](https://github.com/Pocket/web-client/commit/4306392b8204530af4cccd08ec3a24ef4b836a42))
* **collections:** useMarkdown in excerpts ([0a25859](https://github.com/Pocket/web-client/commit/0a25859a714ad680a124d084bf3e45f2eaa78608))

## [1.14.32](https://github.com/Pocket/web-client/compare/v1.14.31...v1.14.32) (2021-05-28)


### Bug Fixes

* **topics:** discover is really explore is really discover ([776609f](https://github.com/Pocket/web-client/commit/776609f3f833cb928d8278f47ad986a24abaf90e))

## [1.14.31](https://github.com/Pocket/web-client/compare/v1.14.30...v1.14.31) (2021-05-27)


### Bug Fixes

* **collections:** allow unsaving/sidebar saving ([3f64580](https://github.com/Pocket/web-client/commit/3f6458021eae39f11782956bcc6a99d47f05cbca))
* **content actions:** update styles ([43bbbc0](https://github.com/Pocket/web-client/commit/43bbbc0b0acfc6193da563bf306dbd6d39e280e6))
* **save:** allow for cleaner item actions ([56596b4](https://github.com/Pocket/web-client/commit/56596b4406868cc657939a705f41b7e3e65a8f88))

## [1.14.30](https://github.com/Pocket/web-client/compare/v1.14.29...v1.14.30) (2021-05-27)


### Bug Fixes

* **package:** undo port change ([a993a1d](https://github.com/Pocket/web-client/commit/a993a1df52c47167a9122e6f796558a59dc602c8))
* **print:** adding print styles to reader, syndicated articles, and collections ([6b336ad](https://github.com/Pocket/web-client/commit/6b336ade6169e99cccdd3e728680421aa10b9a00))

## [1.14.29](https://github.com/Pocket/web-client/compare/v1.14.28...v1.14.29) (2021-05-27)


### Bug Fixes

* **snowplow:** update impressions so theres no race condition ([2173c2f](https://github.com/Pocket/web-client/commit/2173c2f167fa3c0e9b41fef3957630925b53a43d))

## [1.14.28](https://github.com/Pocket/web-client/compare/v1.14.27...v1.14.28) (2021-05-27)


### Bug Fixes

* **collections:** link to explore for now ([a7b8682](https://github.com/Pocket/web-client/commit/a7b8682048c1e37a9fc88a6e2d7e90eb15990f91))

## [1.14.27](https://github.com/Pocket/web-client/compare/v1.14.26...v1.14.27) (2021-05-27)


### Bug Fixes

* **request:** remove client info for now ([c5f7ca7](https://github.com/Pocket/web-client/commit/c5f7ca7a4d0372863c365714f6fb021314d0b9ef))

## [1.14.26](https://github.com/Pocket/web-client/compare/v1.14.25...v1.14.26) (2021-05-27)


### Bug Fixes

* **request:** conditional client identifier ([e938b8c](https://github.com/Pocket/web-client/commit/e938b8c831ba9fe35d640ffda5176b9952c8fd24))

## [1.14.25](https://github.com/Pocket/web-client/compare/v1.14.24...v1.14.25) (2021-05-27)


### Bug Fixes

* **collection:** mobile layout adjustments ([3b66b14](https://github.com/Pocket/web-client/commit/3b66b1403802fa1c196348946c750097cd6be28d))
* **collections:** only show ads once init is done ([15017c4](https://github.com/Pocket/web-client/commit/15017c46471f0cdff85975866a1fc9a631eedbd5))

## [1.14.24](https://github.com/Pocket/web-client/compare/v1.14.23...v1.14.24) (2021-05-27)


### Bug Fixes

* **apollo:** adding in release version ([99d13c2](https://github.com/Pocket/web-client/commit/99d13c210e9a3e038d0556318b15b852a3b10aee))
* **apollo:** adding in some apollo studio based headers ([2297086](https://github.com/Pocket/web-client/commit/2297086346495cda2fc1f78ea97bea67b7e4f465))

## [1.14.23](https://github.com/Pocket/web-client/compare/v1.14.22...v1.14.23) (2021-05-27)


### Bug Fixes

* **content:** conditional save tracking ([299b450](https://github.com/Pocket/web-client/commit/299b450e7721463d4302b2f0088a64166741dcfe))
* **layouts:** render metadata if it exists ([cfe46a5](https://github.com/Pocket/web-client/commit/cfe46a58cbfa73fb222afd33d072c0934ceb7e2b))

## [1.14.22](https://github.com/Pocket/web-client/compare/v1.14.21...v1.14.22) (2021-05-26)


### Bug Fixes

* **collections:** make collections static ([2980912](https://github.com/Pocket/web-client/commit/2980912ba752b81460f3a7e039db9bc853c727ad))
* **collections:** use image cache for hero ([b48788b](https://github.com/Pocket/web-client/commit/b48788be75b24ca64fdd5c62d91547716c3e2db7))

## [1.14.21](https://github.com/Pocket/web-client/compare/v1.14.20...v1.14.21) (2021-05-26)


### Bug Fixes

* **content:** parity with styles (should revisit) ([4d31f9f](https://github.com/Pocket/web-client/commit/4d31f9f18d6a6dad0aaf3a84e448b7aef9375f47))
* **syndicated:** use standard page description ([38474a4](https://github.com/Pocket/web-client/commit/38474a4d19c1c51cb71e317938c1eaa7a61b6dd5))

## [1.14.20](https://github.com/Pocket/web-client/compare/v1.14.19...v1.14.20) (2021-05-26)


### Bug Fixes

* **card:** support markdown in excerpt ([6b2251d](https://github.com/Pocket/web-client/commit/6b2251d717c701ab7c0feaa4d17ca0fe41dbef25))
* **collections:** error on null collection ([41d57bf](https://github.com/Pocket/web-client/commit/41d57bfa9a7b5e7b0bde24f52f9771a89d56e30a))
* **collections:** filter authors ([7e930b4](https://github.com/Pocket/web-client/commit/7e930b424689ae71aceb1639b3ba4a5d6a209961))

## [1.14.19](https://github.com/Pocket/web-client/compare/v1.14.18...v1.14.19) (2021-05-26)


### Bug Fixes

* **app:** single source of truth for init/trust ([d496c59](https://github.com/Pocket/web-client/commit/d496c59fc6c3f21c0e6d2e2795d0b73800211343))
* **snowplow:** yield wait properly ([976bb2b](https://github.com/Pocket/web-client/commit/976bb2b363f1a59fabd6edf2f55e85d3e6f78d6d))

## [1.14.18](https://github.com/Pocket/web-client/compare/v1.14.17...v1.14.18) (2021-05-25)


### Bug Fixes

* **content actions:** specificity on svg height ([084696f](https://github.com/Pocket/web-client/commit/084696fe1f5c52c2b746ca4a9018aef2b6947b86))

## [1.14.17](https://github.com/Pocket/web-client/compare/v1.14.16...v1.14.17) (2021-05-25)


### Bug Fixes

* **syndicated:** video sizing ([0368796](https://github.com/Pocket/web-client/commit/0368796751058ade21842c48e425ed10199c0db0))

## [1.14.16](https://github.com/Pocket/web-client/compare/v1.14.15...v1.14.16) (2021-05-25)


### Bug Fixes

* **collections:** add markdown parsing for intro ([f464de1](https://github.com/Pocket/web-client/commit/f464de175c8a868c5306dfcf4d1b1dbcef4a2a24))
* **collections:** responsive fixes ([61beec0](https://github.com/Pocket/web-client/commit/61beec06c6236c45f5dd385694aab46d5de4b733))
* **collections:** switch to live endpoints ([fafbaa8](https://github.com/Pocket/web-client/commit/fafbaa8504a4a8ac1beb010f2e6ae248ad0c42f8))
* **home:** use live collections ([baa8d94](https://github.com/Pocket/web-client/commit/baa8d947d6db59fd3d98d516573ae5fb5ec20372))

## [1.14.15](https://github.com/Pocket/web-client/compare/v1.14.14...v1.14.15) (2021-05-25)


### Bug Fixes

* **app:** adjust use effect inits ([9e02a49](https://github.com/Pocket/web-client/commit/9e02a495334791ceb4d3e5bf7820a31d60187b39))
* **app:** update init/privacy race ([5b7cc23](https://github.com/Pocket/web-client/commit/5b7cc23ad8aaef9475fd3cf4abf3b83525f1815a))
* **content:** clean up publisher recs ([ec1e7c9](https://github.com/Pocket/web-client/commit/ec1e7c9713da9f14f6c318287ac79e9a16aaa3ac))
* **content-ads:** aligning with web-discover ([091cca4](https://github.com/Pocket/web-client/commit/091cca49edc2f9b93a8123d3dd42e9929f1eb739))
* **discover:** minor ui tweaks ([aa1702f](https://github.com/Pocket/web-client/commit/aa1702f709b96564442b57069ad8bba1c821a982))
* **onetrust:** updating comments ([43fd824](https://github.com/Pocket/web-client/commit/43fd824817a16060a8b93a4187d1ef7473c9ca83))
* **pocket recs:** adding alt to publisher link ([58e0ba7](https://github.com/Pocket/web-client/commit/58e0ba7e4cdbe8e5c04967fa171dd7387be89715))
* **pocket recs:** localize headlines ([51a05f6](https://github.com/Pocket/web-client/commit/51a05f6fdfcc8d70494551f71a4ca5d9f33c0d46))
* **publisher recs:** testing ([aeae166](https://github.com/Pocket/web-client/commit/aeae166fc31fbd3674ee69ce3d4d10f8539a9211))
* **publisher recs:** use Link ([c256b20](https://github.com/Pocket/web-client/commit/c256b2066b9b6cd70209453c8d1179e34ec26cd0))
* **snowplow:** spa pages should still load ads ([0d27d2a](https://github.com/Pocket/web-client/commit/0d27d2a3a27675911df976934c36b1e31f4b67d4))
* **snowplow:** track on snowplow not onetrust ([20bff8b](https://github.com/Pocket/web-client/commit/20bff8b27e27bdaa3129babb8c0a5713a133ca33))
* **syndicated:** break up syndicated article ([205f1ed](https://github.com/Pocket/web-client/commit/205f1ed433536b7dd1b41416c182b8db28c49dac))
* **syndicated:** clean up ad implimentation ([cb4ea02](https://github.com/Pocket/web-client/commit/cb4ea02b1ef24680b7204635d3517c7cbb5a9e1a))
* **syndicated:** clean up article actions ([c81c95a](https://github.com/Pocket/web-client/commit/c81c95a061943ab7d9f06bcecb86bf6f743b5964))
* **syndicated:** tweaks based on feedback ([d62a7cc](https://github.com/Pocket/web-client/commit/d62a7cc5d249a4a23ba68ba241687606732a125b))
* **third-party-scripts:** sync with web-discover ([9fdcaa2](https://github.com/Pocket/web-client/commit/9fdcaa2695213eb00e82e893fdd414910801a388))

## [1.14.14](https://github.com/Pocket/web-client/compare/v1.14.13...v1.14.14) (2021-05-25)


### Bug Fixes

* **filters:** update filter titles so unread is now my list ([6b60abc](https://github.com/Pocket/web-client/commit/6b60abc97dca63debd355766d2049ac862efd57e))

## [1.14.13](https://github.com/Pocket/web-client/compare/v1.14.12...v1.14.13) (2021-05-24)


### Bug Fixes

* **mobile:** update search and add so it works on smaller devices ([c534d7b](https://github.com/Pocket/web-client/commit/c534d7bbb8738851660c171f1f764893c0ec926b))
* **search:** add filter to remove dupes from recent searches ([5ea5751](https://github.com/Pocket/web-client/commit/5ea575172d621b5e26f3247ff1b7fd7e2e122bda))
* **search:** update filter for dupes ([d7c2204](https://github.com/Pocket/web-client/commit/d7c2204873672bd74028bce21ab092060e42482f))

## [1.14.12](https://github.com/Pocket/web-client/compare/v1.14.11...v1.14.12) (2021-05-24)


### Bug Fixes

* **search:** enable second search from pages other than searcxh ([e975503](https://github.com/Pocket/web-client/commit/e975503ad9fd0c80ab00577eaad437725adcc81c))

## [1.14.11](https://github.com/Pocket/web-client/compare/v1.14.10...v1.14.11) (2021-05-24)


### Bug Fixes

* **account-nav:** update view profile link for labs ([609c603](https://github.com/Pocket/web-client/commit/609c603ca53d588f28401a696bdda860b7f236ba))
* **date:** update tests to account for bug ([b733aa5](https://github.com/Pocket/web-client/commit/b733aa5e09aa3db3ed77cbf81019af0042ea4d4a))
* **profile:** add temp share button function ([8b4e34b](https://github.com/Pocket/web-client/commit/8b4e34bd78c1bc05065152b90d5e31d741d91ac4))
* **profile:** adding profile page for testing purposes ([ee5c7a5](https://github.com/Pocket/web-client/commit/ee5c7a54b43c7f4146c34affb4c13dd27d96a6e9))
* **profile:** hook up delete post action and toasts ([b0e7567](https://github.com/Pocket/web-client/commit/b0e75671e8d3aae351f1a38855ec8382e1a5b162))
* **profile:** remove unneeded variables ([e0da511](https://github.com/Pocket/web-client/commit/e0da5114dd1bd086ee9087e62a0e6c3b2b9c508a))
* **profile:** rename recommended to profile ([74ca726](https://github.com/Pocket/web-client/commit/74ca726d5fe8cb6db1b153f5767ab9a833be298e))
* **profile:** update recommend actions to new card style ([432d2dc](https://github.com/Pocket/web-client/commit/432d2dc08f4f25118c943aa2ac265a8a967bffdf))
* **recommended:** remove unneeded selectors ([55fe750](https://github.com/Pocket/web-client/commit/55fe7509492b397423bf01bc996ff05ace14b85e))

## [1.14.10](https://github.com/Pocket/web-client/compare/v1.14.9...v1.14.10) (2021-05-24)


### Bug Fixes

* **app:** removing unused code ([10404f1](https://github.com/Pocket/web-client/commit/10404f1b2ab6d226d069c5fa4c7f6421be1c3e5f))
* **version:** remove old attempt to verify users cached version of application ([b101843](https://github.com/Pocket/web-client/commit/b1018437db2ae02637803c06b7c4b7ede8081532))

## [1.14.9](https://github.com/Pocket/web-client/compare/v1.14.8...v1.14.9) (2021-05-21)


### Bug Fixes

* **filter:** remove unneeded query param from favorites link ([2f08ff3](https://github.com/Pocket/web-client/commit/2f08ff3ab1b42d0aa11d9c864d416c5c95589e8b))
* **search:** add filters to search page ([57dbcd5](https://github.com/Pocket/web-client/commit/57dbcd5cd5ae99cd271d9cd36149edb50cf63b6f))
* **search:** remove unneeded imports ([d3a9aec](https://github.com/Pocket/web-client/commit/d3a9aecfa7ad92176c890cebc19f1376e5168dba))
* **search:** update formatting of css on search header ([ab30bd0](https://github.com/Pocket/web-client/commit/ab30bd04be6ef02003b0ba9fa65b73db40ce0f3a))
* **tooltip:** tooltip shouldn't take up width in non hovered state ([fb17c09](https://github.com/Pocket/web-client/commit/fb17c09432dfae3df8256b0848d36db3e5836d39))

## [1.14.8](https://github.com/Pocket/web-client/compare/v1.14.7...v1.14.8) (2021-05-20)


### Bug Fixes

* **share:** increase specificity for button styles ([44a487e](https://github.com/Pocket/web-client/commit/44a487e5715884c583e83ece05ba72b07004d534))

## [1.14.7](https://github.com/Pocket/web-client/compare/v1.14.6...v1.14.7) (2021-05-20)


### Bug Fixes

* **explore:** add rewrite for topic pages ([278da58](https://github.com/Pocket/web-client/commit/278da58bf46383b90848db4ac165c6390881c282))

## [1.14.6](https://github.com/Pocket/web-client/compare/v1.14.5...v1.14.6) (2021-05-20)


### Bug Fixes

* **discover:** don’t allow read now for now ([28cb240](https://github.com/Pocket/web-client/commit/28cb24089cac1b0cbbb4bb696a9fec5d619a3a73))

## [1.14.5](https://github.com/Pocket/web-client/compare/v1.14.4...v1.14.5) (2021-05-20)


### Bug Fixes

* **call out:** wrap for translation ([a5a557e](https://github.com/Pocket/web-client/commit/a5a557e4811842e52b6f5c2deb2722680beaa46a))
* **discover:** pass locale from page ([5808495](https://github.com/Pocket/web-client/commit/5808495c4023961414b23d8b4765697f279850e8))
* **discover:** translation wrap for publisher recs ([16eb0f1](https://github.com/Pocket/web-client/commit/16eb0f1d9682e4c477cb599bd02ba8a4026c6675))
* **discover:** wrap copy for translation ([37d903a](https://github.com/Pocket/web-client/commit/37d903a9acf067f57f469c08704e661e786b2eee))
* **item:** wrapping actions for localization ([271c471](https://github.com/Pocket/web-client/commit/271c471c753caa4b1fba704506e45cb55342450d))
* **locale:** update parser ([95bdbb3](https://github.com/Pocket/web-client/commit/95bdbb3deecc7de867a102bb6cb692ec532b21b3))

## [1.14.4](https://github.com/Pocket/web-client/compare/v1.14.3...v1.14.4) (2021-05-19)


### Bug Fixes

* **tags:** add sorting to tags pages ([6c44f68](https://github.com/Pocket/web-client/commit/6c44f68d373f3e87f65de6b48d4ba90855e279ab))

## [1.14.3](https://github.com/Pocket/web-client/compare/v1.14.2...v1.14.3) (2021-05-19)


### Bug Fixes

* **my-list:** update filters to properly display items ([ee4ddff](https://github.com/Pocket/web-client/commit/ee4ddffbed6cac61f7441b15b80535a8df4c841b))

## [1.14.2](https://github.com/Pocket/web-client/compare/v1.14.1...v1.14.2) (2021-05-19)


### Bug Fixes

* **list:** add sort order for each page ([14b569b](https://github.com/Pocket/web-client/commit/14b569b3fce98bc55666399f3fa8a056fd16e499))
* **list:** remove unneeded icon imports ([6ed5f7b](https://github.com/Pocket/web-client/commit/6ed5f7bb4f05facfe8bc7a05d91cef1255fde6dc))
* **my-list:** enable sorting for all sub pages ([ec41658](https://github.com/Pocket/web-client/commit/ec416583531a832e7fe042d764cbae26f0bbed7d))
* **sort:** add sorting to search page ([f3cc24c](https://github.com/Pocket/web-client/commit/f3cc24cb15813c1f79144e17a3f3ee9710d043d1))
* **state:** removing sneaky console ([6c126ac](https://github.com/Pocket/web-client/commit/6c126ac0fa8422b2b97000cd858f8e4a20654429))

## [1.14.1](https://github.com/Pocket/web-client/compare/v1.14.0...v1.14.1) (2021-05-18)


### Bug Fixes

* **package:** bump @pocket/web-ui to 2.35.1 to grab new footer link ([6b2b5a0](https://github.com/Pocket/web-client/commit/6b2b5a0812007ea084566a282081685484e467c9))

# [1.14.0](https://github.com/Pocket/web-client/compare/v1.13.1...v1.14.0) (2021-05-18)


### Bug Fixes

* **ads:** use label always ([1feaedb](https://github.com/Pocket/web-client/commit/1feaedb30c4531418e0cb0732d11e95a790b707a))
* **card:** add authors to card ([1c05e4c](https://github.com/Pocket/web-client/commit/1c05e4c28fd942b505da290fc38500fd56cc79c3))
* **collections:** card action onOpen ([0b56c89](https://github.com/Pocket/web-client/commit/0b56c897755715014167f7f8d89d11cb56d833c8))
* **collections:** remove publisher recs ([5b8eb62](https://github.com/Pocket/web-client/commit/5b8eb62793bc07f42252bc5d1be6707f896d0479))
* **collections:** update component locations ([89cb19d](https://github.com/Pocket/web-client/commit/89cb19d42acc4555a352aa5dc831f42ae0728bdd))
* **content actions:** more modularity ([a06e12e](https://github.com/Pocket/web-client/commit/a06e12eff2979bdff079637b9532f5429f049ca1))


### Features

* **collections:** add ability to save page ([9a051d2](https://github.com/Pocket/web-client/commit/9a051d29ae95cede38e644e96a5ed922151b7969))
* **collections:** add topics to collection page ([7f11faf](https://github.com/Pocket/web-client/commit/7f11fafdf4216c5465b2a791879762e7e42bbacf))
* **collections:** adding ads/actions ([c865c31](https://github.com/Pocket/web-client/commit/c865c3103be0df4eeb5e5ad026fe744e11a9f73c))
* **collections:** adding collection actions ([d3a6c65](https://github.com/Pocket/web-client/commit/d3a6c65a218d10278fc0038e07819b3e726ff0d4))
* **collections:** adding state for collections ([8a32767](https://github.com/Pocket/web-client/commit/8a32767dba5ec3a147ee21feb29158f42f165d37))
* **collections:** endpoint for saving group of urls ([f83baae](https://github.com/Pocket/web-client/commit/f83baae8aff8b8e13163f67a1a98347b76360b8f))
* **collections:** hook up toasts for collections ([7f69036](https://github.com/Pocket/web-client/commit/7f69036164c990efd2b799d58b05d4470556adbc))
* **collections:** set up individual collections page ([a010f95](https://github.com/Pocket/web-client/commit/a010f956a7f0e076cb24ebd24dc6da5d31672dd9))
* **collections:** update collections page layout ([0cf7c9c](https://github.com/Pocket/web-client/commit/0cf7c9c4931ebb4c886b2e69d681711f6a977301))
* **collections:** web-client api for mock data ([2f20e95](https://github.com/Pocket/web-client/commit/2f20e95af381cf1bddeb808c5bb5878c442cf04d))

## [1.13.1](https://github.com/Pocket/web-client/compare/v1.13.0...v1.13.1) (2021-05-18)


### Bug Fixes

* **share recommend:** add share.recommend snowplow event when user recommends an item ([0d06826](https://github.com/Pocket/web-client/commit/0d068263c6adaa39b7ec43aa6e811bae94925959))
* **share recommend:** order of trackItemAction params ([2e46aea](https://github.com/Pocket/web-client/commit/2e46aea62f8a33c9e7febb7b4cdec1cb31418780))
* **share recommend:** pass position to ShareRecommend ([f84aeb9](https://github.com/Pocket/web-client/commit/f84aeb9ef97158950b8875429679c1165975d6e6))

# [1.13.0](https://github.com/Pocket/web-client/compare/v1.12.21...v1.13.0) (2021-05-18)


### Features

* **discover:** add locale based feeds (de) ([add8c4a](https://github.com/Pocket/web-client/commit/add8c4aaf0401a3d84ca21f2f4cd8336f91efce4))

## [1.12.21](https://github.com/Pocket/web-client/compare/v1.12.20...v1.12.21) (2021-05-17)


### Bug Fixes

* **dependency:** react-markdown with api change ([50794ad](https://github.com/Pocket/web-client/commit/50794ad939cc1fc0d8a47a1c0e497f40a8cb0440))
* **storybook:** update/cleanup addons ([f3c1c33](https://github.com/Pocket/web-client/commit/f3c1c335f3869fadfda82445b93475169d1033dc))
* **topics:** update for curated only collection ([2b7aeb9](https://github.com/Pocket/web-client/commit/2b7aeb9f4246457c0527bcea318aca2a67fdd2db))

## [1.12.20](https://github.com/Pocket/web-client/compare/v1.12.19...v1.12.20) (2021-05-13)


### Bug Fixes

* **home:** fix broken snowplow open actions ([f1fd6b5](https://github.com/Pocket/web-client/commit/f1fd6b5571522d3964a9093a734ea9183a00896c))

## [1.12.19](https://github.com/Pocket/web-client/compare/v1.12.18...v1.12.19) (2021-05-13)


### Bug Fixes

* **snowplow:** correct snowplow slate typo ([48835b3](https://github.com/Pocket/web-client/commit/48835b3a3b1a7a61e2bc1ef6a891d1112a933b3b))

## [1.12.18](https://github.com/Pocket/web-client/compare/v1.12.17...v1.12.18) (2021-05-12)


### Bug Fixes

* **deriver:** remove unneeded index from function ([734fb12](https://github.com/Pocket/web-client/commit/734fb122f474ee7a91cfa87cd69e2bfeb1785ecb))
* **discover:** remove unneeded code ([58b7835](https://github.com/Pocket/web-client/commit/58b7835ffc447266ca87f28fa85b3a7f542b6223))
* **discover:** update tests to account for new slate info ([5befe0d](https://github.com/Pocket/web-client/commit/5befe0d8a29e20cc6afc5ee3519b7c7fc0151afa))
* **recs:** hook up analytics for new recs api items ([287f88d](https://github.com/Pocket/web-client/commit/287f88d6ebbf864452eac12bda260d0e5ad1260f))
* **recs:** move utility functions to utilities folder ([3cf1061](https://github.com/Pocket/web-client/commit/3cf10615e05dcae6d6fd95c3ff110510be107656))

## [1.12.17](https://github.com/Pocket/web-client/compare/v1.12.16...v1.12.17) (2021-05-12)


### Bug Fixes

* **publisher image:** add alt text for publisher image ([03ecca7](https://github.com/Pocket/web-client/commit/03ecca799f53d64df0d9297fe4cac68297295a0c))

## [1.12.16](https://github.com/Pocket/web-client/compare/v1.12.15...v1.12.16) (2021-05-11)


### Bug Fixes

* **modal:** remove overflow-x scroll, make it hidden ([7e10d4a](https://github.com/Pocket/web-client/commit/7e10d4a6f30621d92aa1988a943d11dd8a2de38a))
* **themeSettings:** flex-direction: column for smallHandset bp, flex-direction: row for above smallHandset bp ([cb467d3](https://github.com/Pocket/web-client/commit/cb467d3a91a9488f214af77d048372d5a3e4571f))

## [1.12.15](https://github.com/Pocket/web-client/compare/v1.12.14...v1.12.15) (2021-05-11)


### Bug Fixes

* **card:** update focus states on card media, card when action is selected, and tooltip ([1a7809d](https://github.com/Pocket/web-client/commit/1a7809d22c4572c92474b5dde8a99d231eaed313))

## [1.12.14](https://github.com/Pocket/web-client/compare/v1.12.13...v1.12.14) (2021-05-11)


### Bug Fixes

* **bulk edit:** allow selected state in bulk edit ([b6cb6bd](https://github.com/Pocket/web-client/commit/b6cb6bdeda5341c381358cea973706cba483cbb7))

## [1.12.13](https://github.com/Pocket/web-client/compare/v1.12.12...v1.12.13) (2021-05-11)


### Bug Fixes

* **deriver:** make sure original url is pure ([cfa4755](https://github.com/Pocket/web-client/commit/cfa47558141eff654204fad51a67253556b51f8f))
* **discover:**  check syndication on open external ([b8f6acb](https://github.com/Pocket/web-client/commit/b8f6acb3c082e5e5cc00d915f4361b45d6af5223))
* **discover:** publisher click to open_url ([7de1c7c](https://github.com/Pocket/web-client/commit/7de1c7ce7bc223f225f6ea8d098e5a6529692374))

## [1.12.12](https://github.com/Pocket/web-client/compare/v1.12.11...v1.12.12) (2021-05-11)


### Bug Fixes

* **discover:** if item doesnt exist, dont render action ([21f4476](https://github.com/Pocket/web-client/commit/21f4476a9f0316d20f70b512d9cbb33557bfe7fd))
* **home:** if item doesnt exist, dont render action ([8295d53](https://github.com/Pocket/web-client/commit/8295d53bab26314afedec9758c1438902f4ed207))
* **tags:** tags page actions ([153c5e8](https://github.com/Pocket/web-client/commit/153c5e8919a2defad63697f3559bf273357ff1e6))

## [1.12.11](https://github.com/Pocket/web-client/compare/v1.12.10...v1.12.11) (2021-05-06)


### Bug Fixes

* **discover:** adjust syndicated check ([6acaeac](https://github.com/Pocket/web-client/commit/6acaeac4f3df6be3baf936c0af45b9341553219f))

## [1.12.10](https://github.com/Pocket/web-client/compare/v1.12.9...v1.12.10) (2021-05-06)


### Bug Fixes

* **feature flags:** override more aggressively ([c16d792](https://github.com/Pocket/web-client/commit/c16d7920f2081d241c6b97c710dc4eb6d7e13e5b))

## [1.12.9](https://github.com/Pocket/web-client/compare/v1.12.8...v1.12.9) (2021-05-06)


### Bug Fixes

* **nav:** update nav to show home for v1 and v2 ([93fe8a5](https://github.com/Pocket/web-client/commit/93fe8a5051057f5f043542b9daf5f5e07f58e5e8))

## [1.12.8](https://github.com/Pocket/web-client/compare/v1.12.7...v1.12.8) (2021-05-06)


### Bug Fixes

* **feature flags:** add ability to override a test ([b625772](https://github.com/Pocket/web-client/commit/b625772a9cd471e56a6aff32b10ee128928f3d33))

## [1.12.7](https://github.com/Pocket/web-client/compare/v1.12.6...v1.12.7) (2021-05-06)


### Bug Fixes

* **home:** update home v2 flag ([187185b](https://github.com/Pocket/web-client/commit/187185bca50b96f049a610e413a3db53c9ed733a))

## [1.12.6](https://github.com/Pocket/web-client/compare/v1.12.5...v1.12.6) (2021-05-05)


### Bug Fixes

* **tags:** listState should be dirty when successfully tagging items ([085118c](https://github.com/Pocket/web-client/commit/085118c0f865078b1bedcfdde065428bf653abe7))

## [1.12.5](https://github.com/Pocket/web-client/compare/v1.12.4...v1.12.5) (2021-05-05)


### Bug Fixes

* **qa:** adding data-cy elements to card actions ([0044c0b](https://github.com/Pocket/web-client/commit/0044c0ba8cbdbe719fd595c503bc4fe310716e6e))

## [1.12.4](https://github.com/Pocket/web-client/compare/v1.12.3...v1.12.4) (2021-05-04)


### Bug Fixes

* **side-nav:** open topics in new tab and align left ([96c2f1f](https://github.com/Pocket/web-client/commit/96c2f1f608a389a9afb16379aee4777fa2be1def))

## [1.12.3](https://github.com/Pocket/web-client/compare/v1.12.2...v1.12.3) (2021-05-04)


### Bug Fixes

* **actions:** active actons show in hidden mode ([b99ef44](https://github.com/Pocket/web-client/commit/b99ef443debca42ae9c0cb97972f4a9ca39bec2e))
* **article:** allow update to use modified structure ([3a29f57](https://github.com/Pocket/web-client/commit/3a29f57c908721e66f4061581af657d75d36d7b7))
* **card:** cross browser image fallbacks ([c5a5293](https://github.com/Pocket/web-client/commit/c5a5293b8e33483bb3887c3b3101b2823a5d3a01))
* **card:** make selected less visually sticky ([e41c61a](https://github.com/Pocket/web-client/commit/e41c61ae5ab9d9d8385af0aa4d3d794d21336a52))
* **media:** use old media for now ([a62ba96](https://github.com/Pocket/web-client/commit/a62ba962cfe567ecacc955e354a895dd42a8e24e))
* **messages:** use universal card ([dee2706](https://github.com/Pocket/web-client/commit/dee2706dc76b82abea50edff2812da5384127ebc))
* **my list:** bulk edit ([d566bbb](https://github.com/Pocket/web-client/commit/d566bbbdd9a668e5fa3dcb47f094fa3bff364349))
* **my list:** remove extraneous styling ([963a4bc](https://github.com/Pocket/web-client/commit/963a4bcf483cb1e1c623af645916681bb374d8fc))
* **my list:** update deriver ([bf5f7d4](https://github.com/Pocket/web-client/commit/bf5f7d4a4fe6fec37a34e9c1f3b749c4747ea28e))
* **my-list:** add action labels translated ([89945e8](https://github.com/Pocket/web-client/commit/89945e880efc579e94b9d20ca43af220c9b53f4c))
* **my-list:** universal card and updated actions ([7b0220a](https://github.com/Pocket/web-client/commit/7b0220a149fff30174309c1ad03defec3d5e6904))
* **recents:** add key and description ([5a9c3fc](https://github.com/Pocket/web-client/commit/5a9c3fcbc9b2eb7a367326306b93d098d179a273))
* **shortcuts:** add key to components ([637b7b4](https://github.com/Pocket/web-client/commit/637b7b4e57fcf7f6b02e5e759e32e9f5b57b09f3))
* **social:** universal card for share / copy icon ([207b798](https://github.com/Pocket/web-client/commit/207b798ab055897a0d528e99eded9697cf67d072))
* **tags:** use universal card for recent tagged ([92a6936](https://github.com/Pocket/web-client/commit/92a693608671d2205f942a3460a1ad860347402e))
* **topics:** add lockups that got missed ([2848f5a](https://github.com/Pocket/web-client/commit/2848f5a3c5d939b9fb4171a0d720519247577de5))
* **virtualized:** add proper heights ([1701a5f](https://github.com/Pocket/web-client/commit/1701a5ff78338726d53f844b63aad0e201b2d45b))

## [1.12.2](https://github.com/Pocket/web-client/compare/v1.12.1...v1.12.2) (2021-05-03)


### Bug Fixes

* **suggested-tags:** display loading while tags are being fetched ([23418d8](https://github.com/Pocket/web-client/commit/23418d8737ca270c5a2f7ba08882ddc44d61cef8))

## [1.12.1](https://github.com/Pocket/web-client/compare/v1.12.0...v1.12.1) (2021-05-03)


### Bug Fixes

* **copy:** update incorrect copy ([9967652](https://github.com/Pocket/web-client/commit/9967652829adb04f4ddeda6fda46314c45243adf))
* **tags:** update suggested tag verbiage ([c173ebd](https://github.com/Pocket/web-client/commit/c173ebd82a8e45aeda7b4658804b3f6762e2ceb9))

# [1.12.0](https://github.com/Pocket/web-client/compare/v1.11.11...v1.12.0) (2021-05-03)


### Bug Fixes

* **collection:** use new layouts ([502e44d](https://github.com/Pocket/web-client/commit/502e44d047e0895d9e084ba2b19a43cddedb2309))
* **deriver:** update to allow for old format ([6c923d7](https://github.com/Pocket/web-client/commit/6c923d752c4c581d7fc21ba85bca00aabace5c54))
* **discover:** remove search ([dc7caac](https://github.com/Pocket/web-client/commit/dc7caac0281ccca7fb3bdd3656cee0cadd1c5ef4))
* **discover:** update derivers ([36061b4](https://github.com/Pocket/web-client/commit/36061b4f62f162753fd19c7c634569b85f5c4cc5))
* **discover:** use rex for discover home ([aa48818](https://github.com/Pocket/web-client/commit/aa48818b585f120b39057c8d27520454e5f35717))
* **layout:** conditional bottom padding on offset ([5251cee](https://github.com/Pocket/web-client/commit/5251cee32e435db37319b783189567cb36004103))
* **lineups:** publisher to syndicated data ([cb81e0a](https://github.com/Pocket/web-client/commit/cb81e0a3449d50e3856b020c4b9926ec76f1510d))
* **recs:** hook up the new recs api ([54abd35](https://github.com/Pocket/web-client/commit/54abd353b12693383415d8a6c0a2c3970c482d6f))
* **recs:** update the query and how its returned ([8e7232e](https://github.com/Pocket/web-client/commit/8e7232e877d0789f7f30343910e13d163f91c93b))
* **store:** stop snowplow events flood in devtools ([aca0f5d](https://github.com/Pocket/web-client/commit/aca0f5df5b5555de3156ca813359543614b2c4d8))
* **topics:** use new layouts on topic pages ([6171e10](https://github.com/Pocket/web-client/commit/6171e10f963b7925511e24a906e5e905d7bd17ba))


### Features

* **topics:** use rex api for topic pages ([446b45c](https://github.com/Pocket/web-client/commit/446b45c8ec061dd2c6aacd47eeb123f6afba4b82))

## [1.11.11](https://github.com/Pocket/web-client/compare/v1.11.10...v1.11.11) (2021-04-30)


### Bug Fixes

* **home:** have topics selector key of slug instead of id ([40874e3](https://github.com/Pocket/web-client/commit/40874e383d638e1ba5d985cb689fee74d2ba866e))

## [1.11.10](https://github.com/Pocket/web-client/compare/v1.11.9...v1.11.10) (2021-04-30)


### Bug Fixes

* **card-media:** add object-fit to preserve aspect ratio ([165c731](https://github.com/Pocket/web-client/commit/165c7317b3b4048e6a329e1d570c493afa1f68a9))

## [1.11.9](https://github.com/Pocket/web-client/compare/v1.11.8...v1.11.9) (2021-04-30)


### Bug Fixes

* **recs:** fixing reader recs to work with new card component ([a14c446](https://github.com/Pocket/web-client/commit/a14c4463033f2f143b610d827656e41792609f2a))

## [1.11.8](https://github.com/Pocket/web-client/compare/v1.11.7...v1.11.8) (2021-04-29)


### Bug Fixes

* **home:** updating save/read check ([9031617](https://github.com/Pocket/web-client/commit/903161726a08cdfdaab395587f3a419a17cc027b))

## [1.11.7](https://github.com/Pocket/web-client/compare/v1.11.6...v1.11.7) (2021-04-28)


### Bug Fixes

* **publisher-recs:** update title field and redirect path ([29f6d4c](https://github.com/Pocket/web-client/commit/29f6d4ca2abbdd1ac26bda79f527641598a00224))

## [1.11.6](https://github.com/Pocket/web-client/compare/v1.11.5...v1.11.6) (2021-04-28)


### Reverts

* Revert "fix(messages): use universal card" ([e6e5693](https://github.com/Pocket/web-client/commit/e6e569308f409f0e46e85c734caf4f925051e60c))
* Revert "fix(my list): remove extraneous styling" ([8e8da1c](https://github.com/Pocket/web-client/commit/8e8da1c5f021704bad4130d2c6ce50dcc15b07c8))
* Revert "fix(shortcuts): add key to components" ([4062a8a](https://github.com/Pocket/web-client/commit/4062a8acc82f7331b49a922e13d916274564c045))
* Revert "fix(tags): use universal card for recent tagged" ([af11531](https://github.com/Pocket/web-client/commit/af11531c5d364301e0660ad9081cb7ea7490bf5f))
* Revert "fix(social): universal card for share / copy icon" ([2cf5609](https://github.com/Pocket/web-client/commit/2cf5609a25a22550e63a4e6b1dc4ad53c2b6554d))
* Revert "fix(my-list): universal card and updated actions" ([000495b](https://github.com/Pocket/web-client/commit/000495bd7c66af5d776a9fa0b7f00114e82e55c2))
* Revert "chore(cleanup): removing old files" ([bf9b069](https://github.com/Pocket/web-client/commit/bf9b06926ac5327795ce9177f949092ee8a5d7e4))
* Revert "fix(recents): add key and description" ([a1780d4](https://github.com/Pocket/web-client/commit/a1780d4cb415eb31ca9963c2122052cedf29614e))
* Revert "fix(my-list): add action labels translated" ([9a5570a](https://github.com/Pocket/web-client/commit/9a5570a9ed1b21dc59437fc1acbcb57fc107fdd9))
* Revert "chore(cleanup): sneaky console log" ([6f02777](https://github.com/Pocket/web-client/commit/6f027775085d1207fef3e4725e66c9c74554fcfe))
* Revert "fix(topics): add lockups that got missed" ([fa0a526](https://github.com/Pocket/web-client/commit/fa0a526035623ec6b89ca97b00a18eb9648c146e))
* Revert "fix(my list): update deriver" ([eafd1d2](https://github.com/Pocket/web-client/commit/eafd1d2038e9a06eff15d5bb06234e3b67cb9290))
* Revert "fix(article): allow update to use modified structure" ([88cb52b](https://github.com/Pocket/web-client/commit/88cb52b32508381bd63f935cf519f2fb8e9f1b1c))
* Revert "fix(discover): use item_id as the key" ([6ab4dac](https://github.com/Pocket/web-client/commit/6ab4dac140efca21801594d43df9179b42900f99))

## [1.11.5](https://github.com/Pocket/web-client/compare/v1.11.4...v1.11.5) (2021-04-27)


### Bug Fixes

* **article:** allow update to use modified structure ([de86e72](https://github.com/Pocket/web-client/commit/de86e728f60493115e60184dc5897611ccfe3cae))
* **discover:** use item_id as the key ([47360a5](https://github.com/Pocket/web-client/commit/47360a5b04de4e95e99fa0164d515a15fcc47475))
* **messages:** use universal card ([6195fae](https://github.com/Pocket/web-client/commit/6195faef274966ea2e2938780910468d5eb4bf09))
* **my list:** remove extraneous styling ([cbe4567](https://github.com/Pocket/web-client/commit/cbe4567163f14baae570d19023a924b3bec09a4d))
* **my list:** update deriver ([5509e8b](https://github.com/Pocket/web-client/commit/5509e8bee20f5c9a2bd3e5baaa80cf0533f3e31f))
* **my-list:** add action labels translated ([b66488a](https://github.com/Pocket/web-client/commit/b66488a955b009a2373971d104eb287a4ccfada3))
* **my-list:** universal card and updated actions ([91928f5](https://github.com/Pocket/web-client/commit/91928f5babcb11f15a371fc5ea9289dbbd9a810c))
* **recents:** add key and description ([02c34a8](https://github.com/Pocket/web-client/commit/02c34a8e6ec1e2c1311757e1ea9458e040007b47))
* **shortcuts:** add key to components ([9e5e55e](https://github.com/Pocket/web-client/commit/9e5e55eb1b85b9fc4ef19b08ae62dfce99742c05))
* **social:** universal card for share / copy icon ([263be84](https://github.com/Pocket/web-client/commit/263be8452f5377d34ea26c4394c789af375bfa1e))
* **tags:** use universal card for recent tagged ([fdd3d08](https://github.com/Pocket/web-client/commit/fdd3d084f3611af227d00756de4754df1b8239c5))
* **topics:** add lockups that got missed ([daef4f6](https://github.com/Pocket/web-client/commit/daef4f6edda5ad432996eb476771e3efe1b057b4))

## [1.11.4](https://github.com/Pocket/web-client/compare/v1.11.3...v1.11.4) (2021-04-27)


### Bug Fixes

* **shared-lists:** remove page ([e1f4226](https://github.com/Pocket/web-client/commit/e1f4226f1f03112efb1d3ca110b0496e83a84c96))
* **side-nav:** remove extra ref ([094845a](https://github.com/Pocket/web-client/commit/094845ac3db342c58e40795f709ce0701b019dbc))
* **side-nav:** remove shared-lists and moving archive ([8fb3f80](https://github.com/Pocket/web-client/commit/8fb3f805d6fff9d4a0c0cfe13d9e7d31653459d2))

## [1.11.3](https://github.com/Pocket/web-client/compare/v1.11.2...v1.11.3) (2021-04-27)


### Bug Fixes

* **home:** adding home v2 ([0a910d9](https://github.com/Pocket/web-client/commit/0a910d9ad2aa614b437eb2365ae360c44c5cc771))
* **home:** resolving conflicts after cards update ([4300680](https://github.com/Pocket/web-client/commit/43006801a2381d0295981a025a45bc93702ff65c))
* **home:** updating link in header so theres no conflict between discover and client ([b5c1cc4](https://github.com/Pocket/web-client/commit/b5c1cc4e99379aeba831f98241e933ba50d252da))
* **home-header:** removing var for sizes ([d074454](https://github.com/Pocket/web-client/commit/d074454ebfddb5923cec8ddef06962dc02a07ea7))
* **sidenav:** update bookmark icons timing and dont show when save count is reset ([2d6cc46](https://github.com/Pocket/web-client/commit/2d6cc46a0430cafb37f7c6e9aa33fda02168417d))

## [1.11.2](https://github.com/Pocket/web-client/compare/v1.11.1...v1.11.2) (2021-04-27)


### Bug Fixes

* **discover:** adjust impression logic ([8205e1d](https://github.com/Pocket/web-client/commit/8205e1db1249fe1766a9754d5e07e7a679375a9d))
* **discover:** save status check ([72740f7](https://github.com/Pocket/web-client/commit/72740f7f20784211bbeb1811f15c399a1e1879a3))
* **discover:** update item deriver ([8b9cd8b](https://github.com/Pocket/web-client/commit/8b9cd8b0f4c72afa6285d6ff85006e5c33972e93))
* **discover:** use universal card ([ea4a77d](https://github.com/Pocket/web-client/commit/ea4a77dd57544877dc3fa6fb11b753feced71da1))
* **report:** separate item report functionality ([3903384](https://github.com/Pocket/web-client/commit/39033848ce06f5547321588aa64d1dfb807260df))
* **snowplow:** allow for read tracking ([16c0b4f](https://github.com/Pocket/web-client/commit/16c0b4f7f82777da7be81340eac72bd38584de29))
* **topic-list:** co-locate with state ([b2a161c](https://github.com/Pocket/web-client/commit/b2a161c7aa3a73cf7bbb1b3295b4dccab3f2ef3a))

## [1.11.1](https://github.com/Pocket/web-client/compare/v1.11.0...v1.11.1) (2021-04-27)


### Bug Fixes

* **home:** adjust impression logic ([56911e9](https://github.com/Pocket/web-client/commit/56911e983654ad57d809a3addb2df068bacbe680))
* **home:** card skeletons ([a773160](https://github.com/Pocket/web-client/commit/a773160e24a58a9a85d4cd83a4d4bdd3a2a6df82))
* **home:** collection layout ([a534539](https://github.com/Pocket/web-client/commit/a5345399f20726008c492c91b48df5ced9a5964a))
* **home:** update skeleton count on recs ([a1b1577](https://github.com/Pocket/web-client/commit/a1b1577bde60394ba5c81aa5b8befa8006566de7))
* **home:** use universal card for topic/collection ([134d9bd](https://github.com/Pocket/web-client/commit/134d9bd2617bb69d3023291cb71bd5584627a481))

# [1.11.0](https://github.com/Pocket/web-client/compare/v1.10.11...v1.11.0) (2021-04-27)


### Bug Fixes

* **card:** compatibility on all page types ([f9c6a71](https://github.com/Pocket/web-client/commit/f9c6a711210ae6e5df12bdc884d4dfd53731bb5a))
* **card:** update stories and docs ([7486756](https://github.com/Pocket/web-client/commit/7486756700c747c50c89f96dc4664cb4fddff5ab))
* **home:** cleanup discrepancies and old code ([1f6986f](https://github.com/Pocket/web-client/commit/1f6986fa236e0a1efd6149e9ef0a7c7197d71d1f))
* **home:** recs file structure ([6e5086a](https://github.com/Pocket/web-client/commit/6e5086a1059f76e409f33a56c4d2736b94cd73cc))
* **home:** update card-rec to use new patterns ([799f6c9](https://github.com/Pocket/web-client/commit/799f6c98d345af17492236de89d169f9cd80b812))
* **home:** vet item before actions ([e4b23d0](https://github.com/Pocket/web-client/commit/e4b23d0eba7bb54e5c17e8cd4a411ae1d316fbfa))
* **item actions:** consolidate for new card ([5460ef9](https://github.com/Pocket/web-client/commit/5460ef96c3766c16b7c72bbc321bf09ab2b84276))


### Features

* **lists:** adding new layout patterns ([fbafc3a](https://github.com/Pocket/web-client/commit/fbafc3a4352ead833febcf1ba4c9b4eae6f74f58))

## [1.10.11](https://github.com/Pocket/web-client/compare/v1.10.10...v1.10.11) (2021-04-22)


### Bug Fixes

* **cypress:** adding data-cy attributes to syndicated and explore pages ([46b7d06](https://github.com/Pocket/web-client/commit/46b7d064f6056130a55eb902596fa3e425d5788d))

## [1.10.10](https://github.com/Pocket/web-client/compare/v1.10.9...v1.10.10) (2021-04-22)


### Bug Fixes

* **analytics:** allow href overide in open track ([7afaee6](https://github.com/Pocket/web-client/commit/7afaee6fed57afd889a5b688a7d3562dd9d50a94))
* **analytics:** handle syndicated open ([2ffa9a6](https://github.com/Pocket/web-client/commit/2ffa9a691bd448723b7459640f5207300b2ebf38))
* **snowplow:** explict actions with context ([0c6218c](https://github.com/Pocket/web-client/commit/0c6218cbdd6930474db3c543ab3224b2897cbd2f))

## [1.10.9](https://github.com/Pocket/web-client/compare/v1.10.8...v1.10.9) (2021-04-22)


### Bug Fixes

* **topic:** conditional render for callout ([7682f3c](https://github.com/Pocket/web-client/commit/7682f3cc703451110bd02ec876d5a37d13de8147))

## [1.10.8](https://github.com/Pocket/web-client/compare/v1.10.7...v1.10.8) (2021-04-21)


### Bug Fixes

* **home:** adding home greeting lab ([4c84bd5](https://github.com/Pocket/web-client/commit/4c84bd5cdc5c110f898724d77bbfcef5286689e2))

## [1.10.7](https://github.com/Pocket/web-client/compare/v1.10.6...v1.10.7) (2021-04-21)


### Bug Fixes

* **discover:** avoid flash of callouts ([d157173](https://github.com/Pocket/web-client/commit/d15717351464fee66284c83d7a0b5c06cbac1769))

## [1.10.6](https://github.com/Pocket/web-client/compare/v1.10.5...v1.10.6) (2021-04-21)


### Bug Fixes

* **cypress:** adding data attributes for cypress tests ([39a6ab6](https://github.com/Pocket/web-client/commit/39a6ab6936a72f9731dca5400824239aab4335f3))
* **cypress:** adding data attributes for cypress tests ([0246db1](https://github.com/Pocket/web-client/commit/0246db1cdf4fd3b45fd2a758e7bf04eaac7643b2))
* **cypress:** adding data attributes for cypress tests ([c82495f](https://github.com/Pocket/web-client/commit/c82495f7d8bf7e9856d785daae47d211f3b5bd08))
* **cypress:** adding data attributes for cypress tests ([806d2e1](https://github.com/Pocket/web-client/commit/806d2e17a188f362050d1dfe8e708aa03d9796c1))

## [1.10.5](https://github.com/Pocket/web-client/compare/v1.10.4...v1.10.5) (2021-04-20)


### Bug Fixes

* **sidebar:** add snowplow events to sidebar filters ([e33acd9](https://github.com/Pocket/web-client/commit/e33acd9efdd47bf0fc70196b98327b548af08379))

## [1.10.4](https://github.com/Pocket/web-client/compare/v1.10.3...v1.10.4) (2021-04-19)


### Bug Fixes

* **lab:** add home specific sidebar and move archive ([d0ac73e](https://github.com/Pocket/web-client/commit/d0ac73ed9002ef5af84be70c7e2c2e28cfa56b16))
* **sidebar:** remove fragment element from around my list ([38a73a9](https://github.com/Pocket/web-client/commit/38a73a9667d7e7b0d5ff13ec29c99882fe01d126))

## [1.10.3](https://github.com/Pocket/web-client/compare/v1.10.2...v1.10.3) (2021-04-16)


### Bug Fixes

* **my list:** remove index causing lock in ([72af6cd](https://github.com/Pocket/web-client/commit/72af6cdefa2a6828c5948de5f6fe39d064a5aabd))

## [1.10.2](https://github.com/Pocket/web-client/compare/v1.10.1...v1.10.2) (2021-04-13)


### Bug Fixes

* **snowplow:** adding snowplow engagement to sidebar and topnav ([5c16f43](https://github.com/Pocket/web-client/commit/5c16f43f3c6f815a9205f8f4eecfe032294fe7c0))

## [1.10.1](https://github.com/Pocket/web-client/compare/v1.10.0...v1.10.1) (2021-04-13)


### Bug Fixes

* **snowplow:** link to old snowplow url in dev environments ([3891065](https://github.com/Pocket/web-client/commit/389106587342ae09cfc35dbbeb37898883ef01f0))

# [1.10.0](https://github.com/Pocket/web-client/compare/v1.9.22...v1.10.0) (2021-04-12)


### Bug Fixes

* **analytics:** hook up survey analytics event ([d101cb1](https://github.com/Pocket/web-client/commit/d101cb1ff4bb6c0476c4397313aa0bb4b78cd0a6))
* **collection:** add load balancer for shared-lists page ([93e896e](https://github.com/Pocket/web-client/commit/93e896ebf860f46ba41a217285bb78bb89436941))
* **collection:** add proper unleash strategy to sidenav ([767af78](https://github.com/Pocket/web-client/commit/767af782dabddc96d5d4440688bfe6a4dbb8c5f6))
* **collections:** adding analytics events for shared collections ([8ae9bf0](https://github.com/Pocket/web-client/commit/8ae9bf088eb0f2322fad62b83cd0c53259462808))
* **collections:** adding updated copy in both unanswered and answered state ([9f2e59b](https://github.com/Pocket/web-client/commit/9f2e59bbdf612fcc2fb41723bbc33679ef3c91bf))
* **shared lists:** switching collections to test ([27b23cd](https://github.com/Pocket/web-client/commit/27b23cd4975b7c167d7e5063e039067f445da547))
* **shared-lists:** update unleash test name ([847dc60](https://github.com/Pocket/web-client/commit/847dc6061d5a6a30ddb33a22951df6b73c123298))
* **side nav:** share your lists for painted door ([f598e3b](https://github.com/Pocket/web-client/commit/f598e3b2323d532323d85c06fe419f7a1fb14cf1))


### Features

* **collections:** painted door survey ([fb9204c](https://github.com/Pocket/web-client/commit/fb9204ce8e024c659e2156ccd2bacad16af7b536))

## [1.9.22](https://github.com/Pocket/web-client/compare/v1.9.21...v1.9.22) (2021-04-09)


### Bug Fixes

* **home:** changing test name for home ([9771deb](https://github.com/Pocket/web-client/commit/9771deb3f4fbb1fc6c71e3a6a30484e6bb4b4940))
* **unleash:** pass in accountCreatedAt to query ([67c130b](https://github.com/Pocket/web-client/commit/67c130bb2964d98ae1c2d942c37921d7692fb987))

## [1.9.21](https://github.com/Pocket/web-client/compare/v1.9.20...v1.9.21) (2021-04-07)


### Bug Fixes

* **home:** catching error when no recs returned ([1f03602](https://github.com/Pocket/web-client/commit/1f036023105e02908aab30caab706dda0154d772))

## [1.9.20](https://github.com/Pocket/web-client/compare/v1.9.19...v1.9.20) (2021-04-07)


### Bug Fixes

* **app:** add check for local version compared to server version ([53dac0a](https://github.com/Pocket/web-client/commit/53dac0a10914a783e6ed6fe7230e69b237c9c848))
* **app:** wrap call to version check in a feature flag ([a3de7a4](https://github.com/Pocket/web-client/commit/a3de7a4527ec5ada70047690595f5653dd6b58cf))
* **app:** wrap call to version check in a feature flag ([860ea89](https://github.com/Pocket/web-client/commit/860ea89326086df77da1fb4c8270565b37cfbff9))
* **constants:** remove unneeded constant ([476d62b](https://github.com/Pocket/web-client/commit/476d62be89b0dcaaabaec3b796d6dcead7949589))

## [1.9.19](https://github.com/Pocket/web-client/compare/v1.9.18...v1.9.19) (2021-04-06)


### Bug Fixes

* **waypoint:** remove sentry for features ([4a80dfe](https://github.com/Pocket/web-client/commit/4a80dfe697ad29a86d9c2543113458eb7a02c750))

## [1.9.18](https://github.com/Pocket/web-client/compare/v1.9.17...v1.9.18) (2021-04-05)


### Bug Fixes

* **unleash:** test for control with regex ([7b50a28](https://github.com/Pocket/web-client/commit/7b50a281a0c208a8b6b35f3eef72b345cfb60ca2))
* **unleash:** update tests for active ([2fd6d60](https://github.com/Pocket/web-client/commit/2fd6d600daa9670295174f67515d8ce2d46b9b8c))

## [1.9.17](https://github.com/Pocket/web-client/compare/v1.9.16...v1.9.17) (2021-04-05)


### Bug Fixes

* **unleash:**  allow array of flags / add utility ([0784ca5](https://github.com/Pocket/web-client/commit/0784ca5181f2d1bd1f96183b633c279fff34631a))
* **unleash:** pass in birth for activation ([0b7c68f](https://github.com/Pocket/web-client/commit/0b7c68f2e628747f0135f025f1322087eaaf401f))

## [1.9.16](https://github.com/Pocket/web-client/compare/v1.9.15...v1.9.16) (2021-04-02)


### Bug Fixes

* **items:** adding a status filter to no longer store deleted items ([dc6c3f2](https://github.com/Pocket/web-client/commit/dc6c3f230d7cc45eba46d4652ce01993c6838953))
* **items:** adding a status filter to no longer store deleted items ([74143d6](https://github.com/Pocket/web-client/commit/74143d6cae4bb8eb5d383164653db881ba5f66f6))
* **items:** adding a status filter to no longer store deleted items ([4e39c38](https://github.com/Pocket/web-client/commit/4e39c381915addcadc59874362619305c9fe26c5))
* **items:** removing unneeded log ([046fa0f](https://github.com/Pocket/web-client/commit/046fa0ff3f9c80e29c3dd0dfe53b434861c7b0f0))

## [1.9.15](https://github.com/Pocket/web-client/compare/v1.9.14...v1.9.15) (2021-03-30)


### Bug Fixes

* **analytics:** add legacy opened app event ([294712e](https://github.com/Pocket/web-client/commit/294712ed79e183a3b4b5872d4d3ef235caca3935))

## [1.9.14](https://github.com/Pocket/web-client/compare/v1.9.13...v1.9.14) (2021-03-30)


### Bug Fixes

* **darkmode:** tweaks for discover in dark mode ([f398110](https://github.com/Pocket/web-client/commit/f39811066ee56da6fcc60d5ef1ab175ccde81e64))
* **tests:** make user.auth conditional ([a6f3477](https://github.com/Pocket/web-client/commit/a6f34777fe8038c5654a92ff921b0b1a6587c304))

## [1.9.13](https://github.com/Pocket/web-client/compare/v1.9.12...v1.9.13) (2021-03-30)


### Bug Fixes

* **snowplow:** adding new rec entities and  documentation ([5b4d5c5](https://github.com/Pocket/web-client/commit/5b4d5c5471eb8a69f1ddffc252c6685c5253936e))

## [1.9.12](https://github.com/Pocket/web-client/compare/v1.9.11...v1.9.12) (2021-03-29)


### Bug Fixes

* **feature flag:** more robust assignment ([73142b7](https://github.com/Pocket/web-client/commit/73142b78a148a6d81345676d033b9553f91b3c04))
* **feature flags:** assignment by passed variant ([400595d](https://github.com/Pocket/web-client/commit/400595ddad07c9d697005046daf6d0c38c769061))
* **feature flags:** only assign if eligible ([cca3414](https://github.com/Pocket/web-client/commit/cca3414ac20d65efe6099ccea517153aa3e2b703))

## [1.9.11](https://github.com/Pocket/web-client/compare/v1.9.10...v1.9.11) (2021-03-24)


### Bug Fixes

* **storybook:** load error in webpack ([b9f205e](https://github.com/Pocket/web-client/commit/b9f205e37bc472b46d2c3dade58ba45d8febe61c))

## [1.9.10](https://github.com/Pocket/web-client/compare/v1.9.9...v1.9.10) (2021-03-24)


### Bug Fixes

* **snowplow:** add variant enroll event for unleash features ([b56bff9](https://github.com/Pocket/web-client/commit/b56bff97294785c9c1717b49dafdb97d67ec2492))
* **snowplow:** update home test name ([8fc2154](https://github.com/Pocket/web-client/commit/8fc21549088db5e25161d7a93f381f5f66547142))

## [1.9.9](https://github.com/Pocket/web-client/compare/v1.9.8...v1.9.9) (2021-03-24)


### Bug Fixes

* **waypoint:** pass query params to page ([47ba5a3](https://github.com/Pocket/web-client/commit/47ba5a3d7e5144215c80fc3a3db2c9e5b050c3a3))
* **waypoint:** preserve query params to home ([58b5f2d](https://github.com/Pocket/web-client/commit/58b5f2da32c82f35120dd4e0e347fac3067552fa))

## [1.9.8](https://github.com/Pocket/web-client/compare/v1.9.7...v1.9.8) (2021-03-23)


### Bug Fixes

* **recs:** add save action for reader recs and use that module on topcis ([745bb59](https://github.com/Pocket/web-client/commit/745bb599e27e33223528ee88757bf1536d3233a4))

## [1.9.7](https://github.com/Pocket/web-client/compare/v1.9.6...v1.9.7) (2021-03-23)


### Bug Fixes

* **recs:** add release notes for recs and remove feature flag ([ada2d08](https://github.com/Pocket/web-client/commit/ada2d085968ec48d5dbbf09ff69fbb44e17bc6c0))

## [1.9.6](https://github.com/Pocket/web-client/compare/v1.9.5...v1.9.6) (2021-03-23)


### Bug Fixes

* **home:** limit test across the board ([fe6179b](https://github.com/Pocket/web-client/commit/fe6179b659a9cf756bab52b85ebb5e1441121356))
* **nav:** update explore links to use direct links ([0b64648](https://github.com/Pocket/web-client/commit/0b646486b2feb8d1ae304ef83753aa42ab309ef3))

## [1.9.5](https://github.com/Pocket/web-client/compare/v1.9.4...v1.9.5) (2021-03-22)


### Bug Fixes

* **topic:** update topic link to have onclick event for analytics ([a33670d](https://github.com/Pocket/web-client/commit/a33670deca1cf4d9e2e57746a58fb421f646c07e))

## [1.9.4](https://github.com/Pocket/web-client/compare/v1.9.3...v1.9.4) (2021-03-22)


### Bug Fixes

* **home:** update home elegibility date ([992ab47](https://github.com/Pocket/web-client/commit/992ab479192b37fab346be3d5f1e3dd852fd5f50))

## [1.9.3](https://github.com/Pocket/web-client/compare/v1.9.2...v1.9.3) (2021-03-22)


### Bug Fixes

* **discover:** update tests to include openexternal ([bb1df64](https://github.com/Pocket/web-client/commit/bb1df64086bd09ca1862ea398dbf01915452c995))
* **home:** update save button to allow bubbling ([d45bef5](https://github.com/Pocket/web-client/commit/d45bef52c20a730cc65b7facdda18137421e84e5))
* **topic:** open in reader once saved ([f740f86](https://github.com/Pocket/web-client/commit/f740f864d596e1d7b770e023bb64f5f56153bb9b))
* **topic:** remove unneeded funciton ([f1d79bd](https://github.com/Pocket/web-client/commit/f1d79bd9d746337f8ef1c16618106cddb75141d8))
* **topic:** update topic card so read now is in link ([9c2b8a1](https://github.com/Pocket/web-client/commit/9c2b8a1083e359b3735e551c930958c2f74ef0c0))
* **topic:** use external link if needed ([642a130](https://github.com/Pocket/web-client/commit/642a13090e63ceac9df6be1d543bbd79733b0c38))
* **topics:** remove sneaky console ([ce3d344](https://github.com/Pocket/web-client/commit/ce3d3445161c6d217a733274e906ec32c452373e))

## [1.9.2](https://github.com/Pocket/web-client/compare/v1.9.1...v1.9.2) (2021-03-22)


### Bug Fixes

* **home:** make side nav discover explicit ([1f708d3](https://github.com/Pocket/web-client/commit/1f708d3ae617f03b2946fb7be470638de7ca394c))

## [1.9.1](https://github.com/Pocket/web-client/compare/v1.9.0...v1.9.1) (2021-03-22)


### Bug Fixes

* **home:** copy updates ([ac00886](https://github.com/Pocket/web-client/commit/ac0088674bb820b6c0fea811bf7f36ee5d489531))

# [1.9.0](https://github.com/Pocket/web-client/compare/v1.8.14...v1.9.0) (2021-03-22)


### Bug Fixes

* **app:** use default source maps with nextjs ([a7ecbcb](https://github.com/Pocket/web-client/commit/a7ecbcbd3e9015a82c91542f0662307008b54069))
* **home:** filter initial items ([20c280b](https://github.com/Pocket/web-client/commit/20c280be1309a57e7aeeeb44b9a09f052dac1bdf))
* **home:** update proptypes ([3e6857a](https://github.com/Pocket/web-client/commit/3e6857a9dad349b2ae31894315cf19b6ca177a3f))
* **side nav:** adjusting order for home ([ed292a3](https://github.com/Pocket/web-client/commit/ed292a33f73e2ff7dbc5e99e9ea631745edaccbd))
* **waypoint:** eligibility test base on new users ([fb9516a](https://github.com/Pocket/web-client/commit/fb9516a811e000d71de8df06eb5fed5d78ce6527))
* **waypoint:** make home test `en` only ([2bf35cb](https://github.com/Pocket/web-client/commit/2bf35cb27a588397ecdcccb8052e300ce8102a28))


### Features

* **home:** adding route to alb ([13b8b3c](https://github.com/Pocket/web-client/commit/13b8b3ceccb5ff70a277457ea07954c0d0d9787b))

## [1.8.14](https://github.com/Pocket/web-client/compare/v1.8.13...v1.8.14) (2021-03-19)


### Bug Fixes

* **env:** update node_env check to be against 'dev' ([d630d32](https://github.com/Pocket/web-client/commit/d630d321a2386a8d96f38a03b4d25f8748a8ed71))
* **env:** updating dev check to show_dev variable ([b11c4e9](https://github.com/Pocket/web-client/commit/b11c4e9c6c3ec1cf9782ac84ae8f03b77f532916))
* **package:** remove show_dev env variable from build process ([724f8ec](https://github.com/Pocket/web-client/commit/724f8ec8ceea6d9184a5f99ddef7a835c4609eae))

## [1.8.13](https://github.com/Pocket/web-client/compare/v1.8.12...v1.8.13) (2021-03-19)


### Bug Fixes

* **waypoint:** destructure properly ([e814dfd](https://github.com/Pocket/web-client/commit/e814dfd3e3930ef2529cce6a90a6492ef46ca7d2))

## [1.8.12](https://github.com/Pocket/web-client/compare/v1.8.11...v1.8.12) (2021-03-19)


### Bug Fixes

* **request:** ssr/client specific headers ([642d02d](https://github.com/Pocket/web-client/commit/642d02d30f8d6970ef18e61ecdfe5029c4b7398e))

## [1.8.11](https://github.com/Pocket/web-client/compare/v1.8.10...v1.8.11) (2021-03-19)


### Bug Fixes

* **accesibility:** setting the proper outline parameter on our button reset ([fa1e618](https://github.com/Pocket/web-client/commit/fa1e618dfcacc32e8d76b3ce6bda4544dc3513e8))
* **accessibility:** adding important to focus styles to combat diff between local and prod ([728c3bc](https://github.com/Pocket/web-client/commit/728c3bc6a85d5c8a285e4e69121183baea3ab52c))

## [1.8.10](https://github.com/Pocket/web-client/compare/v1.8.9...v1.8.10) (2021-03-19)


### Bug Fixes

* **request:** always use cors ([8e7ac68](https://github.com/Pocket/web-client/commit/8e7ac688d668a058f5f82e5d92bb353bf43ed42f))

## [1.8.9](https://github.com/Pocket/web-client/compare/v1.8.8...v1.8.9) (2021-03-19)


### Bug Fixes

* **snowplow:** update file path ([5bd2c5d](https://github.com/Pocket/web-client/commit/5bd2c5ddbf13ca0fa37e82c9d6bb2b0e417f732e))

## [1.8.8](https://github.com/Pocket/web-client/compare/v1.8.7...v1.8.8) (2021-03-19)


### Bug Fixes

* **request:** add additional logging for testing ([b0f6f73](https://github.com/Pocket/web-client/commit/b0f6f73d6c8ae002443b64be6fdbc85329357454))
* **request:** adding user agent ([7b172f7](https://github.com/Pocket/web-client/commit/7b172f73e3de7385bb4a6c5807cf148582e59ccd))
* **request:** ssr origin ([342be82](https://github.com/Pocket/web-client/commit/342be821244dcd2caa7300a469260d5ed2227f2b))

## [1.8.7](https://github.com/Pocket/web-client/compare/v1.8.6...v1.8.7) (2021-03-18)


### Bug Fixes

* **request:** proper cookie passing ([f089947](https://github.com/Pocket/web-client/commit/f089947797f2691215df677b01c121b4f8595175))

## [1.8.6](https://github.com/Pocket/web-client/compare/v1.8.5...v1.8.6) (2021-03-18)


### Bug Fixes

* **sentry:** remove unused integrations ([63162a6](https://github.com/Pocket/web-client/commit/63162a66254b8acfcc8adc78b4c3b146790eec10))

## [1.8.5](https://github.com/Pocket/web-client/compare/v1.8.4...v1.8.5) (2021-03-18)


### Bug Fixes

* **waypoint:** add some sentry logging ([55d5d14](https://github.com/Pocket/web-client/commit/55d5d144f0c87fd5f02061735a8e20e30a68ff08))

## [1.8.4](https://github.com/Pocket/web-client/compare/v1.8.3...v1.8.4) (2021-03-18)


### Bug Fixes

* **home:** overflow on ff for card content ([3838947](https://github.com/Pocket/web-client/commit/3838947e4008d41b1d1f8d5d23eda80bcad55c21))

## [1.8.3](https://github.com/Pocket/web-client/compare/v1.8.2...v1.8.3) (2021-03-18)


### Bug Fixes

* **request:** allow explicit cookie passing ([a13ffbf](https://github.com/Pocket/web-client/commit/a13ffbf0fb896405b27f368c5cdec886c305d3ca))
* **waypoint:** explicitly pass cookies ([568c719](https://github.com/Pocket/web-client/commit/568c7195afa607ff3c776c83c8129c9d2fab0317))

## [1.8.2](https://github.com/Pocket/web-client/compare/v1.8.1...v1.8.2) (2021-03-18)


### Bug Fixes

* **home:** remove unneeded console log ([da4cccb](https://github.com/Pocket/web-client/commit/da4cccb824d1c1d05a1e0ab26de2b1591be1f0be))
* **recs:** updating item state on save ([d702002](https://github.com/Pocket/web-client/commit/d70200217aa150556343f09699e393ec4a7ab18b))

## [1.8.1](https://github.com/Pocket/web-client/compare/v1.8.0...v1.8.1) (2021-03-17)


### Bug Fixes

* **waypoint:** allow proper redirection ([0eae76f](https://github.com/Pocket/web-client/commit/0eae76fbdf2f945fc2781deb46b12ee1ff73a277))

# [1.8.0](https://github.com/Pocket/web-client/compare/v1.7.2...v1.8.0) (2021-03-17)


### Features

* **waypoint:** adding initial page ([518138a](https://github.com/Pocket/web-client/commit/518138a849574a2fc5bade70e192d238480e97d2))
* **waypoint:** unleash asignment and redirect ([8aaf085](https://github.com/Pocket/web-client/commit/8aaf085e39a5aeeb1d5bc2b18ae96852b88fe5be))

## [1.7.2](https://github.com/Pocket/web-client/compare/v1.7.1...v1.7.2) (2021-03-17)


### Bug Fixes

* **home:** basic responsiveness ([46418a8](https://github.com/Pocket/web-client/commit/46418a8215813ed521854526b71450ed56eb0321))

## [1.7.1](https://github.com/Pocket/web-client/compare/v1.7.0...v1.7.1) (2021-03-17)


### Bug Fixes

* **home:** add missing links to collections ([76ad91e](https://github.com/Pocket/web-client/commit/76ad91ed417fe6eb6f1aa03b9b5a8d61f4ef4542))

# [1.7.0](https://github.com/Pocket/web-client/compare/v1.6.4...v1.7.0) (2021-03-17)


### Bug Fixes

* **app:** set proper name ([496dafa](https://github.com/Pocket/web-client/commit/496dafa797f341fbbeb44fd8abb698c8f233c1b3))
* **dev tools:** proper language capture ([9470269](https://github.com/Pocket/web-client/commit/9470269e7993133ed4d033dcb7e5831edcdac239))
* **discover:** removing underliner ([9eb70ec](https://github.com/Pocket/web-client/commit/9eb70ec7a187705ae7c6ff02fb2bc168f4c48e13))
* **home:** remove domain from global nav link ([3db17fb](https://github.com/Pocket/web-client/commit/3db17fb3897c0366e4bc8cceb2c6c5a2805e21a4))
* **localization:** adjust injection point ([f5accbc](https://github.com/Pocket/web-client/commit/f5accbcd3c9773a407c2aed2292ae8c1c79cdb7c))
* **localization:** update to use latest pattern ([83061dc](https://github.com/Pocket/web-client/commit/83061dc89bc729b15e8bf17a186fb99dc59b6842))
* **reader:** remove background color from titles ([2e7f7a8](https://github.com/Pocket/web-client/commit/2e7f7a802950b0f2ce062b3de034dc58f385d0f0))


### Features

* **explore:** re-write explore/discover ([fd50ea1](https://github.com/Pocket/web-client/commit/fd50ea131c6beb66ff9e22ff1be9f517a18c0633))

## [1.6.4](https://github.com/Pocket/web-client/compare/v1.6.3...v1.6.4) (2021-03-16)


### Bug Fixes

* **snowplow:** re-enable dev snowplow endpoints for local envs ([3564d5c](https://github.com/Pocket/web-client/commit/3564d5ce8c386c2ba0cb99a64c731a05e032d8a0))

## [1.6.3](https://github.com/Pocket/web-client/compare/v1.6.2...v1.6.3) (2021-03-16)


### Bug Fixes

* **home:** hook up snowplow analytics to all cards ([d8db0b9](https://github.com/Pocket/web-client/commit/d8db0b95bfebf439c31c9dde258e16a541c4ca51))

## [1.6.2](https://github.com/Pocket/web-client/compare/v1.6.1...v1.6.2) (2021-03-15)


### Bug Fixes

* **video:** disable autoplay on videos ([8426f84](https://github.com/Pocket/web-client/commit/8426f844dff5a8bcb8bc3d51d0668472ba67db70))

## [1.6.1](https://github.com/Pocket/web-client/compare/v1.6.0...v1.6.1) (2021-03-15)


### Bug Fixes

* **reader:** disable sidebar clicks when inactive on smaller screens ([443ff79](https://github.com/Pocket/web-client/commit/443ff79e6bad4a3889a1d2833f71c05d47db1681))
* **reader:** styling bottom reader recs and analytics events ([f40fd52](https://github.com/Pocket/web-client/commit/f40fd5257fbf007326e8f3c0cf7d389acb1a8a77))
* **recit:** using the card template for bottom recit ([8faa7bf](https://github.com/Pocket/web-client/commit/8faa7bf48db0bb8ab01a60b827f8fe29aa2e19d5))
* **recs:** add id to dependency chain ([e44c1eb](https://github.com/Pocket/web-client/commit/e44c1eb89c049ed9547a10f2b4cddd48efc76f88))

# [1.6.0](https://github.com/Pocket/web-client/compare/v1.5.3...v1.6.0) (2021-03-15)


### Features

* **app:** adding auth required to specific pages ([7aee6cf](https://github.com/Pocket/web-client/commit/7aee6cf9b8950caa22f7f05accdbd0798d266e1e))

## [1.5.3](https://github.com/Pocket/web-client/compare/v1.5.2...v1.5.3) (2021-03-15)


### Bug Fixes

* **video:** direct embeds ([029983e](https://github.com/Pocket/web-client/commit/029983e66f85e8c6e682c8ae0f2f1e9b76764584))

## [1.5.2](https://github.com/Pocket/web-client/compare/v1.5.1...v1.5.2) (2021-03-15)


### Bug Fixes

* **nav:** account for flags in tests ([c048dc8](https://github.com/Pocket/web-client/commit/c048dc8fbdaf4f2fcbb4738bcd58c6973aba0296))

## [1.5.1](https://github.com/Pocket/web-client/compare/v1.5.0...v1.5.1) (2021-03-12)


### Bug Fixes

* **account:** fix tooltip active state ([477bfe7](https://github.com/Pocket/web-client/commit/477bfe7284e8657c45c0e176d95e02693f3ce225))

# [1.5.0](https://github.com/Pocket/web-client/compare/v1.4.3...v1.5.0) (2021-03-11)


### Bug Fixes

* **card:** remove specificity ([e4fafac](https://github.com/Pocket/web-client/commit/e4fafac2b6f193bd232ecc5201ccb434707390a0))
* **discover:** adjust derived url for open ([eaee004](https://github.com/Pocket/web-client/commit/eaee004dfb09cbe8139d5738ee05771cd5c44b9f))
* **greeting:** remove personalization ([11a9b09](https://github.com/Pocket/web-client/commit/11a9b094a03a8fc26a8ada7b385bdf343b5e3875))
* **home:** add skeletons on recent recs ([953fb9b](https://github.com/Pocket/web-client/commit/953fb9bed3ec7001b2b2c250fd2d2bd97fdbfc58))
* **reccit:** use proper module from home ([d8050a6](https://github.com/Pocket/web-client/commit/d8050a6b01c968ee7a2c63d2e62b3ca6eb92ddac))


### Features

* **recents:** adding recent saves ([875bc14](https://github.com/Pocket/web-client/commit/875bc146e253c4a2d8b611459b8728c2f8d44901))

## [1.4.3](https://github.com/Pocket/web-client/compare/v1.4.2...v1.4.3) (2021-03-11)


### Bug Fixes

* **reader:** fix display settings auto close ([4226369](https://github.com/Pocket/web-client/commit/4226369e2597b83f584b137e0a91ac39b50a33c2))

## [1.4.2](https://github.com/Pocket/web-client/compare/v1.4.1...v1.4.2) (2021-03-11)


### Bug Fixes

* **accessibility:** auto focus in menus when opened ([b7cfce8](https://github.com/Pocket/web-client/commit/b7cfce888040b03af2e98ec3eafee1514c00dead))
* **accessibility:** update to use keys consts and broken global nav test ([8b38022](https://github.com/Pocket/web-client/commit/8b38022ce97d9af1bd0b135d37e75c9ff0eed6f3))

## [1.4.1](https://github.com/Pocket/web-client/compare/v1.4.0...v1.4.1) (2021-03-11)


### Bug Fixes

* **accessibility:** update headers to make sense in a structrual sense ([daf6256](https://github.com/Pocket/web-client/commit/daf62567242d893457e5c3454fccc62af597ab66))

# [1.4.0](https://github.com/Pocket/web-client/compare/v1.3.1...v1.4.0) (2021-03-10)


### Features

* **home:** recs based on recent saves ([f5e4528](https://github.com/Pocket/web-client/commit/f5e4528b4563791c2c16ccb26cac8bcc484ddc64))
* **home recs:** adding actions ([19e39ba](https://github.com/Pocket/web-client/commit/19e39ba5d37549999ac6305b5aa7f6d63d9581a1))
* **home recs:** adding new endpoint module ([3bf18a6](https://github.com/Pocket/web-client/commit/3bf18a6feb079a9bb68388bc972b0e7520dfe639))
* **home recs:** updating recit state for home rec ([d7bd19a](https://github.com/Pocket/web-client/commit/d7bd19a409c8b16c88779f565c97a2d9586dad09))

## [1.3.1](https://github.com/Pocket/web-client/compare/v1.3.0...v1.3.1) (2021-03-10)


### Bug Fixes

* **avatar:** add inline block to avatar element ([5420484](https://github.com/Pocket/web-client/commit/542048452b3b8dd648909b9aefb7e6f3fc4af607))
* **avatar:** add inline block to avatar element ([eed0bd7](https://github.com/Pocket/web-client/commit/eed0bd791653c36b380d4603ce6115c32b3f5a54))

# [1.3.0](https://github.com/Pocket/web-client/compare/v1.2.3...v1.3.0) (2021-03-10)


### Features

* **api:** adding web-client-api route to alb ([f67d054](https://github.com/Pocket/web-client/commit/f67d054b9aba316c9d20f77e9ae9ea39d26c8682))

## [1.2.3](https://github.com/Pocket/web-client/compare/v1.2.2...v1.2.3) (2021-03-10)


### Bug Fixes

* **tooltip:** add tooltip styles and update reader to use ([9477cbe](https://github.com/Pocket/web-client/commit/9477cbe62fc245366e9acaac21c1dbabc26c0271))
* **tooltip:** adding new tooltip to item actions ([d0cd628](https://github.com/Pocket/web-client/commit/d0cd628c5376b7530008aef9bc27854a805ee485))
* **tooltip:** adding tooltip to item overflow ([53f68b6](https://github.com/Pocket/web-client/commit/53f68b66b6f317cc42fee04e3c7d7b1311f5066d))
* **tooltip:** removing withtooltip from all items except cards ([9514cd4](https://github.com/Pocket/web-client/commit/9514cd49b840e4aed194e159979a49aa9816c770))

## [1.2.2](https://github.com/Pocket/web-client/compare/v1.2.1...v1.2.2) (2021-03-09)


### Bug Fixes

* **fonts:** disable premium fonts for non-premium users ([89f6feb](https://github.com/Pocket/web-client/commit/89f6febb2110992de31ec4f89efb3b71a661ce24))
* **reader:** update nav bar to be more accessible with outlines ([1e9d189](https://github.com/Pocket/web-client/commit/1e9d189841b36704d041a6dbe6d0532c9c295670))
* **stepper:** keep button outline even if not active ([2cf1c10](https://github.com/Pocket/web-client/commit/2cf1c1002036df2c1a0b0df7920cd8194d2a712f))

## [1.2.1](https://github.com/Pocket/web-client/compare/v1.2.0...v1.2.1) (2021-03-09)


### Bug Fixes

* **home:** fix for sidenav height, list refresh, various errors ([b053e7d](https://github.com/Pocket/web-client/commit/b053e7deda0d01ec6c196332a00219aaf3baa120))

# [1.2.0](https://github.com/Pocket/web-client/compare/v1.1.6...v1.2.0) (2021-03-06)


### Bug Fixes

* **callouts:** replace missing image ([c75054c](https://github.com/Pocket/web-client/commit/c75054cf7f7b79ee027a81b69ab5dd31f7843f7a))
* **discover:** add item_id for generic card ([f2029ee](https://github.com/Pocket/web-client/commit/f2029eef3edfbe0a051c121075e8fbcdbfc34cb6))
* **discover item:** update test to include item_id ([a9a371d](https://github.com/Pocket/web-client/commit/a9a371d2390b3c562172ea4038e5dbc8b1040fba))


### Features

* **card:** adding detail to general card ([bf0dde1](https://github.com/Pocket/web-client/commit/bf0dde180f0d9c5421ca9af72f8082985ce0d1a4))
* **card:** adding flexible card ([f2e18c1](https://github.com/Pocket/web-client/commit/f2e18c11883e1ffafc654bfaadddfbb85d9b4345))
* **card:** adding item action menus/connectors ([8d12151](https://github.com/Pocket/web-client/commit/8d1215117117be4311bbf906a29cb04c9f1e47fe))
* **card:** adding some basic layouts ([d6c237f](https://github.com/Pocket/web-client/commit/d6c237f10a1b4e72b1a28a32dbee2060bc62e343))
* **card:** adding specialized card types ([70ac460](https://github.com/Pocket/web-client/commit/70ac460cadf4e9b4a573cd45a03f59b71d0c6fb1))
* **card:** adding tags to general card ([954ec7e](https://github.com/Pocket/web-client/commit/954ec7e6c3a53a22f898db36281ac3229f64e312))
* **card:** updating stories ([3fa7ac8](https://github.com/Pocket/web-client/commit/3fa7ac80f866a32b3ab1f6cb972dfbe58ec15f9b))
* **cards:** update mixed layout options ([0f8c019](https://github.com/Pocket/web-client/commit/0f8c019d2f6d3e38c77a3a0e5c76a9c5ff29e97c))
* **layouts:** updating stories ([a0bdd40](https://github.com/Pocket/web-client/commit/a0bdd4092fe9ddc732beb3c29d047e5736aa1c30))

## [1.1.6](https://github.com/Pocket/web-client/compare/v1.1.5...v1.1.6) (2021-03-05)


### Bug Fixes

* **accessbility:** add label to discover card menu ([528c97d](https://github.com/Pocket/web-client/commit/528c97d645ae8c8ff74b028f58d087b727170d4e))
* **accessibility:** add label to syndicated icon ([c53b138](https://github.com/Pocket/web-client/commit/c53b13890a2b2e593efb625b31a7039524a53eed))
* **card:** remove unneeded prop ([ce80e62](https://github.com/Pocket/web-client/commit/ce80e62dd5118550a45d299fa836a153611d2c35))

## [1.1.5](https://github.com/Pocket/web-client/compare/v1.1.4...v1.1.5) (2021-03-05)


### Bug Fixes

* **reader:** wrap recommendations in feature flag ([6cc6c5d](https://github.com/Pocket/web-client/commit/6cc6c5d9bf91451376a5671e396ebc407d5e99b6))
* **recs:** adding reader recommendations ([d9c9647](https://github.com/Pocket/web-client/commit/d9c964787ef2a894eaaa0f3a70b820f8369d6d4e))

## [1.1.4](https://github.com/Pocket/web-client/compare/v1.1.3...v1.1.4) (2021-03-05)


### Bug Fixes

* **home:** add action modals for recent saves ([6ac62ba](https://github.com/Pocket/web-client/commit/6ac62ba4bba1089844e8702c34664ab3875e16f2))

## [1.1.3](https://github.com/Pocket/web-client/compare/v1.1.2...v1.1.3) (2021-03-04)


### Bug Fixes

* **accessibility:** remove focus styles for the moment ([62c8ae9](https://github.com/Pocket/web-client/commit/62c8ae98e8cb08593489ac9ddd27adba5c2963a8))
* **accessibility:** removing focus for now ([e5094d1](https://github.com/Pocket/web-client/commit/e5094d1d18d5986a79723b13d526a74ef3c1fe78))
* **accessibility:** removing the autofocus for now ([e117fa9](https://github.com/Pocket/web-client/commit/e117fa9017c7526788beeaaa75a3d03a00d43707))
* **accessibility:** update typo in styles ([f0de2b7](https://github.com/Pocket/web-client/commit/f0de2b7758b4f19d1b008ceff4f63724e0ef70b7))
* **accessiblity:** adding focus on first item in menu and analytics ([36e0f29](https://github.com/Pocket/web-client/commit/36e0f292e748c8edbb44ded7327c8ad81f64e87d))
* **menu:** focus on first item when menu is opened ([da4a4f0](https://github.com/Pocket/web-client/commit/da4a4f0002b72711f7041024db445114999749a7))
* **menu:** remove extra spacing ([b00904b](https://github.com/Pocket/web-client/commit/b00904b684efb2cac438cc9871e2d87f35725f53))

## [1.1.2](https://github.com/Pocket/web-client/compare/v1.1.1...v1.1.2) (2021-03-03)


### Bug Fixes

* **colors:** update colors for contrast for accessibility ([f533e3e](https://github.com/Pocket/web-client/commit/f533e3e4bbbfb58f3321199bba86a63660a4dabe))

## [1.1.1](https://github.com/Pocket/web-client/compare/v1.1.0...v1.1.1) (2021-03-02)


### Bug Fixes

* **home:** adding analytics for collections cards ([fa20d59](https://github.com/Pocket/web-client/commit/fa20d59d3d8ad649e1ac9c107b6151e20bab2a89))

# [1.1.0](https://github.com/Pocket/web-client/compare/v1.0.6...v1.1.0) (2021-03-02)


### Bug Fixes

* **discover:** updating derive to work with client ([8081ca8](https://github.com/Pocket/web-client/commit/8081ca8e7082ce902bed96b712271170f1994123))
* **next:** temp re-write for explore/discover ([be925ee](https://github.com/Pocket/web-client/commit/be925eeadaa70c92afb711c8202d0e1b0f1e5ca2))
* **publisher recs:** styling logo in color modes ([34f2941](https://github.com/Pocket/web-client/commit/34f2941e589bbc5840f382242b575a0892761e97))
* **recs:** filter publisher logos in color modes ([f01b79b](https://github.com/Pocket/web-client/commit/f01b79b80eedcdadd10a42f873b05e4594ecfcbf))
* **syndicated:** remove comment to test ads ([a04bc8f](https://github.com/Pocket/web-client/commit/a04bc8f47424337c9f8edf824b55be0c9b13747e))


### Features

* **cypress:** cypress for discover happy paths ([01016bd](https://github.com/Pocket/web-client/commit/01016bd9a2cdb2d26fb284fe1dbce04ed439ea78))
* **one trust:** adding one trust state to store ([2225cb3](https://github.com/Pocket/web-client/commit/2225cb3e7fd31a001932e969b98e469f52d4e91d))

## [1.0.6](https://github.com/Pocket/web-client/compare/v1.0.5...v1.0.6) (2021-03-01)


### Bug Fixes

* **item:** update save url to fallback to false bool ([493c175](https://github.com/Pocket/web-client/commit/493c175c33ca8d66d2229d2e009ffc1db05b5d5c))

## [1.0.5](https://github.com/Pocket/web-client/compare/v1.0.4...v1.0.5) (2021-03-01)


### Bug Fixes

* **card media:** stop trying to load null images ([ad64b47](https://github.com/Pocket/web-client/commit/ad64b47939d226b77e959233994c1bef4bd365b3))
* **card media:** update tests ([b0fb14e](https://github.com/Pocket/web-client/commit/b0fb14e9061b4151951ede33dfa5e7e3d873df12))

## [1.0.4](https://github.com/Pocket/web-client/compare/v1.0.3...v1.0.4) (2021-02-26)


### Bug Fixes

* **snowplow:** dont send bulk events when no items are selected ([2f24d41](https://github.com/Pocket/web-client/commit/2f24d41e02095aed0317727cae8323b87a4eb2b9))

## [1.0.3](https://github.com/Pocket/web-client/compare/v1.0.2...v1.0.3) (2021-02-26)


### Bug Fixes

* **home:** enable local storage of selected topics ([4e4fc4c](https://github.com/Pocket/web-client/commit/4e4fc4c6bc194c85436645076ee2f3935f582897))

## [1.0.2](https://github.com/Pocket/web-client/compare/v1.0.1...v1.0.2) (2021-02-26)


### Bug Fixes

* **build:** expose RELEASE_VERSION in docker ([7e32acc](https://github.com/Pocket/web-client/commit/7e32acca93cecc5baa80d3f1f6f4816b4ff3ba37))
* **ci:** attach workspace earlier > access version ([c822d85](https://github.com/Pocket/web-client/commit/c822d859fe00f02126dacbe7d6cb03d193f04531))

## [1.0.1](https://github.com/Pocket/web-client/compare/v1.0.0...v1.0.1) (2021-02-26)


### Bug Fixes

* **version:** surface version for users ([e7d99d2](https://github.com/Pocket/web-client/commit/e7d99d24845f7f1e711611847b3fa6e1b636ca49))

# 1.0.0 (2021-02-26)


### Bug Fixes

* **404:** adding namespace ([387c0cd](https://github.com/Pocket/web-client/commit/387c0cdb7c6d9e4087e11fa552f232f6434c47e1))
* **accessibility:** quick pass for labels on buttons ([dbcd932](https://github.com/Pocket/web-client/commit/dbcd932b8b487934a44c98d4f1a63a8a9e0a8678))
* **account:** remove user status check ([191fb50](https://github.com/Pocket/web-client/commit/191fb50d21505c16c152e75fca8e46a2937b79a1))
* **actions:** add set current item ([05a1a13](https://github.com/Pocket/web-client/commit/05a1a1302fc4f5ab83d1bd1a0124a69fea07331e))
* **actions:** adding mobile share menu ([7366bf5](https://github.com/Pocket/web-client/commit/7366bf5a31a90ec436c61de8aabc379821b06cdb))
* **actions:** adding mobile share menu ([6f5136f](https://github.com/Pocket/web-client/commit/6f5136f58447f7dfea1a06453210b5badab6d048))
* **actions:** cleanup unused actions ([3b9e3dd](https://github.com/Pocket/web-client/commit/3b9e3ddc4a9eeb2f076c80c8ee772cc06381bc89))
* **actions:** convert timestamp to seconds ([ca9dedb](https://github.com/Pocket/web-client/commit/ca9dedbcf74fd497bb930e01b6add4023ef0db60))
* **actions:** make item menu change direction depending on page position ([60596f3](https://github.com/Pocket/web-client/commit/60596f3a6fe2433191f42230b71ecf54cbd47f25))
* **actions:** perm library opens in new tab ([b1b15dc](https://github.com/Pocket/web-client/commit/b1b15dcdaced4f66d560d5ded95a8970bf77e4c0))
* **actions:** re-add soon do be defunct actions ([a0dcecf](https://github.com/Pocket/web-client/commit/a0dcecf1fb41507a8977baf2b7589af4fa8755d8))
* **actions:** update item actions ([56408e2](https://github.com/Pocket/web-client/commit/56408e2930d4687ae3ba8a3e31f97c9a9c5b1161))
* **actions:** update item actions to have overflow menu ([68df773](https://github.com/Pocket/web-client/commit/68df773464614b8650c55999a9344e9038b26390))
* **actions:** update title on item menu ([087cd41](https://github.com/Pocket/web-client/commit/087cd41d7b0880f84dfc5c118ba6488e56c60bda))
* **actions:** update title on item menu ([6a6cca2](https://github.com/Pocket/web-client/commit/6a6cca28083f04fd1dbaf6d3eea6b01ccc90a45a))
* **actions:** update title on item menu ([3a5d7e6](https://github.com/Pocket/web-client/commit/3a5d7e63b7b7ca5a8316ba7b98498820aacc7135))
* **actions:** update when action menu closes ([1af248d](https://github.com/Pocket/web-client/commit/1af248d6e6af3265a15a07dadc3f1f4aa7ed8b3a))
* **ads:** adding all bottom of reader ads variations ([6035026](https://github.com/Pocket/web-client/commit/6035026297c90f3bdd83710011772bff18cac5e5))
* **analytics:** adding ids to reader links for snowplow tracking ([316575e](https://github.com/Pocket/web-client/commit/316575e128e38f5abdebb8cbab96199577988b94))
* **analytics:** adding separate content and non content impression actions ([684f176](https://github.com/Pocket/web-client/commit/684f17647b295462b77a423d5982586f59f4b415))
* **analytics:** bulk edit engagement events ([cc3248a](https://github.com/Pocket/web-client/commit/cc3248ac6b4c87eb30b7b10059eb0e5ad3c4f508))
* **analytics:** content open actions snowplow and legacy ([d7a8573](https://github.com/Pocket/web-client/commit/d7a85735563a59aaa4e3bd0316f903ddb8462cf6))
* **analytics:** engagement events in global header ([36a92dc](https://github.com/Pocket/web-client/commit/36a92dc9e0e0e1a7b9c4883da24821b480275c5c))
* **analytics:** fix outstanding anaytics events ([a07569f](https://github.com/Pocket/web-client/commit/a07569fc74043a167ad9cc44d234efcb5f40701c))
* **analytics:** fixing impression event to add ui element ([ea9d4a2](https://github.com/Pocket/web-client/commit/ea9d4a2a5973b10c317bf7e570bf795a803df2c2))
* **analytics:** gloval nav events ([2af518d](https://github.com/Pocket/web-client/commit/2af518df37b0e040fadb01c62f5922894d1ff946))
* **analytics:** impression events ([d213eca](https://github.com/Pocket/web-client/commit/d213eca0f73c8395b976caf11dd00ab28319672d))
* **analytics:** premium upsell impressions ([6820191](https://github.com/Pocket/web-client/commit/682019169dfabe14656b0e5d4f26b79261c74341))
* **analytics:** reader events ([89e2ecf](https://github.com/Pocket/web-client/commit/89e2ecf2b8158634df672f6bf92efe9434a5fdc6))
* **analytics:** update card impression event to remove forward ref ([48b4fa6](https://github.com/Pocket/web-client/commit/48b4fa6265f8f1b3b851fd50c32bc0c5782a9489))
* **analytics:** update impressions to run once ([620cc15](https://github.com/Pocket/web-client/commit/620cc15a4d21724e45bed36a4be00a90d101a42c))
* **badge_id:** remove badge id for now ([dfe85ec](https://github.com/Pocket/web-client/commit/dfe85ec294f30be7f09f15574fa0e022f00e1da9))
* **buffer:** updating buffer social share icon ([5788329](https://github.com/Pocket/web-client/commit/5788329edecd26bb2eed21aa6098f4d0883e33df))
* **build:** fixing build errors ([f53b641](https://github.com/Pocket/web-client/commit/f53b6413d7dd284592725dc08badd8426399884d))
* **build:** removing share for now ([d4c48f9](https://github.com/Pocket/web-client/commit/d4c48f9019a2ace5c151ae8cec0d10ab3171cd6c))
* **discover:** ssr included for requests ([2e70fa9](https://github.com/Pocket/web-client/commit/2e70fa903deb339bc5e57c1617baf19016d5a912))
* **docker:** node version ([605ff88](https://github.com/Pocket/web-client/commit/605ff887b3831753fc57f280dc1dc730d6a1d71e))
* **guid:** return guid as normal response ([9135e95](https://github.com/Pocket/web-client/commit/9135e95518d085effc4314d27af7c8216f380335))
* **home:** account for discover request error ([88a54c9](https://github.com/Pocket/web-client/commit/88a54c9c5555a03b558a39cd59723a3118b74c2e))
* **home:** check for feed on discover response ([d0371c0](https://github.com/Pocket/web-client/commit/d0371c08ee408c7193f77db94b14b7e1f3872219))
* **icons:** adding correct icons to sidebar/actions ([3bf9518](https://github.com/Pocket/web-client/commit/3bf951848c43ff39d918203bc8ce8b409345043a))
* **icons:** update web-ui version for icons ([08d60be](https://github.com/Pocket/web-client/commit/08d60bed6a443d8eb2605b533ac96be7978a6632))
* **item actions:** use item_id over resolved_id ([8c6d869](https://github.com/Pocket/web-client/commit/8c6d869aa2ed7864ea8116762cf227316bba6151))
* **items:** keep saga reducers consistent ([7d0166a](https://github.com/Pocket/web-client/commit/7d0166a08e691fa0cec1ea7af3bc559b1ae783cd))
* **logged in:** adjusting for logged out state ([5782dd8](https://github.com/Pocket/web-client/commit/5782dd85381d9f7c4f943b3daee7f01580dcbe84))
* **modal:** export modal as default for tests ([4e55c39](https://github.com/Pocket/web-client/commit/4e55c39af6ecf523221eb7a910239db15f4e2839))
* **modal:** keep header below modal ([3e27ae0](https://github.com/Pocket/web-client/commit/3e27ae00f4a46306c1205e9e6e9cd0e1d9f70bc6))
* **my-list:** limit render to post user validation ([12c4243](https://github.com/Pocket/web-client/commit/12c4243fa17385876b91b7c7a48e496609de17c5))
* **oauth:** automatic cookie domain ([f134e5e](https://github.com/Pocket/web-client/commit/f134e5e581b2b40e4c649d2150925a5d7c2c76c7))
* **reader:** adding archive and add and annotations add and delete ([9829c1d](https://github.com/Pocket/web-client/commit/9829c1da18019e0a9cf926c7b9ce0e91d8d2626d))
* **reader:** adding state for delete and favorite ([97dbc15](https://github.com/Pocket/web-client/commit/97dbc1542ce5b91dd266496dce111bb74bef137a))
* **reader:** annotations cleanup and upsell and reader upsell ([fcb2001](https://github.com/Pocket/web-client/commit/fcb2001c4f7b58715e38ad3e9ddc2dd09d6db50d))
* **reader:** many things ([1ecbf16](https://github.com/Pocket/web-client/commit/1ecbf16b5a375e26974e7a44d815de07638bab22))
* **reader:** remove commented code ([3e69679](https://github.com/Pocket/web-client/commit/3e69679232917f57bb0c5602f4b4f3d7c1010276))
* **reader:** using derived item ([9794b8f](https://github.com/Pocket/web-client/commit/9794b8f64f5d95d780b1dfd65262972a4da8df46))
* **request:** feature branch as temp api endpoint ([6d34a6b](https://github.com/Pocket/web-client/commit/6d34a6b0150776824d2bfc977df38e7461364dce))
* **request:** omit credentials ([dbc3f15](https://github.com/Pocket/web-client/commit/dbc3f15ed2ac7235f0e65b136ffe8fa7adaf2885))
* **request:** simplify headers ([c536400](https://github.com/Pocket/web-client/commit/c5364008c0550fba8a9baf86c0382586b088075b))
* **requests:** better handling of logged out ([54db6d5](https://github.com/Pocket/web-client/commit/54db6d569223c5a25d9548b7809e28ae85873139))
* **requests:** enable cors only on non ssr ([e927fae](https://github.com/Pocket/web-client/commit/e927faec3951906ec257599f4065112ca6792d8b))
* **share:** share works now ([7501b86](https://github.com/Pocket/web-client/commit/7501b865e42a5248bee9a9cfc11f934e7c465c47))
* **sidebar:** update top padding instead of calc ([2b24b40](https://github.com/Pocket/web-client/commit/2b24b40c96591447c005eda2d82641fd91ce74d9))
* **tag:** adding tag reducers back in ([bc9e1db](https://github.com/Pocket/web-client/commit/bc9e1db32ce1a336f188510922882e3f9f8cc417))
* **tags:** return initial state on cancel ([6d8b1c7](https://github.com/Pocket/web-client/commit/6d8b1c7b8bb22fb0a2cc557b1111f9db26dfe14e))
* discover item actions ([b705d9f](https://github.com/Pocket/web-client/commit/b705d9fc96e99a2b96f6bd7247acfcb98f4c8d97))
* **api:** updaing api shape in places ([1d8e994](https://github.com/Pocket/web-client/commit/1d8e994bcdf894c0dbc85cfd06d8ae94118937a1))
* **app:** missing import ([ef366cb](https://github.com/Pocket/web-client/commit/ef366cb302daeeae8ba8ca96bfe605051d849a0d))
* **aws:** add port mappings to container definition ([d4bc057](https://github.com/Pocket/web-client/commit/d4bc057fc38a08bbb35e6263956aa2759c218c52))
* **aws:** adding redirect for mylist/read ([846ae00](https://github.com/Pocket/web-client/commit/846ae00f18ace6a26d1d9ffbdac1a0dbda3a96b2))
* **aws:** remove mylist/read redirects ([6b3a36d](https://github.com/Pocket/web-client/commit/6b3a36d7cfdbb8c8dd4db153a2e4fcbe3b9174c9))
* **aws:** remove mylist/read redirects ([87e8c1e](https://github.com/Pocket/web-client/commit/87e8c1e95fc9c7f9fb4ef8e232fcd0f225ce4ff1))
* **aws:** reorder mylist routes ([f83b9b5](https://github.com/Pocket/web-client/commit/f83b9b59295b84afa29686956e75266900a2113e))
* **bubble:** update color value ([b8319e4](https://github.com/Pocket/web-client/commit/b8319e4b5cbb6d3887d8932097bfdbc5c36eb51c))
* **bulk:** fixing messaging for bulk favoriting ([42617c4](https://github.com/Pocket/web-client/commit/42617c46ad0238a6598b29d3ac196ab7d7884f6d))
* **bulk:** update batch status on favorite/unfavorite ([68a7253](https://github.com/Pocket/web-client/commit/68a7253386313301572b7631fccf4ddf9bbca97d))
* **bulk:** update content on update ([6556c1c](https://github.com/Pocket/web-client/commit/6556c1c47978fd272574993fc209992039a0ed0e))
* **bulk:** update list on readd of items ([fd39d14](https://github.com/Pocket/web-client/commit/fd39d1427655bbbd9b54c0dcc33342039368c106))
* **bulk:** update padding on icons for mobile sizes ([867da5d](https://github.com/Pocket/web-client/commit/867da5d58b098664a394d0f67668ba03b76bcadc))
* **bulk:** update spacing around bulk buttons ([87e5761](https://github.com/Pocket/web-client/commit/87e57617595a677326623ec09158ccc594d3ba84))
* **bulk edit:** adjust selected icon ([72de683](https://github.com/Pocket/web-client/commit/72de683c77532784d759bf242a89b814dc930f17))
* **bulk edit:** responsive ([2a22a62](https://github.com/Pocket/web-client/commit/2a22a62bdb5886de33fd0c93f6de4ea8913a9e7a))
* **callout:** color mode vars ([eb4b153](https://github.com/Pocket/web-client/commit/eb4b1532779c3226bc2513a794ce7edbf3ed1750))
* **card:** add position to dev overlay ([a300812](https://github.com/Pocket/web-client/commit/a30081220a7d7cd7eeb27d7d784a367ce7a9be39))
* **card:** adjust action layout ([86a164d](https://github.com/Pocket/web-client/commit/86a164d2a89df9fd25717116e33e8676936e0f6b))
* **card:** remove unneeded code block ([3694b15](https://github.com/Pocket/web-client/commit/3694b15a66064595386347924e8b7a65a44a6f3b))
* **card:** remove unneeded props ([343968c](https://github.com/Pocket/web-client/commit/343968c8e992cc36e956b52bd31f08e1016879fd))
* **card:** title/card height for virtualization ([095e6c9](https://github.com/Pocket/web-client/commit/095e6c9049e3304b536f7b10b9c0fb6e69703da4))
* **chore:** fixing minor tweaks and quality of life things ([b921a51](https://github.com/Pocket/web-client/commit/b921a519363a8a95ff66a3884db90774503f112d))
* **ci:** set main branch option ([27bed9f](https://github.com/Pocket/web-client/commit/27bed9f14d1236cdda69fa575d8287af8872d6a6))
* **color mode:** avoid flash of default theme ([a3be970](https://github.com/Pocket/web-client/commit/a3be9709c777d3f42687def37eb03aea841cece8))
* **colormode:** add default in case of undefined ([2d921b3](https://github.com/Pocket/web-client/commit/2d921b375d3ff2bf01c7aa222745888ebf240787))
* **colormode:** adding optional chaining and scope ([9eb721b](https://github.com/Pocket/web-client/commit/9eb721b63623e68ecc77202dfd59be4b6d3ecd41))
* **components:** sharemenu and utilities ([1393432](https://github.com/Pocket/web-client/commit/1393432dc0bfdd338a83524ce5077de3ab218062))
* **components:** stepper ([1cf4162](https://github.com/Pocket/web-client/commit/1cf416261dc82e185fb86eac534a237c2d6e9291))
* **constants:** update our release notes version ([845178a](https://github.com/Pocket/web-client/commit/845178afcf6df2d76448ff029b8bd1d34e8b51ff))
* **dev:** moving dev tools check to connector ([91ffac1](https://github.com/Pocket/web-client/commit/91ffac1b087a44337a9e0fc2b53e481ddf0d5a54))
* **discover:** avoid client side errors ([d79541a](https://github.com/Pocket/web-client/commit/d79541aebfe20d8776b15c53fc7504cb58a68d59))
* **display:** remove console log ([c2dc933](https://github.com/Pocket/web-client/commit/c2dc933ef89ac6a153ec4c758fdd3a2289d36231))
* **elements:** transferred all elements that are making it ([37344c7](https://github.com/Pocket/web-client/commit/37344c7dde8329907977766af2a6b150411c9b04))
* **features:** hydrate features properly ([7d18883](https://github.com/Pocket/web-client/commit/7d18883bae7e5a0081cdc7af09c58daefe92d312))
* **features:** update arn ([b394fdc](https://github.com/Pocket/web-client/commit/b394fdc914c089cf33fb0b0c8c11166db4f41bd3))
* **fonts:** font svg ([80cad8d](https://github.com/Pocket/web-client/commit/80cad8d8146f2d8dc5f88600e0d4de63f5c95100))
* **fonts:** removing fonts hosted in web-ui ([6186b26](https://github.com/Pocket/web-client/commit/6186b26d65364c68289e6f129a7f47abffd08026))
* **fonts:** updating font icons ([4d0f173](https://github.com/Pocket/web-client/commit/4d0f17309f65534f0e386492352024db559c4737))
* **global nav:** updating tools to allow esc ([111ee49](https://github.com/Pocket/web-client/commit/111ee4914f2fd5aafa28da12a7a716b48f9aa253))
* **global-nav:** simplify analytics call for engagement ([4177d09](https://github.com/Pocket/web-client/commit/4177d09c44bebe74fb8546441e126300d4caf7c3))
* **global-nav:** update header links ([dff8c79](https://github.com/Pocket/web-client/commit/dff8c7904ac5f17c3920a7ae588d7dd83a04aeab))
* **grid:** show actions on focus ([09647ff](https://github.com/Pocket/web-client/commit/09647ffa62d5627f8a5a96f9af03e5302820d485))
* **header:** unread header will always display as my list ([0a64d1f](https://github.com/Pocket/web-client/commit/0a64d1f16d046570a926f76035794ad88f93ca66))
* **highlights:** everything but the tics on the side ([73cd8d4](https://github.com/Pocket/web-client/commit/73cd8d43da9ad45fbcf9106cfc17411b9fa70521))
* **highlights:** tics ([f326add](https://github.com/Pocket/web-client/commit/f326add373aa2a651756fde6abc7975b1cc61665))
* **home:** adding snowplow events for all topics related events ([fc4b9c9](https://github.com/Pocket/web-client/commit/fc4b9c9a4f2649e50a13e093d54fe26540fe0257))
* **home:** adding topics card and list ([44526e3](https://github.com/Pocket/web-client/commit/44526e368d6877e541a72e032b07bef6270fe362))
* **home:** adding topics toggle styles ([b658ccb](https://github.com/Pocket/web-client/commit/b658ccb22aa72db074d76830ed2b39ab73ae51f4))
* **home:** check for assigned ([deb34b0](https://github.com/Pocket/web-client/commit/deb34b0a53816a28fa1f42cba38badfe077a4ff6))
* **home:** remove commented code ([69efaf8](https://github.com/Pocket/web-client/commit/69efaf83d26a720086982b55f728902599f81e76))
* **home:** remove fragment ([4c147d9](https://github.com/Pocket/web-client/commit/4c147d96938eb13e739e6534eee26801dab0f1a8))
* **home:** remove padding on topic card ([b845d04](https://github.com/Pocket/web-client/commit/b845d040c76e14dbdafcca4e25c6ce6e924d904d))
* **home:** topics feed api ([29cebbd](https://github.com/Pocket/web-client/commit/29cebbdb7c06267b011ebb20f829a0054649f72d))
* **home:** update topic state ([303103f](https://github.com/Pocket/web-client/commit/303103f4c65c066c03579ba191eb04ee88583fcd))
* **home:** use pill-checkbox for selector ([899ecea](https://github.com/Pocket/web-client/commit/899eceaef5e339a5f69909cc681749501da2c08b))
* **item actions:** adding key to menu items ([ffae8f0](https://github.com/Pocket/web-client/commit/ffae8f08d8589264c961abdcdcdfc790b5557744))
* **item actions:** fix shape of favorites ([ba4c72e](https://github.com/Pocket/web-client/commit/ba4c72e99a81dea95112d41fa1114ee2637e457e))
* **item bulk:** remove unused boilerplate ([e875487](https://github.com/Pocket/web-client/commit/e875487db23db5c0bb7a0e67f39a048c23a566a8))
* **item filters:** update tests for tag filtering ([379c99f](https://github.com/Pocket/web-client/commit/379c99fed2a6bf61dda60349d4b04348a0e3eb1a))
* **itemns:** adding item title to modal popover ([86a989e](https://github.com/Pocket/web-client/commit/86a989ef5f96b2a97b23f5c75550c7d0673202e8))
* **items:** add bool to open external link in derive function ([782a26d](https://github.com/Pocket/web-client/commit/782a26d3947723072e66a31d732b22b7e667013e))
* **items:** condition on initial items populated ([de61a99](https://github.com/Pocket/web-client/commit/de61a994d7d5b3e5a0bb5226e13c4af0fc60cec6))
* **layout:** show actions at small list mode ([c69a95f](https://github.com/Pocket/web-client/commit/c69a95fcba352b036dd4c38d80b075cda80291cc))
* **lint:** limit linting ([89f4b84](https://github.com/Pocket/web-client/commit/89f4b84afb5f229d9560280e0c2c1ab8b20bd8be))
* **linting:** address lint errors ([19c71a0](https://github.com/Pocket/web-client/commit/19c71a0601c5838f5c5713bca3220767b2087193))
* **list:** remove unneeded file from side-bar-nav ([ae60830](https://github.com/Pocket/web-client/commit/ae6083063743ce13286e1b576b14328fcee95e0d))
* **list:** update scroll to top button appearance and only appear when scrolled ([4d87e99](https://github.com/Pocket/web-client/commit/4d87e99e71f2a93aa12a2dc8ac6b699d7812f54d))
* **list actions:** use css to show/hide actions ([e41de08](https://github.com/Pocket/web-client/commit/e41de0840db9eb780f62b2597d8cd65ce0a6dffd))
* **list mode:** add default ([28e2343](https://github.com/Pocket/web-client/commit/28e23438ea05ad2a516b5459c62d1f067d7f3708))
* **list mode:** add list mode setting storage ([bc7d356](https://github.com/Pocket/web-client/commit/bc7d35699d5600d3526526c1b0fe5dd638b65124))
* **list mode:** style and list management ([8db1b8f](https://github.com/Pocket/web-client/commit/8db1b8f6dbb66b34e99732983a572b9c1bbc44ff))
* **list mode:** update reader nav styles ([d2ad6bf](https://github.com/Pocket/web-client/commit/d2ad6bf7845cc33ec85a7bd438cc99d9067dcfc8))
* **list mode:** update styling ([4a07ac4](https://github.com/Pocket/web-client/commit/4a07ac453a740f4f5b18b8eba582bf68309ce943))
* **listmode:** avoid future grid card confusion ([e4d6906](https://github.com/Pocket/web-client/commit/e4d690681c5a65783d527c9f60616064b90d9395))
* **listmode:** card mode is misnamed ([e683cfe](https://github.com/Pocket/web-client/commit/e683cfe70021d553ac4addc95e99ada21dfb82fc))
* **listmode:** fix corrupted cookie ([171c49e](https://github.com/Pocket/web-client/commit/171c49ec5d555c56026d9dc801776112e7b09f40))
* **listmode:** invalid cookie ([b91fccb](https://github.com/Pocket/web-client/commit/b91fccb43345dfadb3eacfb95063921ed2a396f8))
* **listmode:** spelling error ([2d0fcd6](https://github.com/Pocket/web-client/commit/2d0fcd6e500e40337abbd3a43f4685c686fa2adc))
* **localization:** defaults and plurals for toasts ([dc78a00](https://github.com/Pocket/web-client/commit/dc78a005d731246da371522af4ff1b7f7dad3e64))
* **localization:** fixing tests and adding package ([0f49643](https://github.com/Pocket/web-client/commit/0f4964360b014d14f95edbd53403dbf9d8e9053a))
* **localization:** update rev to 0.4.2 ([1434355](https://github.com/Pocket/web-client/commit/14343557c503c9aa41a84dce5c75d645ab74ce5e))
* **localization:** update translation formats/copy ([eb473a9](https://github.com/Pocket/web-client/commit/eb473a9203a0d54dee625bee4bed2d9e95a34ba9))
* **localization:** wrap all elements with translation wrapper ([7f57884](https://github.com/Pocket/web-client/commit/7f57884e464257b280f75ba72739068475e24879))
* **messages:** add messages item card to my-list directory ([9568183](https://github.com/Pocket/web-client/commit/95681838d06640fcd1d66ead60b25d3e1fe4f78c))
* **messages:** add translation function to imports ([61316a6](https://github.com/Pocket/web-client/commit/61316a6f3d6b8d8e0b096e9b26c88851aa047819))
* **messages:** adding menu item in profile dropdown ([a0367b6](https://github.com/Pocket/web-client/commit/a0367b6f0a8267e348ced58cecba65413f85be09))
* **messages:** all workin ([de3f065](https://github.com/Pocket/web-client/commit/de3f06535890694ad20c4bbf576f3c00ac6b979f))
* **messages:** fix title on empty messages header ([cfd8c73](https://github.com/Pocket/web-client/commit/cfd8c73d595b6b0a89cca31cda13ea5f270df2e2))
* **messages:** initial version of messages list ([3200979](https://github.com/Pocket/web-client/commit/3200979336f33b51ae82b5e9456590b4b6f186f7))
* **meta:** adding pocket specific description field ([242a295](https://github.com/Pocket/web-client/commit/242a295e804ec9cbf2b810a82f3a2dc5d13c62c4))
* **misc:** add correct tooltips to readd in reader and list modes in list ([d2896bc](https://github.com/Pocket/web-client/commit/d2896bc04df76c29bb0200a6430e495d2a8836fc))
* **misc:** fixing misc tooltips and tags and analytics ([5beb619](https://github.com/Pocket/web-client/commit/5beb6197181c1c7a2663430fca13e874a113ecd6))
* **misc:** fixing misc visual and analytics issues app wide ([14e48ee](https://github.com/Pocket/web-client/commit/14e48ee699b53e9e41135771947429e404dae932))
* **misc:** making recently tagged cards clickable, scroll button wont sit above footer ([c0eb5ac](https://github.com/Pocket/web-client/commit/c0eb5ac79401f227d988327e46e1489ebc1c9c16))
* **misc:** misc reader and recit updates ([e297a08](https://github.com/Pocket/web-client/commit/e297a085b8a67c3a8fca64a30d2ae49666a26cb1))
* **modules:** modal popover progress bar rail scroll ([fd734c1](https://github.com/Pocket/web-client/commit/fd734c117994e418f39a91c0cb9655196f396eb4))
* **modules:** typeahead, tagging and sharesheet ([de31777](https://github.com/Pocket/web-client/commit/de317777d728ed40d30e059cd790f512fc3033e9))
* **my list:** initial items population limiter ([659acc1](https://github.com/Pocket/web-client/commit/659acc1acf8930e4a4229782797779f0fa88a0b7))
* **my list:** limit loading at the end of the list ([428e704](https://github.com/Pocket/web-client/commit/428e704f8b0bfbc06a39f1e9602de952e5127565))
* **my list:** setting section on return ([34ed30d](https://github.com/Pocket/web-client/commit/34ed30d0e0b63d4a6dea909395fef4a2a659eb86))
* **my-list:** removing over complicated initial items populated ([1aec1d9](https://github.com/Pocket/web-client/commit/1aec1d90fef6197b393c0d59ace62d7729f53b38))
* **mylist:** handle links that need to open externally ([f940076](https://github.com/Pocket/web-client/commit/f9400761a66dd822b664ad65952160c14b72b5de))
* **nav:** update discover link and devtools bool ([012bcaf](https://github.com/Pocket/web-client/commit/012bcaf8c6a00f727999e1d98b1d517ca9c2f647))
* **nav:** update z indexing ([9e59a53](https://github.com/Pocket/web-client/commit/9e59a53930470a4d5d1490619c0164a8e1fd297f))
* **nav:** updating navigation back to reader ([0476a12](https://github.com/Pocket/web-client/commit/0476a123782412c73476b6eb499bcfc14fcef851))
* **nav tools:** update add/search to handle errors ([4969089](https://github.com/Pocket/web-client/commit/4969089b67c499305d217c04d8ea2d48c0e6ea07))
* **npm:** scope pocket registry to specifc packages ([a01148d](https://github.com/Pocket/web-client/commit/a01148d2d8444b77203bf49ec7c3976ccc0c60db))
* **one trust:** use production script ([84a5904](https://github.com/Pocket/web-client/commit/84a59040f95db9d54d20cc3bce36b1677dfb627d))
* **onetrust:** upgrade web-ui 2.31.1 ([ba6f99d](https://github.com/Pocket/web-client/commit/ba6f99ddf75888d922c197c676ccbda71b102e28))
* **package:** bump web-ui version ([4254806](https://github.com/Pocket/web-client/commit/42548069bc2cc09df0061d16043655979d438968))
* **popover:** handlers for unbinding listeners ([105b350](https://github.com/Pocket/web-client/commit/105b35064ff48188638cd6d0b0e25750edce8f0b))
* **progress-bar:** adding progress bar to reader ([e0b7869](https://github.com/Pocket/web-client/commit/e0b7869c23da426c1d82dc088965ee4b5edade7e))
* **read:** remove comment for qa ([1502a1f](https://github.com/Pocket/web-client/commit/1502a1f5295c2ac84ac0c2ed8e4e05299f44bbe3))
* **read:** update display settings initial state ([86ba74d](https://github.com/Pocket/web-client/commit/86ba74d54036fb8fc49ff6170ceea506f845f512))
* **read links:** redirect for user /read bookmarks ([523b956](https://github.com/Pocket/web-client/commit/523b9564a068e1dbf71de83758f2370ca99f046f))
* **reader:** add state to item fetch ([ec8be19](https://github.com/Pocket/web-client/commit/ec8be19d8b602020c76e9151b49a7d730ed6a570))
* **reader:** initial commit of reader page ([eb0b790](https://github.com/Pocket/web-client/commit/eb0b7907c24ed790d65c9152bcea08b6f1b79531))
* **reader:** item request state to `all` ([10455fc](https://github.com/Pocket/web-client/commit/10455fcaf84cdd304f4f1e59286b73c5818fcad2))
* **reader:** quality of life tweaks ([94cb363](https://github.com/Pocket/web-client/commit/94cb363e4869ffb6fe02768633a4f8426e2d10b4))
* **reader:** remove unnecessary padding from container elements ([80664ff](https://github.com/Pocket/web-client/commit/80664ff8d0a3544f5f59f98ec05d03f7a17b5e59))
* **reader:** removed unused code from state ([fc67430](https://github.com/Pocket/web-client/commit/fc67430e330894d75dc4d154392945adf4e4f5c9))
* **reader:** reseting state when opening reader ([9f330c2](https://github.com/Pocket/web-client/commit/9f330c23c07b22bd76282f6f9f3f133b8554824e))
* **reader:** share and display all hooked up ([8c9c09e](https://github.com/Pocket/web-client/commit/8c9c09ef0549340bbbbee21643462f51eba930c7))
* **reader:** unify icon sizes in nav ([eba5f35](https://github.com/Pocket/web-client/commit/eba5f35d7390af922e43f86d256fc3362bc3d33f))
* **reader:** update back button to account for other pages than my list ([c875b1a](https://github.com/Pocket/web-client/commit/c875b1a38f9ee746043f1d72af348e46302b23d3))
* **reader:** update icon size in nav and padding in selection popover ([b921f02](https://github.com/Pocket/web-client/commit/b921f022cc98b7dbe0adc6c93bc28697b11941e8))
* **readme:** adjusting for spelling/grammar ([4c671c7](https://github.com/Pocket/web-client/commit/4c671c7d200bcc9b336347f7fbefb65f73d9ce5b))
* **reconciler:** replace tags reconciler ([f982c0c](https://github.com/Pocket/web-client/commit/f982c0c8af3ae7ce403ddf4f66c8ed844997355e))
* **reconciler:** tags_add action ([f2c51a2](https://github.com/Pocket/web-client/commit/f2c51a2f12f8c02043863626ec564ade710a4b2a))
* **report:** update resolved id to item id ([7ad5a4b](https://github.com/Pocket/web-client/commit/7ad5a4b92a7650ea0f96791cdacb3ac70c8ee8c0))
* **request:** add origin ([193c582](https://github.com/Pocket/web-client/commit/193c582af5bac189ea0426bb1402c3c04de18b9a))
* **request:** remove origin ([5072468](https://github.com/Pocket/web-client/commit/5072468c85068344cbf153144603bc41332f5d63))
* **request:** use x-accepts and app consumer key ([cd10dc9](https://github.com/Pocket/web-client/commit/cd10dc9f02abb16b04c07be981360b61e99b5b62))
* **scroll-tracker:** update component to be be new style ([0802092](https://github.com/Pocket/web-client/commit/0802092494d593c747159ff35ec23b5ee2a9f825))
* **search:** add search state to mylist ([6502f90](https://github.com/Pocket/web-client/commit/6502f90ec16ced838002ce0bc92bc69cda3e1de7))
* **search:** allow title to display for zero results ([5ca083e](https://github.com/Pocket/web-client/commit/5ca083e3fbe2ca4f46c1bf006e0cf7af11fc1e64))
* **search:** allow to pass in items to virtualized list ([15b3db9](https://github.com/Pocket/web-client/commit/15b3db9ff818e1d65acb1e52127026d85ad01f4e))
* **search:** clear search mode on request ([135ab13](https://github.com/Pocket/web-client/commit/135ab1313df9e815f1a0394b290e8e1990f1b909))
* **search:** remove unneeded import ([19da363](https://github.com/Pocket/web-client/commit/19da363905833a3da2e006c0b4a1c7c410ff92a1))
* **search:** repopulate search results when query changes ([bf92ee3](https://github.com/Pocket/web-client/commit/bf92ee3f2697db68aa5adce79da8ad707ad7ba5e))
* **search:** using existing hook ([edfeb84](https://github.com/Pocket/web-client/commit/edfeb843858f29634d3eaef7849d3786a5c4d370))
* **selected:** updating backing position/color ([4764dde](https://github.com/Pocket/web-client/commit/4764dde50228418c8c1e5fe443e9ca6af23b2e2d))
* **sentry:** rolling back to avoid dnt issues ([e107745](https://github.com/Pocket/web-client/commit/e1077459520d29e47dc83233f989e2404434fd57))
* **settings:** stop propagation of font toggling ([b5dacff](https://github.com/Pocket/web-client/commit/b5dacff4f1abd4c9df3a20fbc5a5a694a8a13222))
* **settings:** updating storage for display settings ([93fd87d](https://github.com/Pocket/web-client/commit/93fd87deed753e9f4cf70e2090b9471d777267c4))
* **share:** add snowplow to social share events ([8f8cdbb](https://github.com/Pocket/web-client/commit/8f8cdbbd448555bf040c6d8770c75eb03e81cc1d))
* **share-sheet:** remove padding on friendlist ([bc3b948](https://github.com/Pocket/web-client/commit/bc3b9485221a21d2dd6b04c72c4be792e47a4a57))
* **share-sheet:** update secondary button ([299442b](https://github.com/Pocket/web-client/commit/299442be05a2457f53b7902a798e6f1464001c0d))
* **shortcut:** combine shortcuts for iteration ([ad30138](https://github.com/Pocket/web-client/commit/ad3013848906eafe8835ece976e8431f8b77b7a9))
* **shortcuts:** add go to tags ([d06489d](https://github.com/Pocket/web-client/commit/d06489dc437bc3c430c6fcd62f9c245dc593db20))
* **shortcuts:** add keycode for ff ([860906c](https://github.com/Pocket/web-client/commit/860906ccf436edfed86a758c39d6d54245fa03c0))
* **shortcuts:** add keys to legend ([57331ba](https://github.com/Pocket/web-client/commit/57331ba28a54a22cda23d36d020985d0b3caaf40))
* **shortcuts:** add premium limiter ([3da6155](https://github.com/Pocket/web-client/commit/3da6155298eaa04a092f42b52677fcf163b26d84))
* **shortcuts:** adding better scroll into view ([bbfdd3e](https://github.com/Pocket/web-client/commit/bbfdd3e2fb547cd7890c7b92d932346695613e90))
* **shortcuts:** adding premium indicator ([c8a67bd](https://github.com/Pocket/web-client/commit/c8a67bd9f423adc97e624eb996e529e09598f4dd))
* **shortcuts:** adding/fixing malformed keys ([2566f13](https://github.com/Pocket/web-client/commit/2566f13b1299418d89dad617c809c5e91d5c4dc8))
* **shortcuts:** allow shortcut to match focus ([1941436](https://github.com/Pocket/web-client/commit/1941436df11e6ad09937ea1cb3a3df25bcd26b6f))
* **shortcuts:** button focus on open ([0aaff67](https://github.com/Pocket/web-client/commit/0aaff673f06c4bfb9c389bfdb2c0f42c79713775))
* **shortcuts:** copy updates ([f126e4c](https://github.com/Pocket/web-client/commit/f126e4c171fcd666406bc8ce8f8f0142d1af5b42))
* **shortcuts:** fix selected when visiting direct ([bbb6904](https://github.com/Pocket/web-client/commit/bbb6904245451215e79031fa923876912728b56e))
* **shortcuts:** remove selected on retutn to list ([4cdb9db](https://github.com/Pocket/web-client/commit/4cdb9db224f0713bd01ddc391339da3244c1c304))
* **shortcuts:** update copy ([73ac9fb](https://github.com/Pocket/web-client/commit/73ac9fbb7042db4ae5e3f1cdca4948b1365fd229))
* **shortcuts:** update copy ([c0d97c2](https://github.com/Pocket/web-client/commit/c0d97c21e039d19a934e04efec560a28cc9a5745))
* **side nav:** assign active properly ([6afed9d](https://github.com/Pocket/web-client/commit/6afed9de9d3115fecebc2ecde97a6398e04dc733))
* **side nav:** disable on bulk edit ([c59e31b](https://github.com/Pocket/web-client/commit/c59e31b52144a5454507e5ca59b138a2cbfe7c85))
* **side nav:** increase title spacing ([d48770a](https://github.com/Pocket/web-client/commit/d48770a24d089d851f7cc97b9e4e1d1e2da116f9))
* **side-nav:** match it to web-app for now ([f642e74](https://github.com/Pocket/web-client/commit/f642e744aa85b548d10bb3c4d9949b2ed042391d))
* **sidebar:** update color ([a8cb8d5](https://github.com/Pocket/web-client/commit/a8cb8d53e59b432f6a8a582d52c6525677f0b41d))
* **snowplow:** add client version ([9ebf6ce](https://github.com/Pocket/web-client/commit/9ebf6ceda784a79bb021081ba473d81b27dd6831))
* **snowplow:** add note for context ([b7f6cea](https://github.com/Pocket/web-client/commit/b7f6ceabeda9e88ab4504c4a99ac8f3f02cb747a))
* **snowplow:** add v to version ([89aa8f7](https://github.com/Pocket/web-client/commit/89aa8f74c8c6a6a976aabf52c6abb1acae2ad8d9))
* **snowplow:** adding the version as an environment variable ([312c421](https://github.com/Pocket/web-client/commit/312c4214e00e28fe1737beb6216d302f0cebb6b1))
* **snowplow:** allow initialization when users arent signed in ([65ef951](https://github.com/Pocket/web-client/commit/65ef95180fa29fe89d09eb5127ad6727611af281))
* **snowplow:** check for valid resolved id or item id ([e254e00](https://github.com/Pocket/web-client/commit/e254e00e1328581eb2436af72ae48d4850bd309b))
* **snowplow:** correcting snowplow url ([be9465b](https://github.com/Pocket/web-client/commit/be9465b457fd778faa81d53058819bf8f53f6c9f))
* **snowplow:** pass bulk edit ids and limit impressions ([2b9218e](https://github.com/Pocket/web-client/commit/2b9218e3fd43852072cf354bc50b32e77b685d16))
* **snowplow:** remove console log ([2ee00b8](https://github.com/Pocket/web-client/commit/2ee00b869f6d142eca1be31d82251f91b27bda88))
* **snowplow:** revert feedback content call ([3a2e78f](https://github.com/Pocket/web-client/commit/3a2e78f3149fe6c7507500e6397bf1c49fb91214))
* **snowplow:** store impressions by id number instead of position ([10eb8dc](https://github.com/Pocket/web-client/commit/10eb8dcdd70b086ce7b7e8345a2466e23497ed7b))
* **snowplow:** update do not track setting ([239dd2b](https://github.com/Pocket/web-client/commit/239dd2ba44e500c10b465349b05c0af7d92a97a1))
* **snowplow:** update resolved id to item id ([2e010e4](https://github.com/Pocket/web-client/commit/2e010e41af44bb56f9e5f779ff786aa1fd8df94e))
* **snowplow:** update snowplow events ([e60d70d](https://github.com/Pocket/web-client/commit/e60d70d1825db508fb1bbaa3e4f782ff1c457d41))
* **snowplow:** update snowplow initialization ([c0095ca](https://github.com/Pocket/web-client/commit/c0095ca286ba0f122fe3a9a78049ca5b00ed1011))
* **snowplow:** update un-archive to be save event and archive to general ([aedb2c2](https://github.com/Pocket/web-client/commit/aedb2c241fe3c0e380221c4e2cde6ee5b3d0f7c1))
* **snowplow:** verify user id exist before initializing ([4847c05](https://github.com/Pocket/web-client/commit/4847c055cfe37c944ae0587e46244e11395dc8b0))
* **state:** removing undefined as value ([e77ace8](https://github.com/Pocket/web-client/commit/e77ace8fda59ff3b7ecdb6713c0d5eafba6766a9))
* **state:** update sagas/reducers ([5b387b2](https://github.com/Pocket/web-client/commit/5b387b22e3fc1f2979581e6667a96c09f60755ca))
* **state:** update sagas/reducers ([a6b15e2](https://github.com/Pocket/web-client/commit/a6b15e2a4de2ca6c5c9532d5a36c37995529e554))
* **stf:** hiding send to friend ([75b49ba](https://github.com/Pocket/web-client/commit/75b49ba31f32e8c5a06f2c549bfa7eff7645be61))
* **stf:** update release notes to 3rd ([cd27286](https://github.com/Pocket/web-client/commit/cd2728613cd31821db3dc6d4d12543486b30edaa))
* **stories:** modal to use correct path ([4097a02](https://github.com/Pocket/web-client/commit/4097a023583c400dae04b904be9116bb66a7bef3))
* **storybook:** adding i18n ([e1e7f46](https://github.com/Pocket/web-client/commit/e1e7f469fa23db40f68534d1a79c75cd75ba6525))
* **storybook:** fix storybooks after global nav is pulled in ([8a46f80](https://github.com/Pocket/web-client/commit/8a46f80f87433c1374ffeefb01890c319952cad9))
* **storybook:** use standard host ([270c1e8](https://github.com/Pocket/web-client/commit/270c1e807415fd04a4c975fc008ec91533b2bcd7))
* **storybooks:** stories boken in transfer ([7abce83](https://github.com/Pocket/web-client/commit/7abce83f04c8f6cd3b60e4df211ad622a8e98e7a))
* **tag:** update to save without tags ([db17c63](https://github.com/Pocket/web-client/commit/db17c636e7011a49eafcb6ed9b8288e2d4ec1e56))
* **tag:** updating missing dependency ([8544243](https://github.com/Pocket/web-client/commit/854424374751f98b2fca80dad5c42d125ab618d1))
* **tag page:** allowing untagged ([0204752](https://github.com/Pocket/web-client/commit/02047525d2caf2ecf4cf4fe4d0f1cd660f9d52e6))
* **tag page:** update sorters ([a3bf75e](https://github.com/Pocket/web-client/commit/a3bf75e00e543eedcf27a79073f83dce4fbd2028))
* **tags:** add clickable tags to reader ([433b415](https://github.com/Pocket/web-client/commit/433b4159c1559c8ce985d906ca250df87bf594f1))
* **tags:** add required yield to generator function ([86f06bf](https://github.com/Pocket/web-client/commit/86f06bfea79d15cd0616c4fe0200a7d5682516fc))
* **tags:** adding handling of no pinned tags ([274c3ca](https://github.com/Pocket/web-client/commit/274c3ca2a81ece526cc65af5d407cf6bd6211ecf))
* **tags:** adding typeahead to tag dropdown ([73692c6](https://github.com/Pocket/web-client/commit/73692c6e7b504b801f4f4580c7979780a8432d63))
* **tags:** adjust order of action/tags in call ([3210c4a](https://github.com/Pocket/web-client/commit/3210c4a2daa6f245d9c8cf51d2312743a6f3e655))
* **tags:** confirm tag in typeahead instead of updating input ([d20b5da](https://github.com/Pocket/web-client/commit/d20b5da8668b46a16a148090612c3c9c4458939d))
* **tags:** disable until edited ([0ce06c8](https://github.com/Pocket/web-client/commit/0ce06c843b133c8ddd904199c4e3a2d3765b26d0))
* **tags:** fix deleting tag if user has no pinned tags ([9c252c7](https://github.com/Pocket/web-client/commit/9c252c70bda787b3869a676ee5687aa9dc9b0de2))
* **tags:** hide un-tagged chiclet when searching for other tags ([9bd5cb1](https://github.com/Pocket/web-client/commit/9bd5cb137d255ec7891541c6bd9e75054ce31ac1))
* **tags:** remove console log ([ac2ad1a](https://github.com/Pocket/web-client/commit/ac2ad1a3fcdc501941e3a8b4730bc09f96080d96))
* **tags:** remove period in copy ([7eb3f2f](https://github.com/Pocket/web-client/commit/7eb3f2f786147bdcf3d8b043d780a523a4b844df))
* **tags:** save on enter and no longer persisting incomplete tag value ([4f9bf7d](https://github.com/Pocket/web-client/commit/4f9bf7ddbf83ef95f9ae3b043f2ca567ddb77a24))
* **tags:** tags no longer fresh when just removing ([f76dd47](https://github.com/Pocket/web-client/commit/f76dd479b2b92de5626eda2c1ae8029bed5de227))
* **tags:** un-tagged -> not tagged ([387516c](https://github.com/Pocket/web-client/commit/387516c1a38943c0840200dce6bde62fb716099f))
* **tags:** update copy for delete and edit ([5b265bd](https://github.com/Pocket/web-client/commit/5b265bd571ea1d06374ab78311defb666441bbb1))
* **tags:** updating tag modal save behavior ([222d5ca](https://github.com/Pocket/web-client/commit/222d5ca37a437194936b6524e1e872325fe85ed3))
* **tags:** user may not have pinned tags, nothing to map ([145c646](https://github.com/Pocket/web-client/commit/145c6467dc699c26fdab403c809b26a4ec796b5b))
* **tags page:** add key and link to tags list ([4531e0d](https://github.com/Pocket/web-client/commit/4531e0d651a8c8522c7bddf931ee74f0eea2ec2d))
* **tags page:** limit items with tags to four ([b7a7d31](https://github.com/Pocket/web-client/commit/b7a7d31a9df38310dd8944b2518eab6e52b96339))
* **tags-header:** adding a untagged specific header ([57a89ed](https://github.com/Pocket/web-client/commit/57a89edfaf089019ed1df6f6b90f88ca03054b86))
* **terraform:** adjusting variables ([53f35ca](https://github.com/Pocket/web-client/commit/53f35ca73a0eaaea946f4105214d6d57f190f71b))
* **terraform:** update widget config ([6120638](https://github.com/Pocket/web-client/commit/6120638499cae1ec40b3a044d7c1a2aa541e97d4))
* **test:** update test to match functional updates ([26257d6](https://github.com/Pocket/web-client/commit/26257d68485154136cfa7cca386cbff2792b7183))
* **test-utils:** remove test id component and replace with data-cy attributes ([8c47ef7](https://github.com/Pocket/web-client/commit/8c47ef79bad092c9d788a8d882488f57d3a199f8))
* **tests:** fix broken test ([968d083](https://github.com/Pocket/web-client/commit/968d0833e908d9d119cb4eafe58210b62f8192db))
* **theme:** fix theme switching in the reader view ([0610292](https://github.com/Pocket/web-client/commit/0610292f22aeded98e8ad29aad6881ab07d90b60))
* **toast:** update itemcopy function to return null when no count ([305ea86](https://github.com/Pocket/web-client/commit/305ea8662ffad93b983853628701aeaac4266a24))
* **toasts:** add key to toasts ([53872df](https://github.com/Pocket/web-client/commit/53872dfbc03346105d45ab6420ed05b871adc456))
* **toasts:** adding missing toasts ([16dd754](https://github.com/Pocket/web-client/commit/16dd754c1ab2e748bf85ca3adf0537a36c419ec8))
* **toasts:** adding the toasts component ([d9322e4](https://github.com/Pocket/web-client/commit/d9322e430c5b6e5e6b49ce9d322ae7a27898ba27))
* **toasts:** adding toasts for adding shared item ([8e19c12](https://github.com/Pocket/web-client/commit/8e19c12a8bb6d2b1737e0d04c68beb9be05b7ce9))
* **tooltip:** remove legacy tooltip ([1643cb4](https://github.com/Pocket/web-client/commit/1643cb47f3576c912a913bef6114d216f00a8246))
* **tooltips:** adding tooltips to display steppers ([b7bb93a](https://github.com/Pocket/web-client/commit/b7bb93aff941a4f97a6cb180bfd0eb32d0663bad))
* **topics:** account for failed request ([e2ac2dd](https://github.com/Pocket/web-client/commit/e2ac2dde202eecf930a3445c4522c7f9cd0d3979))
* **topics:** update topic list status ([bb54da9](https://github.com/Pocket/web-client/commit/bb54da95273511bf2d35fcd540535e3f26f7dfa7))
* **typeahead:** remove console log ([f44b0c8](https://github.com/Pocket/web-client/commit/f44b0c8878e26b9ba020bc907ccb89093b39dfad))
* **ui:** minor ui fixes per qa feedback ([86f8e18](https://github.com/Pocket/web-client/commit/86f8e18e241e249c6240e349929b3e57608d1a33))
* **ui:** updating footer color and tooltips on social buttons ([1aaa233](https://github.com/Pocket/web-client/commit/1aaa233858273dacb2268ceaa8681a668a465443))
* **user:** conditionally render on user status ([f4867ff](https://github.com/Pocket/web-client/commit/f4867ffe28bbc2a106bcb892b8657f82cb4d0bde))
* **user:** css background takeover from tooltip ([aea9ac6](https://github.com/Pocket/web-client/commit/aea9ac68e834cffb691a9d16f6bf968b29ce7788))
* **user:** hydrate from cookies ([01f6e4c](https://github.com/Pocket/web-client/commit/01f6e4c2da2827a7f088149f5530e55781c49c1d))
* **user:** need to dispatch failure to auth ([e8d6a1d](https://github.com/Pocket/web-client/commit/e8d6a1d9ab9b15a78f9303a68785ab7ccd8b28e8))
* **utilities:** rev web-utilties 1.16.0 ([a46d703](https://github.com/Pocket/web-client/commit/a46d7033f3591805e36fa64446ac93c7a53568e9))
* **video:** add video stories ([e97ac53](https://github.com/Pocket/web-client/commit/e97ac530b7ef6c120236cc28aec0d29b94b49a92))
* **video:** adding video component ([a246c51](https://github.com/Pocket/web-client/commit/a246c51f0165611ec0c7d5effc613c546b5701e5))
* **virtualized list:** adjust layout ([96c1d96](https://github.com/Pocket/web-client/commit/96c1d96825ec92c53be151f5cf77a4c929467f2a))
* **web ui:** dependency was breaking build ([2015a8e](https://github.com/Pocket/web-client/commit/2015a8eb4d490593fb179bbc0f70e5179854ff64))
* **web-app:** adding some elements ([7f807e6](https://github.com/Pocket/web-client/commit/7f807e6e5b072b0dc15cd8727c0852ed523d3d9e))
* **whats-new:** adding whats new notification bubble ([c954251](https://github.com/Pocket/web-client/commit/c954251644d69a2fa4a611b30882fd5e5d17ebaa))
* **whats-new:** adding whats new page ([1e331de](https://github.com/Pocket/web-client/commit/1e331de16db5ec9b2e0a0e7be7967a8dd7c19928))
* **whats-new:** update font color ([aabada8](https://github.com/Pocket/web-client/commit/aabada8595d55c35fbf9ab3854e980d11c2f652b))
* **whats-new:** update with final release notes ([ccf452e](https://github.com/Pocket/web-client/commit/ccf452e9ea8f732c3a3307ed39b69e2a36617c15))
* **whats-new:** updating font sizes per feedback and button to account dropdown ([ebe9cff](https://github.com/Pocket/web-client/commit/ebe9cff5a39972c181db4eba1b436f8222c7c4ce))
* **whats-new:** updating messaging ([8b363db](https://github.com/Pocket/web-client/commit/8b363db67de93518489ecff83674cd93d4614528))
* **whats-new:** updating template and removed demo files from page ([f3371df](https://github.com/Pocket/web-client/commit/f3371df5e0bf4e0339e95b718e890c2c70dcdb45))
* **xss:** wrap image code in updated dompurify ([ce45230](https://github.com/Pocket/web-client/commit/ce4523071171cd39cadd5ec0c2ed8345bb746b86))


### Features

* **actions:** adding home actions ([795ecd5](https://github.com/Pocket/web-client/commit/795ecd5cb3e509b4655d780a3930d063c3b12ec6))
* **actions:** allowing chunked out actions ([7519755](https://github.com/Pocket/web-client/commit/751975542a2f25112727a578912c686eaaa53e44))
* **actions:** removign action duplications ([3f8beee](https://github.com/Pocket/web-client/commit/3f8beee68ee9a4329899bb8452a6faab1fae5d70))
* **add:** allowing an item to be added manually ([f3f54c6](https://github.com/Pocket/web-client/commit/f3f54c688a03267369124f750325ccf692177b41))
* **analytics:** adding google analytics ([30ae8c9](https://github.com/Pocket/web-client/commit/30ae8c94e7f968e8eaea58b17c0b2bf9a8c66e6b))
* **animation:** adding a fade wrapper ([135a12c](https://github.com/Pocket/web-client/commit/135a12c070c6dd1f7f28eaa5ab52565114044692))
* **api:** adding item action endpoint ([e790930](https://github.com/Pocket/web-client/commit/e79093077aef60b4767a1ab26171cbcfe08648d7))
* **app:** hydrate app info ([d5d1eb4](https://github.com/Pocket/web-client/commit/d5d1eb47244476ad8161f117eddaf2a286189cc4))
* **autoblock:** adding autoblock ([8c62d09](https://github.com/Pocket/web-client/commit/8c62d090347e781f4d2bbb8560ad97d7cb1316dd))
* **avatar:** moving avatar from web-ui ([68fefda](https://github.com/Pocket/web-client/commit/68fefda7bfad62a639ae51945bf5177130e66c51))
* **bulk:** adding state for batching of actions ([32f2c47](https://github.com/Pocket/web-client/commit/32f2c47ff1e0fbb25c8d515f850c1f0ba507d151))
* **bulk edit:** allowing for batched actions ([35d2351](https://github.com/Pocket/web-client/commit/35d23517d226657314e719c5655b2027659e2cbe))
* **bulk edit:** set up global nav interface ([4cb9f97](https://github.com/Pocket/web-client/commit/4cb9f97983b5319c3954f52b99fcb9aeaba466fa))
* **client api:** adding collections ([e2b9bbc](https://github.com/Pocket/web-client/commit/e2b9bbc716fc986079c7ec91e20cfec81c58af1f))
* **client api:** reserve alb space ([1ffa773](https://github.com/Pocket/web-client/commit/1ffa773846c982da1c58c3b2eb667c7788b95b31))
* **coming soon:** temp page to allow soft launch ([09762fc](https://github.com/Pocket/web-client/commit/09762fcbdd809af74fd43b92da631fb994d3079c))
* **components:** adding discover components ([28e3156](https://github.com/Pocket/web-client/commit/28e31569fce02317f6754bc9e7c174e416cb94fc))
* **containers:** adding discover containers ([2f54b0c](https://github.com/Pocket/web-client/commit/2f54b0cb757dde938252ec890147f81dedb85dff))
* **dashboards:** adding terraform for monitoring ([67dfc73](https://github.com/Pocket/web-client/commit/67dfc7302b249e4b271789a1c638c3c21ce12d65))
* **detail view:** adding actions ([55e6867](https://github.com/Pocket/web-client/commit/55e6867bf3607b8ebe257c34a2a5ec5a6a6b4a93))
* **detail view:** adding icon ([3c3965a](https://github.com/Pocket/web-client/commit/3c3965a7cc0358c071b21527be642b91fb42f283))
* **detail view:** adding tags to cards ([1fe275a](https://github.com/Pocket/web-client/commit/1fe275a6e8580c2f718712fdc21a437b6a313764))
* **detail view:** detail layouts/virtualization ([1606025](https://github.com/Pocket/web-client/commit/1606025ea20c5327f2fd4a3ad7714ab8f24d4477))
* **detail view:** updating account menu ([5083288](https://github.com/Pocket/web-client/commit/5083288431979c11878a78180feec27b207be0e7))
* **dev:** surface features in dev panel ([4b9ebae](https://github.com/Pocket/web-client/commit/4b9ebae43665ac531e9b6371e83224e88a8cad97))
* **dev tools:** adding language selector ([fc3bed2](https://github.com/Pocket/web-client/commit/fc3bed2fed6409c96a161fc3c4766eb0da126ad4))
* **dev tools:** simplified dev tools ([bf7b34e](https://github.com/Pocket/web-client/commit/bf7b34e4a93edfc8bb559da3d2935e66cfdf53b8))
* **discover:** add redirect for old discover ([103fe34](https://github.com/Pocket/web-client/commit/103fe3450f9d2635b6b851d3f82d95ac22dbf086))
* **docker:** add docker files ([b77d2dc](https://github.com/Pocket/web-client/commit/b77d2dce7099598e2438f75472cbf745ad666d31))
* **explore:** adding explore container/state ([935c6f1](https://github.com/Pocket/web-client/commit/935c6f1a3ee5386ecd30aadcde89144e2089e880))
* **health:** adding aws required health check ([0759b26](https://github.com/Pocket/web-client/commit/0759b261c8853e5197e22926a761390a0d49db79))
* **home:** adding collections ([7ee344b](https://github.com/Pocket/web-client/commit/7ee344b9ef89f27a48e1abf330b5d28bf4b6a171))
* **home:** adding feature restricted nav ([380b245](https://github.com/Pocket/web-client/commit/380b2457c3eb35e740218f21bdf21d9c68de9edd))
* **home:** adding home prototype ([1390c39](https://github.com/Pocket/web-client/commit/1390c397fd28c0ba5a5fc79fa1de7ef0e62b3aa6))
* **home:** adding placeholder skeleton ([7ab8b04](https://github.com/Pocket/web-client/commit/7ab8b041654d3f6031dde0c4849633fc75ce14f0))
* **home:** adding recent saves ([8079f1e](https://github.com/Pocket/web-client/commit/8079f1e791aede2c167039911d08345901788f46))
* **home:** adding recent saves to state ([833593a](https://github.com/Pocket/web-client/commit/833593a43a91ef9ecd76965b87172023c54f9ad5))
* **home:** cleanup poc ([e10c3ab](https://github.com/Pocket/web-client/commit/e10c3abb41c7be6d8d4f1938efab59eee01369de))
* **hook:** has changed ([6616f6b](https://github.com/Pocket/web-client/commit/6616f6be2e1ce9464f12a739e6ac4713a85e0ac2))
* **images:** adding discover static images ([db752ad](https://github.com/Pocket/web-client/commit/db752ad4f7d33252e42929023d1666a5155e9d8c))
* **item:** add inline actions ([0ffdecd](https://github.com/Pocket/web-client/commit/0ffdecd1aaa42b54407d81129a1b2cf4f0841af1))
* **item:** adding display only card ([d6a1f4c](https://github.com/Pocket/web-client/commit/d6a1f4c969ffa29852a4a618efbd2f13681faf16))
* **item:** adding filters/sorters/reconcilers ([64ca9d2](https://github.com/Pocket/web-client/commit/64ca9d2feafa11095f8b99a849d70de02f7ebbe3))
* **items:** adding item component/connector/state ([f9631df](https://github.com/Pocket/web-client/commit/f9631df7f8acf5005c564c6fd878762102679108))
* **items:** adding sagas for actions ([175bb45](https://github.com/Pocket/web-client/commit/175bb45d66d6b8f6ec5ceb4c6eeb54b6629cd3fb))
* **items:** reconcile on action success ([fd80fef](https://github.com/Pocket/web-client/commit/fd80fefd7c79cc64761f8815380ac8a903beefa9))
* **list mode:** adding list mode menu options ([3144698](https://github.com/Pocket/web-client/commit/31446983c94409f473d3fcc1c7814cf4034bb353))
* **list mode:** adding list mode state ([1d71e78](https://github.com/Pocket/web-client/commit/1d71e78cae971424247f6591233227ff4c8874ce))
* **localization:** adding ids/defaults ([a6507ce](https://github.com/Pocket/web-client/commit/a6507cea2d026dc9d8c14a6827ef37b59a49a06c))
* **localization:** parser config to extract key/pair ([1a378d3](https://github.com/Pocket/web-client/commit/1a378d3e7c2c03139a955ae47c38049d35fda812))
* **localize:** add locales to next config ([aa059e2](https://github.com/Pocket/web-client/commit/aa059e268486ba08c35a715265b59d64eb47d430))
* **mock:** adding mylist ([894cb7d](https://github.com/Pocket/web-client/commit/894cb7d4ff95313e53c71c460688b0868330dab8))
* **mocks:** adding additional mock data ([e92ef22](https://github.com/Pocket/web-client/commit/e92ef22c8708a0ab3250dbc3e146823327335ea8))
* **modal:** adding modal-tabs ([c27261a](https://github.com/Pocket/web-client/commit/c27261a79876a127da6844ce4d3912803fe6924a))
* **modal:** use modal natively ([74eb5f0](https://github.com/Pocket/web-client/commit/74eb5f0838ca9a27deba33e4ae50cab2c4e999ef))
* **my list:** adding list mode ([68d7981](https://github.com/Pocket/web-client/commit/68d798116913d3dcabac406abf1fc212c99929d3))
* **my list:** archive action ([a63bfd0](https://github.com/Pocket/web-client/commit/a63bfd0fc9913041c3b3f53633991e32b68fadb7))
* **my list:** utilizing filters/reconcilers/etc ([c10c848](https://github.com/Pocket/web-client/commit/c10c848307aff8aed553eae36562aef9c5a6c661))
* **my-list:** adding basic list data/layout ([a355420](https://github.com/Pocket/web-client/commit/a355420142cdf7438582a32f415c9e4e6ffcf2ed))
* **my-list:** adding foundation ([e14f9cd](https://github.com/Pocket/web-client/commit/e14f9cd338683d36862474c505aebe0d5f8477f4))
* **oauth:** baseline for oath ([72e60cf](https://github.com/Pocket/web-client/commit/72e60cfe2b49b4a0f46f5fac1561187ca3974ea8))
* **onetrust:**  adding the one-liner ([5955040](https://github.com/Pocket/web-client/commit/59550401612528b533b66ec9eb19f5c54d6f8f85))
* **onetrust:** updating to production script ([ad97d3f](https://github.com/Pocket/web-client/commit/ad97d3f87cc2e4508e5360a5fbec9b6be75f428a))
* **processing:** for processing feedback in modal ([cbc5e6e](https://github.com/Pocket/web-client/commit/cbc5e6e09a50d53ef2c30bb9ee86a0384b130115))
* **reader:** connect reader to item info ([922ab1d](https://github.com/Pocket/web-client/commit/922ab1deebdd907e31a6c8ba3ad45335a8005ee1))
* **reader:** state to use live data ([59e7862](https://github.com/Pocket/web-client/commit/59e78625ce49bd6820ea00ac02cb4b0b7b65476c))
* **recent-search:** pass in premium/recent ([9461fdf](https://github.com/Pocket/web-client/commit/9461fdf80f814da6084ed246204ac655f1881d08))
* **repo:** setting up standard boilerplate ([3d69f12](https://github.com/Pocket/web-client/commit/3d69f124403edd4d6eaafa9ed1b565f558166739))
* **scroll to top:** basic unstyled scroll to top ([ac49779](https://github.com/Pocket/web-client/commit/ac49779e093317f6563b3746434376ac6f79385b))
* **search:** add sort by order from server ([752913b](https://github.com/Pocket/web-client/commit/752913ba6f642a2ad9be05d3fc4e920b95d5662e))
* **search:** adding my list search ([5add916](https://github.com/Pocket/web-client/commit/5add91651fd666d2cc95038ad141ec55996eeef4))
* **search:** adding recent search to nav ([520c322](https://github.com/Pocket/web-client/commit/520c3226f10ea5b0a8af38c52139bda5891b3315))
* **search:** adding recent searh state ([320ca53](https://github.com/Pocket/web-client/commit/320ca537c18bf7d1c49c4157574dced7e1f64b98))
* **search:** adding router push to search topic ([67dfdf0](https://github.com/Pocket/web-client/commit/67dfdf05ce39cb99b496eec1dd7005c6f6e3905d))
* **search:** adding search results to item store ([3f8f60b](https://github.com/Pocket/web-client/commit/3f8f60bb5b406cc66e530c70a80fcb8395eb7930))
* **search:** adding search specific api ([67e49f2](https://github.com/Pocket/web-client/commit/67e49f29257a65460caeb5453305e704a5488967))
* **search:** adding search specific header ([10aa8cf](https://github.com/Pocket/web-client/commit/10aa8cf79880a697445d1c14ac2060eac441827b))
* **search:** refactor some of the loading params ([c8be526](https://github.com/Pocket/web-client/commit/c8be526c7f512e6f4fa9ef337b46885d169138a0))
* **search:** update recent searches in state ([38c27d3](https://github.com/Pocket/web-client/commit/38c27d37b452d361455545e6b3393a7789612967))
* **sections:** app set section action ([85689c7](https://github.com/Pocket/web-client/commit/85689c7b84a2e92bd2a03d6181fefd6c7d7fbb24))
* **setup:** adding localization ([07a78ae](https://github.com/Pocket/web-client/commit/07a78aeea65ddf6ac4b395033475a323023596f4))
* **setup:** adding unleash ([8482486](https://github.com/Pocket/web-client/commit/848248639b7955da8e8a55c58d33e9efe28edec6))
* **setup:** basic nextjs structures ([09f55e4](https://github.com/Pocket/web-client/commit/09f55e43b7d84bac0c3cc66a47abb0a43f2114d6))
* **setup:** pocket web boilerplate ([121a1aa](https://github.com/Pocket/web-client/commit/121a1aab54743ed0ec61af43e582922989f70d90))
* **share:** adding confirm share modal ([fbfe6a1](https://github.com/Pocket/web-client/commit/fbfe6a1238470d9d549eefb943baf6c45ec496c8))
* **share:** adding item share state ([8d4a749](https://github.com/Pocket/web-client/commit/8d4a7490529b79a1c491f30feddbd82404ee0f2b))
* **share:** adding share confirm to reader ([4969ffa](https://github.com/Pocket/web-client/commit/4969ffab160acd512e42f42c955a153f396d878b))
* **share:** using share modal on my list ([0c2460c](https://github.com/Pocket/web-client/commit/0c2460c8853e356596bf57ede920fc963ba7cb59))
* **shortcuts:** add column width bindings ([79f26de](https://github.com/Pocket/web-client/commit/79f26de75f0fd0995f348393c2155f005072afce))
* **shortcuts:** adding boilerplate ([d036468](https://github.com/Pocket/web-client/commit/d03646843e35e2d891c47def3f291c8d6a7afac8))
* **shortcuts:** adding delete item boilerplate ([7db5903](https://github.com/Pocket/web-client/commit/7db5903fe5caf54685d30b5f27396e81bfd8400a))
* **shortcuts:** adding feature flag wrapper ([a9b7c45](https://github.com/Pocket/web-client/commit/a9b7c45d90842cc1cde217a09d3990e498045560))
* **shortcuts:** adding updates for actions/settings ([8dbaa6f](https://github.com/Pocket/web-client/commit/8dbaa6f1c495815ecf596b961c648e443c88ad4c))
* **shortcuts:** allow shortcuts to trigger batch ([9bcc6c5](https://github.com/Pocket/web-client/commit/9bcc6c583f98ae54e756c7c1eea4ad1fb03e756e))
* **shortcuts:** back in reader ([02cd66b](https://github.com/Pocket/web-client/commit/02cd66b2d627539dcf53f8bb894621ab001d0468))
* **shortcuts:** item actions ([0f8921f](https://github.com/Pocket/web-client/commit/0f8921fa1a733ce83c634ebd77791deba5816eed))
* **shortcuts:** pass in current item ([6731766](https://github.com/Pocket/web-client/commit/67317668e9b53ef8a90c544103c4e27aee52e4a5))
* **shortcuts:** pass in router ([712d076](https://github.com/Pocket/web-client/commit/712d076d50f26bed86d6d9f7f9ec4e1c8d7ac9db))
* **shortcuts:** select item ([8e18ee8](https://github.com/Pocket/web-client/commit/8e18ee8e16efbaee5afe254f7a7eb8842f431d7f))
* **shortcuts:** select/deselect in bulk edit ([c96ebb8](https://github.com/Pocket/web-client/commit/c96ebb8e988e44b5811a16f2c0201b33621cac24))
* **shortcuts:** sort order ([db91fc5](https://github.com/Pocket/web-client/commit/db91fc50daf0ee0a967129de74c9508849e8b32a))
* **shortcuts:** view original ([3e7464f](https://github.com/Pocket/web-client/commit/3e7464fc337e5836f1473bc1ac32e9d842366667))
* **shortcuts:** view original ([933e3ce](https://github.com/Pocket/web-client/commit/933e3ce7cb1b8ce39e9cde09618dec2ebd8a25a0))
* **shortcuts:** wire color mode shortcuts ([11bb219](https://github.com/Pocket/web-client/commit/11bb219d47bc68d353fd5200b5558a8426117fdc))
* **shortcuts:** wire up additional actions ([51885aa](https://github.com/Pocket/web-client/commit/51885aae2a680b47332d1f933145ae658f4ca7d0))
* **side nav:** allowing tags to be pinned ([b6ba758](https://github.com/Pocket/web-client/commit/b6ba7585d6cd730ce82e9b01d1e887a38f122011))
* **sidebar:** allowing sidebar layout ([a6e638c](https://github.com/Pocket/web-client/commit/a6e638cc6274e4cb8bdd87a970ab4058bdb36791))
* **snowplow:** adding snowplow ([af93968](https://github.com/Pocket/web-client/commit/af93968b3b8146a522d27b7dbc8e35c65751d0a0))
* **sort order:** add state and actions ([a08124a](https://github.com/Pocket/web-client/commit/a08124adf8019ac871a0866997a0ee42b2f812cc))
* **state:** connecting discover state ([6f06468](https://github.com/Pocket/web-client/commit/6f064682b1477092fb5b6b02b7e51736cb6d148b))
* **storybook:** work through real world impliment ([1f9ab41](https://github.com/Pocket/web-client/commit/1f9ab41118d1de2b73d063d70f9b7f0ca8014ca4))
* **tag page:** add tag page ([bbe7623](https://github.com/Pocket/web-client/commit/bbe7623910e643fc10035901996b178f016a6883))
* **tag page:** adding tag page header options ([7439765](https://github.com/Pocket/web-client/commit/74397652fbcc98250bdf693cc16d5ed84eb97278))
* **tagged items:** adding tag specific pages ([66212fc](https://github.com/Pocket/web-client/commit/66212fc61bb83b8e96d335e232c4d7139b32729c))
* **tagging:** use connected confirm modal ([ca95293](https://github.com/Pocket/web-client/commit/ca952933d67d63abcff6084a51df508d684d472a))
* **tags:** add state ([6494f59](https://github.com/Pocket/web-client/commit/6494f59383186c08d3cfc165faf6652b3fbaf984))
* **tags:** add tags page ([3401320](https://github.com/Pocket/web-client/commit/340132056e3171526e1fafc428fed6198b3d7bf9))
* **tags:** adding basic display of tags ([0265dee](https://github.com/Pocket/web-client/commit/0265deed5487395c7641c0a7562f761de745d3a4))
* **tags:** adding tag mangement ([c9edf75](https://github.com/Pocket/web-client/commit/c9edf75cbd0529c9d15d62a81c7aa006de134322))
* **tags:** adding tags page boilerplate ([32f67e8](https://github.com/Pocket/web-client/commit/32f67e8540d4bd39ae11184720268c0b50eb1174))
* **tags:** edit/delete for usedr tags ([9c9cfa1](https://github.com/Pocket/web-client/commit/9c9cfa18566037f9cf400a4037e3adfb3df8a5c8))
* **tags:** valid export from tags page ([39dc10a](https://github.com/Pocket/web-client/commit/39dc10a21fed6df14f8c124d8007c26bfa185f0d))
* **tags page:** tag header with filters ([ef38d19](https://github.com/Pocket/web-client/commit/ef38d19321ab4fe86ee469d8696c8a7c83a58ecd))
* **tags page:** updating my list to allow tags ([821b423](https://github.com/Pocket/web-client/commit/821b42332348fb71eab3dfd6b98c6b43c33decd7))
* **test:** add test runner ([5bff094](https://github.com/Pocket/web-client/commit/5bff094d4b79f9d60bddb32ba8da7e3daa0efc26))
* **toast:** adding toast to search page ([5bbba2c](https://github.com/Pocket/web-client/commit/5bbba2c2df2f6e4077f94f5a7bc249c18d3b5c1c))
* **toasts:** adding toasts to actions ([fb88ad8](https://github.com/Pocket/web-client/commit/fb88ad84fe73db2992e554f8e959e5382958998f))
* **utilities:** scroll ([690f323](https://github.com/Pocket/web-client/commit/690f323c01b8004b579f2a0d856fa17593e96ab5))
* **utilities:** strings ([6c4f13e](https://github.com/Pocket/web-client/commit/6c4f13e9e3e3155f1c25a35286c145aa80cd42e8))
* **web client:** adding consumer key ([737892d](https://github.com/Pocket/web-client/commit/737892d7130947a2766d5c4097356877a9e5cb36))
