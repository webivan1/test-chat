import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import { LinkType } from './types'

export const NavigationItem: FC<LinkType> = ({ href, content }) => (
  <Nav.Link data-testid="nav-link" as={Link} to={href}>
    {content}
  </Nav.Link>
)
