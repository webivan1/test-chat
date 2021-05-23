export type LoginStateType = {
  loader: boolean
  error: string | null
}

export type LoginFormType = {
  email: string
  password: string
  captcha?: string
}
