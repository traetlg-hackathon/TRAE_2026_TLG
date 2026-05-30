import React from 'react';
import { StoryScene } from '@/types/replay';
import { SceneCard } from './SceneCard';
import { Clock, LayoutGrid, MousePointer2 } from 'lucide-react';

interface StoryboardPanelProps {
  scenes: StoryScene[];
  onUpdateScene: (updatedScene: StoryScene) => void;
  selectedSceneId: string | null;
  onSelectScene: (id: string) => void;
}

const RENDER_DURATION_PER_SCENE = 10;

export const StoryboardPanel: React.FC<StoryboardPanelProps> = ({
  scenes,
  onUpdateScene,
  selectedSceneId,
  onSelectScene
}) => {
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

  const totalDuration = scenes.length * RENDER_DURATION_PER_SCENE;

  return (
    <div className="flex-grow flex flex-col gap-4 min-h-0">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <LayoutGrid className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Storyboard Editor</h2>
            <p className="text-sm text-white/45 mt-1">Readable scene list. Select a scene, then edit details in Scene Controls.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-black/30 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white/60">
            <MousePointer2 className="w-3.5 h-3.5 text-blue-400" />
            {scenes.length} scenes
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-xs font-bold uppercase tracking-wider text-blue-300">
            <Clock className="w-3.5 h-3.5" />
            {RENDER_DURATION_PER_SCENE}s each / {totalDuration}s total
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar pb-1">
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
