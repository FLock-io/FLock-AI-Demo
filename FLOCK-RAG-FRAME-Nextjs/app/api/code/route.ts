import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    untrustedData: { buttonIndex },
  } = await req.json();

  if (buttonIndex === 1) {
    return NextResponse.redirect("https://beta.flock.io/", { status: 302 });
  }
}
