import fastify, { FastifyPluginAsync } from "fastify";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import Swagger from "@fastify/swagger";
import SwaggerUI from "@fastify/swagger-ui";
import Helmet from "@fastify/helmet";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = fastify({
  logger: true,
});

server.register(Swagger);
server.register(SwaggerUI);
server.register(Helmet, { global: true });

server.register(AutoLoad, {
  dir: join(__dirname, "./routes"),
  dirNameRoutePrefix: false,
});

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Sever listening at ${address}`);
});
