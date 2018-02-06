import React from 'react'
import Link from 'gatsby-link'
import { Button, Icon, Layout, Row } from 'antd'
const {Content} = Layout
import styled from 'styled-components'

const BlogIndex = () => (
  <Layout style={{padding: '24px', minHeight: 'calc(100vh - 64px)'}}>
    <Row type="flex" justify="space-around" align="top">
      <Layout style={{padding: '0 24px 24px', minHeight: 'calc(100vh - 64px)'}}>
        <Content style={{background: '#fff', padding: 24}}>
          <h2>Blog coming soon...</h2>
        </Content>
      </Layout>
    </Row>
  </Layout>
)

export default BlogIndex