import { ExpenseRow } from "@/lib/normal/types"

type DailySpendingTrackerProps = {
  expenses: ExpenseRow[]
}

const moneyFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 2,
})

export const DailySpendingTracker = ({ expenses }: DailySpendingTrackerProps) => {
  const categoryTotals = expenses.reduce<Record<string, number>>((accumulator, expense) => {
    const currentTotal = accumulator[expense.category] ?? 0
    accumulator[expense.category] = currentTotal + Number(expense.amount)
    return accumulator
  }, {})

  const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])

  return (
    <section className="rounded-2xl border border-[#1E3A8A] bg-[#FFFFFF] p-5">
      <h2 className="text-lg font-semibold text-[#1E3A8A]">Harcama Takip Alani</h2>
      <p className="mt-1 text-sm text-[#1E3A8A]">Kategorilere gore harcama dagilimini izle.</p>

      <ul className="mt-4 space-y-2">
        {sortedCategories.length ? (
          sortedCategories.map(([category, amount]) => (
            <li
              key={category}
              className="flex items-center justify-between rounded-lg border border-[#1E3A8A] px-3 py-2 text-sm text-[#1E3A8A]"
            >
              <span>{category}</span>
              <span className="font-medium text-[#EF4444]">{moneyFormatter.format(amount)}</span>
            </li>
          ))
        ) : (
          <li className="text-sm text-[#1E3A8A]">Henuz harcama kaydi yok.</li>
        )}
      </ul>
    </section>
  )
}
