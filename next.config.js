module.exports = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*", // 해당 서버 포트
      },
    ];
  },
  compiler: {
    styledComponents: true,
  },
};
