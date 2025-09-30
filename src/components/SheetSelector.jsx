import React from "react";
import { useNavigate } from "react-router-dom";

export default function SheetSelector({ sheets, selected }) {
  const navigate = useNavigate();
  return (
    <nav className="flex flex-wrap gap-3 justify-center py-2">
      {sheets.map((sheet) => (
        <button
          key={sheet.id}
          type="button"
          className={`px-6 py-2 rounded-lg font-bold 
            ${selected === sheet.id
              ? "bg-gradient-to-r from-purple-600 to-blue-700 text-white scale-105"
              : "bg-[#182338] text-slate-300 hover:bg-blue-800 hover:text-white"
            } shadow-md transition-all duration-200`}
          onClick={() => navigate(`/sheet/${sheet.id}`)}
        >
          {sheet.name}
        </button>
      ))}
    </nav>
  );
}
