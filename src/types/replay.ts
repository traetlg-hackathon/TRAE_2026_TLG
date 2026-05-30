export type BattleActionType =
  | "setup"
  | "activate"
  | "chain"
  | "summon"
  | "attack"
  | "damage";

export type BattleAction = {
  id: string;
  turn: number;
  actor: string;
  card?: string;
  action: BattleActionType;
  summary: string;
  visualIntent: string;
};
a
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
