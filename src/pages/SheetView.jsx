import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import QuestionList from "../components/QuestionList";
import ProgressStats from "../components/ProgressStats";

// Expect progressObj/setProgressObj from App
export default function SheetView({ sheets, progressObj, setProgressObj }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedSheet = sheets.find(s => s.id === id);
  const [filters, setFilters] = useState({
    difficulty: "",
    platform: "",
    search: ""
  });

  if (!selectedSheet) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#070c28] to-[#1d2332] text-slate-100">
        <div className="max-w-md bg-[#101223] rounded-xl shadow-lg p-10 text-center">
          <div className="text-xl font-bold mb-4 text-pink-400">Sheet not found!</div>
          <button
            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-bold shadow hover:bg-blue-800"
            onClick={() => navigate("/")}
          >
            Go Home
          </button>
        </div>
      </main>
    );
  }

  // Progress for *this sheet only* using route param
  const progress = progressObj[id] || {};
  function toggleProgress(qId) {
    setProgressObj(old => ({
      ...old,
      [id]: {
        ...old[id],
        [qId]: !old[id]?.[qId]
      }
    }));
  }

  const total = selectedSheet.questions.length;
  const done = selectedSheet.questions.filter(q => !!progress[q.id]).length;

  const filteredQuestions = selectedSheet.questions.filter(q => {
    if (filters.difficulty && q.difficulty !== filters.difficulty) return false;
    if (filters.platform && q.platform !== filters.platform) return false;
    if (filters.search && !q.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#070c28] to-[#1d2332] flex flex-col items-center">
      <Header />
      <div className="w-full max-w-3xl mx-auto mt-10 mb-6 flex flex-col gap-8 px-2">
        <div className="bg-[#111329] p-6 rounded-2xl shadow-xl border border-[#232543]">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div className="text-xl font-semibold text-cyan-300">
              {selectedSheet.sheetName}
            </div>
            <ProgressStats total={total} done={done} />
          </div>
          <FilterBar filters={filters} setFilters={setFilters} />
          <QuestionList
            questions={filteredQuestions}
            progress={progress}
            toggleProgress={toggleProgress}
          />
        </div>
      </div>
    </main>
  );
}
