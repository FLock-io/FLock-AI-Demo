import { NextRequest, NextResponse } from "next/server";

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL; // Ensure this variable is correctly set in your environment
const postUrl = `${NEXT_PUBLIC_URL}/api/chat`;

export async function POST(req: NextRequest) {
  return new NextResponse(
    `<!DOCTYPE html>
        <html>
          <head>
            <title>Let FLock it up</title>
            <meta property="og:title" content="Let FLock it up" />
            <meta property="og:image" content="${NEXT_PUBLIC_URL}/assets/FLockLogo.svg" />
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${NEXT_PUBLIC_URL}/api/images/chat" />
            <meta property="fc:frame:input:text" content="What is Solana?" />
            <meta property="fc:frame:button:1" content="Bitcoin" />
            <meta property="fc:frame:button:2" content="Ethereum" />
            <meta property="fc:frame:button:3" content="Scroll" />
            <meta property="fc:frame:post_url" content="${postUrl}" />
          </head>
          <body/>
        </html>`,
    {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
}

export const GET = POST;
