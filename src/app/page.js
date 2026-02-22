"use client";

import { useState } from "react";
import Papa from "papaparse";
import Navbar from "@/components/Navbar";
import KPICards from "@/components/KPICards";
import ChartsSection from "@/components/ChartsSection";
import InsightsPanel from "@/components/InsightsPanel";

export default function Home() {
  const [csvRows, setCsvRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 

const handleFileUpload = (file) => {
  setIsLoading(true);

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
    complete: (results) => {
      console.log("Raw parsed:", results);

      if (!results || !results.data) {
        console.error("Parsing failed");
        setIsLoading(false);
        return;
      }

      // Remove completely empty rows
      const cleanedData = results.data.filter(
        (row) => Object.values(row).some((val) => val !== null && val !== "")
      );

      if (cleanedData.length === 0) {
        console.warn("CSV contains no valid data");
        setIsLoading(false);
        return;
      }

      setCsvRows(cleanedData);
      setIsLoading(false);
    },
    error: (err) => {
      console.error("PapaParse error:", err);
      setIsLoading(false);
    },
  });
};

  const handleReset = () => {
    window.location.reload()
    // setCsvRows([]);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar
        onFileUpload={handleFileUpload}
        onReset={handleReset}
        hasData={csvRows.length > 0}
        isLoading={isLoading}
      />

      {isLoading && (
        <div className="flex justify-center items-center mt-20">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!isLoading && csvRows.length === 0 && (
        <div className="text-center mt-20 text-gray-500">
          Upload a CSV file to see dashboard
        </div>
      )}

      {!isLoading && csvRows.length > 0 && (
        <>
          <KPICards rows={csvRows} />
          <ChartsSection rows={csvRows} />
          <InsightsPanel rows={csvRows} />
        </>
      )}
    </main>
  );
}