# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/get-docker/)

## Downloading

```
git clone https://github.com/natein/nodejs2021Q4-service.git
```
## Using docker

## Artillery results

|                       |                                    | Express                                   | Fastify                                 |
| --------------------- | ---------------------------------- | ----------------------------------------- | --------------------------------------- |
| Scenarios             | [created, completed, success rate] | 5343, 5672, 100%                          | 5267, 5212, 100%                        |
| Requests              | [total, per second median]         | 25521, 69.21                              | 23587, 67                               |
| Latency, ms           | [min, max, median, p95, p99]       | 0, 8420, 10, 5469, 7324.7                 | 0, 7991, 10, 4577.1, 6645.9             |
| Scenario duration, ms | [min, max, median, p95, p99]       | 8327.8, 29447.3, 8546.0, 27822.9, 25468.1 | 7945.9, 25836.2, 7892, 23971.5, 22432.8 |


Change directory to nodejs2021q4-service

Create a docker image and start the container

```
docker-compose up --build
```
Shut down containers
```
docker-compose down;
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
