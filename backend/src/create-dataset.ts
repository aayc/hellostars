import cheerio from 'cheerio';
import axios from 'axios';
import fs from 'fs';
import {Client, GeocodeRequest} from "@googlemaps/google-maps-services-js";

type DarkSkyLocation = {
    latitude: number;
    longitude: number;
    title: string;
    url: string;
    roughLocation: string;
};

(async () => {
    const credentials = JSON.parse(fs.readFileSync("./.credentials.json").toString())
    const html = await axios.get("https://www.go-astronomy.com/dark-sky-sites.php")
    const $ = cheerio.load(html.data.toString())
    // Get h2 with text "Dark Sky Sites"
    const h2 = $('h2').filter(function(this: any) {
        return $(this).text() === "U.S. Dark Sky Parks";
    })
    const table = h2.next()

    const links = table.find('a')
    const titles: string[] = links.map(function(this: any) {
        return $(this).text() + " Park"
    }).get()
    const urls: string[] = links.map(function(this: any) {
        return $(this).attr('href')
    }).get()
    const values: string[] = table.find('li.table-value').map(function(this: any) {
        return $(this).text()
    }).get().slice(1)

    const client = new Client()

    const results: DarkSkyLocation[] = await Promise.all(titles.map(async (_, i) => {
        const params: GeocodeRequest = {
            params: {
                address: titles[i].trim(),
                components: 'country:US',
                key: credentials["GOOGLE_GEOCODING_API"]
            }
        }; 

        const resp = await client.geocode(params)
        const location = resp.data.results[0].geometry.location
        const latitude = location.lat
        const longitude = location.lng

        return {
            latitude,
            longitude,
            title: titles[i].trim(),
            url: urls[i],
            roughLocation: values[i].startsWith(", ") ? values[i].substring(2) : values[i]
        }
    }))

    fs.writeFileSync("output/dark-sky-locations.json", JSON.stringify(results, null, 2))
    console.log("Done!")
})()