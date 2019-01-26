import React from 'react'
import styled from 'styled-components'

const HeroContainer = styled.div`
  height: 90vh;
  width: 100vw;
  background-color: ${props => props.theme.darkblue};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`

const hero = () => {
  return (
    <HeroContainer>
      <h1>My Personal Site</h1>
    </HeroContainer>
  )
}

export default hero
