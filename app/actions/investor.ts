"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { AssetType } from "@/lib/investor/types"

const validAssetTypes: AssetType[] = ["hisse", "altin", "doviz"]

const getTextValue = (formData: FormData, key: string) => {
  const value = formData.get(key)
  return typeof value === "string" ? value.trim() : ""
}

const getNumericValue = (value: string) => {
  const parsedValue = Number(value)
  return Number.isFinite(parsedValue) ? parsedValue : NaN
}

export const addAssetAction = async (formData: FormData) => {
  const assetType = getTextValue(formData, "assetType") as AssetType
  const symbol = getTextValue(formData, "symbol").toLocaleUpperCase("tr-TR")
  const quantity = getNumericValue(getTextValue(formData, "quantity"))
  const buyPrice = getNumericValue(getTextValue(formData, "buyPrice"))
  const dailyChangePercent = getNumericValue(getTextValue(formData, "dailyChangePercent"))

  if (!validAssetTypes.includes(assetType)) {
    redirect("/dashboard?error=Gecersiz varlik tipi")
  }

  if (!symbol) {
    redirect("/dashboard?error=Varlik sembolu zorunludur")
  }

  if (Number.isNaN(quantity) || quantity <= 0) {
    redirect("/dashboard?error=Miktar sifirdan buyuk olmali")
  }

  if (Number.isNaN(buyPrice) || buyPrice <= 0) {
    redirect("/dashboard?error=Alis fiyati sifirdan buyuk olmali")
  }

  if (Number.isNaN(dailyChangePercent)) {
    redirect("/dashboard?error=Gunluk degisim yuzu gecersiz")
  }

  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { error } = await supabase.from("assets").insert({
    user_id: user.id,
    asset_type: assetType,
    symbol,
    quantity,
    buy_price: buyPrice,
    daily_change_percent: dailyChangePercent,
  })

  if (error) {
    redirect(`/dashboard?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath("/dashboard")
}

export const deleteAssetAction = async (formData: FormData) => {
  const id = getTextValue(formData, "id")

  if (!id) {
    redirect("/dashboard?error=Silinecek kayit bulunamadi")
  }

  const supabase = await createSupabaseServerClient()

  const { error } = await supabase.from("assets").delete().eq("id", id)

  if (error) {
    redirect(`/dashboard?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath("/dashboard")
}

export const updateAssetDailyChangeAction = async (formData: FormData) => {
  const id = getTextValue(formData, "id")
  const dailyChangePercent = getNumericValue(getTextValue(formData, "dailyChangePercent"))

  if (!id) {
    redirect("/dashboard?error=Guncellenecek kayit bulunamadi")
  }

  if (Number.isNaN(dailyChangePercent)) {
    redirect("/dashboard?error=Gunluk degisim yuzu gecersiz")
  }

  const supabase = await createSupabaseServerClient()

  const { error } = await supabase
    .from("assets")
    .update({ daily_change_percent: dailyChangePercent })
    .eq("id", id)

  if (error) {
    redirect(`/dashboard?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath("/dashboard")
}
