function ErrorState({ onRetry }) {
  return (
    <section className="flex min-h-80 w-full flex-col items-center justify-center bg-[#090a0e] px-5 py-16 text-center text-white">
      <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-red-600/10">
        <span className="text-4xl text-red-500">!</span>
      </div>

      <h2 className="mb-3 text-2xl font-bold">Something Went Wrong</h2>

      <p className="mb-7 max-w-md text-sm leading-6 text-gray-400">
        We couldn't load the movies right now. Please check your internet
        connection and try again.
      </p>

      <button
        onClick={onRetry}
        className="flex items-center gap-3 rounded bg-red-600 px-7 py-3 text-sm font-bold transition hover:bg-red-700"
      >
        Try Again
        <span>↻</span>
      </button>
    </section>
  );
}

export default ErrorState;
