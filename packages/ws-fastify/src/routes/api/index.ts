import config from 'config';
import { type FastifyPluginAsync } from 'fastify';
import { type ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

const root: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  const server = fastify.withTypeProvider<ZodTypeProvider>();

  server.get(
    '/',
    {
      schema: {
        summary: 'Health check',
        tags: ['api'],
        response: {
          200: z.object({ success: z.boolean(), version: z.string() }),
        },
      },
    },
    async function () {
      return { success: true, version: config.get<string>('version') };
    }
  );
};

export default root;
