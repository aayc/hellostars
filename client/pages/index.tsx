import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Button from "../components/small/Button";
import TextInput from "../components/small/TextInput";
import CalendarInput from "../components/small/CalendarInput";
import { useState, useEffect } from "react";

import DarkSkyMap from "../components/DarkSkyMap";

/*type PostMetadata = {
  title: string;
  author: string;
  date: string;
  topic: string;
  id: string;
  tags: string[];
  thumbnailUrl: string;
  description: string;
  level: number;
};

type HomePageProps = {
  posts: { metadata: PostMetadata; slug: string }[];
};*/

const Home = () => {
  const [initialLocation, setInitialLocation] = useState({
    lat: 40.30917913082448,
    lng: -111.7440457971245,
  });
  const [address, setAddress] = useState("");

  const search = () => {
    fetch("/api/search", { method: "POST", body: JSON.stringify({ address }) })
      .then((res) => res.json())
      .then((res) => {
        alert(JSON.stringify(res));
      });
    // Use geocoding API to determine locations
    // Center on the address lat/long
    // Use nearest locations to interpret zoom (1.5x necessary zoom)
    // animate map to the side and show list view all in the same url...
  };

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setInitialLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="bg-black flex min-h-screen text-white">
      <Head>
        <title>Hello Stars ✨</title>
        <meta name="description" content="Find the best spots to stargaze" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mt-4 flex flex-col">
        <div className="">
          <div className="mb-4 flex">
            <TextInput
              prefixIcon="map"
              className="mr-4"
              placeholder="An address near you"
              onChange={(e: any) => setAddress(e.target.value)}
            ></TextInput>
            <CalendarInput
              placeholder="Anyday, anytime"
              className="mr-4"
            ></CalendarInput>
            <Button label="Search" onClick={search}></Button>
          </div>
        </div>
        <DarkSkyMap initialLocation={initialLocation}></DarkSkyMap>
      </div>
    </div>
  );
};

/*export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join("posts"));
  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: metadata } = matter(markdownWithMeta);
    return {
      metadata,
      slug: path.join("posts", filename.split(".")[0]),
    };
  });
  return {
    props: {
      posts,
    },
  };
};*/

export default Home;
