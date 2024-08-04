import { FastifyPluginCallbackTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";

const plugin: FastifyPluginCallbackTypebox = async (fastify) => {
  fastify.get(
    "/users",
    {
      schema: {
        response: {
          200: Type.Object({
            users: Type.Array(Type.Integer({ default: [1, 2, 3] }), {
              minItems: 2,
              uniqueItems: true,
            }),
          }),
        },
      },
    },
    async () => {
      return {
        users: [2, 3],
      };
    },
  );
};

export default plugin;
