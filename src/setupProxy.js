const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.us-south.assistant.watson.cloud.ibm.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove o prefixo ao fazer a requisição
      },
    })
  );
};
