"use client";

import { useRef } from "react";

export default function Navbar({
  onFileUpload,
  onReset,
  hasData,
}) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
          SalesIQ
        </h1>

        {hasData ? (
          <button
            onClick={onReset}
            className="bg-gray-600 hover:bg-gray-700 transition-colors duration-200 text-white text-sm sm:text-base px-4 py-2 rounded-md shadow-sm"
          >
            Go Back
          </button>
        ) : (
          <button
            onClick={handleClick}
            className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white text-sm sm:text-base px-4 py-2 rounded-md shadow-sm"
          >
            Upload CSV
          </button>
        )}

        <input
          type="file"
          accept=".csv"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </header>
  );
}