import cheerio from 'cheerio';
import axios from 'axios';
import fs from 'fs';
import { geocode } from '../utils/geocoder';

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

    const latlngs = await Promise.all(titles.map(geocode))
    const results: DarkSkyLocation[] = latlngs.map((latlng, i) => ({
        latitude: latlng.lat,
        longitude: latlng.lng,
        title: titles[i].trim(),
        url: urls[i],
        roughLocation: values[i].startsWith(", ") ? values[i].substring(2) : values[i]
    }))

    fs.writeFileSync("output/dark-sky-locations.json", JSON.stringify(results, null, 2))
    console.log("Done!")
})()