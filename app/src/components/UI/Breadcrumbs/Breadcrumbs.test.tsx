import { render, screen } from '@testing-library/react'
import { BreadcrumbType, Breadcrumbs } from './Breadcrumbs'
import { BrowserRouter } from 'react-router-dom'

describe('Breadcrumbs', () => {
  test('Check render breadcrumbs', () => {
    const links: BreadcrumbType[] = [
      { label: 'About test', url: '/about' },
      { label: 'Contact test', url: '/contact' },
      { label: 'Support test' },
    ]

    render(
      <BrowserRouter>
        <Breadcrumbs links={links} />
      </BrowserRouter>
    )

    links.forEach(({ label, url }) => {
      const item = screen.getByText(label)
      expect(item).toBeInTheDocument()
      if (url) {
        expect(item.tagName.toLowerCase() === 'a').toBeTruthy()
        expect(item.getAttribute('href') === url).toBeTruthy()
      }
    })
  })
})
