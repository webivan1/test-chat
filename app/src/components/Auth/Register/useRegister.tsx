import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { RegisterFormType, RegisterStateType } from '../../../store/auth/register/types'
import { useForm } from 'react-hook-form'
import { registerUserAsync } from '../../../store/auth/register/registerSlice'
import { AuthModalForms } from '../../../store/auth/modal/types'
import { setForm } from '../../../store/auth/modal/authModalSlice'

export const useRegister = () => {
  const dispatch = useDispatch()
  const { error, loader } = useSelector<RootState, RegisterStateType>((state) => state.register)
  const validationForm = useForm<RegisterFormType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  })

  const handleForm = (form: RegisterFormType): void => {
    if (!loader) {
      dispatch(registerUserAsync(form))
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
