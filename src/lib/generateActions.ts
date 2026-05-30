import { BattleAction } from "@/types/replay";

export function generateActions(logId: string): BattleAction[] {
  // For hackathon reliability, return predefined actions based on logId
  if (logId === "main-demo") {
    return [
      {
        id: "a1",
        turn: 4,
        actor: "Player A",
        card: "Dark Hole",
        action: "activate",
        summary: "Player A activates Dark Hole to wipe the field.",
        visualIntent: "Dark energy swirling and consuming everything on the field.",
      },
      {
        id: "a2",
        turn: 4,
        actor: "Player B",
        card: "Solemn Judgment",
        action: "chain",
        summary: "Player B chains Solemn Judgment to negate Dark Hole.",
        visualIntent: "A divine light descending to counter the dark energy.",
      },
      {
        id: "a3",
        turn: 4,
        actor: "Player A",
        card: "Blue-Eyes White Dragon",
        action: "summon",
        summary: "Player A summons Blue-Eyes White Dragon from the graveyard.",
        visualIntent: "A massive white dragon emerging from a glowing portal.",
      },
      {
        id: "a4",
        turn: 4,
        actor: "Player A",
        card: "Blue-Eyes White Dragon",
        action: "attack",
        summary: "Blue-Eyes attacks directly for 3000 damage.",
        visualIntent: "The dragon firing a powerful burst of energy.",
      },
      {
        id: "a5",
        turn: 4,
        actor: "Player B",
        action: "damage",
        summary: "Player B is reduced to 500 LP.",
        visualIntent: "The impact of the attack causing an explosion near Player B.",
      },
    ];
  }

  // Fallback for other logs (simplified)
  return [
    {
      id: "f1",
      turn: 1,
      actor: "System",
      action: "setup",
      summary: "Battle begins.",
      visualIntent: "Wide shot of the arena.",
    },
  ];
}
