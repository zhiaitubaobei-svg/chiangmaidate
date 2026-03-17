export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center">Login</h1>

        <div className="mt-8 flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/40"
          />

          <input
            type="password"
            placeholder="Password"
            className="rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/40"
          />

          <button className="mt-4 rounded-full bg-white text-black py-3 font-semibold">
            Sign in
          </button>

          <button className="text-sm text-white/60">
            Create account
          </button>
        </div>
      </div>
    </main>
  );
}