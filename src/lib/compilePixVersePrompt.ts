import { StoryScene } from "@/types/replay";

export function compilePixVersePrompt(scene: StoryScene): string {
  const { actionSummary, mood, camera, intensity, duration } = scene;

  const moodDescriptions = {
    dark: "ominous shadows, high contrast, moody lighting",
    heroic: "bright triumphant lighting, epic scale, golden hour glow",
    chaotic: "dynamic particle effects, flickering lights, intense energy",
    cinematic: "professional film look, anamorphic lens flares, soft bokeh",
  };

  const cameraDescriptions = {
    "close-up": "extreme close-up shot, focusing on intricate details",
    "dolly-in": "smooth dolly-in movement, increasing tension",
    overhead: "bird's eye view, wide shot of the entire battlefield",
    "whip-pan": "fast whip-pan transition, high energy motion",
  };

  return `A high-end cinematic trading card battle scene. ${actionSummary} Style: ${moodDescriptions[mood]}. Camera: ${cameraDescriptions[camera]}. Intensity: ${intensity}/5. Duration: ${duration}s. Visuals: Dramatic lighting, glowing card particles, high contrast shadows, anime-inspired fantasy VFX, no text overlay, 4k resolution, unreal engine 5 render style.`;
}
