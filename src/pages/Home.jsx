import React from "react";
import Header from "../components/Header";
import SheetSelector from "../components/SheetSelector";
import ProgressStats from "../components/ProgressStats";
import SheetManager from "../components/SheetManager";
import FileUploader from "../components/FileUploader";
import MotivationalQuotes from "../components/MotivationalQuotes";

export default function Home({
  sheets,
  selectedSheetId,
  onSelectSheet,
  onUploadSheet,
  onDeleteSheet,
  stats,
  progressObj,  // ADD THIS TO PROPS
}) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#070c28] to-[#1d2332] text-slate-100 flex flex-col">

      {/* Blinking alert message on top */}
      <div className="w-full flex justify-center">
        <div className="animate-pulse bg-yellow-400/80 text-black font-bold text-base tracking-wide px-4 py-2 rounded-xl shadow-lg mt-3 mb-2 max-w-xl text-center">
          🚨 Shubham Sir Sheet completion last date: <span className="underline">10 Oct</span>
        </div>
      </div>

      <Header />

      {/* Layout: sheet + sidebar on desktop, stacked on mobile */}
      <div className="w-full flex flex-row justify-center gap-12 mt-6 px-4 flex-col md:flex-row items-stretch">
        {/* Sheet card (left/main) */}
        <div className="w-full max-w-xl bg-[#111329] px-4 py-6 sm:px-8 sm:py-8 rounded-2xl shadow-2xl border border-[#232543] flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="text-lg font-semibold text-cyan-300 mb-2">Choose Sheet:</div>
            <SheetSelector
              sheets={sheets}
              selected={selectedSheetId}
              onSelect={onSelectSheet}
            />
          </div>
          {/* Both Sheets Progress Display */}
          <div className="flex flex-row gap-4 justify-between items-center w-full mb-3">
            {sheets.map(sheet => {
              const sheetProgress = (progressObj[sheet.id] || {});
              const done = sheet.questions.filter(q => !!sheetProgress[q.id]).length;
              const total = sheet.questions.length;
              return (
                <div key={sheet.id} className="flex flex-col items-center flex-1">
                  <div className="text-base font-bold text-cyan-300 mb-1">{sheet.name}</div>
                  <ProgressStats total={total} done={done} />
                </div>
              );
            })}
          </div>
          <div>
            <div className="text-sm font-bold mb-2 text-blue-300">Manage Sheets</div>
            <SheetManager sheets={sheets} onDelete={onDeleteSheet} />
          </div>
          <div className="flex justify-center mt-4">
            <FileUploader onUpload={onUploadSheet} />
          </div>
        </div>
        
        {/* Motivational quotes panel sidebar on desktop */}
        <div className="hidden md:block w-full max-w-md">
          <MotivationalQuotes />
        </div>
      </div>

      {/* Motivational quotes for mobile (appear below sheet) */}
      <div className="block md:hidden w-full px-3 my-4">
        <MotivationalQuotes />
      </div>
    </main>
  );
}
