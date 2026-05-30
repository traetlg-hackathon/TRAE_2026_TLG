import { StoryScene } from "@/types/replay";
import Timeline from "./Timeline";
import TimestampComments from "./TimestampComments";
import ShareReplay from "./ShareReplay";
import ExportPrompts from "./ExportPrompts";
import { useState } from "react";

interface ReplayPreviewProps {
  scenes: StoryScene[];
}

export default function ReplayPreview({ scenes }: ReplayPreviewProps) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

  const totalDuration = scenes.reduce((acc, scene) => acc + scene.duration, 0);
  const currentScene = scenes[currentSceneIndex];

  if (scenes.length === 0) {
    return null;
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Replay Preview</h2>
        <div className="flex gap-4">
          <ExportPrompts scenes={scenes} />
          <ShareReplay />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="aspect-video bg-black rounded-xl border border-zinc-800 flex items-center justify-center overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-zinc-700 text-lg font-medium flex flex-col items-center gap-2">
              <div className="w-16 h-16 border-4 border-zinc-800 border-t-blue-500 rounded-full animate-spin mb-4" />
              <p>Rendering Scene {currentSceneIndex + 1}...</p>
              <p className="text-xs text-zinc-800">Mock Cinematic Preview</p>
            </div>
            
            {currentScene && (
              <div className="absolute bottom-6 left-6 text-left">
                <div className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase mb-1 w-fit">
                  Live Preview
                </div>
                <h3 className="text-white text-xl font-bold">{currentScene.title}</h3>
                <p className="text-zinc-300 text-sm">{currentScene.actionSummary}</p>
              </div>
            )}
          </div>

          <Timeline 
            scenes={scenes} 
            currentIndex={currentSceneIndex} 
            onSelect={setCurrentSceneIndex} 
            totalDuration={totalDuration}
          />
        </div>

        <div className="flex flex-col gap-4">
          <TimestampComments totalDuration={totalDuration} />
        </div>
      </div>
    </div>
  );
}
