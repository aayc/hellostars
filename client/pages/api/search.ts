// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Client, GeocodeRequest} from "@googlemaps/google-maps-services-js";

type DarkSkyLocation = {
    latitude: number;
    longitude: number;
    title: string;
    url: string;
    roughLocation: string;
};

type SearchResponse = {
    locations: DarkSkyLocation[]
}

type SearchRequest = {
    address: string
}

async function getNearestDarkSkies(address: string, limit: number): Promise<DarkSkyLocation[]> {
    console.log("GOT ADDRESS:", address)
    console.log("API KEY:", process.env.GEOCODE_API_KEY)
    const client = new Client()
    const params: GeocodeRequest = {
        params: {
            address: address.trim(),
            components: 'country:US',
            key: process.env.GEOCODE_API_KEY || "KEY_NOT_FOUND"
        }
    }; 
    const response = await client.geocode(params)

    try {
        const location = response.data.results[0].geometry.location
        const latitude = location.lat
        const longitude = location.lng
        const query = `
            SELECT latitude, longitude, title, url, roughLocation, SQRT(
            POW(69.1 * (latitude - ${latitude}), 2) +
            POW(69.1 * (${longitude} - longitude) * COS(latitude / 57.3), 2)) AS distance
            FROM TableName HAVING distance < 25 ORDER BY distance;
        `
        const results: DarkSkyLocation[] = [] // TODO run db query and map to darkskylocation
        return results.slice(0, limit)
    } catch (err) {
        console.log(err)
        return []
    }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse>
) {
    console.log("REQ BODY:", req.body)
    const params: SearchRequest = JSON.parse(req.body)
    const nearest = await getNearestDarkSkies(params.address, 10)
    res.status(200).json({ locations: nearest })
}
