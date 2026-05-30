import { StoryScene } from "@/types/replay";

interface ExportPromptsProps {
  scenes: StoryScene[];
}

export default function ExportPrompts({ scenes }: ExportPromptsProps) {
  const handleExport = () => {
    const data = JSON.stringify(scenes, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "duelcut-prompts.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
    >
      Export Prompts
    </button>
  );
}
