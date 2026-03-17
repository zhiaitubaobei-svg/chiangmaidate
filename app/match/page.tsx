export default function MatchPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-sm flex-col">
        <header>
          <p className="text-sm uppercase tracking-[0.3em] text-white/40">
            Match
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight">
            Weekly Match
          </h1>
          <p className="mt-3 text-sm leading-6 text-white/65">
            Your connection for this week will appear here after the weekly release.
          </p>
        </header>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">This week's match</p>

          <div className="mt-4 flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-white/10" />
            <div>
              <h2 className="text-xl font-semibold">Waiting for release</h2>
              <p className="text-sm text-white/60">
                Your match will unlock when the weekly cycle completes.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/50">Next release</p>
          <h3 className="mt-2 text-2xl font-semibold">Sunday</h3>
          <p className="mt-2 text-sm text-white/65">
            Matches are generated once per week based on questionnaire answers
            and your Daypet interaction rhythm.
          </p>
        </section>

        <a
          href="/home"
          className="mt-8 rounded-full bg-white py-4 text-center font-semibold text-black"
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}