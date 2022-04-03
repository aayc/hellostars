// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dark_sky_locations } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { DarkSkyLocation } from '../../lib/darksky';
import { geocode } from '../../lib/geocoder';
import prisma from '../../lib/prisma';


type SearchResponse = {
    locations: dark_sky_locations[]
}

type SearchRequest = {
    address: string
}

async function getNearestDarkSkies(address: string, limit: number): Promise<dark_sky_locations[]> {
    const latlng = await geocode(address)
    console.log("GOT LATLNG:", latlng)
    try {
        // For now just get all the locations lol
        const results = await prisma.dark_sky_locations.findMany()
        // const results: any = await prisma.$queryRaw`
        //     SELECT latitude, longitude, title, url, rough_location, SQRT(
        //     POW(69.1 * (latitude - ${latlng.lat}), 2) +
        //     POW(69.1 * (${latlng.lng} - longitude) * COS(latitude / 57.3), 2)) AS distance
        //     FROM dark_sky_locations HAVING distance < 2500 ORDER BY distance;
        // `

        results.sort((a, b) => {
            const distanceA = Math.sqrt((a.latitude - latlng.lat) ** 2 + (a.longitude - latlng.lng) ** 2)
            const distanceB = Math.sqrt((b.latitude - latlng.lat) ** 2 + (b.longitude - latlng.lng) ** 2)
            return distanceA - distanceB
        })
        console.log(results)
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
    const nearest = await getNearestDarkSkies(params.address, 5)
    res.status(200).json({ locations: nearest })
}
