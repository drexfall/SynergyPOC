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
                const cookies = cookie.parse(req.headers.cookie || '');
                const token = cookies.token;

                if (token) {
                  proxyReq.setHeader('Authorization', `Bearer ${token}`);
                }
              },
              onProxyRes: async (proxyRes, req, res) => {
                if (proxyRes.statusCode === 401) {
                  const response = await axios.post('/api/delete-token', {}, {
                    headers: {
                      'Content-Type': 'application/json',
                      'Cookie': req.headers.cookie,
                    },
                  });

                  if (response.status === 200) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Unauthorized: Invalid or expired token' }));
                  } else {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Failed to delete token record and clear cookies' }));
                  }
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
