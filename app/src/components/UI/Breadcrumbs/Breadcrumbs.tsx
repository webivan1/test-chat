import React, { FC } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export type BreadcrumbType = {
  label: string
  url?: string
}

export type PropTypes = {
  links: BreadcrumbType[]
}

export const Breadcrumbs: FC<PropTypes> = ({ links }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
        Home
      </Breadcrumb.Item>
      {links.map(({ label, url }, index) => {
        return url ? (
          <Breadcrumb.Item key={url} linkAs={Link} linkProps={{ to: url }}>
            {label}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={index} active={true}>
            {label}
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}
