import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { videoId: string } },
) {
  const apiKey = process.env.PIXVERSE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing PIXVERSE_API_KEY" },
      { status: 500 },
    );
  }

  const videoId = params.videoId;
  if (!videoId) {
    return NextResponse.json({ error: "Missing videoId" }, { status: 400 });
  }

  const res = await fetch(
    `https://app-api.pixverse.ai/openapi/v2/video/result/${encodeURIComponent(videoId)}`,
    {
      headers: {
        "API-KEY": apiKey,
        "Ai-trace-id": crypto.randomUUID(),
      },
      cache: "no-store",
    },
  );

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(
      { error: "PixVerse result failed", status: res.status, data },
      { status: 502 },
    );
  }

  return NextResponse.json({ data });
}

