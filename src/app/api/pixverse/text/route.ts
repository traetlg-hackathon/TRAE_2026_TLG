import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKey = process.env.PIXVERSE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing PIXVERSE_API_KEY" },
      { status: 500 },
    );
  }

  const body = await req.json().catch(() => null);
  const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
  const durationRaw = body?.duration;
  const duration =
    typeof durationRaw === "number" && Number.isFinite(durationRaw)
      ? durationRaw
      : 5;

  if (!prompt) {
    return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
  }

  const res = await fetch("https://app-api.pixverse.ai/openapi/v2/video/text/generate", {
    method: "POST",
    headers: {
      "API-KEY": apiKey,
      "Ai-trace-id": crypto.randomUUID(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      aspect_ratio: "16:9",
      duration,
      model: "v6",
      prompt,
      quality: "720p",
      seed: 0,
    }),
  });

  const data = await res.json().catch(() => null);
  const videoId =
    data?.Resp?.video_id ?? data?.video_id ?? data?.data?.video_id ?? null;

  if (!res.ok || !videoId) {
    return NextResponse.json(
      { error: "PixVerse generate failed", status: res.status, data },
      { status: 502 },
    );
  }

  return NextResponse.json({ videoId, data });
}

