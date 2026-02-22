"use client";

import { useState } from "react";
import Papa from "papaparse";
import Navbar from "@/components/Navbar";
import KPICards from "@/components/KPICards";
import ChartsSection from "@/components/ChartsSection";
import InsightsPanel from "@/components/InsightsPanel";

export default function Home() {
  const [csvRows, setCsvRows] = useState([]);

  const handleFileUpload = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        console.log("Parsed data:", results.data);

        if (results.data && results.data.length > 0) {
          setCsvRows([...results.data]);
        }
      },
    });
  };

  const handleReset = () => {
    setCsvRows([]);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar
        onFileUpload={handleFileUpload}
        onReset={handleReset}
        hasData={csvRows.length > 0}
      />

      {csvRows.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">
          Upload a CSV file to see dashboard
        </div>
      ) : (
        <>
          <KPICards rows={csvRows} />
          <ChartsSection rows={csvRows} />
          <InsightsPanel rows={csvRows} />
        </>
      )}
    </main>
  );
}