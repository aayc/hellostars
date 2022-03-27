// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { DarkSkyLocation } from '../../utils/darksky';
import { geocode } from '../../utils/geocoder';

type SearchResponse = {
    locations: DarkSkyLocation[]
}

type SearchRequest = {
    address: string
}

async function getNearestDarkSkies(address: string, limit: number): Promise<DarkSkyLocation[]> {
    const latlng = await geocode(address)
    console.log("GOT LATLNG:", latlng)
    try {
        const query = `
            SELECT latitude, longitude, title, url, roughLocation, SQRT(
            POW(69.1 * (latitude - ${latlng.lat}), 2) +
            POW(69.1 * (${latlng.lng} - longitude) * COS(latitude / 57.3), 2)) AS distance
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
    const params: SearchRequest = JSON.parse(req.body)
    const nearest = await getNearestDarkSkies(params.address, 10)
    res.status(200).json({ locations: nearest })
}
