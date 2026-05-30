import React from 'react';
import { StoryScene } from '@/types';
import { compilePixVersePrompt } from '@/lib/duel-logic';
import { Sliders, Video, Palette, Zap, Clock } from 'lucide-react';

interface SceneControlsProps {
  scene: StoryScene | null;
  onUpdate: (updatedScene: StoryScene) => void;
}

export const SceneControls: React.FC<SceneControlsProps> = ({ scene, onUpdate }) => {
  if (!scene) {
    return (
      <div className="h-full flex items-center justify-center border border-dashed border-white/10 rounded-xl bg-white/5">
        <p className="text-white/30 text-sm">Select a scene to edit its properties</p>
      </div>
    );
  }

  const handleChange = (field: keyof StoryScene, value: any) => {
    const updatedScene = { ...scene, [field]: value };
    // Regenerate prompt when controls change
    updatedScene.prompt = compilePixVersePrompt(updatedScene);
    onUpdate(updatedScene);
  };

  return (
    <div className="bg-white/5 p-6 rounded-xl border border-white/10 h-full flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-2">
        <Sliders className="w-5 h-5 text-blue-400" />
        <h2 className="text-lg font-semibold text-white">Scene Controls</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-xs font-medium text-white/50 uppercase mb-3">
            <Palette className="w-3.5 h-3.5" />
            Mood / Lighting
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['Dramatic', 'Cinematic', 'Dark', 'Epic', 'Mysterious', 'Vibrant'].map((mood) => (
              <button
                key={mood}
                onClick={() => handleChange('mood', mood)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  scene.mood === mood 
                    ? 'bg-blue-600 text-white border-blue-500' 
                    : 'bg-black/40 text-white/60 border border-white/10 hover:border-white/20'
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-xs font-medium text-white/50 uppercase mb-3">
            <Video className="w-3.5 h-3.5" />
            Camera Angle
          </label>
          <select
            value={scene.camera}
            onChange={(e) => handleChange('camera', e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option>Close Up</option>
            <option>Medium Shot</option>
            <option>Wide Shot</option>
            <option>Low Angle</option>
            <option>High Angle</option>
            <option>Dutch Angle</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-xs font-medium text-white/50 uppercase mb-3">
            <Zap className="w-3.5 h-3.5" />
            Intensity: {scene.intensity}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={scene.intensity}
            onChange={(e) => handleChange('intensity', parseInt(e.target.value))}
            className="w-full h-1.5 bg-black/40 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between mt-2 px-1">
            <span className="text-[10px] text-white/30">Low</span>
            <span className="text-[10px] text-white/30">High</span>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-xs font-medium text-white/50 uppercase mb-3">
            <Clock className="w-3.5 h-3.5" />
            Duration: {scene.duration}s
          </label>
          <div className="flex gap-3 items-center">
            <button 
              onClick={() => handleChange('duration', Math.max(1, scene.duration - 1))}
              className="w-10 h-10 flex items-center justify-center bg-black/40 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
            >
              -
            </button>
            <div className="flex-grow text-center font-mono text-xl text-blue-400">
              {scene.duration}
            </div>
            <button 
              onClick={() => handleChange('duration', Math.min(10, scene.duration + 1))}
              className="w-10 h-10 flex items-center justify-center bg-black/40 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
