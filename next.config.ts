import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // 개발 중 휴대폰 등 같은 와이파이의 다른 기기에서 http://192.168.x.x:3000 으로 접속할 수 있게 허용
  // (없으면 버튼·업로드가 동작하지 않음). 배포된 사이트에는 영향 없음.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*"],
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
