import React from "react";

export default function SheetManager({ sheets, onDelete }) {
  return (
    <div className="flex flex-wrap gap-2 py-2 px-4 justify-center">
      {sheets.map((sheet) => (
        <div
          key={sheet.id}
          className="bg-[#232365] text-slate-100 px-4 py-1 rounded-lg flex items-center gap-2 text-sm shadow"
        >
          {sheet.name}
          {!sheet.isDefault && (
            <button
              onClick={() => onDelete(sheet.id)}
              className="ml-2 text-red-500 hover:text-red-300 text-base font-bold"
              title="Delete sheet"
            >×</button>
          )}
        </div>
      ))}
    </div>
  );
}
