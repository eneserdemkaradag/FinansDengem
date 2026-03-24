import { AssetWithMetrics } from "@/lib/investor/types"
import { Fragment } from "react"
import { updateAssetDailyChangeAction } from "@/app/actions/investor"

type InvestorExcelTableProps = {
  assets: AssetWithMetrics[]
  darkSurface?: boolean
  dayLabels?: string[]
  dailyPercentBySymbol?: Record<string, number[]>
  editableDailyChange?: boolean
}

const formatTl = (value: number) => {
  const formatter = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `${formatter.format(value)} TL`
}

const formatPortfolio = (value: number) =>
  new Intl.NumberFormat("tr-TR", {
    maximumFractionDigits: 0,
  }).format(value)

export const InvestorExcelTable = ({
  assets,
  darkSurface = false,
  dayLabels,
  dailyPercentBySymbol = {},
  editableDailyChange = false,
}: InvestorExcelTableProps) => {
  const computedDayLabels = dayLabels?.length ? dayLabels : ["Bugun"]
  const assetRows = assets.map((asset) => {
    const customPercents = dailyPercentBySymbol[asset.symbol]
    const percents = customPercents?.length
      ? customPercents
      : [asset.pnl_percent, ...Array.from({ length: computedDayLabels.length - 1 }, () => asset.pnl_percent)]

    const dayValues = computedDayLabels.map((_, index) => {
      const dailyPercent = percents[index] ?? percents[0] ?? 0
      const price = asset.buy_price * (1 + dailyPercent / 100)
      const portfolio = asset.quantity * price
      const dailyPnL = (asset.quantity * asset.buy_price * dailyPercent) / 100

      return {
        dailyPercent,
        price,
        portfolio,
        dailyPnL,
      }
    })

    return {
      ...asset,
      dayValues,
    }
  })

  const summaryByDay = computedDayLabels.map((_, dayIndex) => {
    const totalPortfolio = assetRows.reduce(
      (accumulator, row) => accumulator + row.dayValues[dayIndex].portfolio,
      0
    )
    const totalPnl = assetRows.reduce((accumulator, row) => accumulator + row.dayValues[dayIndex].dailyPnL, 0)
    const totalCost = assetRows.reduce((accumulator, row) => accumulator + row.total_cost, 0)
    const totalReturnPercent = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0

    return {
      totalPortfolio,
      totalPnl,
      totalReturnPercent,
    }
  })
  const wrapperClass = darkSurface
    ? "mt-4 overflow-x-auto rounded border border-slate-700 bg-slate-900"
    : "mt-4 overflow-x-auto rounded border border-slate-600 bg-[#d9d9d9]"
  const headerClass = darkSurface ? "bg-slate-800 text-slate-200" : "bg-[#c8c8c8] text-black"
  const cellClass = darkSurface ? "bg-slate-800 text-slate-100" : "bg-[#efefef] text-black"
  const borderClass = darkSurface ? "border border-slate-700" : "border border-[#9a9a9a]"

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-4">
      <h2 className="text-lg font-semibold text-white">Yatirimci Izleme Tablosu</h2>
      <p className="mt-1 text-sm text-slate-300">
        Hisseler alt alta, gunluk degisimler sagdaki hucrelerde.
      </p>

      <div className={wrapperClass}>
        <table className="min-w-full border-collapse text-sm text-black">
          <thead>
            <tr className={headerClass}>
              <th className={`${borderClass} px-3 py-2 text-left`}>Hisse</th>
              {computedDayLabels.map((label) => (
                <Fragment key={label}>
                  <th className={`${borderClass} px-3 py-2 text-left`}>
                    Yuzdesel {label}
                  </th>
                  <th className={`${borderClass} px-3 py-2 text-left`}>
                    Fiyat {label}
                  </th>
                  <th className={`${borderClass} px-3 py-2 text-left`}>
                    Portfoy {label}
                  </th>
                </Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {assetRows.map((asset) => {
              return (
                <tr key={asset.id}>
                  <td className={`${borderClass} ${cellClass} px-3 py-2 font-medium`}>
                    {asset.symbol}
                  </td>
                  {asset.dayValues.map((dayValue, index) => {
                    const isPositive = dayValue.dailyPercent >= 0
                    const showEditableDailyPercent =
                      editableDailyChange && computedDayLabels.length === 1 && index === 0

                    return (
                      <Fragment key={`${asset.id}-${index}`}>
                        {showEditableDailyPercent ? (
                          <td className={`${borderClass} ${cellClass} px-3 py-2`}>
                            <form action={updateAssetDailyChangeAction} className="flex items-center gap-2">
                              <input type="hidden" name="id" value={asset.id} />
                              <input
                                name="dailyChangePercent"
                                type="number"
                                step="0.01"
                                defaultValue={dayValue.dailyPercent}
                                className="w-24 rounded border border-slate-600 bg-slate-800 px-2 py-1 text-xs text-slate-100"
                              />
                              <button
                                type="submit"
                                className="rounded border border-slate-600 px-2 py-1 text-xs text-slate-100 hover:bg-slate-800"
                              >
                                Kaydet
                              </button>
                            </form>
                          </td>
                        ) : (
                          <td
                            className={`${borderClass} px-3 py-2 font-semibold ${isPositive ? "bg-[#70ad47] text-black" : "bg-[#ff0000] text-white"}`}
                          >
                            {dayValue.dailyPercent.toFixed(2)}%
                          </td>
                        )}
                        <td className={`${borderClass} ${cellClass} px-3 py-2`}>
                          {formatTl(dayValue.price)}
                        </td>
                        <td className={`${borderClass} ${cellClass} px-3 py-2 font-medium`}>
                          {formatPortfolio(dayValue.portfolio)}
                        </td>
                      </Fragment>
                    )
                  })}
                </tr>
              )
            })}

            <tr>
              <td className={`${borderClass} ${cellClass} px-3 py-3 font-semibold`}>
                TOPLAM
              </td>
              {summaryByDay.map((summary, index) => (
                <Fragment key={`t-${index}`}>
                  <td className={`${borderClass} ${cellClass} px-3 py-3`}></td>
                  <td className={`${borderClass} ${cellClass} px-3 py-3`}></td>
                  <td className={`${borderClass} ${cellClass} px-3 py-3 font-semibold`}>
                    {formatPortfolio(summary.totalPortfolio)}
                  </td>
                </Fragment>
              ))}
            </tr>

            <tr>
              <td className={`${borderClass} ${cellClass} px-3 py-3 font-semibold`}>
                GETIRI
              </td>
              {summaryByDay.map((summary, index) => (
                <Fragment key={`g-${index}`}>
                  <td
                    className={`${borderClass} px-3 py-3 font-semibold ${summary.totalReturnPercent >= 0 ? "bg-[#70ad47] text-black" : "bg-[#ff0000] text-white"}`}
                  >
                    {summary.totalReturnPercent.toFixed(2)}%
                  </td>
                  <td className={`${borderClass} ${cellClass} px-3 py-3`}></td>
                  <td className={`${borderClass} ${cellClass} px-3 py-3`}></td>
                </Fragment>
              ))}
            </tr>

            <tr>
              <td className={`${borderClass} ${cellClass} px-3 py-3 font-semibold`}>
                TOPLAM GETIRI/ZARAR
              </td>
              {summaryByDay.map((summary, index) => (
                <Fragment key={`z-${index}`}>
                  <td className={`${borderClass} ${cellClass} px-3 py-3`}></td>
                  <td className={`${borderClass} ${cellClass} px-3 py-3`}></td>
                  <td className={`${borderClass} ${cellClass} px-3 py-3 font-semibold`}>
                    {formatTl(summary.totalPnl)}
                  </td>
                </Fragment>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
