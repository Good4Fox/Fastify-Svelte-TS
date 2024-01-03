// server.mjs
import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Инициализация Fastify без prettyPrint
const app = fastify({ logger: true, disableRequestLogging: true });

app.register(fastifyStatic, {
  root: path.join(__dirname, 'dist'),
  prefix: '/',
});

const start = async () => {
  try {
    const address = await app.listen({ port: 3000 });
    app.log.info(`Server listening on ${address}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();