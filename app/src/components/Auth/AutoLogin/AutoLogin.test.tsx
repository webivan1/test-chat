import { autoLoginQuery } from '../../../store/user/queries'
import { renderWithRedux } from '../../../store/mockState'
import { AutoLogin } from './AutoLogin'
import { act, screen } from '@testing-library/react'
import { AuthLink } from '../../Navigation/AuthLink'

jest.mock('../../../store/user/queries')

describe('AutoLogin', () => {
  test('Check auto logging', async () => {
    // @ts-ignore
    autoLoginQuery.mockResolvedValueOnce(
      Promise.resolve({
        id: '1',
        name: 'Test',
        email: 'test@test.com',
        verified: false,
      })
    )

    await act(async () => {
      renderWithRedux(
        <div>
          <AuthLink />
          <AutoLogin />
        </div>
      )
    })

    const userLink = await screen.queryByTestId('user-link')

    expect(userLink).toBeInTheDocument()
  })
})
