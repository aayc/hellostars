import {Client, GeocodeRequest} from "@googlemaps/google-maps-services-js";

type LatLng = {
    lat: number,
    lng: number
}

async function geocode(address: string): Promise<LatLng> {
    const client = new Client()
    const params: GeocodeRequest = {
        params: {
            address: address.trim(),
            components: 'country:US',
            key: process.env.GEOCODE_API_KEY || "KEY_NOT_FOUND"
        }
    }; 
    const response = await client.geocode(params)
    return response.data.results[0].geometry.location
}

export { geocode }