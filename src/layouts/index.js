import React from 'react'
import PropTypes from 'prop-types'
import SiteHeader from '../components/SiteHeader'
import Helmet from 'react-helmet'
import { Layout } from 'antd'

import '../styles.css'

const TemplateWrapper = ({ children }) => (
  <Layout>
    <Helmet
      title="WPGraphQL Documentation"
      meta={[
        { name: 'description', content: 'Documentation for the free, open-source WPGraphQL Plugin' },
        { name: 'keywords', content: 'WPGraphQL, WordPress, GraphQL, Documentation, Open Source, Plugin, PHP, Free' },
      ]}
    />
    <SiteHeader />
    {children()}
  </Layout>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
