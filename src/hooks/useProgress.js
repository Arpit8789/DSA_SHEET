import { useMemo } from "react";

export default function useProgress(questions, progress) {
  return useMemo(() => {
    const total = questions.length;
    const done = questions.filter(q => !!progress[q.id]).length;
    return { total, done };
  }, [questions, progress]);
}
