import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SheetView from "./pages/SheetView";
import subhamSirSheet from "./data/subhamSirSheet.json";
import recursionPractice from "./data/recursionPractice.json";
import useLocalStorage from "./hooks/useLocalStorage";
import useProgress from "./hooks/useProgress";

function getPreloadedSheets() {
  return [
    {
      ...subhamSirSheet,
      id: "subham-sir-sheet",
      isDefault: true,
      name: "Subham Sir Sheet"
    },
    {
      ...recursionPractice,
      id: "recursion-practice",
      isDefault: true,
      name: "Recursion Practice"
    }
  ];
}

function App() {
  const [sheets, setSheets] = useLocalStorage("dsa_sheets", getPreloadedSheets());
  const [selectedSheetId, setSelectedSheetId] = useState(sheets[0].id);
  // progressObj: { [sheetId]: { ...progress } }
  const [progressObj, setProgressObj] = useLocalStorage("dsa_progress", {});

  // For Home, only stats for currently selected sheet
  const selectedSheet = sheets.find(s => s.id === selectedSheetId);
  const homeProgress = progressObj[selectedSheetId] || {};
  const stats = useProgress(selectedSheet?.questions || [], homeProgress);

  function handleDeleteSheet(id) {
    if (window.confirm("Are you sure you want to delete this sheet?")) {
      setSheets(sheets.filter((s) => s.id !== id));
      setSelectedSheetId(getPreloadedSheets()[0].id);
    }
  }

  function handleUploadSheet(sheetObj) {
    const id = sheetObj.sheetName.toLowerCase().replace(/ /g, "-") + "-" + Date.now();
    setSheets([...sheets, { ...sheetObj, id, isDefault: false, name: sheetObj.sheetName }]);
    setSelectedSheetId(id);
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              sheets={sheets}
              selectedSheetId={selectedSheetId}
              onSelectSheet={setSelectedSheetId}
              onUploadSheet={handleUploadSheet}
              onDeleteSheet={handleDeleteSheet}
              stats={stats}
              progressObj={progressObj}
            />
          }
        />
        <Route
          path="/sheet/:id"
          element={
            <SheetView
              sheets={sheets}
              progressObj={progressObj}
              setProgressObj={setProgressObj}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
