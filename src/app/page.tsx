'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { LogInput } from '@/components/LogInput';
import { StoryboardPanel } from '@/components/StoryboardPanel';
import { SceneControls } from '@/components/SceneControls';
import { ReplayPreview } from '@/components/ReplayPreview';
import { StoryScene } from '@/types/replay';
import { generateActions } from '@/lib/generateActions';
import { generateStoryboard } from '@/lib/generateStoryboard';
import { compilePixVersePrompt } from '@/lib/compilePixVersePrompt';

export default function Home() {
  const [logContent, setLogContent] = useState('');
  const [scenes, setScenes] = useState<StoryScene[]>([]);
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);

  const handleGenerate = (logId: string, content: string) => {
    if (!content.trim()) return;
    
    // Using the logic from Person 2 (modular files)
    const actions = generateActions(logId);
    const generatedScenes = generateStoryboard(actions);
    setScenes(generatedScenes);
    if (generatedScenes.length > 0) {
      setSelectedSceneId(generatedScenes[0].id);
    }
  };

  const handleUpdateScene = (updatedScene: StoryScene) => {
    // Regenerate prompt when controls change using modular logic
    const sceneWithNewPrompt = {
      ...updatedScene,
      prompt: compilePixVersePrompt(updatedScene)
    };
    setScenes(prev => prev.map(s => s.id === updatedScene.id ? sceneWithNewPrompt : s));
  };

  const selectedScene = scenes.find(s => s.id === selectedSceneId) || null;

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-8 flex flex-col gap-8">
        {/* Top Section: Input and Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Log Input (4 cols to match origin/main layout width) */}
          <div className="lg:col-span-4 h-full">
            <LogInput 
              onGenerate={handleGenerate} 
            />
          </div>

          {/* Middle: Storyboard Editor (5 cols) */}
          <div className="lg:col-span-5 h-full flex flex-col">
            <StoryboardPanel 
              scenes={scenes} 
              onUpdateScene={handleUpdateScene}
              selectedSceneId={selectedSceneId}
              onSelectScene={setSelectedSceneId}
            />
          </div>

          {/* Right: Scene Controls (3 cols) */}
          <div className="lg:col-span-3 h-full">
            <SceneControls 
              scene={selectedScene}
              onUpdate={handleUpdateScene}
            />
          </div>
        </div>

        {/* Bottom Section: Replay Preview */}
        {scenes.length > 0 && (
          <div className="w-full">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <h2 className="text-lg font-semibold text-white">Live Replay Preview</h2>
            </div>
            <ReplayPreview scenes={scenes} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 bg-black/30 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-white/20">
            DuelCut © 2024 • AI-Powered TCG Cinematic Studio • Hackathon Demo
          </p>
        </div>
      </footer>
    </main>
  );
}
