
import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "next/og";


export async function GET(req: NextRequest) {
    return new ImageResponse((
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
    ));
}