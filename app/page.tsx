export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-5xl font-bold tracking-tight">ChiangMai Date</h1>

        <p className="mt-4 text-white/70">
          Find real connections in Chiang Mai
        </p>

        <div className="mt-10 flex flex-col gap-4">
          <a
            href="/language"
            className="rounded-full bg-white text-black py-4 text-lg font-semibold"
          >
            Start
          </a>

          <a
            href="/home"
            className="rounded-full border border-white/20 py-4 text-lg text-white/80"
          >
            Preview Home
          </a>
        </div>
      </div>
    </main>
  );
}