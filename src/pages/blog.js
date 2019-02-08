import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import Logo from '../components/Logo'
import DocsNav from '../components/DocsNav'

const {
  Header, Content, Footer, Sider,
} = Layout;

const Blog = ({location}) => (
  <Layout>
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => { console.log(broken); }}
      onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
      width={300}
      style={{ background: '#fff' }}
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
      <DocsNav location={location} />
    </Sider>
    <Layout>
      <Content style={{ margin: '24px 16px 0' }}>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          content
        </div>
      </Content>
    </Layout>
  </Layout>
)

export default Blog
