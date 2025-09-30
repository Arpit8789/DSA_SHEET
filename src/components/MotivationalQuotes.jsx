
import React from "react";
export default function MotivationalQuotes() {
  const quotes = [
    "Har din DSA ki practice apni family ki life ko upgrade karne ka ek step hai...",
    "Sapne bade dekho, tareeke dhoondho...",
    "Ek din aayega jab tumhe apni coding journey ka fal milega...",
    "Paise ki chinta mat karo, dimaag pe invest karo...",
    "Bharosa rakho apne aap par, kyunki ek sahi skill hi sabse bada investment hai...",
    "Jab mushkil lagti hai, socho ki yahi woh challenge hai...",
    "DSA me everyday grind kal ko dream job aur financial freedom me badal sakta hai...",
    "Coding seekh ke, sirf apni zindagi nahi, balki apne parents ka bhi sapna pura karo..."
  ];
  return (
    <div className="bg-gradient-to-br from-pink-600 via-indigo-900 to-blue-700 rounded-2xl border-l-8 border-[#232543] shadow-xl p-7 flex flex-col gap-4 h-full justify-start">
      <h2 className="text-2xl font-bold text-pink-100 text-center mb-2">Motivation Wall</h2>
      {quotes.map((q, idx) => (
        <div key={idx} className="text-[1rem] text-slate-100 italic font-semibold leading-snug">"{q}"</div>
      ))}
    </div>
  );
}
