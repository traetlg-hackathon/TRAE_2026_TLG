export type BattleAction = {
  id: string;
  type: string;
  actor: string;
  description: string;
  timestamp: number;
};

export type StoryScene = {
  id: string;
  title: string;
  actionSummary: string;
  mood: string;
  camera: string;
  intensity: number;
  duration: number;
  prompt: string;
};

export type SampleLog = {
  id: string;
  name: string;
  content: string;
};
