import { StoryScene } from "@/types/replay";
import { Play, Scissors, Layers } from "lucide-react";

interface TimelineProps {
  scenes: StoryScene[];
  currentIndex: number;
  onSelect: (index: number) => void;
  totalDuration: number;
}

export default function Timeline({ scenes, currentIndex, onSelect, totalDuration }: TimelineProps) {
  return (
    <div className="flex flex-col gap-4 bg-black/40 p-4 rounded-2xl border border-zinc-800/50">
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            <Layers className="w-3 h-3 text-blue-500" />
            Video Track 01
          </div>
          <div className="h-4 w-px bg-zinc-800" />
          <div className="flex items-center gap-2 text-[10px] font-bold text-blue-400 font-mono">
            <Play className="w-3 h-3 fill-current" />
            {scenes[currentIndex]?.duration}s / {totalDuration}s
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Scissors className="w-3 h-3 text-zinc-600 hover:text-zinc-400 cursor-pointer transition-colors" />
        </div>
      </div>
      
      <div className="relative group">
        {/* Time markers */}
        <div className="absolute -top-1 left-0 w-full flex justify-between px-0.5 pointer-events-none">
          {Array.from({ length: Math.ceil(totalDuration / 5) + 1 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-px h-1.5 bg-zinc-700" />
              <span className="text-[8px] font-mono text-zinc-600">{(i * 5).toString().padStart(2, '0')}:00</span>
            </div>
          ))}
        </div>

        <div className="h-14 flex gap-1 bg-zinc-900/80 rounded-xl p-1.5 mt-4 border border-zinc-800 shadow-inner relative overflow-hidden">
          {scenes.map((scene, index) => {
            const widthPercent = (scene.duration / totalDuration) * 100;
            const isActive = index === currentIndex;
            
            return (
              <button
                key={scene.id}
                onClick={() => onSelect(index)}
                style={{ width: `${widthPercent}%` }}
                className={`h-full rounded-lg transition-all relative group/clip flex flex-col items-center justify-center overflow-hidden ${
                  isActive 
                    ? "bg-blue-600 shadow-lg shadow-blue-500/20 ring-2 ring-blue-400 ring-inset" 
                    : "bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/50"
                }`}
              >
                {/* Visual texture for the clip */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
                
                <span className={`text-[10px] font-black z-10 ${isActive ? "text-white" : "text-zinc-500 group-hover/clip:text-zinc-300"}`}>
                  {index + 1}
                </span>
                
                {isActive && (
                  <div className="absolute bottom-1 w-1/3 h-0.5 bg-white/40 rounded-full" />
                )}
                
                {/* Hover Tooltip */}
                <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 hidden group-hover/clip:block z-30">
                  <div className="bg-zinc-900 border border-zinc-700 text-white text-[10px] py-1.5 px-3 rounded-lg whitespace-nowrap shadow-2xl flex flex-col items-center gap-0.5">
                    <span className="font-bold">{scene.title}</span>
                    <span className="text-zinc-500 font-mono text-[8px]">{scene.duration}.00s</span>
                  </div>
                  <div className="w-2 h-2 bg-zinc-900 border-r border-b border-zinc-700 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                </div>
              </button>
            );
          })}

          {/* Playhead Mock */}
          <div className="absolute top-0 bottom-0 w-px bg-white/20 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
