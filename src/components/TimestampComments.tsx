"use client";

import { useState } from "react";

interface TimestampCommentsProps {
  totalDuration: number;
}

export default function TimestampComments({ totalDuration }: TimestampCommentsProps) {
  const [comments, setComments] = useState<{ id: string; time: number; text: string }[]>([]);
  const [newComment, setNewComment] = useState("");
  const [currentTime, setCurrentTime] = useState(0);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now().toString(),
      time: currentTime,
      text: newComment,
    };
    setComments([...comments, comment].sort((a, b) => a.time - b.time));
    setNewComment("");
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-white">Timeline Comments</h3>
        <p className="text-xs text-zinc-500 italic">Add notes for scene adjustments or SFX timing.</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs text-zinc-500">
          <label>Timestamp: {currentTime}s</label>
          <input 
            type="range" 
            min="0" 
            max={totalDuration} 
            value={currentTime}
            onChange={(e) => setCurrentTime(parseInt(e.target.value))}
            className="w-2/3 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
            className="bg-zinc-800 border border-zinc-700 text-white rounded-lg p-2 text-sm flex-1 outline-none"
          />
          <button
            onClick={handleAddComment}
            className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-lg text-sm font-bold"
          >
            Add
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[300px] flex flex-col gap-3 pr-2 scrollbar-thin scrollbar-thumb-zinc-800">
        {comments.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-zinc-700 text-xs italic">
            No comments yet.
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-zinc-800/50 border border-zinc-800 rounded-lg p-3 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-blue-400 font-bold">{comment.time}s</span>
                <button 
                  onClick={() => setComments(comments.filter(c => c.id !== comment.id))}
                  className="text-zinc-600 hover:text-red-400 text-[10px]"
                >
                  Delete
                </button>
              </div>
              <p className="text-xs text-zinc-300">{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
