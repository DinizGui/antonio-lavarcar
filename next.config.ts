import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // o home do usuário também tem package-lock; fixa a raiz no projeto
  outputFileTracingRoot: path.join(__dirname),
  images: { formats: ["image/avif", "image/webp"], qualities: [70, 75] },
  async headers() {
    return [
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
