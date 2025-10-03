import React from "react";

export default function MotivationalQuotes() {
  const quotes = [
    { text: "The only way to learn a new programming language is by writing programs in it.", author: "Dennis Ritchie" },
    { text: "Code every day, because consistency beats talent when talent doesn’t work hard.", author: "Shubham Sir" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Dream big, but start small. Every DSA problem you solve is a step towards that dream job.", author: "Shubham Sir" },
    { text: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "Learning to write programs stretches your mind, and helps you think better.", author: "Bill Gates" },
    { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
    { text: "DSA practice is like gym for your brain — consistency builds strength.", author: "Shubham Sir" },
    { text: "Opportunities don’t happen, you create them.", author: "Chris Grosser" },
    { text: "Don't do development, Do DSA - if you want job", author: "Arpit Anand" }
  ];

  return (
    <div className="bg-gradient-to-br from-pink-600 via-indigo-900 to-blue-700 rounded-2xl border-l-8 border-[#232543] shadow-xl p-3 sm:p-7 flex flex-col gap-2 sm:gap-4 sm:h-full justify-start w-full">
      <h2 className="text-lg sm:text-2xl font-bold text-pink-100 text-center mb-2">Motivation Wall</h2>
      {quotes.map((q, idx) => (
        <div
          key={idx}
          className="text-[0.9rem] sm:text-[1rem] text-slate-100 italic font-semibold leading-snug"
        >
          “{q.text}” <span className="text-pink-300 font-normal">— {q.author}</span>
        </div>
      ))}
    </div>
  );
}
