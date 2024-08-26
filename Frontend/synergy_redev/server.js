const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use('/auth', createProxyMiddleware({
    target: 'https://localhost:44326',
    changeOrigin: true,
    secure: false,
  }));

  server.use('/forms', createProxyMiddleware({
    target: 'https://localhost:44326',
    changeOrigin: true,
    secure: false,
  }));

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3001, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3001');
  });
});
