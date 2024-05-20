import Fastify from "fastify";
import { createClient } from "redis";

export const redisClient = createClient({
  database: 1,
});

export const fastify = Fastify({
  logger: true,
});


