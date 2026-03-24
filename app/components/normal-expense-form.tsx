import { addExpenseAction } from "@/app/actions/normal"

export const NormalExpenseForm = () => {
  const today = new Date().toISOString().slice(0, 10)

  return (
    <section className="rounded-2xl border border-[#1E3A8A] bg-[#FFFFFF] p-5">
      <h2 className="text-lg font-semibold text-[#1E3A8A]">Harcama Ekle</h2>
      <p className="mt-1 text-sm text-[#1E3A8A]">
        Aciklama, tutar ve kategori secerek gunluk harcamani kaydet.
      </p>

      <form action={addExpenseAction} className="mt-4 grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-[#1E3A8A]" htmlFor="title">
            Aciklama
          </label>
          <input
            id="title"
            name="title"
            required
            placeholder="Starbucks, Market, Fatura"
            className="w-full rounded-lg border border-[#1E3A8A] bg-[#FFFFFF] px-3 py-2 text-[#1E3A8A]"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-[#1E3A8A]" htmlFor="amount">
            Tutar
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            min="0.01"
            step="0.01"
            required
            className="w-full rounded-lg border border-[#1E3A8A] bg-[#FFFFFF] px-3 py-2 text-[#1E3A8A]"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-[#1E3A8A]" htmlFor="category">
            Kategori
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue="Yemek"
            className="w-full rounded-lg border border-[#1E3A8A] bg-[#FFFFFF] px-3 py-2 text-[#1E3A8A]"
          >
            <option value="Yemek">Yemek</option>
            <option value="Kira">Kira</option>
            <option value="Eglence">Eglence</option>
            <option value="Borc">Borc</option>
            <option value="Diger">Diger</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm text-[#1E3A8A]" htmlFor="expenseDate">
            Tarih
          </label>
          <input
            id="expenseDate"
            name="expenseDate"
            type="date"
            required
            defaultValue={today}
            className="w-full rounded-lg border border-[#1E3A8A] bg-[#FFFFFF] px-3 py-2 text-[#1E3A8A]"
          />
        </div>

        <button
          type="submit"
          className="md:col-span-2 rounded-lg border border-[#1E3A8A] bg-[#FFFFFF] px-4 py-2 text-sm font-medium text-[#1E3A8A] transition hover:opacity-90"
        >
          Harcamayi Kaydet
        </button>
      </form>
    </section>
  )
}
