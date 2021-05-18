import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { AuthModalStateType as ModalType } from '../../../store/auth/modal/types'
import { hide } from '../../../store/auth/modal/authModalSlice'
import { Button, Modal } from 'react-bootstrap'
import { FormComposite } from './FormComposite'

export const AuthModal: FC = () => {
  const dispatch = useDispatch()
  const { show, currentForm } = useSelector<RootState, ModalType>((state) => state.authModal)

  const handleClose = () => dispatch(hide())

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" data-testid="auth-modal">
      <Modal.Body>
        <FormComposite form={currentForm} />
      </Modal.Body>
      <Modal.Footer>
        <Button data-testid="auth-modal-close" variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
