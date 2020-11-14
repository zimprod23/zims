const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => {
  console.log("we are @ " + PORT);
});
