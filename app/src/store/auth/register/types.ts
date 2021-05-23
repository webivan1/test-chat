export type RegisterStateType = {
  loader: boolean
  error: string | null
}

export type RegisterFormType = {
  email: string
  name: string
  password: string
  password_confirmation: string
  captcha?: string
}
