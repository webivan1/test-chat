export type UserType = {
  id: string
  name: string
  email: string
  verified: boolean
}

export type UserStateType = {
  user: null | UserType
}

export type UserAssignType = {
  user: UserType
  accessToken: string
}
