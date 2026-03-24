import { deleteExpenseAction } from "@/app/actions/normal"
import { ExpenseRow } from "@/lib/normal/types"

type NormalExpensesTableProps = {
  expenses: ExpenseRow[]
}

const moneyFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 2,
})

export const NormalExpensesTable = ({ expenses }: NormalExpensesTableProps) => {
  if (!expenses.length) {
    return (
      <section className="rounded-2xl border border-[#1E3A8A] bg-[#FFFFFF] p-5">
        <h2 className="text-lg font-semibold text-[#1E3A8A]">Harcama Kayitlari</h2>
        <p className="mt-2 text-sm text-[#1E3A8A]">Henuz harcama eklenmedi.</p>
      </section>
    )
  }

  return (
    <section className="overflow-x-auto rounded-2xl border border-[#1E3A8A] bg-[#FFFFFF] p-3">
      <table className="min-w-full text-left text-sm text-[#1E3A8A]">
        <thead>
          <tr className="border-b border-[#1E3A8A] text-[#1E3A8A]">
            <th className="px-2 py-2">Tarih</th>
            <th className="px-2 py-2">Aciklama</th>
            <th className="px-2 py-2">Kategori</th>
            <th className="px-2 py-2">Tutar</th>
            <th className="px-2 py-2">Islem</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="border-b border-[#1E3A8A]">
              <td className="px-2 py-3">{expense.expense_date}</td>
              <td className="px-2 py-3 font-medium">{expense.title}</td>
              <td className="px-2 py-3">{expense.category}</td>
              <td className="px-2 py-3 font-semibold text-[#EF4444]">
                {moneyFormatter.format(expense.amount)}
              </td>
              <td className="px-2 py-3">
                <form action={deleteExpenseAction}>
                  <input type="hidden" name="id" value={expense.id} />
                  <button
                    type="submit"
                    className="rounded-md border border-[#1E3A8A] px-2 py-1 text-xs text-[#1E3A8A] transition hover:opacity-90"
                  >
                    Sil
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
