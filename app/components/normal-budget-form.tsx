import { upsertBudgetAction } from "@/app/actions/normal"

type NormalBudgetFormProps = {
  monthlyIncome: number
}

export const NormalBudgetForm = ({ monthlyIncome }: NormalBudgetFormProps) => {
  return (
    <section className="rounded-2xl border border-[#1E3A8A] bg-[#FFFFFF] p-5">
      <h2 className="text-lg font-semibold text-[#1E3A8A]">Aylik Gelir Tanimla</h2>
      <p className="mt-1 text-sm text-[#1E3A8A]">
        Bu ay icin kullanacagin toplam geliri gir. Kayit ayni ay icin guncellenir.
      </p>

      <form action={upsertBudgetAction} className="mt-4 flex flex-col gap-3 md:flex-row">
        <input
          id="monthlyIncome"
          name="monthlyIncome"
          type="number"
          min="0"
          step="0.01"
          required
          defaultValue={monthlyIncome}
          className="w-full rounded-lg border border-[#1E3A8A] bg-[#FFFFFF] px-3 py-2 text-[#1E3A8A]"
        />
        <button
          type="submit"
          className="rounded-lg border border-[#1E3A8A] bg-[#FFFFFF] px-4 py-2 text-sm font-medium text-[#1E3A8A] transition hover:opacity-90"
        >
          Geliri Kaydet
        </button>
      </form>
    </section>
  )
}
