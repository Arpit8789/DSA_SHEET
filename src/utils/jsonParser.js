export function parseJsonSheet(obj) {
  if (!obj || !obj.sheetName || !Array.isArray(obj.questions)) return null;
  const questions = obj.questions.map((q, idx) => ({
    id: idx + 1,
    title: q.title || "",
    link: q.link || "",
    difficulty: q.difficulty || "",
    platform: q.platform || "",
    approach: q.approach || ""
  }));
  return { sheetName: obj.sheetName, questions };
}
