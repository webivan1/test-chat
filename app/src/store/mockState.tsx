import { reducer, RootState, store } from './store'
import { ReactElement } from 'react'
import { combineReducers, createStore } from 'redux'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

export type MockRootStateType = {
  [K in keyof RootState]?: RootState[K]
}

export type ReduxRenderType = {
  initialState: MockRootStateType
} & {
  [K in string]?: any
}

const mockState: MockRootStateType = { ...store.getState() }

export const renderWithRedux = (
  component: ReactElement,
  { initialState = { ...mockState }, ...otherOptions }: ReduxRenderType
) => {
  const newStore = createStore(combineReducers(reducer), initialState)

  return render(<Provider store={newStore}>{component}</Provider>, { ...otherOptions })
}

export default mockState
