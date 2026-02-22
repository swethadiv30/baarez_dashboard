"use client";

import { useState } from "react";
import SuggestionChips from "./SuggestionChips";
import QuestionInput from "./QuestionInput";
import LoadingIndicator from "./LoadingIndicator";
import InsightCard from "./InsightCard";
import ErrorMessage from "./ErrorMessage";

export default function InsightsPanel({ rows }) {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function buildDataSummary(rows) {
    const totalRevenue = rows.reduce(
      (sum, r) => sum + Number(r.revenue),
      0
    );

    const products = [...new Set(rows.map((r) => r.product))];
    const regions = [...new Set(rows.map((r) => r.region))];

    return `Total rows: ${rows.length} | 
            Total revenue: $${totalRevenue.toLocaleString()} | 
            Products: ${products.join(", ")} | 
            Regions: ${regions.join(", ")}`;
  }

  async function handleAsk(question) {
  if (!question) return;

  setIsLoading(true);
  setError("");

  const dataSummary = buildDataSummary(rows);

  try {
    // Call API
    const response = await fetch("/api/insights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        dataSummary,
      }),
    });

    const data = await response.json();

    await new Promise((resolve) =>
      setTimeout(resolve, 1500)
    );

    setHistory((prev) => [
      ...prev,
      { question, answer: data.answer },
    ]);
  } catch (err) {
    setError(
      "Sorry, I could not get an answer. Please try again."
    );
  }

  setIsLoading(false);
}

  return (
    <div className="p-6 bg-gray-100 mt-10">
      <h2 className="text-xl font-semibold mb-4">
        AI Insights
      </h2>

      <SuggestionChips onAsk={handleAsk} />
      <QuestionInput
        onAsk={handleAsk}
        isLoading={isLoading}
      />

      {isLoading && <LoadingIndicator />}

      {error && <ErrorMessage message={error} />}

      <div className="space-y-4 mt-6">
        {history.map((item, index) => (
          <InsightCard
            key={index}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  );
}