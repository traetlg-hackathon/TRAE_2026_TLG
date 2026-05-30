import { BattleAction, BattleActionType, BattleObject, BattleScenery } from "@/types/replay";

const NOISE_PATTERNS = [
  /^Viewed\b/i,
  /^Stopped viewing\b/i,
  /^Shuffled hand\b/i,
  /^Shuffled deck\b/i,
  /^Thinking\b/i,
  /^Signaled OK\b/i,
  /^Entered (Draw|Standby|Main Phase 1|Main Phase 2|Battle|End) Phase\b/i,
  /^Finished siding\b/i,
];

const ZONE_PATTERN = "(?:hand|Deck|GY|Extra Deck|Banished|M-\\d|S-\\d|top of deck)";

function stripLineNumber(line: string) {
  return line.replace(/^\s*\d+\s+/, "").trim();
}

function readTimestamp(line: string) {
  const match = line.match(/^\[(\d+:\d{2})\]\s*(.+)$/);
  return match ? { timestamp: match[1], text: match[2].trim() } : { timestamp: undefined, text: line.trim() };
}

function cleanCardName(value: string) {
  return value
    .replace(/^Set\s+/i, "")
    .replace(/^banished\s+/i, "")
    .replace(/\s*\(\d+\/\d+\)\s*/g, "")
    .replace(/^"|"$/g, "")
    .trim();
}

function kindFor(action: BattleActionType, card?: string): BattleObject["kind"] {
  if (!card) return "card";
  if (/token/i.test(card)) return "token";
  if (action === "summon" || action === "attack" || /Dragon|HERO|Alligator|Serpent|Frog|Witch|Raiza|Sorcerer|Stratos|Miko|Zohah|Flogos|Ipiria|Stealthbuster|Commander|Drawhand|Malicious|Cyber/i.test(card)) return "monster";
  if (/Trap|Tribute|Judgment|Call|Tornado|Wind Blast|Return/i.test(card)) return "trap";
  if (/Charity|Storm|Burial|Rain|Metamorphosis|Draw|Army|Sarcophagus|Typhoon/i.test(card)) return "spell";
  return "card";
}

function sceneryFor(action: BattleActionType, text: string, card?: string): BattleScenery {
  if (action === "attack" || action === "damage") {
    return {
      field: "holographic duel arena with monsters clashing across card zones",
      lighting: "strobing battle lights and impact flashes",
      cameraFocus: card ? `impact angle on ${card}` : "impact angle on battlefield damage",
      vfx: "shockwaves, sparks, debris, glowing damage particles",
      tone: "chaotic",
    };
  }

  if (action === "summon") {
    return {
      field: "glowing monster zone on a dark duel arena floor",
      lighting: "summoning circle glow with rising backlight",
      cameraFocus: card ? `hero reveal of ${card}` : "hero reveal of summoned monster",
      vfx: "portal energy, card particles, smoke, aura bloom",
      tone: "heroic",
    };
  }

  if (action === "activate" || action === "chain") {
    return {
      field: "spell and trap zones lighting up around both duelists",
      lighting: /Solemn|Judgment|Graceful/i.test(text) ? "divine white-gold flare" : "high contrast magical glow",
      cameraFocus: card ? `close-up on ${card}` : "close-up on activated card",
      vfx: "sigils, card holograms, energy arcs, quick cuts",
      tone: "cinematic",
    };
  }

  return {
    field: "wide duel arena with visible card zones and graveyard energy",
    lighting: "moody arena spotlights",
    cameraFocus: card ? `tracking shot around ${card}` : "tracking shot across field state",
    vfx: "floating card particles and subtle aura trails",
    tone: "dark",
  };
}

function visualIntentFor(action: BattleActionType, text: string, card?: string) {
  if (action === "attack") return `${card ?? "A monster"} lunges across the duel field with explosive impact energy.`;
  if (action === "damage") return "Life point damage erupts as glowing numbers and shockwaves hit the duelist.";
  if (action === "summon") return `${card ?? "A monster"} materializes from a radiant summoning portal.`;
  if (action === "activate" || action === "chain") return `${card ?? "A card"} flips up and releases cinematic magical energy.`;
  if (action === "set") return `${card ?? "A hidden card"} is placed face-down with ominous glow.`;
  if (action === "move") return `${card ?? "A card"} moves between zones as spectral card trails trace the duel state.`;
  if (action === "draw") return `A dramatic close-up draw reveals ${card ?? "a new card"}.`;
  return text;
}

function scoreAction(action: BattleAction) {
  const text = `${action.summary} ${action.card ?? ""}`;
  let score = 0;
  if (action.action === "summon") score += 9;
  if (action.action === "attack") score += 10;
  if (action.action === "damage") score += 7;
  if (action.action === "activate" || action.action === "chain") score += 8;
  if (action.action === "set") score += 3;
  if (action.action === "move") score += 4;
  if (/Admitted defeat|Return from the Different Dimension|Evil Dragon Ananta|Chaos Sorcerer|Solemn Judgment|Graceful Charity|Snake Rain|Raiza|Disk Commander|Metamorphosis/i.test(text)) score += 6;
  if (/Lost \d+ LP/i.test(text)) score += 3;
  return score;
}

function objectFor(card: string | undefined, action: BattleActionType, text: string): BattleObject[] {
  if (!card) return [];
  const zoneMatch = text.match(new RegExp(`\\b(?:from|to|in)\\s+(${ZONE_PATTERN})(?:\\s|$|\\()`, "i"));
  const positionMatch = text.match(/\((ATK|DEF)\)/i);
  const statsMatch = text.match(/to\s+(\d+\/\?|-?\d+\/\d+)/i);
  return [
    {
      name: cleanCardName(card),
      kind: kindFor(action, card),
      zone: zoneMatch?.[1],
      controller: text.includes("Opponent") ? "Opponent" : "Player",
      position: positionMatch?.[1] as BattleObject["position"] | undefined,
      stats: statsMatch?.[1],
    },
  ];
}

function parseActionText(text: string): { action: BattleActionType; card?: string; impact?: string } | null {
  if (NOISE_PATTERNS.some((p) => p.test(text))) return null;

  let match = text.match(/^Drew\s+(.+)$/i);
  if (match) return { action: "draw", card: cleanCardName(match[1]) };

  match = text.match(/^(?:Normal |Special )?Summoned\s+(.+?)(?:\s+from\s+.+?)?\s+to\s+/i);
  if (match) return { action: "summon", card: cleanCardName(match[1]) };

  match = text.match(/^Summoned a token/i);
  if (match) return { action: "summon", card: "Token" };

  match = text.match(/^Activated\s+(?:Set\s+)?(.+?)(?:\s+from\s+.+?)?\s+(?:in|to)\s+/i);
  if (match) return { action: "activate", card: cleanCardName(match[1]) };

  match = text.match(/^Declared effect of\s+(.+?)(?:\s+in\s+.+)?$/i);
  if (match) return { action: "activate", card: cleanCardName(match[1]) };

  match = text.match(/^Set\s+(.+?)(?:\s+from\s+.+?)?\s+to\s+/i);
  if (match) return { action: "set", card: cleanCardName(match[1]) };

  match = text.match(/^Attacked\s+(.+?)\s+with\s+(.+?)(?:\s+in\s+.+)?$/i);
  if (match) return { action: "attack", card: cleanCardName(match[2]), impact: `Target: ${cleanCardName(match[1])}` };

  match = text.match(/^Attacked directly with\s+(.+?)(?:\s+in\s+.+)?$/i);
  if (match) return { action: "attack", card: cleanCardName(match[1]), impact: "Direct attack" };

  match = text.match(/^Lost\s+(\d+)\s+LP/i);
  if (match) return { action: "damage", card: "Life Points", impact: `${match[1]} LP lost` };

  match = text.match(/^Changed stats of\s+(.+?)\s+in\s+.+?\s+to\s+(.+)$/i);
  if (match) return { action: "damage", card: cleanCardName(match[1]), impact: `Stats changed to ${match[2]}` };

  match = text.match(/^(Sent|Returned|Banished|Added|Removed)\s+(.+?)(?:\s+from\s+.+?|\s+to\s+.+?|$)/i);
  if (match) return { action: "move", card: cleanCardName(match[2]), impact: match[1] };

  if (/Admitted defeat/i.test(text)) return { action: "damage", card: "Duelist", impact: "Admitted defeat" };
  if (/Chose to go first|Accepted|hosted/i.test(text)) return { action: "setup" };

  return null;
}

function createAction(id: number, turn: number, timestamp: string | undefined, text: string): BattleAction | null {
  const parsed = parseActionText(text);
  if (!parsed) return null;

  const summary = text.endsWith(".") ? text : `${text}.`;
  const objects = objectFor(parsed.card, parsed.action, text);
  const scenery = sceneryFor(parsed.action, text, parsed.card);

  return {
    id: `u${id}`,
    turn,
    actor: text.includes("Opponent") ? "Opponent" : "Player",
    card: parsed.card,
    action: parsed.action,
    summary,
    visualIntent: visualIntentFor(parsed.action, text, parsed.card),
    timestamp,
    rawLine: text,
    objects,
    scenery,
    impact: parsed.impact,
  };
}

function parseActionsFromContent(logContent: string): BattleAction[] {
  const lines = logContent
    .split(/\r?\n/)
    .map(stripLineNumber)
    .filter(Boolean);

  if (lines.length === 0) return [];

  let currentTurn = 1;
  let idx = 0;
  const actions: BattleAction[] = [];

  for (const raw of lines) {
    const divider = raw.match(/^-+\(Turn\s+(\d+)\)-+$/i);
    if (divider) {
      currentTurn = Number(divider[1]) || currentTurn;
      continue;
    }

    const proseTurn = raw.match(/^turn\s*(\d+)\s*:?$/i);
    if (proseTurn) {
      currentTurn = Number(proseTurn[1]) || currentTurn;
      continue;
    }

    const { timestamp, text } = readTimestamp(raw);
    const action = createAction(idx + 1, currentTurn, timestamp, text);
    if (!action) continue;
    idx += 1;
    actions.push(action);
  }

  const scored = actions
    .map((action, originalIndex) => ({ action, originalIndex, score: scoreAction(action) }))
    .filter(({ score }) => score >= 5)
    .sort((a, b) => b.score - a.score || a.originalIndex - b.originalIndex)
    .slice(0, 18)
    .sort((a, b) => a.originalIndex - b.originalIndex)
    .map(({ action }, i) => ({ ...action, id: `u${i + 1}` }));

  return scored.length > 0 ? scored : actions.slice(0, 12);
}

export function generateActions(logId: string, logContent: string): BattleAction[] {
  const parsed = parseActionsFromContent(logContent);
  if (parsed.length > 0) return parsed;

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
