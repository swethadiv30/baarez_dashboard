export default function LoadingIndicator() {
  return (
    <div className="mt-4 text-blue-600 flex items-center gap-2">
      AI is thinking
      <span className="animate-bounce">.</span>
      <span className="animate-bounce delay-150">.</span>
      <span className="animate-bounce delay-300">.</span>
    </div>
  );
}