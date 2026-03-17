export default function GenderPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center">Choose Gender</h1>

        <div className="mt-8 flex flex-col gap-4">
          <a
            href="/home"
            className="rounded-full bg-white text-black py-4 text-center text-lg font-semibold"
          >
            Male
          </a>

          <a
            href="/home"
            className="rounded-full border border-white/20 py-4 text-center text-lg text-white"
          >
            Female
          </a>
        </div>
      </div>
    </main>
  );
}