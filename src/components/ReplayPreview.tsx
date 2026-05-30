import React from 'react';
import { StoryScene } from '@/types/replay';
import { Play, SkipBack, SkipForward, Maximize2 } from 'lucide-react';

interface ReplayPreviewProps {
  scenes: StoryScene[];
}

export const ReplayPreview: React.FC<ReplayPreviewProps> = ({ scenes }) => {
  return (
    <div className="bg-black border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
      {/* Video Preview Area */}
      <div className="aspect-video bg-neutral-900 relative flex items-center justify-center group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {scenes.length > 0 ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform shadow-xl shadow-blue-900/40">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
            <p className="text-white/80 font-medium">Ready to Preview Replay</p>
            <p className="text-white/40 text-sm mt-1">{scenes.length} cinematic scenes compiled</p>
          </div>
        ) : (
          <div className="text-center p-8">
            <p className="text-white/20 text-sm italic">Generate a storyboard to see the replay preview</p>
          </div>
        )}

        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-black/60 rounded-lg text-white/80 hover:text-white transition-colors">
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Timeline Controls */}
      <div className="p-6 bg-neutral-950/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <button className="text-white/40 hover:text-white transition-colors">
              <SkipBack className="w-6 h-6" />
            </button>
            <button className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-white/90 transition-colors">
              <Play className="w-6 h-6 fill-black ml-1" />
            </button>
            <button className="text-white/40 hover:text-white transition-colors">
              <SkipForward className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm font-mono text-white/60">00:00 / 00:00</div>
          </div>
        </div>

        {/* Timeline Visual */}
        <div className="relative h-20 w-full bg-white/5 rounded-xl border border-white/5 overflow-hidden">
          {scenes.length > 0 ? (
            <div className="absolute inset-0 flex">
              {scenes.map((scene, i) => {
                const totalDuration = scenes.reduce((acc, s) => acc + s.duration, 0);
                const width = (scene.duration / totalDuration) * 100;
                return (
                  <div 
                    key={scene.id}
                    style={{ width: `${width}%` }}
                    className={`h-full border-r border-black/20 relative group ${
                      i % 2 === 0 ? 'bg-blue-600/20' : 'bg-blue-500/10'
                    }`}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-blue-500/10 transition-opacity" />
                    <div className="absolute top-2 left-2 text-[8px] font-bold text-white/20 uppercase truncate px-1">
                      {scene.title}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-[1px] bg-white/5 mx-8" />
            </div>
          )}
          
          {/* Playhead */}
          <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] z-10" />
        </div>
      </div>
    </div>
  );
};
