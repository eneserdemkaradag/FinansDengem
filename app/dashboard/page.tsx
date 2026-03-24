import { signOutAction } from "@/app/actions/auth"
import Link from "next/link"
import { DailySpendingTracker } from "@/app/components/daily-spending-tracker"
import { DemoInvestorPanel } from "@/app/components/demo-investor-panel"
import { InvestorAssetForm } from "@/app/components/investor-asset-form"
import { InvestorExcelTable } from "@/app/components/investor-excel-table"
import { InvestorSummaryCards } from "@/app/components/investor-summary-cards"
import { ModeSwitcher } from "@/app/components/mode-switcher"
import { DemoNormalPanel } from "@/app/components/demo-normal-panel"
import { NormalBudgetForm } from "@/app/components/normal-budget-form"
import { NormalExpenseForm } from "@/app/components/normal-expense-form"
import { NormalExpensesTable } from "@/app/components/normal-expenses-table"
import { NormalSummaryCards } from "@/app/components/normal-summary-cards"
import { calculateBudgetTotals, calculateInvestorTotals } from "@/lib/finance/calculations"
import { calculateCurrentPriceFromDailyPercent } from "@/lib/investor/price-service"
import { AssetRow, AssetWithMetrics } from "@/lib/investor/types"
import { BudgetRow, ExpenseRow } from "@/lib/normal/types"
import { createSupabaseServerClient } from "@/lib/supabase/server"

type SearchParams = Promise<Record<string, string | string[] | undefined>>

const getQueryValue = (value: string | string[] | undefined) => {
  if (!value) return undefined
  return Array.isArray(value) ? value[0] : value
}

const mapAssetsWithMetrics = (assets: AssetRow[]): AssetWithMetrics[] =>
  assets.map((asset) => {
    const totalCost = Number(asset.quantity) * Number(asset.buy_price)
    const dailyPercent = Number(asset.daily_change_percent) || 0
    const dailyPnlAmount = (totalCost * dailyPercent) / 100
    const totalCurrentValue = totalCost + dailyPnlAmount
    const currentPrice = calculateCurrentPriceFromDailyPercent(Number(asset.buy_price), dailyPercent)

    return {
      ...asset,
      current_price: currentPrice,
      total_cost: totalCost,
      total_current_value: totalCurrentValue,
      pnl_amount: dailyPnlAmount,
      pnl_percent: dailyPercent,
    }
  })

export default async function DashboardPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const requestedMode = getQueryValue(searchParams.mode)
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const isDemoMode = !user

  const { data: profile } = isDemoMode
    ? { data: null }
    : await supabase.from("profiles").select("active_mode").maybeSingle()

  const demoActiveMode = requestedMode === "investor" ? "investor" : "normal"

  if (!profile?.active_mode && !isDemoMode) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6 py-10">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Mod seçimi gerekiyor</h1>
          <p className="mt-2 text-sm text-slate-600">
            Önce başlangıç modunu seç, sonra dashboard açılır.
          </p>
          <Link
            href="/mode-select"
            className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Mod seçimine git
          </Link>
        </section>
      </main>
    )
  }

  const activeMode = isDemoMode
    ? demoActiveMode
    : (profile?.active_mode as "investor" | "normal")

  const { data, error } = isDemoMode
    ? { data: [], error: null }
    : await supabase
        .from("assets")
        .select("id,user_id,asset_type,symbol,quantity,buy_price,daily_change_percent,created_at")
        .order("created_at", { ascending: false })
  const monthKey = new Date().toISOString().slice(0, 7)
  const { data: budgetData, error: budgetError } = isDemoMode
    ? { data: null, error: null }
    : await supabase
        .from("budgets")
        .select("id,user_id,monthly_income,month_key,created_at,updated_at")
        .eq("month_key", monthKey)
        .maybeSingle()
  const { data: expensesData, error: expensesError } = isDemoMode
    ? { data: [], error: null }
    : await supabase
        .from("expenses")
        .select("id,user_id,title,amount,category,expense_date,created_at")
        .order("expense_date", { ascending: false })

  const demoAssets: AssetRow[] = [
    {
      id: "d1",
      user_id: "demo",
      asset_type: "hisse",
      symbol: "THYAO",
      quantity: 10,
      buy_price: 300,
      daily_change_percent: 2.1,
      created_at: new Date().toISOString(),
    },
    {
      id: "d2",
      user_id: "demo",
      asset_type: "doviz",
      symbol: "USD_TRY",
      quantity: 200,
      buy_price: 36,
      daily_change_percent: -0.6,
      created_at: new Date().toISOString(),
    },
  ]

  const demoExpenses: ExpenseRow[] = [
    {
      id: "e1",
      user_id: "demo",
      title: "Market",
      amount: 750,
      category: "Yemek",
      expense_date: new Date().toISOString().slice(0, 10),
      created_at: new Date().toISOString(),
    },
    {
      id: "e2",
      user_id: "demo",
      title: "Kahve",
      amount: 120,
      category: "Eglence",
      expense_date: new Date().toISOString().slice(0, 10),
      created_at: new Date().toISOString(),
    },
  ]

  const assets = (isDemoMode ? demoAssets : (data ?? [])) as AssetRow[]
  const mappedAssets = mapAssetsWithMetrics(assets)
  const budget = (isDemoMode
    ? { monthly_income: 15000 }
    : budgetData) as Pick<BudgetRow, "monthly_income"> | null
  const expenses = (isDemoMode ? demoExpenses : (expensesData ?? [])) as ExpenseRow[]

  const { totalCurrentValue, totalCost, totalPnlAmount } = calculateInvestorTotals(mappedAssets)
  const { totalIncome, totalExpenses, remainingBudget } = calculateBudgetTotals(
    Number(budget?.monthly_income ?? 0),
    expenses
  )
  const isInvestorMode = activeMode === "investor"

  return (
    <main
      className={`mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 ${isInvestorMode ? "bg-slate-950" : "bg-[#FFFFFF] text-[#1E3A8A]"}`}
    >
      <header
        className={`flex items-center justify-between pb-4 ${isInvestorMode ? "border-b border-slate-800" : "border-b border-[#1E3A8A]"}`}
      >
        <div>
          <h1 className={`text-2xl font-semibold ${isInvestorMode ? "text-white" : "text-[#1E3A8A]"}`}>
            FinansDengem
          </h1>
          <p className={`text-sm ${isInvestorMode ? "text-slate-300" : "text-[#1E3A8A]"}`}>
            {isDemoMode ? "Demo kullanıcı" : `Hoş geldin, ${user?.email}`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isDemoMode ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard?mode=normal"
                className={`rounded-lg px-3 py-2 text-sm font-medium ${activeMode === "normal" ? "bg-white text-[#1E3A8A]" : "border border-[#1E3A8A] text-[#1E3A8A]"}`}
              >
                Günlük Mod
              </Link>
              <Link
                href="/dashboard?mode=investor"
                className={`rounded-lg px-3 py-2 text-sm font-medium ${activeMode === "investor" ? "bg-white text-slate-900" : "border border-slate-300 text-slate-700"}`}
              >
                Yatırımcı Modu
              </Link>
            </div>
          ) : (
            <>
              <ModeSwitcher activeMode={activeMode} />
              <form action={signOutAction}>
                <button
                  type="submit"
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${isInvestorMode ? "border border-slate-600 text-slate-200 hover:bg-slate-800" : "border border-[#1E3A8A] text-[#1E3A8A] hover:bg-slate-50"}`}
                >
                  Çıkış Yap
                </button>
              </form>
            </>
          )}
        </div>
      </header>

      {isDemoMode ? (
        <p
          className={`mt-4 rounded-lg px-3 py-2 text-sm ${isInvestorMode ? "bg-blue-500/15 text-blue-300" : "bg-blue-50 text-[#1E3A8A]"}`}
        >
          Demo önizleme modundasın. Giriş yapmadan ekranları inceleyebilirsin.
        </p>
      ) : null}

      {getQueryValue(searchParams.error) ? (
        <p className="mt-4 rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-300">
          {getQueryValue(searchParams.error)}
        </p>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-lg bg-amber-500/15 px-3 py-2 text-sm text-amber-300">
          Varlıklar okunamadı. `supabase/schema.sql` dosyasını Supabase SQL Editor&apos;de
          çalıştırdığından emin ol.
        </p>
      ) : null}

      {budgetError || expensesError ? (
        <p
          className={`mt-4 rounded-lg px-3 py-2 text-sm ${isInvestorMode ? "bg-amber-500/15 text-amber-300" : "bg-amber-50 text-[#1E3A8A]"}`}
        >
          Bütçe verileri okunamadı. `supabase/schema.sql` dosyasını tekrar çalıştırıp
          sayfayı yenile.
        </p>
      ) : null}

      {isInvestorMode ? (
        <>
          {isDemoMode ? (
            <DemoInvestorPanel />
          ) : (
            <>
              <section className="mt-6">
                <InvestorSummaryCards
                  totalCurrentValue={totalCurrentValue}
                  totalCost={totalCost}
                  totalPnlAmount={totalPnlAmount}
                />
              </section>

              <section className="mt-6">
                <InvestorAssetForm />
              </section>

              <section className="mt-6">
                <InvestorExcelTable assets={mappedAssets} editableDailyChange />
              </section>
            </>
          )}
        </>
      ) : (
        <>
          {isDemoMode ? (
            <DemoNormalPanel />
          ) : (
            <>
              <section className="mt-6">
                <NormalSummaryCards
                  totalIncome={totalIncome}
                  totalExpenses={totalExpenses}
                  remainingBudget={remainingBudget}
                />
              </section>

              <section className="mt-6">
                <NormalBudgetForm monthlyIncome={totalIncome} />
              </section>

              <section className="mt-6">
                <NormalExpenseForm />
              </section>

              <section className="mt-6">
                <NormalExpensesTable expenses={expenses} />
              </section>

              <section className="mt-6">
                <DailySpendingTracker expenses={expenses} />
              </section>
            </>
          )}
        </>
      )}
    </main>
  )
}
