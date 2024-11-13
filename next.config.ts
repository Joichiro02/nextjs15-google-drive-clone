import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		serverActions: {
			bodySizeLimit: "100MB",
		},
	},
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
