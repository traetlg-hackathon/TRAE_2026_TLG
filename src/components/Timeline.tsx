import { StoryScene } from "@/types/replay";

interface TimelineProps {
  scenes: StoryScene[];
  currentIndex: number;
  onSelect: (index: number) => void;
  totalDuration: number;
}

export default function Timeline({ scenes, currentIndex, onSelect, totalDuration }: TimelineProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center text-xs text-zinc-500 font-mono">
        <span>0:00</span>
        <span>Total Duration: {totalDuration}s</span>
      </div>
      
      <div className="h-12 flex gap-1 bg-zinc-800 rounded-lg p-1 overflow-hidden">
        {scenes.map((scene, index) => {
          const widthPercent = (scene.duration / totalDuration) * 100;
          const isActive = index === currentIndex;
          
          return (
            <button
              key={scene.id}
              onClick={() => onSelect(index)}
              style={{ width: `${widthPercent}%` }}
              className={`h-full rounded-md transition-all relative group flex items-center justify-center ${
                isActive 
                  ? "bg-blue-600 border border-blue-400 z-10" 
                  : "bg-zinc-700 hover:bg-zinc-600 border border-transparent"
              }`}
            >
              <span className={`text-[10px] font-bold truncate px-1 ${isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"}`}>
                {index + 1}
              </span>
              
              {/* Hover Tooltip */}
              <div className="absolute bottom-full mb-2 hidden group-hover:block z-20">
                <div className="bg-zinc-900 border border-zinc-700 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap shadow-xl">
                  {scene.title} ({scene.duration}s)
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between px-1">
        {scenes.map((scene, index) => {
          const widthPercent = (scene.duration / totalDuration) * 100;
          return (
            <div 
              key={`tick-${scene.id}`} 
              style={{ width: `${widthPercent}%` }}
              className="flex flex-col items-center"
            >
              <div className="w-px h-1 bg-zinc-800" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
