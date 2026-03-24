import Link from "next/link"

type AuthFormProps = {
  title: string
  description: string
  submitLabel: string
  action: (formData: FormData) => Promise<void>
  alternateText: string
  alternateHref: string
  alternateLabel: string
  error?: string
  success?: string
}

export const AuthForm = ({
  title,
  description,
  submitLabel,
  action,
  alternateText,
  alternateHref,
  alternateLabel,
  error,
  success,
}: AuthFormProps) => {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-10">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        <p className="mt-2 text-sm text-slate-600">{description}</p>

        {error ? (
          <p
            className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
            aria-live="polite"
          >
            {error}
          </p>
        ) : null}

        {success ? (
          <p
            className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
            aria-live="polite"
          >
            {success}
          </p>
        ) : null}

        <form action={action} className="mt-6 space-y-4">
          <label className="block text-sm text-slate-700" htmlFor="email">
            E-posta
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-0 transition focus:border-slate-500"
          />

          <label className="block text-sm text-slate-700" htmlFor="password">
            Şifre
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete="current-password"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-0 transition focus:border-slate-500"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            {submitLabel}
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-600">
          {alternateText}{" "}
          <Link className="font-medium text-slate-900 underline" href={alternateHref}>
            {alternateLabel}
          </Link>
        </p>
      </section>
    </main>
  )
}
