import { AuthForm } from "@/app/components/auth-form"
import { signInAction } from "@/app/actions/auth"

type SearchParams = Promise<Record<string, string | string[] | undefined>>

const getQueryValue = (value: string | string[] | undefined) => {
  if (!value) return undefined
  return Array.isArray(value) ? value[0] : value
}

export default async function LoginPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams

  return (
    <AuthForm
      title="FinansDengem Giriş"
      description="Hesabına giriş yaparak finans verilerine güvenle ulaş."
      submitLabel="Giriş Yap"
      action={signInAction}
      alternateText="Hesabın yok mu?"
      alternateHref="/register"
      alternateLabel="Kayıt ol"
      error={getQueryValue(searchParams.error)}
      success={getQueryValue(searchParams.success)}
    />
  )
}
