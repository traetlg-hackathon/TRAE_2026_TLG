import { StoryScene } from "@/types/replay";
import SceneCard from "./SceneCard";

interface StoryboardPanelProps {
  scenes: StoryScene[];
  onUpdateScene: (updatedScene: StoryScene) => void;
}

export default function StoryboardPanel({ scenes, onUpdateScene }: StoryboardPanelProps) {
  if (scenes.length === 0) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 flex items-center justify-center text-zinc-500 italic">
        Select a battle log and click "Generate Storyboard" to see scenes.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Storyboard Editor</h2>
        <span className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-sm border border-zinc-700">
          {scenes.length} Scenes Generated
        </span>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {scenes.map((scene) => (
          <SceneCard key={scene.id} scene={scene} onUpdate={onUpdateScene} />
        ))}
      </div>
    </div>
  );
}
