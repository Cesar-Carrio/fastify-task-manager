import Swagger from "@fastify/swagger";
import SwaggerUI from "@fastify/swagger-ui";
import Helmet from "@fastify/helmet";

import Autoload, { AutoloadPluginOptions } from "@fastify/autoload";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Importing plugins
import envPlugin from "./plugins/env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export type AppOptions = {
  // Place my custom options for below here
} & Partial<AutoloadPluginOptions>;

// pass --options via CLI args in command to enable these options.
// const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts,
): Promise<void> => {
  // this loads up config vars from the env, run this first
  await fastify.register(envPlugin);
  fastify.register(Swagger);
  fastify.register(SwaggerUI);
  fastify.register(Helmet, { global: true });

  // Load all plugins in the plugins directory
  void fastify.register(Autoload, {
    dir: join(__dirname, "plugins"),
    options: opts,
    forceESM: true,
    maxDepth: 1,
    // Exclude env plugin b/c it was loaded earlier
    ignorePattern: /env.(j|t)s$/,
  });
};

export default fp(app);
