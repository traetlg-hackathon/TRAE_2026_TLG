import React from 'react';
import { StoryScene } from '@/types';
import { Clock, Video, Palette, Zap, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface SceneCardProps {
  scene: StoryScene;
  onUpdate: (updatedScene: StoryScene) => void;
  isSelected: boolean;
  onClick: () => void;
}

export const SceneCard: React.FC<SceneCardProps> = ({ scene, onUpdate, isSelected, onClick }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(scene.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      onClick={onClick}
      className={`group relative flex flex-col gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
        isSelected 
          ? 'bg-blue-600/10 border-blue-500 shadow-lg shadow-blue-500/10' 
          : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
      }`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">{scene.title}</h3>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-black/40 border border-white/10">
          <Clock className="w-3 h-3 text-white/60" />
          <span className="text-[10px] font-mono text-white/80">{scene.duration}s</span>
        </div>
      </div>

      <p className="text-sm text-white/70 line-clamp-2 italic leading-relaxed">
        "{scene.actionSummary}"
      </p>

      <div className="grid grid-cols-2 gap-2 mt-auto">
        <div className="flex items-center gap-1.5 text-[10px] text-white/50">
          <Palette className="w-3 h-3" />
          <span>{scene.mood}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-white/50">
          <Video className="w-3 h-3" />
          <span>{scene.camera}</span>
        </div>
      </div>

      <div className="mt-2 pt-3 border-t border-white/5">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider">PixVerse Prompt</span>
          <button 
            onClick={handleCopy}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            title="Copy Prompt"
          >
            {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-white/40" />}
          </button>
        </div>
        <div className="bg-black/60 p-2 rounded text-[10px] font-mono text-blue-300/80 leading-tight break-words border border-white/5">
          {scene.prompt}
        </div>
      </div>
      
      {isSelected && (
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-12 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" />
      )}
    </div>
  );
};
