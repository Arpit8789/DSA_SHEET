import React from "react";

export default function ProgressStats({ total = 0, done = 0 }) {
  const percent = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="flex flex-col gap-1 bg-gradient-to-r from-blue-900 to-blue-600 rounded-xl px-5 py-4 shadow mt-2">
      <div className="flex items-center gap-4">
        <div className="h-4 flex-1 bg-blue-950 rounded-full">
          <div
            className="h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <span className="ml-3 text-xl text-cyan-300 font-bold">{percent}%</span>
      </div>
      <div className="text-xs text-slate-100">{done} done / {total} total</div>
    </div>
  );
}
