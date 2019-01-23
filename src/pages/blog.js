import React from 'react'

import SiteLayout from '../components/SiteLayout'
import Seo from '../components/Seo'
import Container from '../components/Container'

const Blog = ({location}) => (
  <SiteLayout location={location}>
    <Seo title="Blog" />
    <Container>
      <h1>Blog page...still needs to be built out</h1>
    </Container>
  </SiteLayout>
)

export default Blog
