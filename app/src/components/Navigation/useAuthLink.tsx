import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { UserStateType } from '../../store/user/types'
import { LoginStateType } from '../../store/auth/login/types'
import { show } from '../../store/auth/modal/authModalSlice'
import { logout } from '../../store/user/userSlice'

export const useAuthLink = () => {
  const dispatch = useDispatch()
  const { user } = useSelector<RootState, UserStateType>((state) => state.user)
  const { loader } = useSelector<RootState, LoginStateType>((state) => state.login)

  const handleShowModal = () => {
    if (!loader) {
      dispatch(show())
    }
  }

  const handleLogout = () => dispatch(logout())

  return {
    user,
    loader,
    handleLogout,
    handleShowModal,
  }
}
