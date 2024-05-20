import { createHash,  } from 'node:crypto';
import { fastify, redisClient } from '../server-utils.js'


/**
 * Shorter - Given a url and time - create a hash string, store it and redirect url
 */

fastify.post("/short", (req, reply) => {
    const body = req.body;
    const url = body.url;
    const time = body.time
    
    if(!url || !time) {
        reply.code(400)
        return reply.send({
            error: "URL and time not sent"
        })
    }
    const hashObject = createHash("sha256", { encoding: "base64url" });

    console.log('body',body, typeof body)
    const hash = hashObject.update(url).digest('base64url').slice(0, 10)

    const resultUrl = `/${hash}`

    redisClient.set(hash, url, {
        EX: time
    });

    return {
        status: 200,
        url: resultUrl,
        error: ''
    }
})

fastify.get("/:id", async (request, reply) => {
  try {
    const id = request.params.id;
    const exists = await redisClient.exists(id);
    if (exists) {
      const location = await redisClient.get(id);
      console.log("location", location);
      reply.code(301);
      reply.headers({ location: location });
      return reply.sendFile("index.html");
    } else {
      return reply.sendFile("404.html");
    }
  } catch (err) {
    return {
      status: 500,
      location: "",
      error: err,
    };
  }
});