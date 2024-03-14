import { randomUUID } from 'node:crypto';
import config from 'config';
import Fastify from 'fastify';
import closeWithGrace, { type CloseWithGraceAsyncCallback } from 'close-with-grace';
import app from './app.js';
import { AppConfigSchema } from './environment.js';
import { ZodError } from 'zod';

const start = async () => {
  const fastify = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
      },
    },
    genReqId: (_opts) => randomUUID(),
    requestIdHeader: 'x-correlation-id',
  });

  // validate node-config
  try {
    fastify.log.info('Parsing environment config...');
    AppConfigSchema.parse(config);
    fastify.log.info('Environment config parsed successfully');
  } catch (e) {
    if (e instanceof ZodError) {
      fastify.log.error('Error parsing environment config:');
      fastify.log.error(e.message);
      throw Error('Environment config validation failed');
    } else {
      throw e;
    }
  }

  await fastify.after();

  fastify.log.info('Initializing app...');
  await fastify.register(app);
  fastify.log.info('App initialized');

  try {
    const closeListeners = closeWithGrace(
      // delay is the number of milliseconds for the graceful close to finish
      { delay: config.get('closeDelay') },
      async function ({ signal: _, err, manual: __ }) {
        if (err) {
          fastify.log.error(err);
        }
        fastify.log.info('Preparing to shut down app...');
        fastify.log.info('Closing server...');
        await fastify.close();
      } as CloseWithGraceAsyncCallback
    );

    fastify.addHook('onClose', (_instance, done) => {
      _instance.log.info('Uninstalling all listeners');
      closeListeners.uninstall();
      done();
    });

    const { port, host } = config.get<{ port: number; host: string }>('listen');

    await fastify.listen({
      port,
      host,
    });
  } catch (err) {
    fastify.log.fatal(err);
    process.exit(1);
  }
};

start();
