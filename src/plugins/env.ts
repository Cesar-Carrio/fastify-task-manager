import fastifyEnv, { FastifyEnvOptions } from "@fastify/env";
import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
  export interface FastifyInstance {
    config: {
      PORT: number;
    };
  }
}

export const schema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "number",
      default: 3000,
    },
  },
};

const envPlugin: FastifyPluginCallback = (fastify, opts, done) => {
  const configOptions: FastifyEnvOptions = {
    schema: schema,
    dotenv: true,
  };

  return fastifyEnv(fastify, configOptions, done);
};

export default fp(envPlugin, { name: "env-plugin" });
