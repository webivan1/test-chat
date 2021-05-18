import { FC } from 'react'
import { AuthModalForms, AuthModalStateType as ModalType } from '../../../store/auth/modal/types'
import { LoginForm } from '../Login/LoginForm'
import { PasswordForm } from '../Password/PasswordForm'
import { RegisterForm } from '../Register/RegisterForm'

export const FormComposite: FC<{ form: ModalType['currentForm'] }> = ({ form }) => {
  if (form === AuthModalForms.password) {
    return <PasswordForm />
  } else if (form === AuthModalForms.register) {
    return <RegisterForm />
  } else {
    return <LoginForm />
  }
}
