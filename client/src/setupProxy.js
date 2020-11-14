const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://zimstore.herokuapp.com",
      changeOrigin: true,
    })
  );
};
