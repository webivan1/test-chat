import React, { FC } from 'react'
import { LinkType } from './types'
import { NavigationItem } from './NavigationItem'
import { Link } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { AuthLink } from './AuthLink'

type PropTypes = {
  links: LinkType[]
}

export const Navigation: FC<PropTypes> = ({ links }) => (
  <Navbar sticky="top" bg="light" expand="lg">
    <Container>
      <Navbar.Brand as={Link} to="/">
        {process.env.REACT_APP_NAME}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar" />
      <Navbar.Collapse id="navbar">
        <Nav className="mr-auto">
          {links.map(({ href, content }) => (
            <NavigationItem key={href} href={href} content={content} />
          ))}
        </Nav>
        <AuthLink />
      </Navbar.Collapse>
    </Container>
  </Navbar>
)
