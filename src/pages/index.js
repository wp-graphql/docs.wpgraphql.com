import React from 'react'

import SiteLayout from '../components/SiteLayout'
import Seo from '../components/Seo'

const IndexPage = ({location}) => (
  <SiteLayout location={location}>
    <Seo title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Homepage. . .still needs to be built out...</h1>
  </SiteLayout>
)

export default IndexPage
