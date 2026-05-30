import { BattleAction, StoryScene } from "@/types/replay";
import { compilePixVersePrompt } from "./compilePixVersePrompt";

export function generateStoryboard(actions: BattleAction[]): StoryScene[] {
  // If no actions, return empty
  if (actions.length === 0) return [];

  // Determine if it's one of our predefined logs based on action IDs
  const isTrapReversal = actions.some(a => a.id.startsWith("tr"));
  const isAncientRevival = actions.some(a => a.id.startsWith("ar"));
  const isCustom = actions.every(
    (a) => !a.id.startsWith("a") && !a.id.startsWith("tr") && !a.id.startsWith("ar"),
  );

  let scenes: StoryScene[] = [];

  if (isTrapReversal) {
    scenes = [
      {
        id: "s1",
        title: "The hidden trap is set",
        sourceActionIds: ["tr1"],
        actionSummary: "Player B prepares a surprise for the coming attack.",
        mood: "dark",
        camera: "close-up",
        intensity: 2,
        duration: 5,
        prompt: "",
      },
      {
        id: "s2",
        title: "Crimson Dragon attacks",
        sourceActionIds: ["tr2"],
        actionSummary: "The Crimson Dragon launches a fierce aerial assault.",
        mood: "cinematic",
        camera: "dolly-in",
        intensity: 4,
        duration: 6,
        prompt: "",
      },
      {
        id: "s3",
        title: "Mirror Force activation",
        sourceActionIds: ["tr3"],
        actionSummary: "The trap is sprung, reflecting the dragon's power.",
        mood: "chaotic",
        camera: "whip-pan",
        intensity: 5,
        duration: 6,
        prompt: "",
      },
      {
        id: "s4",
        title: "Counter spell protection",
        sourceActionIds: ["tr4"],
        actionSummary: "A last-second spell shields the dragon from destruction.",
        mood: "heroic",
        camera: "close-up",
        intensity: 4,
        duration: 7,
        prompt: "",
      },
      {
        id: "s5",
        title: "The finishing blow",
        sourceActionIds: ["tr5"],
        actionSummary: "Crimson Dragon overcomes the defense for the win.",
        mood: "cinematic",
        camera: "dolly-in",
        intensity: 5,
        duration: 7,
        prompt: "",
      },
    ];
  } else if (isAncientRevival) {
    scenes = [
      {
        id: "s1",
        title: "The final draw",
        sourceActionIds: ["ar1"],
        actionSummary: "With 1000 LP left, Player A draws their last hope.",
        mood: "cinematic",
        camera: "close-up",
        intensity: 3,
        duration: 5,
        prompt: "",
      },
      {
        id: "s2",
        title: "Rebirth Gate opens",
        sourceActionIds: ["ar2"],
        actionSummary: "The massive gate creaks open, revealing an ancient power.",
        mood: "dark",
        camera: "overhead",
        intensity: 4,
        duration: 7,
        prompt: "",
      },
      {
        id: "s3",
        title: "Machine Titan revival",
        sourceActionIds: ["ar3"],
        actionSummary: "The Titan awakens, absorbing energy from the past.",
        mood: "heroic",
        camera: "dolly-in",
        intensity: 5,
        duration: 8,
        prompt: "",
      },
      {
        id: "s4",
        title: "All-out barrage",
        sourceActionIds: ["ar4"],
        actionSummary: "The Titan unleashes its full weaponry on the field.",
        mood: "chaotic",
        camera: "whip-pan",
        intensity: 5,
        duration: 6,
        prompt: "",
      },
      {
        id: "s5",
        title: "Total victory",
        sourceActionIds: ["ar5"],
        actionSummary: "The opponent's forces are wiped out in a massive blast.",
        mood: "cinematic",
        camera: "overhead",
        intensity: 4,
        duration: 6,
        prompt: "",
      },
    ];
  } else if (isCustom) {
    const baseDurations = [5, 6, 6, 8, 7];
    const moodByTone = (tone?: string): StoryScene["mood"] => {
      if (/heroic/i.test(tone ?? "")) return "heroic";
      if (/chaotic/i.test(tone ?? "")) return "chaotic";
      if (/dark/i.test(tone ?? "")) return "dark";
      return "cinematic";
    };
    const cameraByAction = (action: BattleAction["action"]): StoryScene["camera"] => {
      if (action === "attack" || action === "damage") return "whip-pan";
      if (action === "summon") return "dolly-in";
      if (action === "activate" || action === "chain") return "close-up";
      return "overhead";
    };
    const intensityByAction = (action: BattleAction["action"]): StoryScene["intensity"] => {
      if (action === "attack" || action === "damage") return 5;
      if (action === "summon" || action === "activate" || action === "chain") return 4;
      return 3;
    };
    const buildSummary = (a: BattleAction) => {
      const objectText = a.objects?.length
        ? ` Key objects: ${a.objects.map((o) => [o.name, o.zone, o.position, o.stats].filter(Boolean).join(" ")).join(", ")}.`
        : "";
      const sceneryText = a.scenery
        ? ` Scenery: ${a.scenery.field}; ${a.scenery.lighting}; camera focuses on ${a.scenery.cameraFocus}; VFX: ${a.scenery.vfx}.`
        : "";
      const impactText = a.impact ? ` Impact: ${a.impact}.` : "";
      const intentText = a.visualIntent ? ` Visual intent: ${a.visualIntent}` : "";
      return `${a.summary}${objectText}${impactText}${sceneryText}${intentText}`;
    };

    scenes = actions.slice(0, 5).map((a, i) => ({
      id: `s${i + 1}`,
      title: a.card ? `${a.action}: ${a.card}` : a.summary.replace(/\.$/, ""),
      sourceActionIds: [a.id],
      actionSummary: buildSummary(a),
      mood: moodByTone(a.scenery?.tone),
      camera: cameraByAction(a.action),
      intensity: intensityByAction(a.action),
      duration: baseDurations[i] ?? 6,
      prompt: "",
    }));

    while (scenes.length < 5) {
      const i = scenes.length;
      const previous = actions[Math.max(0, i - 1)];
      scenes.push({
        id: `s${i + 1}`,
        title: "Battlefield transition",
        sourceActionIds: previous ? [previous.id] : [],
        actionSummary: previous
          ? `The camera tracks the duel arena after ${previous.summary.toLowerCase()} Energy from the last play hangs over the field.`
          : "A brief cinematic transition to establish the duel arena and card zones.",
        mood: "cinematic",
        camera: "overhead",
        intensity: 3,
        duration: baseDurations[i] ?? 6,
        prompt: "",
      });
    }
  } else {
    // Default to main-demo or fallback mapping
    scenes = [
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
  }

  // Compile prompts for each scene
  return scenes.map((scene) => ({
    ...scene,
    prompt: compilePixVersePrompt(scene),
  }));
}
