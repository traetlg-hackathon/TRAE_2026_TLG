import { BattleAction, StoryScene } from "@/types/replay";
import { compilePixVersePrompt } from "./compilePixVersePrompt";

export function generateStoryboard(actions: BattleAction[]): StoryScene[] {
  // Map actions to 5 scenes as defined in context
  const scenes: StoryScene[] = [
    {
      id: "s1",
      title: "Board tension before the reversal",
      sourceActionIds: ["a1"],
      actionSummary: "The field is tense as Player A prepares a major move.",
      mood: "dark",
      camera: "overhead",
      intensity: 3,
      duration: 5,
      prompt: "",
    },
    {
      id: "s2",
      title: "Dark Hole activation",
      sourceActionIds: ["a1"],
      actionSummary: "Dark Hole is activated, dark energy starts to consume the field.",
      mood: "chaotic",
      camera: "dolly-in",
      intensity: 5,
      duration: 6,
      prompt: "",
    },
    {
      id: "s3",
      title: "Solemn Judgment chain negate",
      sourceActionIds: ["a2"],
      actionSummary: "Divine light strikes down to negate the dark energy.",
      mood: "heroic",
      camera: "close-up",
      intensity: 4,
      duration: 6,
      prompt: "",
    },
    {
      id: "s4",
      title: "Blue-Eyes revival summon",
      sourceActionIds: ["a3"],
      actionSummary: "Blue-Eyes White Dragon rises majestically from the graveyard.",
      mood: "cinematic",
      camera: "whip-pan",
      intensity: 5,
      duration: 8,
      prompt: "",
    },
    {
      id: "s5",
      title: "Final direct attack",
      sourceActionIds: ["a4", "a5"],
      actionSummary: "Blue-Eyes delivers the finishing blow to Player B.",
      mood: "cinematic",
      camera: "dolly-in",
      intensity: 5,
      duration: 7,
      prompt: "",
    },
  ];

  // Compile prompts for each scene
  return scenes.map((scene) => ({
    ...scene,
    prompt: compilePixVersePrompt(scene),
  }));
}
