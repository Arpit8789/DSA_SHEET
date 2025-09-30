import React, { useRef } from "react";

export default function FileUploader({ onUpload }) {
  const inputRef = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const ext = file.name.split(".").pop();
    if (ext === "json") {
      const text = await file.text();
      try {
        const sheet = JSON.parse(text);
        onUpload(sheet);
      } catch {
        alert("Invalid JSON format.");
      }
    } else if (ext === "xlsx" || ext === "xls") {
      import("xlsx").then(XLSX => {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const wb = XLSX.read(evt.target.result, { type: "binary" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
          onUpload(data);
        };
        reader.readAsBinaryString(file);
      });
    } else {
      alert("Only .json or .xlsx files supported.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-1 my-2">
      <input
        type="file"
        accept=".json,.xlsx,.xls"
        ref={inputRef}
        onChange={handleFile}
        className="hidden"
      />
      <button
        className="bg-gradient-to-r from-blue-800 to-purple-700 shadow text-white px-6 py-2 rounded-xl font-bold hover:scale-105 transition"
        onClick={() => inputRef.current?.click()}
      >
        Upload New Sheet (.json or .xlsx)
      </button>
      <span className="text-xs text-blue-200">(Follow columns: title, link, difficulty, platform, approach)</span>
    </div>
  );
}
