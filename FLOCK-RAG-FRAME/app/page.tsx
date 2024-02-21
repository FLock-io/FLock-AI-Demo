import type { Metadata } from 'next';
import * as dotenv from 'dotenv';

dotenv.config();

const { NEXT_PUBLIC_URL } = process.env;

export async function generateMetadata(): Promise<Metadata> {
  const imageUrl = `${NEXT_PUBLIC_URL}/api/images/home`;
  const postUrl = `${process.env['NEXT_PUBLIC_URL']}/api/select`;
  return {
    title: "FLock ChatBot Frame",
    description: "This is a chatbot frame for FLock",
    openGraph: {
      title: "Let FLock it up",
      images: [imageUrl],
    },
    other: {
      "fc:frame": "vNext",
      "fc:frame:image": imageUrl,
      "fc:frame:post_url": postUrl,
      "fc:frame:button:1": "Let's go",
    },
  };
}

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "70%",
        margin: "0 auto",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <img
        src="https://beta.flock.io/static/images/logo.png"
      />
      <h1
        style={{
          fontSize: "2em",
          color: "black",
          fontWeight: "bold",
        }}>Welcome to FLock Frame</h1>
    </div>
  );
}