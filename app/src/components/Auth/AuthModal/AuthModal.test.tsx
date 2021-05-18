import { screen } from '@testing-library/react'
import { AuthModal } from './AuthModal'
import { AuthModalForms } from '../../../store/auth/modal/types'
import state, { renderWithRedux } from '../../../store/mockState'

describe('AuthModal', () => {
  test('Should be shown', () => {
    renderWithRedux(<AuthModal />, {
      initialState: {
        ...state,
        authModal: {
          show: true,
          currentForm: AuthModalForms.login,
        },
      },
    })

    expect(screen.getByTestId('auth-modal')).toBeInTheDocument()
  })

  test('Should be hidden', () => {
    renderWithRedux(<AuthModal />, {
      initialState: {
        ...state,
        authModal: {
          show: false,
          currentForm: AuthModalForms.login,
        },
      },
    })

    expect(screen.queryByTestId('auth-modal')).not.toBeInTheDocument()
  })
})
