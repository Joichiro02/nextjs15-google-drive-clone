import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "toppng.com",
			},
			{
				protocol: "https",
				hostname: "cloud.appwrite.io",
			},
		],
	},
};

export default nextConfig;
