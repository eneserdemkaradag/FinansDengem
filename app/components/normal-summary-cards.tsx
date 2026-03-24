type NormalSummaryCardsProps = {
  totalIncome: number
  totalExpenses: number
  remainingBudget: number
}

const moneyFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 2,
})

export const NormalSummaryCards = ({
  totalIncome,
  totalExpenses,
  remainingBudget,
}: NormalSummaryCardsProps) => {
  const remainingClass = "text-[#1E3A8A]"

  return (
    <section className="grid gap-3 md:grid-cols-3">
      <article className="rounded-xl border border-[#1E3A8A] bg-[#FFFFFF] p-4">
        <p className="text-sm text-[#1E3A8A]">Toplam Gelir</p>
        <p className="mt-2 text-2xl font-semibold text-[#1E3A8A]">
          {moneyFormatter.format(totalIncome)}
        </p>
      </article>
      <article className="rounded-xl border border-[#1E3A8A] bg-[#FFFFFF] p-4">
        <p className="text-sm text-[#1E3A8A]">Toplam Harcama</p>
        <p className="mt-2 text-2xl font-semibold text-[#1E3A8A]">
          {moneyFormatter.format(totalExpenses)}
        </p>
      </article>
      <article className="rounded-xl border border-[#1E3A8A] bg-[#FFFFFF] p-4">
        <p className="text-sm text-[#1E3A8A]">Kalan Butce</p>
        <p className={`mt-2 text-2xl font-semibold ${remainingClass}`}>
          {moneyFormatter.format(remainingBudget)}
        </p>
      </article>
    </section>
  )
}
