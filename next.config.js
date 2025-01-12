/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/v1/api/:path*",
        destination: "http://localhost:3001/v1/api/:path*", // Proxy to backend
        basePath: false,
      },
    ];
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // In production, replace with your specific domain
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
