import React from "react";

// open, message, onConfirm, onCancel
export default function ConfirmDialog({ open, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-30 bg-black/60 flex items-center justify-center">
      <div className="bg-[#10121d] rounded-xl p-6 text-center shadow-2xl border border-cyan-700 min-w-[280px] max-w-[90vw]">
        <div className="text-lg text-white mb-4">{message}</div>
        <div className="flex justify-center gap-4">
          <button className="bg-red-700 text-white px-4 py-1.5 rounded-lg font-bold hover:bg-red-900" onClick={onConfirm}>
            Yes
          </button>
          <button className="bg-slate-700 text-white px-4 py-1.5 rounded-lg font-bold hover:bg-slate-600" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
