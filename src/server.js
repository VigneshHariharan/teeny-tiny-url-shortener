import { fastify, redisClient } from './server-utils.js'
import path from 'path';
import './api/root.js';
import "./api/url-shortener.js";


redisClient.on("error", (err) => {
  console.log("Redis client error", err);
});

fastify.register(import("@fastify/static"), {
  root: path.resolve(import.meta.dirname, "../public"),
})

try {
  await redisClient
    .connect()
    .then(() => console.log("redis connected"))
    .catch((err) => console.log("redis not connected", err));
  await fastify.listen({ port: 3001 });
} catch (err) {
  console.err("Error in server : ", err);
  process.exit(1);
}
