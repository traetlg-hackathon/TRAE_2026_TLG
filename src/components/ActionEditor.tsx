'use client';

import { BattleAction, BattleActionType } from "@/types/replay";
import { SlidersHorizontal, Wand2 } from "lucide-react";

type ActionEditorProps = {
  actions: BattleAction[];
  onChange: (actions: BattleAction[]) => void;
  onGenerateStoryboard: () => void;
};

const ACTION_TYPES: BattleActionType[] = [
  "setup",
  "draw",
  "set",
  "activate",
  "chain",
  "summon",
  "attack",
  "damage",
  "move",
];

export function ActionEditor({ actions, onChange, onGenerateStoryboard }: ActionEditorProps) {
  const updateAction = (id: string, patch: Partial<BattleAction>) => {
    onChange(actions.map((action) => (action.id === id ? { ...action, ...patch } : action)));
  };

  const updateScenery = (id: string, key: "field" | "lighting" | "cameraFocus" | "vfx" | "tone", value: string) => {
    onChange(
      actions.map((action) =>
        action.id === id
          ? {
              ...action,
              scenery: {
                field: action.scenery?.field ?? "duel arena",
                lighting: action.scenery?.lighting ?? "cinematic lighting",
                cameraFocus: action.scenery?.cameraFocus ?? "card action",
                vfx: action.scenery?.vfx ?? "glowing card particles",
                tone: action.scenery?.tone ?? "cinematic",
                [key]: value,
              },
            }
          : action,
      ),
    );
  };

  if (actions.length === 0) return null;

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <SlidersHorizontal className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Refined Replay Data</h2>
            <p className="text-xs text-zinc-500">Actions, objects, and scenery extracted from raw duel log.</p>
          </div>
        </div>
        <button
          onClick={onGenerateStoryboard}
          className="shrink-0 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20"
        >
          <Wand2 className="w-4 h-4" />
          Generate Storyboard
        </button>
      </div>

      <div className="max-h-[36rem] overflow-auto pr-2 flex flex-col gap-4">
        {actions.map((action, index) => (
          <div key={action.id} className="border border-zinc-800 bg-black/30 rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
              <span>Beat {index + 1} • Turn {action.turn}{action.timestamp ? ` • ${action.timestamp}` : ""}</span>
              <span>{action.objects?.[0]?.zone ?? "field"}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <label className="flex flex-col gap-1 text-[10px] uppercase text-zinc-500 font-bold">
                Action
                <select
                  value={action.action}
                  onChange={(e) => updateAction(action.id, { action: e.target.value as BattleActionType })}
                  className="bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-sm text-zinc-100 normal-case"
                >
                  {ACTION_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1 text-[10px] uppercase text-zinc-500 font-bold">
                Main object
                <input
                  value={action.card ?? ""}
                  onChange={(e) => updateAction(action.id, { card: e.target.value })}
                  className="bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-sm text-zinc-100 normal-case"
                />
              </label>
              <label className="flex flex-col gap-1 text-[10px] uppercase text-zinc-500 font-bold">
                Tone
                <input
                  value={action.scenery?.tone ?? ""}
                  onChange={(e) => updateScenery(action.id, "tone", e.target.value)}
                  className="bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-sm text-zinc-100 normal-case"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1 text-[10px] uppercase text-zinc-500 font-bold">
              Action summary
              <textarea
                value={action.summary}
                onChange={(e) => updateAction(action.id, { summary: e.target.value })}
                className="bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-sm text-zinc-100 normal-case min-h-16 resize-y"
              />
            </label>

            <label className="flex flex-col gap-1 text-[10px] uppercase text-zinc-500 font-bold">
              Visual intent
              <textarea
                value={action.visualIntent}
                onChange={(e) => updateAction(action.id, { visualIntent: e.target.value })}
                className="bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-sm text-zinc-100 normal-case min-h-16 resize-y"
              />
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <label className="flex flex-col gap-1 text-[10px] uppercase text-zinc-500 font-bold">
                Field
                <input
                  value={action.scenery?.field ?? ""}
                  onChange={(e) => updateScenery(action.id, "field", e.target.value)}
                  className="bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-sm text-zinc-100 normal-case"
                />
              </label>
              <label className="flex flex-col gap-1 text-[10px] uppercase text-zinc-500 font-bold">
                Camera focus
                <input
                  value={action.scenery?.cameraFocus ?? ""}
                  onChange={(e) => updateScenery(action.id, "cameraFocus", e.target.value)}
                  className="bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-sm text-zinc-100 normal-case"
                />
              </label>
              <label className="flex flex-col gap-1 text-[10px] uppercase text-zinc-500 font-bold">
                VFX
                <input
                  value={action.scenery?.vfx ?? ""}
                  onChange={(e) => updateScenery(action.id, "vfx", e.target.value)}
                  className="bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-sm text-zinc-100 normal-case"
                />
              </label>
            </div>

            {action.rawLine && (
              <p className="text-[10px] text-zinc-600 font-mono truncate">raw: {action.rawLine}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
