import React from 'react';
import { StoryScene } from '@/types/replay';
import { SceneCard } from './SceneCard';
import { LayoutGrid, List } from 'lucide-react';
import { useState } from 'react';

interface StoryboardPanelProps {
  scenes: StoryScene[];
  onUpdateScene: (updatedScene: StoryScene) => void;
  selectedSceneId: string | null;
  onSelectScene: (id: string) => void;
}

export const StoryboardPanel: React.FC<StoryboardPanelProps> = ({ 
  scenes, 
  onUpdateScene, 
  selectedSceneId, 
  onSelectScene 
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  if (scenes.length === 0) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl bg-white/[0.02] p-12 text-center min-h-[400px]">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
          <LayoutGrid className="w-8 h-8 text-white/20" />
        </div>
        <h3 className="text-xl font-semibold text-white/60 mb-2">No Storyboard Generated</h3>
        <p className="text-white/40 max-w-sm text-sm">
          Enter a battle log and click generate to see your cinematic storyboard scenes here.
        </p>
      </div>
    );
  }

  const totalDuration = scenes.reduce((acc, scene) => acc + scene.duration, 0);

  return (
    <div className="flex-grow flex flex-col gap-4">
      <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Storyboard Editor</h2>
          </div>
          <div className="h-4 w-[1px] bg-white/10" />
          <div className="text-xs font-medium text-white/50 uppercase">
            {scenes.length} Scenes • <span className="text-blue-400">{totalDuration}s Total</span>
          </div>
        </div>
        
        <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className={`grid gap-4 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar ${
        viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
      }`}>
        {scenes.map((scene) => (
          <SceneCard
            key={scene.id}
            scene={scene}
            onUpdate={onUpdateScene}
            isSelected={selectedSceneId === scene.id}
            onClick={() => onSelectScene(scene.id)}
          />
        ))}
      </div>
    </div>
  );
};
