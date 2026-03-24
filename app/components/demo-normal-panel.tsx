"use client"

import { useMemo, useState } from "react"

type DemoExpense = {
  id: string
  title: string
  amount: number
  category: "Yemek" | "Kira" | "Eglence" | "Borc" | "Diger"
  expenseDate: string
}

const moneyFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 2,
})

export const DemoNormalPanel = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(15000)
  const [expenses, setExpenses] = useState<DemoExpense[]>([
    {
      id: "d1",
      title: "Market",
      amount: 750,
      category: "Yemek",
      expenseDate: new Date().toISOString().slice(0, 10),
    },
    {
      id: "d2",
      title: "Kahve",
      amount: 120,
      category: "Eglence",
      expenseDate: new Date().toISOString().slice(0, 10),
    },
  ])

  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState<DemoExpense["category"]>("Yemek")
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().slice(0, 10))

  const totalExpenses = useMemo(
    () => expenses.reduce((accumulator, item) => accumulator + item.amount, 0),
    [expenses]
  )
  const remainingBudget = monthlyIncome - totalExpenses

  const handleAddExpense = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const parsedAmount = Number(amount)
    if (!title.trim() || !Number.isFinite(parsedAmount) || parsedAmount <= 0) return

    setExpenses((previous) => [
      {
        id: crypto.randomUUID(),
        title: title.trim(),
        amount: parsedAmount,
        category,
        expenseDate,
      },
      ...previous,
    ])

    setTitle("")
    setAmount("")
    setCategory("Yemek")
    setExpenseDate(new Date().toISOString().slice(0, 10))
  }

  const handleDeleteExpense = (id: string) => {
    setExpenses((previous) => previous.filter((item) => item.id !== id))
  }

  return (
    <>
      <section className="mt-6 grid gap-3 md:grid-cols-3">
        <article className="rounded-xl border border-[#1E3A8A] bg-[#FFFFFF] p-4">
          <p className="text-sm text-[#1E3A8A]">Toplam Gelir</p>
          <p className="mt-2 text-2xl font-semibold text-[#1E3A8A]">
            {moneyFormatter.format(monthlyIncome)}
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
          <p className="mt-2 text-2xl font-semibold text-[#1E3A8A]">
            {moneyFormatter.format(remainingBudget)}
          </p>
        </article>
      </section>

      <section className="mt-6 rounded-2xl border border-[#1E3A8A] bg-[#FFFFFF] p-5">
        <h2 className="text-lg font-semibold text-[#1E3A8A]">Aylik Gelir Tanimla (Demo)</h2>
        <div className="mt-4 flex flex-col gap-3 md:flex-row">
          <input
            type="number"
            min="0"
            step="0.01"
            value={monthlyIncome}
            onChange={(event) => setMonthlyIncome(Number(event.target.value) || 0)}
            className="w-full rounded-lg border border-[#1E3A8A] bg-[#FFFFFF] px-3 py-2 text-[#1E3A8A]"
          />
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-[#1E3A8A] bg-[#FFFFFF] p-5">
        <h2 className="text-lg font-semibold text-[#1E3A8A]">Harcama Ekle (Demo)</h2>
        <form onSubmit={handleAddExpense} className="mt-4 grid gap-3 md:grid-cols-2">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Aciklama"
            className="w-full rounded-lg border border-[#1E3A8A] bg-[#FFFFFF] px-3 py-2 text-[#1E3A8A]"
          />
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Tutar"
            className="w-full rounded-lg border border-[#1E3A8A] bg-[#FFFFFF] px-3 py-2 text-[#1E3A8A]"
          />
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as DemoExpense["category"])}
            className="w-full rounded-lg border border-[#1E3A8A] bg-[#FFFFFF] px-3 py-2 text-[#1E3A8A]"
          >
            <option value="Yemek">Yemek</option>
            <option value="Kira">Kira</option>
            <option value="Eglence">Eglence</option>
            <option value="Borc">Borc</option>
            <option value="Diger">Diger</option>
          </select>
          <input
            type="date"
            value={expenseDate}
            onChange={(event) => setExpenseDate(event.target.value)}
            className="w-full rounded-lg border border-[#1E3A8A] bg-[#FFFFFF] px-3 py-2 text-[#1E3A8A]"
          />
          <button
            type="submit"
            className="md:col-span-2 rounded-lg border border-[#1E3A8A] bg-[#FFFFFF] px-4 py-2 text-sm font-medium text-[#1E3A8A] transition hover:opacity-90"
          >
            Harcamayi Ekle
          </button>
        </form>
      </section>

      <section className="mt-6 overflow-x-auto rounded-2xl border border-[#1E3A8A] bg-[#FFFFFF] p-3">
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
                <td className="px-2 py-3">{expense.expenseDate}</td>
                <td className="px-2 py-3 font-medium">{expense.title}</td>
                <td className="px-2 py-3">{expense.category}</td>
                <td className="px-2 py-3 font-semibold text-[#EF4444]">
                  {moneyFormatter.format(expense.amount)}
                </td>
                <td className="px-2 py-3">
                  <button
                    type="button"
                    onClick={() => handleDeleteExpense(expense.id)}
                    className="rounded-md border border-[#1E3A8A] px-2 py-1 text-xs text-[#1E3A8A] transition hover:opacity-90"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}
