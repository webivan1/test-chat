import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { autoFetchUser } from '../../../store/user/userSlice'

export const AutoLogin: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(autoFetchUser())
  })

  return <div />
}
