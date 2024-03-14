import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import AutoLoad from '@fastify/autoload';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import type { AutoloadPluginOptions } from '@fastify/autoload';
import type { FastifyPluginAsync } from 'fastify';
import type { FastifyBaseLogger } from 'fastify';
import fastifyStatic from '@fastify/static';

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

let logger: FastifyBaseLogger;

const app: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  logger = fastify.log;

  fastify.log.info('registering auto load plugins');
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  });

  //Load all api routes
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    routeParams: true,
    options: opts,
    autoHooks: true,
    cascadeHooks: true,
  });

  // static files
  console.log(__dirname);
  fastify.register(fastifyStatic, {
    root: join(__dirname, '../', 'public')
  });
};

export default app;
export { app, options, logger };
