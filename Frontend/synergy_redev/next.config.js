const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const cookie = require('cookie');

module.exports = {
  async rewrites() {
    return [
      {
        source: '/dotnet/:path*',
        destination: 'https://localhost:44326/:path*', // Proxy to Backend
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/dotnet/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.devServer = {
        ...config.devServer,
        before: (app) => {
          app.use(
            '/dotnet',
            createProxyMiddleware({
              target: 'https://localhost:44326',
              changeOrigin: true,
              pathRewrite: { '^/dotnet': '' },
              onProxyReq: (proxyReq, req, res) => {
                // Reading the token from the cookie
                const cookies = cookie.parse(req.headers.cookie || '');
                const token = cookies.token;

                // Adding the Authorization header with the bearer token
                if (token) {
                  proxyReq.setHeader('Authorization', `Bearer ${token}`);
                }
              },
              onProxyRes: (proxyRes, req, res) => {
                if (proxyRes.statusCode === 401) {
                  res.writeHead(401, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ message: 'Unauthorized: Invalid or expired token' }));
                }
              },
            })
          );
        },
      };
    }
    return config;
  },
};
