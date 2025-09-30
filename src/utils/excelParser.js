// Converts Excel rows to your sheet object structure
export function parseExcelData(rows, sheetName = "Custom Sheet") {
  if (rows.length < 2) return null;
  // Assume first row is the header
  const headers = rows[0].map(h => h.trim().toLowerCase());
  const questions = [];
  for (let i = 1; i < rows.length; i++) {
    if (!rows[i] || rows[i].length === 0) continue;
    const row = rows[i];
    const q = {};
    headers.forEach((h, idx) => {
      if (h === "title") q.title = row[idx] || "";
      if (h === "link") q.link = row[idx] || "";
      if (h === "difficulty") q.difficulty = row[idx] || "";
      if (h === "platform") q.platform = row[idx] || "";
      if (h === "approach") q.approach = row[idx] || "";
    });
    q.id = i;
    if (q.title) questions.push(q);
  }
  return { sheetName, questions };
}
