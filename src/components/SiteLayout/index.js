import React from 'react'
import { Layout, Anchor } from 'antd'
import Logo from '../Logo'
import DocsNav from '../DocsNav'
import SiteHeader from '../SiteHeader'

const {
  Content, Sider, Header
} = Layout;

const SiteLayout = ({children, location = null}) => (
  <Layout>
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => { console.log(broken); }}
      onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
      width={300}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '10px'
        }}
      >
        <Logo />
      </div>
      <Anchor
        offsetTop={0}
      >
        <DocsNav location={location} />
      </Anchor>
    </Sider>
    <Layout>
      <Header>
        <SiteHeader/>
      </Header>
      <Content style={{ margin: '24px 16px 0' }}>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          {children}
        </div>
      </Content>
    </Layout>
  </Layout>
)

export default SiteLayout
