import { StoryScene } from "@/types/replay";
import { compilePixVersePrompt } from "@/lib/compilePixVersePrompt";

interface SceneCardProps {
  scene: StoryScene;
  onUpdate: (updatedScene: StoryScene) => void;
}

export default function SceneCard({ scene, onUpdate }: SceneCardProps) {
  const handleChange = (field: keyof StoryScene, value: string | number) => {
    const updatedScene = { ...scene, [field]: value };
    updatedScene.prompt = compilePixVersePrompt(updatedScene);
    onUpdate(updatedScene);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-6 hover:border-zinc-700 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-white">{scene.title}</h3>
          <p className="text-sm text-zinc-400">{scene.actionSummary}</p>
        </div>
        <div className="bg-zinc-800 px-3 py-1 rounded text-xs font-mono text-zinc-300">
          {scene.duration}s
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Mood</label>
          <select
            value={scene.mood}
            onChange={(e) => handleChange("mood", e.target.value)}
            className="bg-zinc-800 border border-zinc-700 text-white rounded p-2 text-sm outline-none"
          >
            <option value="dark">Dark</option>
            <option value="heroic">Heroic</option>
            <option value="chaotic">Chaotic</option>
            <option value="cinematic">Cinematic</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Camera</label>
          <select
            value={scene.camera}
            onChange={(e) => handleChange("camera", e.target.value)}
            className="bg-zinc-800 border border-zinc-700 text-white rounded p-2 text-sm outline-none"
          >
            <option value="close-up">Close-up</option>
            <option value="dolly-in">Dolly-in</option>
            <option value="overhead">Overhead</option>
            <option value="whip-pan">Whip-pan</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Intensity</label>
          <input
            type="range"
            min="1"
            max="5"
            value={scene.intensity}
            onChange={(e) => handleChange("intensity", parseInt(e.target.value))}
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-[10px] text-zinc-600 px-1">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Duration (s)</label>
          <input
            type="number"
            min="1"
            max="15"
            value={scene.duration}
            onChange={(e) => handleChange("duration", parseInt(e.target.value))}
            className="bg-zinc-800 border border-zinc-700 text-white rounded p-2 text-sm outline-none"
          />
        </div>
      </div>

      <div className="bg-black border border-zinc-800 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider">PixVerse Prompt</label>
          <button 
            onClick={() => navigator.clipboard.writeText(scene.prompt)}
            className="text-[10px] text-blue-400 hover:text-blue-300 font-bold uppercase"
          >
            Copy
          </button>
        </div>
        <p className="text-xs text-zinc-300 font-mono leading-relaxed">{scene.prompt}</p>
      </div>
    </div>
  );
}
