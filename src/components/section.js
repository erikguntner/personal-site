import React from 'react'
import styled from 'styled-components'

import Img from 'gatsby-image'
import Button from './button'

const SectionWrapper = styled.article`
  display: flex;
  flex-direction: column;
  margin: 10rem 0;

  h2 {
    font-size: 3.4rem;
  }
`

const ImageContainer = styled.div`
  width: 90%;
`

class Section extends React.Component {
  render() {
    const { image, title, description, path } = this.props
    return (
      <SectionWrapper>
        <h2>{title}</h2>
        <h4>{description}</h4>
        <ImageContainer>
          <Img fluid={image.childImageSharp.fluid} />
        </ImageContainer>
        <Button title={'View Site'} path={`projects/${path}`} />
      </SectionWrapper>
    )
  }
}

export default Section
