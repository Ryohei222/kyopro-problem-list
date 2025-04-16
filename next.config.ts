import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
};

module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				port: "",
				pathname: "/**",
			},
		],
		minimumCacheTTL: 2678400, // 31 days
	},
};

export default nextConfig;
