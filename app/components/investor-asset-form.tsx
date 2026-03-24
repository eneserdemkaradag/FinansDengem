import { addAssetAction } from "@/app/actions/investor"

export const InvestorAssetForm = () => {
  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
      <h2 className="text-lg font-semibold text-white">Varlik Ekle</h2>
      <p className="mt-1 text-sm text-slate-300">
        Hisse, altin veya doviz pozisyonunu ekleyerek anlik kar/zararini gor.
      </p>

      <form action={addAssetAction} className="mt-4 grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-slate-200" htmlFor="assetType">
            Varlik Tipi
          </label>
          <select
            id="assetType"
            name="assetType"
            required
            defaultValue="hisse"
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100"
          >
            <option value="hisse">Hisse</option>
            <option value="altin">Altin</option>
            <option value="doviz">Doviz</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-200" htmlFor="symbol">
            Sembol / Kod
          </label>
          <input
            id="symbol"
            name="symbol"
            required
            placeholder="THYAO, XAU_TRY, USD_TRY"
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100 placeholder:text-slate-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-200" htmlFor="quantity">
            Miktar / Lot
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            required
            min="0.0001"
            step="0.0001"
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-200" htmlFor="buyPrice">
            Alis Fiyati
          </label>
          <input
            id="buyPrice"
            name="buyPrice"
            type="number"
            required
            min="0.0001"
            step="0.0001"
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-200" htmlFor="dailyChangePercent">
            Gunluk Degisim (%)
          </label>
          <input
            id="dailyChangePercent"
            name="dailyChangePercent"
            type="number"
            required
            step="0.01"
            placeholder="Orn: 2.5 veya -1.2"
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100"
          />
        </div>

        <button
          type="submit"
          className="md:col-span-2 rounded-lg bg-emerald-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-emerald-400"
        >
          Varligi Kaydet
        </button>
      </form>
    </section>
  )
}
