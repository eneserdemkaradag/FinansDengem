export type ExpenseCategory = "Yemek" | "Kira" | "Eglence" | "Borc" | "Diger"

export type BudgetRow = {
  id: string
  user_id: string
  monthly_income: number
  month_key: string
  created_at: string
  updated_at: string
}

export type ExpenseRow = {
  id: string
  user_id: string
  title: string
  amount: number
  category: ExpenseCategory
  expense_date: string
  created_at: string
}
