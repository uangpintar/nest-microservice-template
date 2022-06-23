# Nestjs Microservices Boilerplate

Check 
 - [monorepo docs](https://docs.nestjs.com/cli/monorepo)

| Statements | Branches | Functions | Lines |
| -----------|----------|-----------|-------|
| ![Statements](https://img.shields.io/badge/Coverage-92.24%25-brightgreen.svg "Make me better!") | ![Branches](https://img.shields.io/badge/Coverage-65.32%25-red.svg "Make me better!") | ![Functions](https://img.shields.io/badge/Coverage-86.9%25-yellow.svg "Make me better!") | ![Lines](https://img.shields.io/badge/Coverage-91.61%25-brightgreen.svg "Make me better!") |


##### Monorepo with nestjs
  - Docker

  - Logs Service
    - Pinojs

  - Observability APM Monitoring and logs management
    - datadog

  - Authentication

  - Swagger Documentation

  - Monggodb
    - mongoose
    - multiples databases

  - Messages broker
    - Kafka
    - RabbitMQ
    - Google PubSub

  - libs structure

  - Tests
    - Unit tests
    - e2e 
    - 90% Coverage

  - CI/CD
    - Github Actions

  - Code Quality checker
    - Sonar cloud  

  - Commitlint
    - Husky
    - Conventional commit pattern

  - linter
    - eslint

  - Versioning
    - Semantic release


#### Prerequisite
 - Node: 14 => <= 18
 - Docker
 - npm install -g commitizen

### Installation

- install monorepo depedencies on the root directory 
  ```bash
  $ npm install
  ```

- install project depedencies
  ```bash
  $ npm install on your service/project folder
  ```

- install lib on project 
  ```bash
  $ npm install
  ```

### Running the app

Run the docker compose to run all the services
```bash
  docker-compose up --build -V 
```
You can run spesific service by running the dockerfile on the project folder
```bash
  docker run -d <Dockerfile>
```

#### workspaces list
- billing
- auth
- orders
- libs


#### Tests
 - unit
  ```bash
    # run monorepo test
    npm run test
  ```

  ```bash
  # Run project test on your project folder
  $ npm run test
  ```
- coverage
  ```
    $ npm run test:cov
  ```

- e2e
  ```
    $ npm run test:e2e
  ```

---

### Lint

 - Run lint 
    ```bash
    $ npm run lint
    ```
---

-- App Skeleton 

```
.
.dockerignore
.eslintrc.js
.github
   |-- CODEOWNERS
   |-- workflows
   |   |-- auth.yml
   |   |-- billing.yml
   |   |-- orders.yml
.gitignore
.husky
   |-- commit-msg
.prettierrc
README.md
apps
   |-- auth
   |   |-- .env
   |   |-- Dockerfile
   |   |-- jest.config.js
   |   |-- package.json
   |   |-- sonar-project.properties
   |   |-- src
   |   |   |-- __mocks__
   |   |   |   |-- auth.service.ts
   |   |   |-- auth.controller.ts
   |   |   |-- auth.module.ts
   |   |   |-- auth.service.ts
   |   |   |-- constant
   |   |   |   |-- document.ts
   |   |   |-- current-user.decorator.ts
   |   |   |-- guards
   |   |   |   |-- jwt-auth.guard.ts
   |   |   |   |-- local-auth.guard.ts
   |   |   |-- main.ts
   |   |   |-- strategies
   |   |   |   |-- jwt.strategy.ts
   |   |   |   |-- local.strategy.ts
   |   |   |-- test
   |   |   |   |-- auth.controller.spec.ts
   |   |   |-- tracing.ts
   |   |   |-- users
   |   |   |   |-- __mocks__
   |   |   |   |   |-- users.service.ts
   |   |   |   |-- dto
   |   |   |   |   |-- create-user.request.ts
   |   |   |   |-- schemas
   |   |   |   |   |-- user.schema.ts
   |   |   |   |-- test
   |   |   |   |   |-- stubs
   |   |   |   |   |   |-- users.stub.ts
   |   |   |   |   |-- users.controller.spec.ts
   |   |   |   |-- users.controller.ts
   |   |   |   |-- users.module.ts
   |   |   |   |-- users.repository.ts
   |   |   |   |-- users.service.ts
   |   |-- tests
   |   |   |-- initialization.js
   |   |-- tsconfig.app.json
   |-- billing
   |   |-- .env
   |   |-- Dockerfile
   |   |-- jest.config.js
   |   |-- package-lock.json
   |   |-- package.json
   |   |-- sonar-project.properties
   |   |-- src
   |   |   |-- billing.controller.ts
   |   |   |-- billing.module.ts
   |   |   |-- billing.service.ts
   |   |   |-- main.ts
   |   |   |-- test
   |   |   |   |-- billing.controller.spec.ts
   |   |   |-- tracing.ts
   |   |-- tests
   |   |   |-- initialization.js
   |   |-- tsconfig.app.json
   |-- orders
   |   |-- .env
   |   |-- Dockerfile
   |   |-- jest.config.js
   |   |-- package-lock.json
   |   |-- package.json
   |   |-- sonar-project.properties
   |   |-- src
   |   |   |-- __mocks__
   |   |   |   |-- orders.repository.ts
   |   |   |   |-- orders.service.ts
   |   |   |-- constant
   |   |   |   |-- document.ts
   |   |   |   |-- services.ts
   |   |   |-- dto
   |   |   |   |-- create-order.request.ts
   |   |   |-- main.ts
   |   |   |-- orders.controller.ts
   |   |   |-- orders.module.ts
   |   |   |-- orders.repository.ts
   |   |   |-- orders.service.ts
   |   |   |-- schemas
   |   |   |   |-- order.schema.ts
   |   |   |-- test
   |   |   |   |-- orders.controller.spec.ts
   |   |   |   |-- orders.repository.spec.ts
   |   |   |   |-- stubs
   |   |   |   |   |-- orders.stub.ts
   |   |   |-- tracing.ts
   |   |-- tests
   |   |   |-- initialization.js
   |   |-- tsconfig.app.json
commitlint.config.js
docker-compose.yml
jest.config.ts
libs
   |-- common
   |   |-- package-lock.json
   |   |-- package.json
   |   |-- src
   |   |   |-- auth
   |   |   |   |-- auth.module.ts
   |   |   |   |-- jwt-auth.guard.ts
   |   |   |   |-- services.ts
   |   |   |-- database
   |   |   |   |-- abstract.repository.ts
   |   |   |   |-- abstract.schema.ts
   |   |   |   |-- database.module.ts
   |   |   |-- index.ts
   |   |   |-- rmq
   |   |   |   |-- rmq.module.ts
   |   |   |   |-- rmq.service.ts
   |   |-- tsconfig.lib.json
nest-cli.json
package-lock.json
package.json
release.config.js
request.http
tsconfig.build.json
tsconfig.json
```

---
 #### Architecture
 - ```├── libs```: Application shared libs.
 - ```├── apps```: Monorepo Applications.
---

## License

It is available under the MIT license.
[License](https://opensource.org/licenses/mit-license.php)




