const nextConfig = {
  images: {
    remotePatterns: [
      // Pattern untuk Strapi lokal
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      // TAMBAHKAN INI - Pattern untuk gambar placeholder
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "acceptable-pleasure-080d6fc094.strapiapp.comhttps",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "acceptable-pleasure-080d6fc094.media.strapiapp.com",
        port: "",
        pathname: "/**",
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
