const { createProxyMiddleware } = require('http-proxy-middleware');

const path = require('path')

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://localhost:44346/:path*', // Proxy to Backend
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
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
	}
}