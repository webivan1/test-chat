import { renderWithRedux } from '../../../store/mockState'
import { LoginForm } from './LoginForm'
import userEvent from '@testing-library/user-event'
import { act, screen, fireEvent } from '@testing-library/react'
import { loginQuery } from '../../../store/auth/login/queries'

jest.mock('../../../store/auth/login/queries')

describe('LoginForm', () => {
  test('Should be have 2 fields', () => {
    const { getByTestId } = renderWithRedux(<LoginForm />)
    expect(getByTestId('email')).toBeInTheDocument()
    expect(getByTestId('password')).toBeInTheDocument()
  })

  test('Check validation form', async () => {
    renderWithRedux(<LoginForm />)

    userEvent.click(screen.getByTestId('button'))

    let email = await screen.findByTestId('email')
    let password = await screen.findByTestId('password')

    expect(email).toHaveClass('is-invalid')
    expect(password).toHaveClass('is-invalid')

    await act(async () => {
      userEvent.type(email, 'test@test.com')
      userEvent.type(password, '123456')
    })

    email = await screen.findByTestId('email')
    password = await screen.findByTestId('password')

    expect(email).not.toHaveClass('is-invalid')
    expect(password).not.toHaveClass('is-invalid')
  })

  test('Check error response from server', async () => {
    renderWithRedux(<LoginForm />)

    // @ts-ignore
    loginQuery.mockResolvedValueOnce(
      Promise.resolve({
        user: undefined,
        accessToken: undefined,
        errorMessage: 'Error test 33',
      })
    )

    await act(async () => {
      userEvent.type(screen.getByTestId('email'), 'test@test.com')
      userEvent.type(screen.getByTestId('password'), '123456')
      userEvent.click(screen.getByTestId('button'))
    })

    const errorMessage = await screen.findByTestId('error')

    expect(errorMessage).toBeInTheDocument()
  })

  test('Check successfully response from server', async () => {
    renderWithRedux(<LoginForm />)

    // @ts-ignore
    loginQuery.mockResolvedValueOnce(
      Promise.resolve({
        user: {
          id: '1',
          name: 'Test',
          email: 'test@test.com',
          verified: false,
        },
        accessToken: 'test-token',
      })
    )

    await act(async () => {
      userEvent.type(screen.getByTestId('email'), 'test@test.com')
      userEvent.type(screen.getByTestId('password'), '123456')
      userEvent.click(screen.getByTestId('button'))
    })

    const errorMessage = await screen.queryByTestId('error')

    expect(errorMessage).not.toBeInTheDocument()
  })
})
