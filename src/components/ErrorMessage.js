export default function ErrorMessage({ message }) {
  return (
    <div className="mt-4 border border-red-500 bg-red-50 p-3 rounded text-red-600">
      {message}
    </div>
  );
}