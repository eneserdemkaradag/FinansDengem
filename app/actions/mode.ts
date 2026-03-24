"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"

type AppMode = "investor" | "normal"

const getFormValue = (formData: FormData, key: string) => {
  const value = formData.get(key)
  return typeof value === "string" ? value.trim() : ""
}

const isValidMode = (mode: string): mode is AppMode => mode === "investor" || mode === "normal"

export const updateModeAction = async (formData: FormData) => {
  const mode = getFormValue(formData, "mode")
  const redirectTo = getFormValue(formData, "redirectTo") || "/dashboard"

  if (!isValidMode(mode)) {
    redirect(`${redirectTo}?error=Gecersiz mod secimi`)
  }

  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { error } = await supabase.from("profiles").upsert({
    user_id: user.id,
    active_mode: mode,
    updated_at: new Date().toISOString(),
  })

  if (error) {
    redirect(`${redirectTo}?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath("/dashboard")
  redirect(redirectTo)
}
