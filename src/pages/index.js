import React from 'react'
import styled from 'styled-components'

import Layout from '../components/layout'
import Hero from '../components/hero'
import SEO from '../components/seo'
import Section from '../components/section'

import { graphql } from 'gatsby'

const ContentWrapper = styled.div`
  max-width: 85%;
  margin: 2rem auto;
`

const IndexPage = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Hero />
      <ContentWrapper>
        <Section
          path={'codesmith'}
          title={'Codesmith'}
          image={data.imageCodesmith}
        />
        <Section
          path={'react-proto'}
          title={'React Proto'}
          image={data.imageReactProto}
        />
        <Section path={'swell'} title={'Swell'} image={data.imageSwell} />
      </ContentWrapper>
    </Layout>
  )
}

export const fluidImage = graphql`
  fragment fluidImage on File {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

export const query = graphql`
  query ImageQuery {
    imageSwell: file(relativePath: { regex: "/Swell/" }) {
      ...fluidImage
    }
    imageCodesmith: file(relativePath: { regex: "/codesmith/" }) {
      ...fluidImage
    }
    imageReactProto: file(relativePath: { regex: "/react-proto/" }) {
      ...fluidImage
    }
  }
`

export default IndexPage
