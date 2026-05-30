import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const summarizeCliError = (fallback: string, stderr: string | null, stdout: string | null) => {
  const detail = stderr?.trim() || stdout?.trim();
  return detail ? `${fallback}: ${detail}` : fallback;
};

export async function POST(req: Request) {
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

  const safeDuration = Math.max(1, Math.min(15, Math.round(duration)));

  if (process.env.PLAYWRIGHT_MOCK_PIXVERSE === "1") {
    return NextResponse.json({
      videoId: "mock-video-1",
      data: { video_id: "mock-video-1", duration: safeDuration },
    });
  }

  try {
    const { stdout } = await execFileAsync(
      "pixverse",
      [
        "create",
        "video",
        "--prompt",
        prompt,
        "--model",
        "v6",
        "--quality",
        "720p",
        "--aspect-ratio",
        "16:9",
        "--duration",
        String(safeDuration),
        "--no-wait",
        "--json",
      ],
      { maxBuffer: 10 * 1024 * 1024 },
    );

    const data = JSON.parse(stdout);
    const videoId = data?.video_id ?? null;
    if (!videoId) {
      return NextResponse.json(
        { error: "PixVerse CLI returned no video_id", data },
        { status: 502 },
      );
    }

    return NextResponse.json({ videoId, data });
  } catch (e: any) {
    const code = typeof e?.code === "number" ? e.code : null;
    const stderr = typeof e?.stderr === "string" ? e.stderr : null;
    const stdout = typeof e?.stdout === "string" ? e.stdout : null;
    return NextResponse.json(
      { error: summarizeCliError("PixVerse CLI failed", stderr, stdout), code, stderr, stdout },
      { status: 502 },
    );
  }
}
