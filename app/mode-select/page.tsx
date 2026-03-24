import Link from "next/link"

export default async function ModeSelectPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6 py-10">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Hangi modda başlamak istersin?</h1>
        <p className="mt-2 text-sm text-slate-600">
          İstediğin modu seç, sonrasında üstteki şalter ile anında değiştirebilirsin.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <Link
            href="/dashboard?mode=normal"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-5 text-left transition hover:bg-slate-100"
          >
            <p className="text-base font-semibold text-slate-900">Günlük Mod</p>
            <p className="mt-1 text-sm text-slate-600">Bütçe, gelir, harcama ve kalan bakiye</p>
          </Link>

          <Link
            href="/dashboard?mode=investor"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-5 text-left transition hover:bg-slate-800"
          >
            <p className="text-base font-semibold text-white">Yatırımcı Modu</p>
            <p className="mt-1 text-sm text-slate-300">Portföy, güncel değer, günlük kâr/zarar</p>
          </Link>
        </div>
      </section>
    </main>
  )
}
