'use client';

import React, { useEffect, useRef, useState } from 'react';
import { StoryScene } from '@/types/replay';
import { Pause, Play, SkipBack, SkipForward, Maximize2 } from 'lucide-react';
import Timeline from "./Timeline";
import TimestampComments from "./TimestampComments";
import ShareReplay from "./ShareReplay";
import ExportPrompts from "./ExportPrompts";

const VIDEO_SCENE_DURATION = 10;

type SceneVideoState = {
  url: string | null;
  jobId: string | null;
  state: "idle" | "submitting" | "polling" | "ready" | "error";
  error: string | null;
};

interface ReplayPreviewProps {
  scenes: StoryScene[];
  autoRenderRequestId?: number;
}

export const ReplayPreview: React.FC<ReplayPreviewProps> = ({ scenes, autoRenderRequestId }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBatchRendering, setIsBatchRendering] = useState(false);
  const [batchRenderIndex, setBatchRenderIndex] = useState<number | null>(null);
  const [renderLog, setRenderLog] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const shouldAutoAdvanceRef = useRef(false);
  const [videoByScene, setVideoByScene] = useState<Record<string, SceneVideoState>>({});
  const activeBatchTokenRef = useRef(0);

  const currentScene = scenes[currentSceneIndex] ?? null;
  const currentVideo = currentScene ? videoByScene[currentScene.id] : undefined;
  const currentVideoUrl = currentVideo?.url ?? null;
  const currentVideoJobId = currentVideo?.jobId ?? null;
  const currentVideoState = currentVideo?.state ?? "idle";
  const currentVideoError = currentVideo?.error ?? null;
  const isCurrentSceneRendering = currentVideoState === "submitting" || currentVideoState === "polling";
  const createButtonLabel = isBatchRendering
    ? `Rendering ${batchRenderIndex == null ? 0 : batchRenderIndex + 1}/${scenes.length}…`
    : Object.values(videoByScene).some((video) => video?.url)
      ? "Recreate All Videos"
      : "Create Video";
  const timelineScenes = scenes.map((scene) => ({ ...scene, duration: VIDEO_SCENE_DURATION }));

  const appendRenderLog = (message: string) => {
    setRenderLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const normalizeUrl = (url: unknown) => {
    if (typeof url !== "string") return null;
    const trimmed = url.trim();
    if (!trimmed) return null;
    return trimmed.replace(/^`|`$/g, "").replace(/^"|"$/g, "").trim();
  };

  const generateVideoForScene = async (scene: StoryScene, sceneIndex: number, totalScenes: number, batchToken: number) => {
    const sceneLabel = `Scene ${sceneIndex + 1}/${totalScenes}`;
    appendRenderLog(`${sceneLabel} submitting: ${scene.title}`);

    setVideoByScene((prev) => ({
      ...prev,
      [scene.id]: { url: null, jobId: null, state: "submitting", error: null },
    }));

    const res = await fetch("/api/pixverse/text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: scene.prompt, duration: VIDEO_SCENE_DURATION }),
    });

    const json = await res.json().catch(() => null);
    const videoId = json?.videoId as string | undefined;
    if (!res.ok || !videoId) {
      const error = json?.error ?? "Failed to submit PixVerse job";
      if (activeBatchTokenRef.current !== batchToken) return false;
      setVideoByScene((prev) => ({
        ...prev,
        [scene.id]: { url: null, jobId: null, state: "error", error },
      }));
      appendRenderLog(`${sceneLabel} failed: ${error}`);
      return false;
    }

    if (activeBatchTokenRef.current !== batchToken) return false;
    appendRenderLog(`${sceneLabel} polling PixVerse job ${videoId}`);
    setVideoByScene((prev) => ({
      ...prev,
      [scene.id]: { url: null, jobId: videoId, state: "polling", error: null },
    }));

    const maxAttempts = 30;
    for (let i = 0; i < maxAttempts; i += 1) {
      await new Promise((r) => setTimeout(r, 2000));
      if (activeBatchTokenRef.current !== batchToken) return false;

      const resultRes = await fetch(`/api/pixverse/result/${videoId}`);
      const resultJson = await resultRes.json().catch(() => null);
      const status = resultJson?.status ?? resultJson?.data?.status ?? null;
      const statusCode = resultJson?.statusCode ?? resultJson?.data?.status_code ?? null;
      const url = normalizeUrl(resultJson?.videoUrl ?? resultJson?.data?.video_url ?? null);
      const statusNormalized = typeof status === "string" ? status.toLowerCase() : null;

      if (!resultRes.ok) {
        const error = resultJson?.error ?? "Failed to fetch PixVerse result";
        if (activeBatchTokenRef.current !== batchToken) return false;
        setVideoByScene((prev) => ({
          ...prev,
          [scene.id]: { url: null, jobId: videoId, state: "error", error },
        }));
        appendRenderLog(`${sceneLabel} failed: ${error}`);
        return false;
      }

      if ((statusNormalized === "completed" || statusCode === 1) && url) {
        if (activeBatchTokenRef.current !== batchToken) return false;
        setVideoByScene((prev) => ({
          ...prev,
          [scene.id]: { url, jobId: videoId, state: "ready", error: null },
        }));
        appendRenderLog(`${sceneLabel} ready: ${url}`);
        return true;
      }

      if (statusNormalized === "failed" || statusNormalized === "not_approved") {
        if (activeBatchTokenRef.current !== batchToken) return false;
        setVideoByScene((prev) => ({
          ...prev,
          [scene.id]: { url: null, jobId: videoId, state: "error", error: "PixVerse job failed" },
        }));
        appendRenderLog(`${sceneLabel} failed: PixVerse job failed`);
        return false;
      }
    }

    if (activeBatchTokenRef.current !== batchToken) return false;
    setVideoByScene((prev) => ({
      ...prev,
      [scene.id]: { url: null, jobId: videoId, state: "error", error: "PixVerse job timeout" },
    }));
    appendRenderLog(`${sceneLabel} failed: PixVerse job timeout`);
    return false;
  };

  const handleCreateAllVideos = async () => {
    if (scenes.length === 0 || isBatchRendering) return;

    const batchToken = activeBatchTokenRef.current + 1;
    activeBatchTokenRef.current = batchToken;
    videoRef.current?.pause();
    setIsPlaying(false);
    setCurrentSceneIndex(0);
    setIsBatchRendering(true);
    setBatchRenderIndex(0);
    setRenderLog([]);
    appendRenderLog(`Queued ${scenes.length} scenes at ${VIDEO_SCENE_DURATION}s each`);

    for (let i = 0; i < scenes.length; i += 1) {
      if (activeBatchTokenRef.current !== batchToken) break;
      setBatchRenderIndex(i);
      setCurrentSceneIndex(i);
      await generateVideoForScene(scenes[i], i, scenes.length, batchToken);
    }

    if (activeBatchTokenRef.current === batchToken) {
      setIsBatchRendering(false);
      setBatchRenderIndex(null);
      setCurrentSceneIndex(0);
      appendRenderLog("All scenes rendered");
    }
  };

  const goToScene = (index: number, options?: { keepAutoPlay?: boolean }) => {
    const nextIndex = Math.max(0, Math.min(index, scenes.length - 1));
    videoRef.current?.pause();
    setIsPlaying(false);
    if (!options?.keepAutoPlay) shouldAutoAdvanceRef.current = false;
    setCurrentSceneIndex(nextIndex);
  };

  const playCurrentVideo = async () => {
    const video = videoRef.current;
    if (!video) return;
    shouldAutoAdvanceRef.current = true;
    await video.play().catch(() => setIsPlaying(false));
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (!shouldAutoAdvanceRef.current) return;

    const nextIndex = currentSceneIndex + 1;
    const nextScene = scenes[nextIndex];
    if (!nextScene) {
      shouldAutoAdvanceRef.current = false;
      return;
    }

    setCurrentSceneIndex(nextIndex);
  };

  const handlePlayPause = async () => {
    if (isBatchRendering || isCurrentSceneRendering) return;
    if (!currentVideoUrl) {
      await handleCreateAllVideos();
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      await playCurrentVideo();
    } else {
      shouldAutoAdvanceRef.current = false;
      video.pause();
    }
  };

  useEffect(() => {
    if (!shouldAutoAdvanceRef.current) return;
    if (!currentVideoUrl) return;
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => setIsPlaying(false));
  }, [currentSceneIndex, currentVideoUrl]);

  const handleFullscreen = async () => {
    const target = videoRef.current ?? previewRef.current;
    await target?.requestFullscreen?.();
  };

  useEffect(() => {
    if (!autoRenderRequestId) return;
    if (scenes.length === 0) return;
    handleCreateAllVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRenderRequestId]);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-black border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        <div ref={previewRef} className="aspect-video bg-neutral-900 relative flex items-center justify-center group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {currentVideoUrl ? (
            <div className="w-full h-full">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src={currentVideoUrl}
                controls
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={handleVideoEnded}
              />
            </div>
          ) : scenes.length > 0 ? (
            <div className="text-center flex flex-col items-center px-6">
              <button
                onClick={handleCreateAllVideos}
                disabled={isBatchRendering}
                aria-label="Create Video"
                className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform shadow-xl shadow-blue-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </button>
              <p className="text-white/80 font-medium">Scene {currentSceneIndex + 1} / {scenes.length}: {currentScene?.title}</p>
              <p className="text-white/40 text-sm mt-1 mb-4">Create Video renders all scenes at {VIDEO_SCENE_DURATION}s each</p>
              <button
                onClick={handleCreateAllVideos}
                disabled={isBatchRendering}
                className="px-6 py-3 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-blue-600/30"
              >
                {createButtonLabel}
              </button>
            </div>
          ) : (
            <div className="text-center p-8">
              <p className="text-white/20 text-sm italic">Generate a storyboard to see the replay preview</p>
            </div>
          )}

          {scenes.length > 0 && (
            <>
              <button
                onClick={() => goToScene(currentSceneIndex - 1)}
                disabled={currentSceneIndex === 0}
                aria-label="Preview previous scene"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 rounded-full text-white/80 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={handlePlayPause}
                disabled={isBatchRendering || isCurrentSceneRendering}
                aria-label={currentVideoUrl ? (isPlaying ? "Preview pause video" : "Preview play video") : "Preview create video"}
                className="absolute bottom-4 left-4 p-3 bg-black/60 rounded-full text-white/80 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
              </button>
              <button
                onClick={() => goToScene(currentSceneIndex + 1)}
                disabled={currentSceneIndex >= scenes.length - 1}
                aria-label="Preview next scene"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 rounded-full text-white/80 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 right-4 opacity-100 transition-opacity">
            <button
              onClick={handleFullscreen}
              aria-label="Fullscreen preview"
              className="p-2 bg-black/60 rounded-lg text-white/80 hover:text-white transition-colors"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 bg-neutral-950/50">
          {currentScene && (
            <div className="mb-4">
              <p className="text-white/80 font-medium">Scene {currentSceneIndex + 1} / {scenes.length}: {currentScene.title}</p>
              <p className="text-white/40 text-xs">PixVerse render duration: {VIDEO_SCENE_DURATION}s per scene</p>
            </div>
          )}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <button
                onClick={() => goToScene(currentSceneIndex - 1)}
                disabled={currentSceneIndex === 0}
                aria-label="Previous scene"
                className="text-white/40 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <SkipBack className="w-6 h-6" />
              </button>
              <button
                onClick={handlePlayPause}
                disabled={!currentScene || isBatchRendering || isCurrentSceneRendering}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-black" /> : <Play className="w-6 h-6 fill-black ml-1" />}
              </button>
              <button
                onClick={() => goToScene(currentSceneIndex + 1)}
                disabled={currentSceneIndex >= scenes.length - 1}
                aria-label="Next scene"
                className="text-white/40 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <SkipForward className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleCreateAllVideos}
                disabled={scenes.length === 0 || isBatchRendering}
                className="px-4 py-2 rounded-lg text-sm font-bold bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {createButtonLabel}
              </button>
              <ShareReplay />
              <ExportPrompts scenes={scenes} />
              <div className="text-sm font-mono text-white/60">
                Scene {currentSceneIndex + 1}/{scenes.length || 0} • {VIDEO_SCENE_DURATION}s each
              </div>
            </div>
          </div>
          {(currentVideoError || currentVideoJobId) && (
            <div className="mb-4 text-xs">
              {currentVideoJobId && (
                <div className="text-white/50">
                  PixVerse create video job: <span className="font-mono text-white/70">{currentVideoJobId}</span>
                </div>
              )}
              {currentVideoUrl && (
                <a
                  href={currentVideoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-300 hover:text-blue-200 underline break-all"
                >
                  {currentVideoUrl}
                </a>
              )}
              {currentVideoError && <div className="text-red-400">{currentVideoError}</div>}
              {!currentVideoError && currentVideoState === "polling" && (
                <div className="text-white/40">Waiting for PixVerse result…</div>
              )}
            </div>
          )}

          {renderLog.length > 0 && (
            <div className="mb-4 rounded-xl border border-white/10 bg-black/40 p-3">
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-white/60">Render Log</div>
              <div className="max-h-40 overflow-auto font-mono text-[11px] text-white/50 space-y-1">
                {renderLog.map((entry, index) => (
                  <div key={`${entry}-${index}`}>{entry}</div>
                ))}
              </div>
            </div>
          )}

          <Timeline
            scenes={timelineScenes}
            currentIndex={currentSceneIndex}
            onSelect={goToScene}
            totalDuration={scenes.length * VIDEO_SCENE_DURATION}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12">
          <TimestampComments totalDuration={scenes.length * VIDEO_SCENE_DURATION} />
        </div>
      </div>
    </div>
  );
};
