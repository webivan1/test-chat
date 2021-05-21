import mockState, { renderWithRedux } from "../../../store/mockState";
import { LoginForm } from "./LoginForm";
import userEvent from "@testing-library/user-event";

describe('LoginForm', () => {
  test('Should be have 2 fields', () => {
    const { getByTestId } = renderWithRedux(<LoginForm />, {
      initialState: { ...mockState }
    })
    expect(getByTestId('email')).toBeInTheDocument()
    expect(getByTestId('password')).toBeInTheDocument()
  })

  test('Check validation form', async () => {
    const { getByTestId, findByTestId } = renderWithRedux(<LoginForm />, {
      initialState: { ...mockState }
    })

    userEvent.click(getByTestId('button'))

    const emailErrorField = await findByTestId('email')
    const passwordErrorField = await findByTestId('email')

    expect(emailErrorField).toHaveClass('is-invalid')
    expect(passwordErrorField).toHaveClass('is-invalid')

    userEvent.type(emailErrorField, 'email@email.com')
    userEvent.type(passwordErrorField, 'password')
    userEvent.click(getByTestId('button'))

    const emailField = await findByTestId('email')
    const passwordField = await findByTestId('email')

    expect(emailField).not.toHaveClass('is-invalid')
    expect(passwordField).not.toHaveClass('is-invalid')
  })

  test('Check server response', () => {
    // @todo
  })
})
