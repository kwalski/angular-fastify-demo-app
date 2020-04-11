const fastify = require("fastify")({ logger: true });

fastify.register(require("fastify-cors"), {
  origin: "*"
});

let animals = [{ id: "1", name: "Tiger", count: 2 }];

// Declare a route
fastify.get("/alive", async (request, reply) => {
  return { serverDate: new Date() };
});

fastify.get("/animals", async (request, reply) => {
  return { animals };
});

fastify.post("/animals", async (request, reply) => {
  animals = [...animals, request.body.animal];
  return { animals };
});

fastify.patch("/animals/:id", async (request, reply) => {
  const idx = animals.findIndex(a => a.id === request.params.id);
  animals[idx] = request.body.animal;
  return { animals };
});

fastify.delete("/animals/:id", async (request, reply) => {
  animals = animals.filter(a => a.id !== request.params.id);
  return { animals };
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(8081);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
