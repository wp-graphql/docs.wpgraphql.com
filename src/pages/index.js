import React from 'react'

import SiteLayout from '../components/SiteLayout'
import Seo from '../components/Seo'
import Container from '../components/Container'

const IndexPage = ({location}) => (
  <SiteLayout location={location}>
    <Seo title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Container>
      <h1>Homepage. . .still needs to be built out...</h1>
    </Container>
  </SiteLayout>
)

export default IndexPage
