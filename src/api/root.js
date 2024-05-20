import { fastify, redisClient } from '../server-utils.js';

fastify.post("/", async function handler(request, response) {
  const data = request.body.data;
  const name = request.body.name;
  try {
    const dataStored = await redisClient.hSet(name, data);
    return {
      status: 200,
      data: dataStored,
      error: "",
    };
  } catch (err) {
    return {
      status: 500,
      data: {},
      error: err,
    };
  }
});

fastify.get("/hash-data", async function handler(request, response) {
  try {
    const data = await redisClient.hGetAll(request.query.name);
      return {
        status: 200,
        data,
        error: ""
      }
  } catch (err) {
    return {
      status: 500,
      data: {},
      error: err,
    };
  }
});

fastify.get("/", async (request, reply) => {
    return reply.sendFile("index.html")
})

