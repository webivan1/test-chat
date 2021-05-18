import { FC } from 'react'
import { Nav } from 'react-bootstrap'
import { show } from '../../store/auth/modal/authModalSlice'
import { useDispatch } from 'react-redux'

export const AuthLink: FC = () => {
  const dispatch = useDispatch()
  const handleClick = () => dispatch(show())

  return (
    <Nav>
      <Nav.Item>
        <Nav.Link data-testid="link" onClick={handleClick}>
          Auth
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}
