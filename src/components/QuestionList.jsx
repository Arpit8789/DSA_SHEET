import React from "react";
import QuestionCard from "./QuestionCard";

export default function QuestionList({ questions, progress, toggleProgress }) {
  return (
    <section className="w-full mx-auto grid gap-4 pt-2">
      {questions.length === 0 && (
        <div className="text-center text-blue-300 py-8">No questions match your filter.</div>
      )}
      {questions.map((q) => (
        <QuestionCard
          key={q.id}
          question={q}
          done={!!progress[q.id]}
          onToggle={() => toggleProgress(q.id)}
        />
      ))}
    </section>
  );
}
