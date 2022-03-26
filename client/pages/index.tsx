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
  return (
    <div className="bg-black flex min-h-screen text-white">
      <Head>
        <title>Hello Stars ✨</title>
        <meta name="description" content="Find the best spots to stargaze" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="m-auto">
        <div className="mb-4 flex">
          <TextInput
            prefixIcon="map"
            className="mr-4"
            placeholder="An address near you"
          ></TextInput>
          <CalendarInput placeholder="Anytime" className="mr-4"></CalendarInput>
          <Button label="Search"></Button>
        </div>
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
