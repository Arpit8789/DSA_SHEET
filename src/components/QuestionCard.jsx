import React from "react";

export default function QuestionCard({ question, done, onToggle }) {
  return (
    <div className="bg-gradient-to-r from-[#141426] to-[#21267b] rounded-lg p-4 
        shadow-md flex flex-col md:flex-row items-start md:items-center gap-3 mb-2 border border-[#232365] hover:border-cyan-500 transition-all group">
      <div className="flex-grow">
        <a href={question.link} target="_blank" rel="noopener noreferrer"
           className="text-base md:text-lg font-bold text-cyan-300 group-hover:text-cyan-400 underline underline-offset-2">
          {question.title}
        </a>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className={
            "px-2 py-0.5 rounded text-xs font-semibold " +
            (question.difficulty === "Easy" ? "bg-green-700 text-green-100" :
              question.difficulty === "Medium" ? "bg-yellow-700 text-yellow-100" :
              question.difficulty === "Hard" ? "bg-red-900 text-pink-100" : "bg-gray-800 text-gray-200")
          }>
            {question.difficulty || "Unspecified"}
          </span>
          {question.platform &&
            <span className="px-2 py-0.5 rounded bg-[#30336b] text-blue-200 text-xs font-medium">
              {question.platform}
            </span>}
          {question.approach &&
            <span className="px-2 py-0.5 rounded bg-[#182338] text-slate-300 text-xs font-medium">
              {question.approach}
            </span>}
        </div>
      </div>
      <input
        type="checkbox"
        checked={done}
        onChange={onToggle}
        className="w-6 h-6 accent-cyan-500 ring-2 ring-cyan-700 rounded focus:ring-4 focus:ring-cyan-900 mt-2"
        aria-label="Mark as done"
      />
    </div>
  );
}
