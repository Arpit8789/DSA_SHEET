import React, { useRef, useState } from "react";

export default function FileUploader({ onUpload }) {
  const inputRef = useRef(null);
  const [isHover, setIsHover] = useState(false);

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
      import("xlsx").then((XLSX) => {
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
    <div className="flex flex-col items-center gap-3 my-4 w-full">
      {/* Hidden file input */}
      <input
        type="file"
        accept=".json,.xlsx,.xls"
        ref={inputRef}
        onChange={handleFile}
        className="hidden"
      />

      {/* Button with hover tooltip */}
      <div className="relative flex flex-col items-center">
        <button
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="bg-gradient-to-r from-blue-800 to-purple-700 shadow text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-bold transition-all duration-200 opacity-70 cursor-not-allowed"
        >
          Create Your Own Sheet
        </button>

        {/* Hover tooltip */}
        {isHover && (
          <div className="absolute top-full mt-2 bg-gray-900 text-pink-200 text-sm px-3 py-2 rounded-md shadow-xl z-10 whitespace-nowrap border border-pink-400 
                          left-1/2 transform -translate-x-1/2 sm:left-0 sm:transform-none">
            🚧 Coming soon... Work under progress
          </div>
        )}
      </div>

      {/* Basic instruction */}
      <span className="text-xs text-blue-200 text-center px-2">
        Create sheets using <b>.json</b> or <b>.xlsx</b> files with proper format
      </span>

      {/* Expandable conversion steps */}
      <details className="bg-blue-900/30 text-slate-100 rounded-lg p-3 cursor-pointer w-full max-w-lg border border-blue-700/50">
        <summary className="font-bold text-cyan-300 text-sm hover:text-cyan-200">
          📋 How to convert PDF/DOC to required format?
        </summary>

        <div className="mt-3 space-y-4 text-xs">
          {/* JSON Format Instructions */}
          <div>
            <h4 className="font-semibold text-cyan-200 mb-2">For JSON format:</h4>
            <ol className="list-decimal ml-4 space-y-1 text-slate-200">
              <li>Go to any AI bot with file upload (ChatGPT, Gemini, Copilot, etc.)</li>
              <li>Upload your PDF/DOC file containing questions</li>
              <li>
                Use this prompt:
                <div className="bg-slate-800 p-2 rounded mt-1 text-green-300 text-[10px] overflow-x-auto">
                  "Convert this file's content into JSON with exact format: sheetName and questions array with fields: id, title, link, difficulty, platform, approach. Only output valid JSON."
                </div>
              </li>
              <li>
                Copy output and save as{" "}
                <code className="bg-gray-700 px-1 rounded">.json</code> file
              </li>
            </ol>
          </div>

          {/* Excel Format Instructions */}
          <div>
            <h4 className="font-semibold text-cyan-200 mb-2">For Excel format:</h4>
            <ol className="list-decimal ml-4 space-y-1 text-slate-200">
              <li>Create an Excel file with these column headers in first row:</li>
              <li className="ml-4">
                <div className="bg-slate-800 p-2 rounded text-yellow-300 text-[10px] font-mono">
                  title | link | difficulty | platform | approach
                </div>
              </li>
              <li>Fill rows with your question data</li>
              <li>
                Save as{" "}
                <code className="bg-gray-700 px-1 rounded">.xlsx</code> file
              </li>
            </ol>
          </div>

          <div className="text-center text-slate-400 text-[10px] mt-3">
            Once feature is ready, use the button above! 🎉
          </div>
        </div>
      </details>
    </div>
  );
}
