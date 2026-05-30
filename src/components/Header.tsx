import { Video, Sparkles, Play } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-white/5 py-4 px-8 mb-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 rotate-3 hover:rotate-0 transition-transform duration-300">
            <Video className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              DuelCut
              <span className="bg-blue-500/10 text-blue-400 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-blue-500/20">
                Solo Hackathon
              </span>
            </h1>
            <p className="text-zinc-400 text-xs font-medium">AI Cinematic Replay Studio</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 text-zinc-400 text-xs hover:text-white transition-colors cursor-default group">
            <Sparkles className="w-4 h-4 text-blue-500 group-hover:animate-pulse" />
            <span>AI Storyboarding</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400 text-xs hover:text-white transition-colors cursor-default group">
            <Play className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
            <span>Cinematic Replays</span>
          </div>
        </div>
      </div>
    </header>
  );
}
