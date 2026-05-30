"use client";

import { SAMPLE_LOGS } from "@/data/sampleLogs";
import { useState } from "react";

interface LogInputProps {
  onGenerate: (logId: string, content: string) => void;
}

export default function LogInput({ onGenerate }: LogInputProps) {
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
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-white">Battle Log Input</h2>
      
      <div className="flex flex-col gap-2">
        <label className="text-sm text-zinc-400">Select Sample Log</label>
        <select
          value={selectedLogId}
          onChange={handleSelectChange}
          className="bg-zinc-800 border border-zinc-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          {SAMPLE_LOGS.map((log) => (
            <option key={log.id} value={log.id}>
              {log.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <label className="text-sm text-zinc-400">Battle Log Content</label>
        <textarea
          value={logContent}
          onChange={(e) => setLogContent(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 text-white rounded-lg p-3 h-64 resize-none focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
        />
      </div>

      <button
        onClick={() => onGenerate(selectedLogId, logContent)}
        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-colors mt-2"
      >
        Generate Storyboard
      </button>

      <p className="text-xs text-zinc-500 italic mt-2">
        Note: Controlled logs only for hackathon demo. Not a full Yu-Gi-Oh simulator.
      </p>
    </div>
  );
}
