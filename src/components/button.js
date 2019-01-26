import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Button = styled.button`
  outline: none;
  border: 1px solid black;
  padding: 1rem 1.5rem;
  font-size: 1.4rem;
  justify-self: flex-start;
`

const button = ({ title, path }) => {
  return (
    <Button>
      <Link to={path}>{title}</Link>
    </Button>
  )
}

export default button
