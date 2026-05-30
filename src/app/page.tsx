"use client";

import { useState } from "react";
import Header from "@/components/Header";
import LogInput from "@/components/LogInput";
import StoryboardPanel from "@/components/StoryboardPanel";
import ReplayPreview from "@/components/ReplayPreview";
import { StoryScene } from "@/types/replay";
import { generateActions } from "@/lib/generateActions";
import { generateStoryboard } from "@/lib/generateStoryboard";

export default function Home() {
  const [scenes, setScenes] = useState<StoryScene[]>([]);

  const handleGenerate = (logId: string) => {
    const actions = generateActions(logId);
    const generatedScenes = generateStoryboard(actions);
    setScenes(generatedScenes);
  };

  const handleUpdateScene = (updatedScene: StoryScene) => {
    setScenes(prev => prev.map(s => s.id === updatedScene.id ? updatedScene : s));
  };

  return (
    <main className="min-h-screen bg-black text-zinc-100 pb-20">
      <Header />
      
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column: Input */}
        <div className="xl:col-span-4 flex flex-col gap-8">
          <LogInput onGenerate={handleGenerate} />
        </div>

        {/* Right Column: Editor & Preview */}
        <div className="xl:col-span-8 flex flex-col gap-8">
          <StoryboardPanel 
            scenes={scenes} 
            onUpdateScene={handleUpdateScene} 
          />
          
          {scenes.length > 0 && (
            <ReplayPreview scenes={scenes} />
          )}
        </div>
      </div>
    </main>
  );
}
