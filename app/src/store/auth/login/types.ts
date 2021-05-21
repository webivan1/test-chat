import { UserType } from "../../user/types";

export type LoginStateType = {
  loader: boolean
  error: string | null
}

export type LoginFormType = {
  email: string
  password: string
}

export type LoginResponseType = {
  token: string
  user: UserType
}
