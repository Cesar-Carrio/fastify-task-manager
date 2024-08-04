import Fastify from "fastify";
import app from "./src/index.js";
import fastify from "fastify";

const env =
  process.env.NODE_ENV === "development" ? "development" : "production";

console.log(process.env.NODE_ENV);

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
    level: "debug",
  },
  production: true,
};

async function initAppServer() {
  const fastify = Fastify({
    logger: envToLogger[env],
  });

  fastify.register(app);
  await fastify.ready();

  try {
    await fastify.listen({
      port: fastify.config.PORT,
      host: fastify.config.HTTP_HOST,
    });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

initAppServer();
