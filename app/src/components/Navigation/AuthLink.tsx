import { FC } from 'react'
import { Nav, NavDropdown } from 'react-bootstrap'
import { useAuthLink } from './useAuthLink'

export const AuthLink: FC = () => {
  const { user, loader, handleLogout, handleShowModal } = useAuthLink()

  return (
    <Nav>
      {!user ? (
        <Nav.Item>
          <Nav.Link disabled={loader} data-testid="link" onClick={handleShowModal}>
            Sign In
          </Nav.Link>
        </Nav.Item>
      ) : (
        <NavDropdown data-testid="user-link" title={user.name} id="user-menu">
          <NavDropdown.Item>Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      )}
    </Nav>
  )
}
