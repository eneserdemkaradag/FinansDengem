import { AuthForm } from "@/app/components/auth-form"
import { signUpAction } from "@/app/actions/auth"

type SearchParams = Promise<Record<string, string | string[] | undefined>>

const getQueryValue = (value: string | string[] | undefined) => {
  if (!value) return undefined
  return Array.isArray(value) ? value[0] : value
}

export default async function RegisterPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams

  return (
    <AuthForm
      title="FinansDengem Kayıt"
      description="Yeni hesap oluştur ve bütçe ile yatırım takibini tek yerde yönet."
      submitLabel="Kayıt Ol"
      action={signUpAction}
      alternateText="Zaten hesabın var mı?"
      alternateHref="/login"
      alternateLabel="Giriş yap"
      error={getQueryValue(searchParams.error)}
      success={getQueryValue(searchParams.success)}
    />
  )
}
