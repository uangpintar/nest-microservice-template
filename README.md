| Statements | Branches | Functions | Lines |
| -----------|----------|-----------|-------|
| ![Statements](https://img.shields.io/badge/Coverage-92.24%25-brightgreen.svg "Make me better!") | ![Branches](https://img.shields.io/badge/Coverage-65.32%25-red.svg "Make me better!") | ![Functions](https://img.shields.io/badge/Coverage-86.9%25-yellow.svg "Make me better!") | ![Lines](https://img.shields.io/badge/Coverage-91.61%25-brightgreen.svg "Make me better!") |

# NestJS Microservices

[NestJS Monorepo Docs](https://docs.nestjs.com/cli/monorepo)

## Monorepo with nestjs
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

## Prerequisite
 - Node: 14 => <= 18
 - Docker
 - npm install -g commitizen

## Installation
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
  
## Running the app
Run the docker compose to run all the services
```bash
  docker-compose up --build -V 
```
You can run spesific service by running the dockerfile on the project folder
```bash
  docker run -d <Dockerfile>
```

## Workspaces list
- billing
- auth
- orders
- libs

## Tests
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

## Lint
 - Run lint 
    ```bash
    $ npm run lint
    ```

## App Skeleton \
```
.
|-- apps
|   |-- auth
|   |   |-- src
|   |   |   |-- config
|   |   |   |   `-- configuration.ts
|   |   |   |-- constant
|   |   |   |   `-- document.ts
|   |   |   |-- guards
|   |   |   |   |-- jwt-auth.guard.ts
|   |   |   |   `-- local-auth.guard.ts
|   |   |   |-- __mocks__
|   |   |   |   `-- auth.service.ts
|   |   |   |-- strategies
|   |   |   |   |-- jwt.strategy.ts
|   |   |   |   `-- local.strategy.ts
|   |   |   |-- test
|   |   |   |   `-- auth.controller.spec.ts
|   |   |   |-- users
|   |   |   |   |-- dto
|   |   |   |   |   `-- create-user.request.ts
|   |   |   |   |-- __mocks__
|   |   |   |   |   `-- users.service.ts
|   |   |   |   |-- schemas
|   |   |   |   |   `-- user.schema.ts
|   |   |   |   |-- test
|   |   |   |   |   |-- stubs
|   |   |   |   |   |   `-- users.stub.ts
|   |   |   |   |   `-- users.controller.spec.ts
|   |   |   |   |-- users.controller.ts
|   |   |   |   |-- users.module.ts
|   |   |   |   |-- users.repository.ts
|   |   |   |   `-- users.service.ts
|   |   |   |-- auth.controller.ts
|   |   |   |-- auth.module.ts
|   |   |   |-- auth.service.ts
|   |   |   |-- current-user.decorator.ts
|   |   |   |-- main.ts
|   |   |   `-- tracing.ts
|   |   |-- tests
|   |   |   `-- initialization.js
|   |   |-- Dockerfile
|   |   |-- jest.config.js
|   |   |-- package.json
|   |   |-- sonar-project.properties
|   |   `-- tsconfig.app.json
|   |-- billing
|   |   |-- src
|   |   |   |-- config
|   |   |   |   `-- configuration.ts
|   |   |   |-- constant
|   |   |   |   `-- document.ts
|   |   |   |-- test
|   |   |   |   `-- billing.controller.spec.ts
|   |   |   |-- billing.controller.ts
|   |   |   |-- billing.module.ts
|   |   |   |-- billing.service.ts
|   |   |   |-- main.ts
|   |   |   `-- tracing.ts
|   |   |-- tests
|   |   |   `-- initialization.js
|   |   |-- Dockerfile
|   |   |-- jest.config.js
|   |   |-- package.json
|   |   |-- package-lock.json
|   |   |-- sonar-project.properties
|   |   `-- tsconfig.app.json
|   `-- orders
|       |-- src
|       |   |-- config
|       |   |   `-- configuration.ts
|       |   |-- constant
|       |   |   |-- document.ts
|       |   |   `-- services.ts
|       |   |-- dto
|       |   |   `-- create-order.request.ts
|       |   |-- __mocks__
|       |   |   |-- orders.repository.ts
|       |   |   `-- orders.service.ts
|       |   |-- schemas
|       |   |   `-- order.schema.ts
|       |   |-- test
|       |   |   |-- stubs
|       |   |   |   `-- orders.stub.ts
|       |   |   |-- orders.controller.spec.ts
|       |   |   `-- orders.repository.spec.ts
|       |   |-- main.ts
|       |   |-- orders.controller.ts
|       |   |-- orders.module.ts
|       |   |-- orders.repository.ts
|       |   |-- orders.service.ts
|       |   `-- tracing.ts
|       |-- tests
|       |   `-- initialization.js
|       |-- Dockerfile
|       |-- jest.config.js
|       |-- package.json
|       |-- package-lock.json
|       |-- sonar-project.properties
|       `-- tsconfig.app.json
|-- libs
|   `-- common
|       |-- src
|       |   |-- auth
|       |   |   |-- auth.module.ts
|       |   |   |-- jwt-auth.guard.ts
|       |   |   `-- services.ts
|       |   |-- database
|       |   |   |-- abstract.repository.ts
|       |   |   |-- abstract.schema.ts
|       |   |   `-- database.module.ts
|       |   |-- kafka
|       |   |   |-- kafka.module.ts
|       |   |   `-- kafka.service.ts
|       |   |-- pubSubClient
|       |   |   `-- pubSubClient.ts
|       |   |-- rmq
|       |   |   |-- rmq.module.ts
|       |   |   `-- rmq.service.ts
|       |   `-- index.ts
|       |-- package.json
|       |-- package-lock.json
|       `-- tsconfig.lib.json
|-- commitlint.config.js
|-- docker-compose-deployment.yml
|-- docker-compose-dev.yml
|-- docker-compose.yml
|-- jest.config.ts
|-- nest-cli.json
|-- package.json
|-- package-lock.json
|-- README.md
|-- release.config.js
|-- request.http
|-- tsconfig.build.json
`-- tsconfig.json
```

## Architecture
- ```├── libs```: Application shared libs.
- ```├── apps```: Monorepo Applications.
