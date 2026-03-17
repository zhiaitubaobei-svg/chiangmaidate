export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-sm flex-col">
        <header>
          <p className="text-sm uppercase tracking-[0.3em] text-white/40">
            ChiangMai Date
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight">
            Welcome back
          </h1>
          <p className="mt-3 text-sm leading-6 text-white/65">
            Your weekly connection space for questionnaire, Daypet, and match results.
          </p>
        </header>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            This week
          </p>
          <h2 className="mt-3 text-2xl font-semibold">Ready for your next match</h2>
          <p className="mt-3 text-sm leading-6 text-white/65">
            Complete your weekly questionnaire and spend time with Daypet before the next match is released.
          </p>
        </section>

        <section className="mt-6 flex flex-col gap-4">
          <a
            href="/questionnaire"
            className="rounded-3xl bg-white px-5 py-5 text-black"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-black/60">Questionnaire</p>
                <h3 className="mt-1 text-xl font-bold">Start weekly questions</h3>
              </div>
              <span className="text-2xl">→</span>
            </div>
          </a>

          <a
            href="/daypet"
            className="rounded-3xl border border-white/10 bg-white/5 px-5 py-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-white/50">Daypet</p>
                <h3 className="mt-1 text-xl font-bold">Talk to your companion</h3>
              </div>
              <span className="text-2xl text-white/70">→</span>
            </div>
          </a>

          <a
            href="/match"
            className="rounded-3xl border border-white/10 bg-white/5 px-5 py-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-white/50">Match</p>
                <h3 className="mt-1 text-xl font-bold">See this week’s result</h3>
              </div>
              <span className="text-2xl text-white/70">→</span>
            </div>
          </a>
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm font-medium text-white/55">Progress</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/3 rounded-full bg-white" />
          </div>
          <p className="mt-3 text-sm text-white/65">
            1 of 3 weekly steps completed.
          </p>
        </section>
      </div>
    </main>
  );
}