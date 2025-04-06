import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  eslint: {
    dirs: ['src',], // 本番ビルド（next build）時には'pages'と'utils'ディレクトリのみでESLintを実行する
  },
}

export default nextConfig;
