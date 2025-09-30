import { useState } from "react";
import { parseExcelData } from "../utils/excelParser";
import { parseJsonSheet } from "../utils/jsonParser";
import { isValidSheetObject } from "../utils/validators";

export default function useFileUpload() {
  const [error, setError] = useState("");
  const [sheet, setSheet] = useState(null);

  async function handleFile(file, sheetName = "") {
    setError("");
    const ext = file.name.split(".").pop();
    if (ext === "json") {
      try {
        const text = await file.text();
        const obj = JSON.parse(text);
        const parsed = parseJsonSheet(obj);
        if (isValidSheetObject(parsed)) {
          setSheet(parsed);
        } else {
          setError("Invalid JSON structure.");
        }
      } catch {
        setError("Unable to parse JSON.");
      }
    } else if (ext === "xlsx" || ext === "xls") {
      try {
        const XLSX = await import("xlsx");
        const reader = new FileReader();
        reader.onload = (evt) => {
          const rows = XLSX.utils.sheet_to_json(
            XLSX.read(evt.target.result, { type: "binary" }).Sheets[
              XLSX.read(evt.target.result, { type: "binary" }).SheetNames[0]
            ],
            { header: 1 }
          );
          const parsed = parseExcelData(rows, sheetName || "Custom Sheet");
          if (isValidSheetObject(parsed)) {
            setSheet(parsed);
          } else {
            setError("Invalid Excel structure.");
          }
        };
        reader.readAsBinaryString(file);
      } catch {
        setError("Unable to read Excel file.");
      }
    } else {
      setError("Unsupported file type.");
    }
  }

  return { error, sheet, handleFile };
}
