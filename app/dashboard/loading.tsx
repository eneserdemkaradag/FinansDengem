export default function DashboardLoading() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col bg-slate-50 px-6 py-8">
      <div className="h-10 w-56 animate-pulse rounded bg-slate-200" />
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <div className="h-28 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-28 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-28 animate-pulse rounded-xl bg-slate-200" />
      </div>
    </main>
  )
}
