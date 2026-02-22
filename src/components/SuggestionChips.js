export default function SuggestionChips({ onSelect }) {
  const suggestions = [
    "Which product had the highest revenue?",
    "Which region has the lowest sales?",
    "How did sales trend month over month?",
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {suggestions.map((text, i) => (
        <button
          key={i}
          onClick={() => onSelect(text)}
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200"
        >
          {text}
        </button>
      ))}
    </div>
  );
}