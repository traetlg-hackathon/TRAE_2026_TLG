import { BattleAction, StoryScene } from "@/types";

export const SAMPLE_LOGS = [
  {
    id: "log-1",
    name: "Blue-Eyes vs Dark Magician",
    content: "Player A summons Blue-Eyes White Dragon.\nPlayer B activates Dark Magic Attack.\nBlue-Eyes is destroyed.\nPlayer B wins."
  },
  {
    id: "log-2",
    name: "Exodia Finish",
    content: "Player A draws the last piece of Exodia.\nExodia the Forbidden One is summoned.\nPlayer A wins the duel immediately."
  }
];

export function generateActions(logContent: string): BattleAction[] {
  // Mock logic to split log into actions
  return logContent.split("\n").filter(line => line.trim()).map((line, index) => ({
    id: `action-${index}`,
    type: "ACTION",
    actor: line.split(" ")[0],
    description: line,
    timestamp: index * 1000
  }));
}

export function generateStoryboard(actions: BattleAction[]): StoryScene[] {
  // Mock logic to turn actions into scenes
  return actions.map((action, index) => ({
    id: `scene-${index}`,
    title: `Scene ${index + 1}: ${action.actor}'s Move`,
    actionSummary: action.description,
    mood: "Dramatic",
    camera: "Medium Shot",
    intensity: 7,
    duration: 3,
    prompt: compilePixVersePrompt({
      id: `scene-${index}`,
      title: `Scene ${index + 1}`,
      actionSummary: action.description,
      mood: "Dramatic",
      camera: "Medium Shot",
      intensity: 7,
      duration: 3,
      prompt: ""
    })
  }));
}

export function compilePixVersePrompt(scene: StoryScene): string {
  return `Cinematic TCG duel, ${scene.actionSummary}, ${scene.mood} lighting, ${scene.camera}, high intensity ${scene.intensity}/10, hyper-realistic, 4k.`;
}
