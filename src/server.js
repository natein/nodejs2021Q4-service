const fastify = require('fastify');
const SwaggerPlugin = require('fastify-swagger');

const { PORT } = require('./common/config');

const userRoutes = require("./resources/users/user.router");
const boardRoutes = require("./resources/boards/board.router");
const taskRoutes = require("./resources/tasks/task.router");

const app = fastify({
  logger: false
});

app.register(SwaggerPlugin, {
  routePrefix: '/doc',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Trello REST Service',
      description: 'REST for users, boards and tasks',
      version: '1.0.0'
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    host: `localhost:${PORT}`,
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  }
});

userRoutes.forEach((route) => {
  app.route(route);
});

boardRoutes.forEach((route) => {
  app.route(route);
});

taskRoutes.forEach((route) => {
  app.route(route);
});

app.get("/", async () => ({
    Message: "Fastify is On Fire"
  }))

const start = async () => {
  try {
    await app.listen(PORT);
    app.log.info(`server listening on ${app.server.address().port}`);
    app.swagger();
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}
start();
