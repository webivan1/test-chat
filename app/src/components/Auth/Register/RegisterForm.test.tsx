import { renderWithRedux } from '../../../store/mockState'
import { RegisterForm } from './RegisterForm'
import userEvent from '@testing-library/user-event'
import { act, screen } from '@testing-library/react'
import { registerQuery } from '../../../store/auth/register/queries'

jest.mock('../../../store/auth/register/queries')

describe('RegisterForm', () => {
  test('Should have 4 fields', () => {
    const { getByTestId } = renderWithRedux(<RegisterForm />)
    expect(getByTestId('name')).toBeInTheDocument()
    expect(getByTestId('email')).toBeInTheDocument()
    expect(getByTestId('password')).toBeInTheDocument()
    expect(getByTestId('password_confirmation')).toBeInTheDocument()
  })

  test('Check validation form', async () => {
    await act(async () => {
      renderWithRedux(<RegisterForm />)
    })

    userEvent.click(screen.getByTestId('button'))

    let email = await screen.findByTestId('email')
    let name = await screen.findByTestId('name')
    let password = await screen.findByTestId('password')
    let passwordConfirmation = await screen.findByTestId('password_confirmation')

    expect(email).toHaveClass('is-invalid')
    expect(name).toHaveClass('is-invalid')
    expect(password).toHaveClass('is-invalid')
    expect(passwordConfirmation).toHaveClass('is-invalid')

    userEvent.type(email, 'test@test.com')
    userEvent.type(name, 'Test user')
    userEvent.type(password, '123456')
    userEvent.type(passwordConfirmation, '123456')

    email = await screen.findByTestId('email')
    name = await screen.findByTestId('name')
    password = await screen.findByTestId('password')
    passwordConfirmation = await screen.findByTestId('password_confirmation')

    expect(email).not.toHaveClass('is-invalid')
    expect(name).not.toHaveClass('is-invalid')
    expect(password).not.toHaveClass('is-invalid')
    expect(passwordConfirmation).not.toHaveClass('is-invalid')
  })

  test('Check error response from server', async () => {
    await act(async () => {
      renderWithRedux(<RegisterForm />)
    })

    // @ts-ignore
    registerQuery.mockResolvedValueOnce(
      Promise.resolve({
        user: undefined,
        accessToken: undefined,
        errorMessage: 'Error test 33',
      })
    )

    userEvent.type(screen.getByTestId('email'), 'test@test.com')
    userEvent.type(screen.getByTestId('name'), 'Test user')
    userEvent.type(screen.getByTestId('password'), '123456')
    userEvent.type(screen.getByTestId('password_confirmation'), '123456')
    userEvent.click(screen.getByTestId('button'))

    const errorMessage = await screen.findByTestId('error')

    expect(errorMessage).toBeInTheDocument()
  })

  test('Check successfully response from server', async () => {
    await act(async () => {
      renderWithRedux(<RegisterForm />)
    })

    // @ts-ignore
    registerQuery.mockResolvedValueOnce(
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

    userEvent.type(screen.getByTestId('email'), 'test@test.com')
    userEvent.type(screen.getByTestId('name'), 'Test user')
    userEvent.type(screen.getByTestId('password'), '123456')
    userEvent.type(screen.getByTestId('password_confirmation'), '123456')
    userEvent.click(screen.getByTestId('button'))

    const errorMessage = await screen.queryByTestId('error')

    expect(errorMessage).not.toBeInTheDocument()
  })
})
