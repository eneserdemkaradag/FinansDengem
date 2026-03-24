import { AssetWithMetrics } from "@/lib/investor/types"

type InvestorChangeTrackerProps = {
  assets: AssetWithMetrics[]
}

const moneyFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 2,
})

export const InvestorChangeTracker = ({ assets }: InvestorChangeTrackerProps) => {
  const sortedAssets = [...assets].sort((a, b) => a.symbol.localeCompare(b.symbol))

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
      <h2 className="text-lg font-semibold text-white">Gunluk Degisim Takibi</h2>
      <p className="mt-1 text-sm text-slate-300">
        Excel tablo duzeni: varliklar alt alta, sag tarafta gunluk degisim kolonlari.
      </p>

      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-700">
        <table className="min-w-full text-left text-sm text-slate-200">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="px-3 py-2">Varlik</th>
              <th className="px-3 py-2">Tip</th>
              <th className="px-3 py-2 text-right">Miktar</th>
              <th className="px-3 py-2 text-right">Gunluk Degisim (%)</th>
              <th className="px-3 py-2 text-right">Gunluk Degisim (TL)</th>
            </tr>
          </thead>
          <tbody>
            {sortedAssets.length ? (
              sortedAssets.map((asset) => {
                const changeClass =
                  asset.pnl_percent >= 0 ? "text-emerald-400" : "text-red-400"

                return (
                  <tr key={asset.id} className="border-t border-slate-800">
                    <td className="px-3 py-2 font-medium">{asset.symbol}</td>
                    <td className="px-3 py-2 capitalize">{asset.asset_type}</td>
                    <td className="px-3 py-2 text-right">{asset.quantity.toFixed(4)}</td>
                    <td className={`px-3 py-2 text-right font-medium ${changeClass}`}>
                      {asset.pnl_percent.toFixed(2)}%
                    </td>
                    <td className={`px-3 py-2 text-right font-medium ${changeClass}`}>
                      {moneyFormatter.format(asset.pnl_amount)}
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td className="px-3 py-3 text-slate-400" colSpan={5}>
                  Izlenecek varlik yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
