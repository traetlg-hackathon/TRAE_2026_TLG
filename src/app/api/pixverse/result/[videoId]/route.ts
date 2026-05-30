import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const summarizeCliError = (fallback: string, stderr: string | null, stdout: string | null) => {
  const detail = stderr?.trim() || stdout?.trim();
  return detail ? `${fallback}: ${detail}` : fallback;
};

export async function GET(
  _req: Request,
  { params }: { params: { videoId: string } },
) {
  const videoId = params.videoId;
  if (!videoId) {
    return NextResponse.json({ error: "Missing videoId" }, { status: 400 });
  }

  if (process.env.PLAYWRIGHT_MOCK_PIXVERSE === "1") {
    const videoUrl = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
    return NextResponse.json({
      data: { status: "completed", status_code: 1, video_url: videoUrl },
      status: "completed",
      statusCode: 1,
      videoUrl,
    });
  }

  try {
    const { stdout } = await execFileAsync(
      "pixverse",
      ["task", "status", videoId, "--json"],
      { maxBuffer: 10 * 1024 * 1024 },
    );
    const data = JSON.parse(stdout);
    const status = data?.status ?? null;
    const statusCode = data?.status_code ?? null;
    const videoUrl = data?.video_url ?? null;
    return NextResponse.json({ data, status, statusCode, videoUrl });
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
