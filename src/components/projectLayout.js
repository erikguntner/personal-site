import React, { Component } from 'react'
import Layout from './layout'
import Image from './image'
import { StaticQuery, graphql } from 'gatsby'
import '../pages.json'

class ProjectLayout extends Component {
  render() {
    const { id } = this.props.pageContext

    const images = {
      codesmith: 'codesmithImage',
      swell: 'swellImage',
      reactproto: 'reactProtoImage',
    }

    const imageId = images[id]

    return (
      <Layout>
        <div>This is a project page</div>
        <Image imageId={imageId} />
      </Layout>
    )
  }
}

export default ProjectLayout
