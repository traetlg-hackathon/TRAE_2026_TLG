import { StoryScene } from "@/types/replay";

export function compilePixVersePrompt(scene: StoryScene): string {
  const { actionSummary, mood, camera, intensity, duration } = scene;

  return `A cinematic trading card battle arena during a decisive turn. ${actionSummary} Mood: ${mood}. Camera: ${camera}. Intensity: ${intensity}/5. Duration: ${duration} seconds. Dramatic lighting, glowing card particles, high contrast shadows, anime-inspired fantasy VFX, no text overlay, high quality, 4k.`;
}
