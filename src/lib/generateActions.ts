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

  if (logId === "trap-reversal") {
    return [
      {
        id: "tr1",
        turn: 10,
        actor: "Player B",
        action: "setup",
        summary: "Player B sets a hidden trap and ends their turn.",
        visualIntent: "A mysterious card placed face-down on the field, glowing faintly.",
      },
      {
        id: "tr2",
        turn: 11,
        actor: "Player A",
        card: "Crimson Dragon",
        action: "attack",
        summary: "Player A declares an attack with Crimson Dragon.",
        visualIntent: "A red dragon breathing fire, diving towards the opponent.",
      },
      {
        id: "tr3",
        turn: 11,
        actor: "Player B",
        card: "Mirror Force",
        action: "activate",
        summary: "Player B reveals Mirror Force to destroy the attacking monster.",
        visualIntent: "A shimmering shield reflecting the dragon's attack.",
      },
      {
        id: "tr4",
        turn: 11,
        actor: "Player A",
        action: "activate",
        summary: "Player A activates a counter spell to protect Crimson Dragon.",
        visualIntent: "A protective barrier forming around the dragon.",
      },
      {
        id: "tr5",
        turn: 11,
        actor: "Player A",
        card: "Crimson Dragon",
        action: "damage",
        summary: "Crimson Dragon lands the final attack.",
        visualIntent: "The dragon breaking through and striking the opponent.",
      },
    ];
  }

  if (logId === "ancient-revival") {
    return [
      {
        id: "ar1",
        turn: 7,
        actor: "Player A",
        action: "setup",
        summary: "Player A has 1000 LP left and no monsters. Draws the final card.",
        visualIntent: "Extreme close-up on Player A's determined face as they draw.",
      },
      {
        id: "ar2",
        turn: 7,
        actor: "Player A",
        card: "Rebirth Gate",
        action: "activate",
        summary: "Player A activates Rebirth Gate to revive an ancient machine titan.",
        visualIntent: "A massive metallic gate opening, steam and gears turning.",
      },
      {
        id: "ar3",
        turn: 7,
        actor: "Player A",
        card: "Ancient Machine Titan",
        action: "summon",
        summary: "The titan absorbs energy from three destroyed cards.",
        visualIntent: "Three cards dissolving into light, fueling a giant robot.",
      },
      {
        id: "ar4",
        turn: 7,
        actor: "Player A",
        card: "Ancient Machine Titan",
        action: "attack",
        summary: "Player A attacks all enemy units.",
        visualIntent: "The titan firing beams from multiple cannons.",
      },
      {
        id: "ar5",
        turn: 7,
        actor: "Player A",
        action: "damage",
        summary: "Player A wins the duel.",
        visualIntent: "A massive explosion as the opponent's field is cleared.",
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
