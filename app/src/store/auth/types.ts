import { UserType } from '../user/types'

export enum AuthResponseStatuses {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export type AuthResponseType = {
  status: AuthResponseStatuses
  user?: UserType
  accessToken?: string
  errorMessage?: string
}
