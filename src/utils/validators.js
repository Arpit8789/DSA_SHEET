export function isValidSheetObject(obj) {
  return (
    obj &&
    typeof obj.sheetName === "string" &&
    Array.isArray(obj.questions) &&
    obj.questions.every(q => q.title && q.link && q.difficulty)
  );
}
