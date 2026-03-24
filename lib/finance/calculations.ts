import { AssetWithMetrics } from "@/lib/investor/types"
import { ExpenseRow } from "@/lib/normal/types"

export const calculateInvestorTotals = (assets: AssetWithMetrics[]) => {
  const totalCurrentValue = assets.reduce(
    (accumulator, item) => accumulator + item.total_current_value,
    0
  )
  const totalCost = assets.reduce((accumulator, item) => accumulator + item.total_cost, 0)
  const totalPnlAmount = assets.reduce((accumulator, item) => accumulator + item.pnl_amount, 0)

  return {
    totalCurrentValue,
    totalCost,
    totalPnlAmount,
  }
}

export const calculateBudgetTotals = (monthlyIncome: number, expenses: ExpenseRow[]) => {
  const totalExpenses = expenses.reduce((accumulator, item) => accumulator + Number(item.amount), 0)
  const remainingBudget = monthlyIncome - totalExpenses

  return {
    totalIncome: monthlyIncome,
    totalExpenses,
    remainingBudget,
  }
}
