import { screen } from '@testing-library/react'
import { Navigation } from './Navigation'
import { BrowserRouter } from 'react-router-dom'
import mockState, { renderWithRedux } from '../../store/mockState'

describe('Navigation', () => {
  test('Check the links and site name', () => {
    const mockLinks = [
      { href: '/', content: 'Home test' },
      { href: '/about', content: 'About test' },
    ]

    renderWithRedux(
      <BrowserRouter>
        <Navigation links={mockLinks} />
      </BrowserRouter>
    )

    mockLinks.forEach(({ href, content }) => {
      const link = screen.getByText(content)
      expect(link).toBeInTheDocument()
      expect(link.hasAttribute('href')).toBeTruthy()
      expect(link.getAttribute('href') === href).toBeTruthy()
    })

    expect(screen.getByText(process?.env.REACT_APP_NAME || '')).toBeInTheDocument()
  })
})
