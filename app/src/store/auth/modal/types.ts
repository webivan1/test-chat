export enum AuthModalForms {
  'login' = 'login',
  'register' = 'register',
  'password' = 'password',
}

export type AuthModalStateType = {
  show: boolean
  currentForm: AuthModalForms
}
