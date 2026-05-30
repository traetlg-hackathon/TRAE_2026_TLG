import { NextResponse } from "next/server";

const DEFAULT_FILENAME = "duelcut-scene.mp4";

const sanitizeFilename = (value: string | null) => {
  if (!value) return DEFAULT_FILENAME;
  const cleaned = value.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
  return cleaned.endsWith(".mp4") ? cleaned : `${cleaned || "duelcut-scene"}.mp4`;
};

const isBlockedHost = (hostname: string) => {
  const normalized = hostname.toLowerCase();
  return (
    normalized === "localhost" ||
    normalized === "127.0.0.1" ||
    normalized === "0.0.0.0" ||
    normalized === "::1" ||
    normalized.startsWith("10.") ||
    normalized.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(normalized)
  );
};

export async function GET(req: Request) {
  const requestUrl = new URL(req.url);
  const source = requestUrl.searchParams.get("url");
  const filename = sanitizeFilename(requestUrl.searchParams.get("filename"));
  const disposition = requestUrl.searchParams.get("disposition") === "inline" ? "inline" : "attachment";

  if (!source) {
    return NextResponse.json({ error: "Missing video url" }, { status: 400 });
  }

  let videoUrl: URL;
  try {
    videoUrl = new URL(source);
  } catch {
    return NextResponse.json({ error: "Invalid video url" }, { status: 400 });
  }

  if (!["https:", "http:"].includes(videoUrl.protocol) || isBlockedHost(videoUrl.hostname)) {
    return NextResponse.json({ error: "Unsupported video url" }, { status: 400 });
  }

  if (process.env.PLAYWRIGHT_MOCK_PIXVERSE === "1") {
    if (disposition === "inline") {
      return NextResponse.redirect(videoUrl);
    }

    return new Response("mock video download", {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": `${disposition}; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  }

  const upstream = await fetch(videoUrl, { cache: "no-store" });
  if (!upstream.ok || !upstream.body) {
    return NextResponse.json(
      { error: "Failed to download video", status: upstream.status },
      { status: 502 },
    );
  }

  const headers = new Headers({
    "Content-Type": upstream.headers.get("content-type") ?? "video/mp4",
    "Content-Disposition": `${disposition}; filename="${filename}"`,
    "Cache-Control": "no-store",
  });
  const contentLength = upstream.headers.get("content-length");
  if (contentLength) headers.set("Content-Length", contentLength);

  return new Response(upstream.body, { headers });
}
