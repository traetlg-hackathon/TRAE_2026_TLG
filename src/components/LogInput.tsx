import { SAMPLE_LOGS } from "@/data/sampleLogs";
import { useState } from "react";
import { FileText, Terminal, Wand2, Info } from "lucide-react";

interface LogInputProps {
  onGenerate: (logId: string, content: string) => void;
}

export function LogInput({ onGenerate }: LogInputProps) {
  const [selectedLogId, setSelectedLogId] = useState(SAMPLE_LOGS[0].id);
  const [logContent, setLogContent] = useState(SAMPLE_LOGS[0].content);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const log = SAMPLE_LOGS.find((l) => l.id === id);
    if (log) {
      setSelectedLogId(id);
      setLogContent(log.content);
    }
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-6 glow-blue">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <Terminal className="w-5 h-5 text-blue-500" />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">Battle Log</h2>
      </div>
      
      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-2">
          <FileText className="w-3 h-3" />
          Scenario Template
        </label>
        <select
          value={selectedLogId}
          onChange={handleSelectChange}
          className="bg-zinc-800/50 border border-zinc-700 text-zinc-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all hover:bg-zinc-800 cursor-pointer text-sm font-medium"
        >
          {SAMPLE_LOGS.map((log) => (
            <option key={log.id} value={log.id}>
              {log.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Raw Input Data</label>
        <div className="relative">
          <textarea
            value={logContent}
            onChange={(e) => setLogContent(e.target.value)}
            className="bg-black/50 border border-zinc-800 text-zinc-300 rounded-xl p-4 h-64 resize-none focus:ring-2 focus:ring-blue-500/50 outline-none font-mono text-xs leading-relaxed transition-all input-glow w-full"
            placeholder="Paste your battle log here..."
          />
          <div className="absolute bottom-3 right-3 text-[10px] text-zinc-600 font-mono">
            {logContent.length} chars
          </div>
        </div>
      </div>

      <button
        onClick={() => onGenerate(selectedLogId, logContent)}
        className="group relative bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-xl transition-all active:scale-[0.98] overflow-hidden flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        Generate Storyboard
      </button>

      <div className="flex gap-2 p-3 bg-zinc-800/30 rounded-lg border border-zinc-800/50">
        <Info className="w-4 h-4 text-zinc-500 shrink-0" />
        <p className="text-[10px] text-zinc-500 leading-normal italic">
          DuelCut uses deterministic logic for hackathon reliability. Real-world TCG logs will be supported in future versions.
        </p>
      </div>
    </div>
  );
}
