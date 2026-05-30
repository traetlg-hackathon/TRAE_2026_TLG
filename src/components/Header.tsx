import React from 'react';
import { Film } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Film className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">DuelCut</h1>
            <p className="text-xs text-white/60 font-medium uppercase tracking-widest">AI Cinematic Replay Studio for TCG Creators</p>
          </div>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-sm text-white/80 max-w-xs">
            Turn battle logs into editable cinematic replay scenes.
          </p>
        </div>
      </div>
    </header>
  );
};
