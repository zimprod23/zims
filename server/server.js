const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    console.log("Production");
  });
}

server.listen(PORT, () => {
  console.log("we are @ " + PORT);
});
