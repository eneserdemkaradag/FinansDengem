"use client"

import { useMemo, useState } from "react"
import { InvestorExcelTable } from "@/app/components/investor-excel-table"
import { calculateCurrentPriceFromDailyPercent } from "@/lib/investor/price-service"
import { AssetType } from "@/lib/investor/types"

type DemoAsset = {
  id: string
  assetType: AssetType
  symbol: string
  quantity: number
  buyPrice: number
  dailyChangePercent: number
}

const moneyFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 2,
})

const numberFormatter = new Intl.NumberFormat("tr-TR", {
  maximumFractionDigits: 4,
})

export const DemoInvestorPanel = () => {
  const [assets, setAssets] = useState<DemoAsset[]>([
    { id: "a1", assetType: "hisse", symbol: "THYAO", quantity: 20, buyPrice: 292, dailyChangePercent: 2.1 },
    { id: "a2", assetType: "hisse", symbol: "ASELS", quantity: 12, buyPrice: 338, dailyChangePercent: -1.3 },
    { id: "a3", assetType: "hisse", symbol: "GARAN", quantity: 55, buyPrice: 132, dailyChangePercent: 0.8 },
    { id: "a4", assetType: "altin", symbol: "XAU_TRY", quantity: 8, buyPrice: 4090, dailyChangePercent: -0.4 },
    { id: "a5", assetType: "doviz", symbol: "USD_TRY", quantity: 350, buyPrice: 38.1, dailyChangePercent: 0.6 },
  ])
  const [assetType, setAssetType] = useState<AssetType>("hisse")
  const [symbol, setSymbol] = useState("")
  const [quantity, setQuantity] = useState("")
  const [buyPrice, setBuyPrice] = useState("")
  const [dailyChangePercent, setDailyChangePercent] = useState("")
  const dayLabels = ["23 Subat", "24 Subat", "25 Subat", "26 Subat", "27 Subat"]
  const dailyPercentBySymbol: Record<string, number[]> = {
    THYAO: [-2.35, -1.04, 3.6, -0.66, -1.42],
    ASELS: [1.08, 1.28, -0.16, 0.66, 1.63],
    GARAN: [0.45, -0.51, 1.33, -0.78, 0.92],
    XAU_TRY: [-2.83, -2.71, 0.21, 2.75, -1.08],
    USD_TRY: [1.09, 0.17, -0.44, 0.48, 0.36],
  }

  const mappedAssets = useMemo(
    () =>
      assets.map((asset) => {
        const currentPrice = calculateCurrentPriceFromDailyPercent(
          asset.buyPrice,
          asset.dailyChangePercent
        )
        const totalCost = asset.quantity * asset.buyPrice
        const pnlAmount = (totalCost * asset.dailyChangePercent) / 100
        const totalCurrentValue = totalCost + pnlAmount
        const pnlPercent = asset.dailyChangePercent

        return {
          ...asset,
          currentPrice,
          totalCost,
          totalCurrentValue,
          pnlAmount,
          pnlPercent,
        }
      }),
    [assets]
  )

  const totalCurrentValue = mappedAssets.reduce(
    (accumulator, item) => accumulator + item.totalCurrentValue,
    0
  )
  const totalCost = mappedAssets.reduce((accumulator, item) => accumulator + item.totalCost, 0)
  const totalPnlAmount = mappedAssets.reduce((accumulator, item) => accumulator + item.pnlAmount, 0)

  const handleAddAsset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const parsedQuantity = Number(quantity)
    const parsedBuyPrice = Number(buyPrice)
    const parsedDailyChangePercent = Number(dailyChangePercent)
    if (
      !symbol.trim() ||
      !Number.isFinite(parsedQuantity) ||
      !Number.isFinite(parsedBuyPrice) ||
      !Number.isFinite(parsedDailyChangePercent)
    ) return
    if (parsedQuantity <= 0 || parsedBuyPrice <= 0) return

    setAssets((previous) => [
      {
        id: crypto.randomUUID(),
        assetType,
        symbol: symbol.trim().toLocaleUpperCase("tr-TR"),
        quantity: parsedQuantity,
        buyPrice: parsedBuyPrice,
        dailyChangePercent: parsedDailyChangePercent,
      },
      ...previous,
    ])

    setSymbol("")
    setQuantity("")
    setBuyPrice("")
    setDailyChangePercent("")
    setAssetType("hisse")
  }

  const handleDeleteAsset = (id: string) => {
    setAssets((previous) => previous.filter((item) => item.id !== id))
  }

  return (
    <>
      <section className="mt-6 grid gap-3 md:grid-cols-3">
        <article className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <p className="text-sm text-slate-300">Toplam Anlik Deger</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {moneyFormatter.format(totalCurrentValue)}
          </p>
        </article>
        <article className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <p className="text-sm text-slate-300">Toplam Maliyet</p>
          <p className="mt-2 text-2xl font-semibold text-white">{moneyFormatter.format(totalCost)}</p>
        </article>
        <article className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <p className="text-sm text-slate-300">Gunluk Kar / Zarar</p>
          <p className={`mt-2 text-2xl font-semibold ${totalPnlAmount >= 0 ? "text-emerald-400" : "text-red-400"}`}>
            {moneyFormatter.format(totalPnlAmount)}
          </p>
        </article>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-700 bg-slate-900 p-5">
        <h2 className="text-lg font-semibold text-white">Varlik Ekle (Demo)</h2>
        <form onSubmit={handleAddAsset} className="mt-4 grid gap-3 md:grid-cols-2">
          <select
            value={assetType}
            onChange={(event) => setAssetType(event.target.value as AssetType)}
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100"
          >
            <option value="hisse">Hisse</option>
            <option value="altin">Altin</option>
            <option value="doviz">Doviz</option>
          </select>
          <input
            value={symbol}
            onChange={(event) => setSymbol(event.target.value)}
            placeholder="THYAO, XAU_TRY, USD_TRY"
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100"
          />
          <input
            type="number"
            min="0.0001"
            step="0.0001"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            placeholder="Miktar / Lot"
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100"
          />
          <input
            type="number"
            min="0.0001"
            step="0.0001"
            value={buyPrice}
            onChange={(event) => setBuyPrice(event.target.value)}
            placeholder="Alis Fiyati"
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100"
          />
          <input
            type="number"
            step="0.01"
            value={dailyChangePercent}
            onChange={(event) => setDailyChangePercent(event.target.value)}
            placeholder="Gunluk Degisim (%)"
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100"
          />
          <button
            type="submit"
            className="rounded-lg bg-emerald-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-emerald-400 md:col-span-2"
          >
            Varligi Ekle
          </button>
        </form>
      </section>

      <section className="mt-6 overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900 p-3">
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
            {mappedAssets.map((asset) => (
              <tr key={asset.id} className="border-b border-slate-800">
                <td className="px-2 py-3 capitalize">{asset.assetType}</td>
                <td className="px-2 py-3 font-medium">{asset.symbol}</td>
                <td className="px-2 py-3">{numberFormatter.format(asset.quantity)}</td>
                <td className="px-2 py-3">{moneyFormatter.format(asset.buyPrice)}</td>
                <td className="px-2 py-3">{moneyFormatter.format(asset.currentPrice)}</td>
                <td className="px-2 py-3">{moneyFormatter.format(asset.totalCurrentValue)}</td>
                <td className={`px-2 py-3 font-medium ${asset.pnlAmount >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {moneyFormatter.format(asset.pnlAmount)} ({asset.pnlPercent.toFixed(2)}%)
                </td>
                <td className="px-2 py-3">
                  <button
                    type="button"
                    onClick={() => handleDeleteAsset(asset.id)}
                    className="rounded-md border border-slate-600 px-2 py-1 text-xs text-slate-200 transition hover:bg-slate-800"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-6">
        <InvestorExcelTable
          darkSurface
          dayLabels={dayLabels}
          dailyPercentBySymbol={dailyPercentBySymbol}
          assets={mappedAssets.map((asset) => ({
            id: asset.id,
            user_id: "demo",
            asset_type: asset.assetType,
            symbol: asset.symbol,
            quantity: asset.quantity,
            buy_price: asset.buyPrice,
            daily_change_percent: asset.dailyChangePercent,
            created_at: new Date().toISOString(),
            current_price: asset.currentPrice,
            total_cost: asset.totalCost,
            total_current_value: asset.totalCurrentValue,
            pnl_amount: asset.pnlAmount,
            pnl_percent: asset.pnlPercent,
          }))}
        />
      </section>
    </>
  )
}
