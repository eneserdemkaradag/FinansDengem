"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { ExpenseCategory } from "@/lib/normal/types"

const validCategories: ExpenseCategory[] = ["Yemek", "Kira", "Eglence", "Borc", "Diger"]

const getFormValue = (formData: FormData, key: string) => {
  const value = formData.get(key)
  return typeof value === "string" ? value.trim() : ""
}

const getNumericValue = (value: string) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : NaN
}

const getMonthKey = () => {
  const date = new Date()
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  return `${date.getFullYear()}-${month}`
}

export const upsertBudgetAction = async (formData: FormData) => {
  const income = getNumericValue(getFormValue(formData, "monthlyIncome"))

  if (Number.isNaN(income) || income < 0) {
    redirect("/dashboard?error=Gecersiz aylik gelir")
  }

  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { error } = await supabase.from("budgets").upsert({
    user_id: user.id,
    monthly_income: income,
    month_key: getMonthKey(),
    updated_at: new Date().toISOString(),
  })

  if (error) {
    redirect(`/dashboard?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath("/dashboard")
}

export const addExpenseAction = async (formData: FormData) => {
  const title = getFormValue(formData, "title")
  const amount = getNumericValue(getFormValue(formData, "amount"))
  const category = getFormValue(formData, "category") as ExpenseCategory
  const expenseDate = getFormValue(formData, "expenseDate")

  if (!title) {
    redirect("/dashboard?error=Harcama aciklamasi zorunludur")
  }

  if (Number.isNaN(amount) || amount <= 0) {
    redirect("/dashboard?error=Harcama tutari sifirdan buyuk olmali")
  }

  if (!validCategories.includes(category)) {
    redirect("/dashboard?error=Gecersiz kategori")
  }

  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { error } = await supabase.from("expenses").insert({
    user_id: user.id,
    title,
    amount,
    category,
    expense_date: expenseDate || new Date().toISOString().slice(0, 10),
  })

  if (error) {
    redirect(`/dashboard?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath("/dashboard")
}

export const deleteExpenseAction = async (formData: FormData) => {
  const id = getFormValue(formData, "id")

  if (!id) {
    redirect("/dashboard?error=Silinecek harcama bulunamadi")
  }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from("expenses").delete().eq("id", id)

  if (error) {
    redirect(`/dashboard?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath("/dashboard")
}
