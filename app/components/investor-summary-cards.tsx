type InvestorSummaryCardsProps = {
  totalCurrentValue: number
  totalCost: number
  totalPnlAmount: number
}

const moneyFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 2,
})

export const InvestorSummaryCards = ({
  totalCurrentValue,
  totalCost,
  totalPnlAmount,
}: InvestorSummaryCardsProps) => {
  const totalPnlColorClass = totalPnlAmount >= 0 ? "text-emerald-400" : "text-red-400"

  return (
    <section className="grid gap-3 md:grid-cols-3">
      <article className="rounded-xl border border-slate-700 bg-slate-900 p-4">
        <p className="text-sm text-slate-300">Toplam Anlik Deger</p>
        <p className="mt-2 text-2xl font-semibold text-white">
          {moneyFormatter.format(totalCurrentValue)}
        </p>
      </article>
      <article className="rounded-xl border border-slate-700 bg-slate-900 p-4">
        <p className="text-sm text-slate-300">Toplam Maliyet</p>
        <p className="mt-2 text-2xl font-semibold text-white">
          {moneyFormatter.format(totalCost)}
        </p>
      </article>
      <article className="rounded-xl border border-slate-700 bg-slate-900 p-4">
        <p className="text-sm text-slate-300">Gunluk Kar / Zarar</p>
        <p className={`mt-2 text-2xl font-semibold ${totalPnlColorClass}`}>
          {moneyFormatter.format(totalPnlAmount)}
        </p>
      </article>
    </section>
  )
}
