import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
  background: ${props => props.theme.darkblue};
  padding: 2rem;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0;
    font-size: 4.2rem;

    a {
      color: white;
      text-decoration: none;
    }
  }
`

const LinkList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;

  li {
    list-style: none;
    text-decoration: none;
    margin-right: 2rem;
    font-size: 1.6rem;
  }
`

const Header = () => (
  <HeaderWrapper>
    <h1>
      <Link to="/">E</Link>
    </h1>
    <LinkList>
      <li>Projects</li>
      <li>Contact</li>
      <li>Resume</li>
    </LinkList>
  </HeaderWrapper>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
