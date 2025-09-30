// Manages all sheets and progress in localStorage

const LS_KEY_SHEETS = "dsa_sheets";
const LS_KEY_PROGRESS = "dsa_progress";

export function getSheets() {
  return JSON.parse(localStorage.getItem(LS_KEY_SHEETS) || "[]");
}

export function saveSheets(sheets) {
  localStorage.setItem(LS_KEY_SHEETS, JSON.stringify(sheets));
}

export function getProgress(sheetId) {
  const progressObj = JSON.parse(localStorage.getItem(LS_KEY_PROGRESS) || "{}");
  return progressObj[sheetId] || {};
}

export function saveProgress(sheetId, progress) {
  const progressObj = JSON.parse(localStorage.getItem(LS_KEY_PROGRESS) || "{}");
  progressObj[sheetId] = progress;
  localStorage.setItem(LS_KEY_PROGRESS, JSON.stringify(progressObj));
}

export function deleteSheet(sheetId) {
  let sheets = getSheets().filter(s => s.id !== sheetId);
  saveSheets(sheets);
  let progressObj = JSON.parse(localStorage.getItem(LS_KEY_PROGRESS) || "{}");
  delete progressObj[sheetId];
  localStorage.setItem(LS_KEY_PROGRESS, JSON.stringify(progressObj));
}
