export default function ErrorAlert({ message, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-start">
        <span className="text-xl mr-3">❌</span>
        <div className="flex-1">
          <p className="text-red-700">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 px-4 py-2 border border-red-500 text-red-600 rounded hover:bg-red-50 transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
