import { render, screen } from '@testing-library/react'
import { NavigationItem } from './NavigationItem'
import { BrowserRouter } from 'react-router-dom'

describe('NavigationItem', () => {
  test('Check the link', () => {
    const href = '/about'
    const content = 'About'

    render(
      <BrowserRouter>
        <NavigationItem href={href} content={content} />
      </BrowserRouter>
    )

    const link = screen.getByText(content)

    expect(link).toBeInTheDocument()
    expect(link.hasAttribute('href')).toBeTruthy()
    expect(link.getAttribute('href') === href).toBeTruthy()
  })
})
