import { useState } from "react";

export default function QuestionInput({
  onAsk,
  isLoading,
}) {
  const [question, setQuestion] = useState("");

  function handleSubmit() {
    if (!question.trim()) return;
    onAsk(question);
    setQuestion("");
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        onKeyDown={(e) =>
          e.key === "Enter" && handleSubmit()
        }
        disabled={isLoading}
        className="flex-1 border px-3 py-2 rounded"
        placeholder="Ask a question about your sales..."
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Ask AI
      </button>
    </div>
  );
}