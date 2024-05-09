
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
                }}>Answer</h1>
            <p style={{
                color: "black",
            }}>How to use it</p>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                }}
            >
                <ol style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "1em",
                }}>
                    <li>Ask a question</li>
                    <li>Select a chatbot with the button</li>
                </ol>
            </div>
        </div>
    ));
}