import fastifyEnv, { FastifyEnvOptions } from "@fastify/env";
import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
  export interface FastifyInstance {
    config: {
      PORT: number;
      HTTP_HOST: string;
      API_KEY: string;
      DEBUG_LEVEL: string;
    };
  }
}

export const schema = {
  type: "object",
  required: ["PORT", "HTTP_HOST"],
  properties: {
    PORT: {
      type: "number",
      default: 3000,
    },
    HTTP_HOST: {
      type: "string",
      default: "0.0.0.0",
    },
    API_KEY: {
      type: "string",
    },
    DEBUG_LEVEL: {
      type: "string",
    },
  },
};

const envPlugin: FastifyPluginCallback = (fastify, _, done) => {
  const configOptions: FastifyEnvOptions = {
    schema: schema,
    dotenv: true,
  };

  return fastifyEnv(fastify, configOptions, done);
};

export default fp(envPlugin, { name: "env-plugin" });
