import { StoryScene } from "@/types/replay";
import { compilePixVersePrompt } from "@/lib/compilePixVersePrompt";
import { Camera, Zap, Clock, Palette, Copy, Check } from "lucide-react";
import { useState } from "react";

interface SceneCardProps {
  scene: StoryScene;
  onUpdate: (updatedScene: StoryScene) => void;
  isSelected?: boolean;
  onClick?: () => void;
}

export function SceneCard({ scene, onUpdate, isSelected = false, onClick }: SceneCardProps) {
  const [copied, setCopied] = useState(false);

  const handleChange = (field: keyof StoryScene, value: string | number) => {
    const updatedScene = { ...scene, [field]: value };
    updatedScene.prompt = compilePixVersePrompt(updatedScene);
    onUpdate(updatedScene);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(scene.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      onClick={onClick}
      className={`bg-zinc-900/50 border rounded-2xl p-6 flex flex-col gap-6 hover:border-blue-500/30 transition-all group relative overflow-hidden cursor-pointer ${
        isSelected ? "border-blue-500 ring-2 ring-blue-500/20" : "border-zinc-800"
      }`}
    >
      <div className={`absolute top-0 left-0 w-1 h-full transition-opacity ${isSelected ? "bg-blue-600 opacity-100" : "bg-blue-600/50 opacity-0 group-hover:opacity-100"}`} />
      
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded uppercase tracking-wider border border-zinc-700">
              Scene {scene.id.replace('s', '')}
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">{scene.title}</h3>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">{scene.actionSummary}</p>
        </div>
        <div className="flex items-center gap-1.5 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20 text-blue-400">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-xs font-bold font-mono">{scene.duration}s</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex flex-col gap-2.5">
          <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest flex items-center gap-2">
            <Palette className="w-3 h-3 text-blue-500" />
            Visual Mood
          </label>
          <select
            value={scene.mood}
            onChange={(e) => handleChange("mood", e.target.value)}
            className="bg-zinc-800/50 border border-zinc-700 text-zinc-200 rounded-xl p-2.5 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:bg-zinc-800"
          >
            <option value="dark">Dark</option>
            <option value="heroic">Heroic</option>
            <option value="chaotic">Chaotic</option>
            <option value="cinematic">Cinematic</option>
          </select>
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest flex items-center gap-2">
            <Camera className="w-3 h-3 text-blue-500" />
            Camera Move
          </label>
          <select
            value={scene.camera}
            onChange={(e) => handleChange("camera", e.target.value)}
            className="bg-zinc-800/50 border border-zinc-700 text-zinc-200 rounded-xl p-2.5 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:bg-zinc-800"
          >
            <option value="close-up">Close-up</option>
            <option value="dolly-in">Dolly-in</option>
            <option value="overhead">Overhead</option>
            <option value="whip-pan">Whip-pan</option>
          </select>
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest flex items-center gap-2">
            <Zap className="w-3 h-3 text-blue-500" />
            Intensity
          </label>
          <div className="flex flex-col gap-2 mt-1">
            <input
              type="range"
              min="1"
              max="5"
              value={scene.intensity}
              onChange={(e) => handleChange("intensity", parseInt(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[8px] font-bold text-zinc-600 px-0.5">
              <span>LOW</span>
              <span>MED</span>
              <span>MAX</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest flex items-center gap-2">
            <Clock className="w-3 h-3 text-blue-500" />
            Duration
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="1"
              max="15"
              value={scene.duration}
              onChange={(e) => handleChange("duration", parseInt(e.target.value))}
              className="bg-zinc-800/50 border border-zinc-700 text-zinc-200 rounded-xl p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/50 transition-all hover:bg-zinc-800 w-full text-center"
            />
            <span className="text-[10px] font-bold text-zinc-600">SEC</span>
          </div>
        </div>
      </div>

      <div className="bg-black/40 border border-zinc-800/50 rounded-xl p-4 group/prompt transition-all hover:border-blue-500/20">
        <div className="flex justify-between items-center mb-3">
          <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-blue-500" />
            PixVerse AI Prompt
          </label>
          <button 
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${
              copied 
                ? "bg-green-500/10 text-green-400" 
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
            }`}
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? "Copied" : "Copy Prompt"}
          </button>
        </div>
        <p className="text-[11px] text-zinc-400 font-mono leading-relaxed bg-zinc-900/30 p-3 rounded-lg border border-zinc-800/30 group-hover/prompt:text-zinc-200 transition-colors italic">
          "{scene.prompt}"
        </p>
      </div>
    </div>
  );
}
