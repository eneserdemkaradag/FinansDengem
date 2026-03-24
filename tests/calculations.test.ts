import { describe, expect, it } from "vitest"
import { calculateBudgetTotals, calculateInvestorTotals } from "@/lib/finance/calculations"
import { AssetWithMetrics } from "@/lib/investor/types"
import { ExpenseRow } from "@/lib/normal/types"

describe("calculateInvestorTotals", () => {
  it("aggregates investor totals correctly", () => {
    const assets: AssetWithMetrics[] = [
      {
        id: "1",
        user_id: "u1",
        asset_type: "hisse",
        symbol: "THYAO",
        quantity: 10,
        buy_price: 100,
        created_at: new Date().toISOString(),
        current_price: 120,
        total_cost: 1000,
        total_current_value: 1200,
        pnl_amount: 200,
        pnl_percent: 20,
      },
      {
        id: "2",
        user_id: "u1",
        asset_type: "doviz",
        symbol: "USD_TRY",
        quantity: 100,
        buy_price: 35,
        created_at: new Date().toISOString(),
        current_price: 38,
        total_cost: 3500,
        total_current_value: 3800,
        pnl_amount: 300,
        pnl_percent: 8.57,
      },
    ]

    const result = calculateInvestorTotals(assets)

    expect(result.totalCost).toBe(4500)
    expect(result.totalCurrentValue).toBe(5000)
    expect(result.totalPnlAmount).toBe(500)
  })
})

describe("calculateBudgetTotals", () => {
  it("calculates budget summary values", () => {
    const expenses: ExpenseRow[] = [
      {
        id: "1",
        user_id: "u1",
        title: "Kahve",
        amount: 120,
        category: "Eglence",
        expense_date: "2026-03-23",
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        user_id: "u1",
        title: "Market",
        amount: 500,
        category: "Yemek",
        expense_date: "2026-03-23",
        created_at: new Date().toISOString(),
      },
    ]

    const result = calculateBudgetTotals(5000, expenses)

    expect(result.totalIncome).toBe(5000)
    expect(result.totalExpenses).toBe(620)
    expect(result.remainingBudget).toBe(4380)
  })
})
