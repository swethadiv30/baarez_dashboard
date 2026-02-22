export default function QuestionInput({
  value,
  setValue,
  onAsk,
  isLoading,
}) {
  function handleSubmit() {
    if (!value.trim()) return;
    onAsk();
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
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