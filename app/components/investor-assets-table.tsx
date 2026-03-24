import { deleteAssetAction } from "@/app/actions/investor"
import { AssetWithMetrics } from "@/lib/investor/types"

type InvestorAssetsTableProps = {
  assets: AssetWithMetrics[]
}

const moneyFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 2,
})

const numberFormatter = new Intl.NumberFormat("tr-TR", {
  maximumFractionDigits: 4,
})

export const InvestorAssetsTable = ({ assets }: InvestorAssetsTableProps) => {
  if (!assets.length) {
    return (
      <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
        <h2 className="text-lg font-semibold text-white">Portfoy Varliklari</h2>
        <p className="mt-2 text-sm text-slate-300">
          Henuz varlik eklemedin. Ustteki formdan ilk kaydini yapabilirsin.
        </p>
      </section>
    )
  }

  return (
    <section className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900 p-3">
      <table className="min-w-full text-left text-sm text-slate-200">
        <thead>
          <tr className="border-b border-slate-700 text-slate-300">
            <th className="px-2 py-2">Tip</th>
            <th className="px-2 py-2">Sembol</th>
            <th className="px-2 py-2">Miktar</th>
            <th className="px-2 py-2">Alis</th>
            <th className="px-2 py-2">Guncel</th>
            <th className="px-2 py-2">Deger</th>
            <th className="px-2 py-2">Gunluk K/Z</th>
            <th className="px-2 py-2">Islem</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => {
            const pnlClass = asset.pnl_amount >= 0 ? "text-emerald-400" : "text-red-400"

            return (
              <tr key={asset.id} className="border-b border-slate-800">
                <td className="px-2 py-3 capitalize">{asset.asset_type}</td>
                <td className="px-2 py-3 font-medium">{asset.symbol}</td>
                <td className="px-2 py-3">{numberFormatter.format(asset.quantity)}</td>
                <td className="px-2 py-3">{moneyFormatter.format(asset.buy_price)}</td>
                <td className="px-2 py-3">{moneyFormatter.format(asset.current_price)}</td>
                <td className="px-2 py-3">{moneyFormatter.format(asset.total_current_value)}</td>
                <td className={`px-2 py-3 font-medium ${pnlClass}`}>
                  {moneyFormatter.format(asset.pnl_amount)} ({asset.pnl_percent.toFixed(2)}%)
                </td>
                <td className="px-2 py-3">
                  <form action={deleteAssetAction}>
                    <input type="hidden" name="id" value={asset.id} />
                    <button
                      type="submit"
                      className="rounded-md border border-slate-600 px-2 py-1 text-xs text-slate-200 transition hover:bg-slate-800"
                    >
                      Sil
                    </button>
                  </form>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
