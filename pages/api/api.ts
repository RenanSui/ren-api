import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { apitype, params } = req.query;
	const URL = services[apitype as keyof typeof services](
		params as keyof typeof services
	);

	const dynamicDate = new Date()

	try {
		const { data } = await axios.get(URL);
		res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate');
		res.status(200).json({
			dynamicDate: dynamicDate.toUTCString(),
			data: data,
		});
	} catch (error: any) {
		res.status(400).json({
			error: error,
		});
	}
}

// https://api.weatherapi.com/v1/current.json?key=871c9c1d464b4ae0a6615335222103&q=amogus&aqi=no

const services = {
	weather: function (place: string) {
		const WEATHER_API_SECRET = process.env.WEATHER_API_SECRET;
		const weatherData = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_SECRET}&q=${place}&aqi=no`;
		return weatherData;
	},
};
