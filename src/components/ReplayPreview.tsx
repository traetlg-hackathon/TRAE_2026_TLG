'use client';

import React, { useState } from 'react';
import { StoryScene } from '@/types/replay';
import { Play, SkipBack, SkipForward, Maximize2 } from 'lucide-react';
import Timeline from "./Timeline";
import TimestampComments from "./TimestampComments";
import ShareReplay from "./ShareReplay";
import ExportPrompts from "./ExportPrompts";

interface ReplayPreviewProps {
  scenes: StoryScene[];
}

export const ReplayPreview: React.FC<ReplayPreviewProps> = ({ scenes }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

  return (
    <div className="flex flex-col gap-6">
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
              <ShareReplay />
              <ExportPrompts scenes={scenes} />
              <div className="text-sm font-mono text-white/60">00:00 / 00:00</div>
            </div>
          </div>

          {/* Timeline Visual */}
          <Timeline 
            scenes={scenes} 
            currentIndex={currentSceneIndex}
            onSeek={setCurrentSceneIndex}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12">
          <TimestampComments />
        </div>
      </div>
    </div>
  );
};
