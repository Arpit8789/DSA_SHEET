import React from "react";

export default function FilterBar({ filters, setFilters }) {
  return (
    <div className="flex flex-wrap gap-2 py-3 px-4 mb-2 bg-[#151936] rounded-md justify-center">
      <select
        className="bg-[#1a2040] text-slate-200 border border-[#2742a1] rounded px-3 py-1 focus:outline-cyan-500"
        value={filters.difficulty || ""}
        onChange={(e) => setFilters(f => ({ ...f, difficulty: e.target.value }))}
      >
        <option value="">All Difficulties</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      <select
        className="bg-[#1a2040] text-slate-200 border border-[#2742a1] rounded px-3 py-1"
        value={filters.platform || ""}
        onChange={(e) => setFilters(f => ({ ...f, platform: e.target.value }))}
      >
        <option value="">All Platforms</option>
        <option value="LeetCode">LeetCode</option>
        <option value="Codeforces">Codeforces</option>
        <option value="GFG">GFG</option>
        <option value="Custom">Custom</option>
      </select>
      <input
        type="text"
        className="bg-[#1a2040] text-slate-200 border border-[#2742a1] rounded px-3 py-1"
        placeholder="Search question..."
        value={filters.search || ""}
        onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
        style={{ minWidth: 180 }}
      />
    </div>
  );
}
