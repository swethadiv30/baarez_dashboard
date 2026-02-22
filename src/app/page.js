"use client";

import { useState } from "react";
import Papa from "papaparse";
import { SAMPLE_DATA } from "@/lib/sampleData";
import Navbar from "@/components/Navbar";
import KPICards from "@/components/KPICards";
import ChartsSection from "@/components/ChartsSection";
import InsightsPanel from "@/components/InsightsPanel";

export default function Home() {
  const [csvRows, setCsvRows] = useState([]);

  const loadSampleData = () => {
    const parsed = Papa.parse(SAMPLE_DATA, {
      header: true,
      skipEmptyLines: true,
    });

    setCsvRows(parsed.data);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar onLoad={loadSampleData} />
      {csvRows.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">
          Click "Load Sample Data" to see dashboard
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