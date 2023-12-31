/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: [
			'dvfx9cgvtgnyd.cloudfront.net',
			'avatars.githubusercontent.com',
			'lh3.googleusercontent.com',
			'www.suwon.go.kr',
		],
	},
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
