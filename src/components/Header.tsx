export default function Header() {
  return (
    <header className="bg-zinc-900 border-b border-zinc-800 py-6 px-8 mb-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-white tracking-tight">DuelCut</h1>
        <p className="text-zinc-400 text-lg">AI Cinematic Replay Studio for TCG Creators</p>
        <p className="text-zinc-500 text-sm">Turn battle logs into editable cinematic replay scenes.</p>
      </div>
    </header>
  );
}
