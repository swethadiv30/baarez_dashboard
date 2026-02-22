export default function InsightCard({
  question,
  answer,
}) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="font-semibold mb-2">
        Q: {question}
      </p>
      <p className="whitespace-pre-line">
        {answer}
      </p>
    </div>
  );
}