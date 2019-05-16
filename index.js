const hapi = require("hapi");
const mongoose = require("mongoose");
const Painting = require("./models/Painting");

const server = hapi.server({
  port: 4000,
  host: "localhost"
});

const init = async () => {
  mongoose
    .connect("mongodb://localhost:27017/graphql-test", {
      useNewUrlParser: true
    })
    .then(
      () => {
        console.log("Connected to database");
      },
      err => {
        if (err) throw err;
      }
    );

  server.route([
    {
      method: "GET",
      path: "/",
      handler: function(request, reply) {
        return "Hello world";
      }
    },
    {
      method: "GET",
      path: "/api/v1/paintings",
      handler: function(request, reply) {
        return Painting.find();
      }
    },
    {
      method: "POST",
      path: "/api/v1/paintings",
      handler: function(request, reply) {
        const { name, url, techniques } = request.payload;
        const painting = new Painting({
          name,
          url,
          techniques
        });
        return painting.save();
      }
    }
  ]);

  await server.start();
  console.log(`Server running at port: ${server.info.uri}`);
};

init();
