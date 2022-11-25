/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
};

module.exports.NextConfig = nextConfig;

module.exports = {
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Credentials', value: 'true' },
					{ key: 'Access-Control-Allow-Origin', value: '*' },
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET,POST,PUT,DELETE,HEAD,OPTIONS',
					},
					{
						key: 'Access-Control-Allow-Headers',
						value: 'Content-Type,X-Requested-With,Accept,Authorization,Origin,Access-Control-Request-Method,Access-Control-Request-Headers',
					},
				],
			},
		];
	},
};
