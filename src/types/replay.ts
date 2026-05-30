export type BattleActionType =
  | "setup"
  | "activate"
  | "chain"
  | "summon"
  | "attack"
  | "damage"
  | "draw"
  | "set"
  | "move";

export type BattleObject = {
  name: string;
  kind: "card" | "monster" | "spell" | "trap" | "token" | "player" | "zone";
  zone?: string;
  controller?: string;
  position?: "ATK" | "DEF" | "face-down" | "unknown";
  stats?: string;
};

export type BattleScenery = {
  field: string;
  lighting: string;
  cameraFocus: string;
  vfx: string;
  tone: string;
};

export type BattleAction = {
  id: string;
  turn: number;
  actor: string;
  card?: string;
  action: BattleActionType;
  summary: string;
  visualIntent: string;
  timestamp?: string;
  rawLine?: string;
  objects?: BattleObject[];
  scenery?: BattleScenery;
  impact?: string;
};

export type StoryScene = {
  id: string;
  title: string;
  sourceActionIds: string[];
  actionSummary: string;
  mood: "dark" | "heroic" | "chaotic" | "cinematic";
  camera: "close-up" | "dolly-in" | "overhead" | "whip-pan";
  intensity: 1 | 2 | 3 | 4 | 5;
  duration: number;
  prompt: string;
};

export type ReplayComment = {
  id: string;
  timestamp: number;
  text: string;
};
