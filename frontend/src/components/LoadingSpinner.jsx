export default function LoadingSpinner({ text }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin" 
        style={{
          borderImage: 'linear-gradient(to right, #3b82f6, #8b5cf6) 1',
          borderStyle: 'solid'
        }}
      />
      {text && (
        <p className="mt-4 text-gray-600 text-lg animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}
