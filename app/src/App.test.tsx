import { App } from './App'
import mockState, { renderWithRedux } from './store/mockState'

describe('App', () => {
  test('Render App', () => {
    renderWithRedux(<App />, { initialState: { ...mockState } })
  })
})
