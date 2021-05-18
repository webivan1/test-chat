import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import { Breadcrumbs } from '../components/UI/Breadcrumbs/Breadcrumbs'

export const About: FC = () => {
  return (
    <Container className="pt-5">
      <Breadcrumbs links={[{ label: 'About' }]} />

      <div>About page</div>
    </Container>
  )
}
