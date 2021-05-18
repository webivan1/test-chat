import mockState, { renderWithRedux } from "../../../store/mockState";
import { LoginForm } from "./LoginForm";
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react";

describe('LoginForm', () => {
  test('Should be have 2 fields', () => {
    const { getByTestId } = renderWithRedux(<LoginForm />, { initialState: {...mockState} })
    expect(getByTestId('email')).toBeInTheDocument()
    expect(getByTestId('password')).toBeInTheDocument()
  })

  test('Check validation form', async () => {
    const { getByTestId, getByText, debug } = renderWithRedux(<LoginForm />, {
      initialState: { ...mockState }
    })
    // const email = getByTestId('email');
    // const password = getByTestId('password');
    // const button = getByTestId('button');

    // userEvent.type(email, '')
    // userEvent.type(password, '')

    userEvent.click(getByTestId('button'))

    debug()

    // await act(() => {
    //
    // })

    // expect(getByTestId('email')).toHaveClass('is-invalid')
    // expect(getByTestId('password')).toHaveClass('is-invalid')
  })
})
