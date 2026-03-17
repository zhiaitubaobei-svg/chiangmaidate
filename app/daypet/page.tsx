

export default function DaypetPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-sm flex-col">
        <header>
          <p className="text-sm uppercase tracking-[0.3em] text-white/40">
            Daypet
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight">
            Your daily companion
          </h1>
          <p className="mt-3 text-sm leading-6 text-white/65">
            Check in, talk a little, and build momentum before your weekly match.
          </p>
        </header>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/50">Today&apos;s mood</p>
          <h2 className="mt-2 text-2xl font-semibold">Calm and curious</h2>
          <p className="mt-3 text-sm leading-6 text-white/65">
            Daypet is ready to talk with you and reflect your emotional rhythm this week.
          </p>
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/50">Conversation</p>
          <div className="mt-4 rounded-2xl bg-white/5 p-4">
            <p className="text-sm leading-6 text-white/80">
              Hi, I&apos;m Daypet. Tell me how your week has felt so far.
            </p>
          </div>
          <button className="mt-5 w-full rounded-full bg-white py-4 text-base font-semibold text-black">
            Start chatting
          </button>
        </section>

        <a
          href="/match"
          className="mt-6 rounded-3xl border border-white/10 bg-white/5 px-5 py-5"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-white/50">Next</p>
              <h3 className="mt-1 text-xl font-bold">Go to match result</h3>
            </div>
            <span className="text-2xl text-white/70">→</span>
          </div>
        </a>
      </div>
    </main>
  );
}