import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { RegisterFormType } from '../../../store/auth/register/types'
import { useForm } from 'react-hook-form'
import { AuthModalForms } from '../../../store/auth/modal/types'
import { setForm } from '../../../store/auth/modal/authModalSlice'
import { LoginFormType, LoginStateType } from '../../../store/auth/login/types'
import { fetchUserByCredentials } from '../../../store/auth/login/loginSlice'

export const useLogin = () => {
  const dispatch = useDispatch()
  const { error, loader } = useSelector<RootState, LoginStateType>((state) => state.login)
  const validationForm = useForm<LoginFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleForm = (form: RegisterFormType): void => {
    if (!loader) {
      dispatch(fetchUserByCredentials(form))
    }
  }

  const handleChangeForm = (form: AuthModalForms): void => {
    dispatch(setForm(form))
  }

  return {
    error,
    loader,
    ...validationForm,
    handleForm,
    handleChangeForm,
  }
}
