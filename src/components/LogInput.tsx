'use client';

import React, { useState } from 'react';
import { SAMPLE_LOGS } from '@/data/sampleLogs';
import { FileText, Wand2, Info } from 'lucide-react';

interface LogInputProps {
  onGenerate: (logId: string, content: string) => void;
}

export const LogInput: React.FC<LogInputProps> = ({ onGenerate }) => {
  const [selectedLogId, setSelectedLogId] = useState(SAMPLE_LOGS[0].id);
  const [logContent, setLogContent] = useState(SAMPLE_LOGS[0].content);

  const handleSampleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const log = SAMPLE_LOGS.find(l => l.id === id);
    if (log) {
      setSelectedLogId(id);
      setLogContent(log.content);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white/5 p-6 rounded-xl border border-white/10 h-full">
      <div className="flex items-center gap-2 mb-2">
        <FileText className="w-5 h-5 text-blue-400" />
        <h2 className="text-lg font-semibold text-white">Battle Log</h2>
      </div>

      <div className="space-y-4 flex-grow flex flex-col">
        <div>
          <label className="block text-xs font-medium text-white/50 uppercase mb-1.5">Select Sample Log</label>
          <select 
            value={selectedLogId}
            onChange={handleSampleChange}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            {SAMPLE_LOGS.map(log => (
              <option key={log.id} value={log.id}>{log.title}</option>
            ))}
          </select>
        </div>

        <div className="flex-grow flex flex-col">
          <label className="block text-xs font-medium text-white/50 uppercase mb-1.5">Log Content</label>
          <textarea
            value={logContent}
            onChange={(e) => setLogContent(e.target.value)}
            placeholder="Paste your battle log here..."
            className="flex-grow w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
          />
        </div>

        <button
          onClick={() => onGenerate(selectedLogId, logContent)}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/20"
        >
          <Wand2 className="w-5 h-5" />
          Generate Storyboard
        </button>

        <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <Info className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
          <p className="text-[11px] text-yellow-500/80 leading-tight">
            Controlled logs only for hackathon demo. Not a full Yu-Gi-Oh simulator.
          </p>
        </div>
      </div>
    </div>
  );
};
