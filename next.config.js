/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	pageExtensions: ['page.tsx', 'page.ts'],
	redirects: async () => {
		return [
			{
				source: '/',
				destination: '/home',
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
