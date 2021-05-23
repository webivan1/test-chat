import mockState, { renderWithRedux } from '../../../store/mockState'
import { FormComposite } from './FormComposite'
import { AuthModalForms } from '../../../store/auth/modal/types'

describe('FormComposite', () => {
  test('Check to correct render a login component', () => {
    const { getByTestId } = renderWithRedux(<FormComposite form={AuthModalForms.login} />)
    expect(getByTestId(AuthModalForms.login)).toBeInTheDocument()
  })

  test('Check to correct render a register component', () => {
    const { getByTestId } = renderWithRedux(<FormComposite form={AuthModalForms.register} />)
    expect(getByTestId(AuthModalForms.register)).toBeInTheDocument()
  })

  test('Check to correct render a password component', () => {
    const { getByTestId } = renderWithRedux(<FormComposite form={AuthModalForms.password} />)
    expect(getByTestId(AuthModalForms.password)).toBeInTheDocument()
  })
})
