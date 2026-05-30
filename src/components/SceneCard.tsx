import { StoryScene } from "@/types/replay";
import { Camera, Check, Clock, Copy, Palette, Zap } from "lucide-react";
import { useState } from "react";

interface SceneCardProps {
  scene: StoryScene;
  onUpdate: (updatedScene: StoryScene) => void;
  isSelected?: boolean;
  onClick?: () => void;
}

export function SceneCard({ scene, isSelected = false, onClick }: SceneCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    navigator.clipboard.writeText(scene.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-2xl border p-5 transition-all relative overflow-hidden group ${
        isSelected
          ? "border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/20 shadow-lg shadow-blue-950/30"
          : "border-zinc-800 bg-zinc-900/60 hover:border-blue-500/40 hover:bg-zinc-900"
      }`}
    >
      <div className={`absolute left-0 top-0 h-full w-1 ${isSelected ? "bg-blue-500" : "bg-zinc-700 group-hover:bg-blue-500/60"}`} />

      <div className="flex flex-col xl:flex-row xl:items-start gap-5 pl-2">
        <div className="flex items-center gap-3 xl:w-28 xl:shrink-0">
          <div className={`rounded-xl border px-3 py-2 text-center ${isSelected ? "border-blue-400/40 bg-blue-500/15" : "border-zinc-700 bg-zinc-800/70"}`}>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Scene</div>
            <div className="text-2xl font-black text-white leading-none">{scene.id.replace("s", "")}</div>
          </div>
          <div className="xl:hidden flex items-center gap-1.5 rounded-lg border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-blue-300">
            <Clock className="h-3.5 w-3.5" />
            <span className="text-xs font-bold font-mono">10s</span>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-xl font-bold text-white leading-snug break-words">{scene.title}</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-6 break-words">{scene.actionSummary}</p>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                copied
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700"
              }`}
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied" : "Prompt"}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-black/30 px-3 py-1 text-[11px] font-semibold text-zinc-300">
              <Palette className="h-3 w-3 text-blue-400" />
              {scene.mood}
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-black/30 px-3 py-1 text-[11px] font-semibold text-zinc-300">
              <Camera className="h-3 w-3 text-blue-400" />
              {scene.camera}
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-black/30 px-3 py-1 text-[11px] font-semibold text-zinc-300">
              <Zap className="h-3 w-3 text-blue-400" />
              intensity {scene.intensity}/5
            </div>
            <div className="hidden xl:inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-bold text-blue-300">
              <Clock className="h-3 w-3" />
              10s clip
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
