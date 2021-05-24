import { renderWithRedux } from '../../store/mockState'
import { AuthLink } from './AuthLink'
import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthModal } from '../Auth/AuthModal/AuthModal'

describe('AuthLink', () => {
  test('Check toggle auth modal link', async () => {
    await act(async () => {
      renderWithRedux(
        <div>
          <AuthLink />
          <AuthModal />
        </div>
      )
    })

    userEvent.click(screen.getByTestId('link'))
    expect(screen.getByTestId('auth-modal')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('auth-modal-close'))

    const modal = screen.queryByTestId('auth-modal')
    expect(modal).toBeInTheDocument()
    if (modal) {
      expect(modal.parentNode).not.toHaveClass('show')
    }
  })
})
