import React from 'react'
import { Layout, Row, Anchor, Button, Icon } from 'antd'
import Logo from '../Logo'
import DocsNav from '../DocsNav'
import SiteHeader from '../SiteHeader'
import '../style.css'
import { StaticQuery, graphql } from 'gatsby'

const ButtonGroup = Button.Group

const {
  Content, Sider, Header
} = Layout;

export const UtilNav = () => {
  return (
    <StaticQuery query={graphql`
      query GithubInfo {
        github {
          repository(owner: "wp-graphql", name: "wp-graphql") {
            id
            name
            resourcePath
            releases(first: 1, orderBy: {field: CREATED_AT, direction: DESC}) {
              nodes {
                id
                name
                url
              }
            }
          }
        }
      }
    `}
     render={data => {
       const { github: { repository: { resourcePath, releases: { nodes } } } } = data
       let version = null
       if (nodes && nodes.length) {
         version = nodes[0].name
       }
       return (
         <div>
           <ButtonGroup>
             <Button onClick={() => window.open(nodes[0].url)} type="default">
               {version} <Icon type="branches"/>
             </Button>
             <Button onClick={() => window.open(`https://github.com/${resourcePath}`)}
                     type="default">
               <Icon type="github"/> Github
             </Button>
           </ButtonGroup>
         </div>
       )

     }}/>
  )
}

const SiteLayout = ({children, location = null}) => (
  <Layout>
    <Sider
      breakpoint="md"
      collapsedWidth="0"
      width={300}
    >
      <Row
        type="flex"
        justify="center"
        align="middle"
      >
        <Logo size={100}/>
      </Row>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ marginBottom: '2rem' }}
      >
        <UtilNav />
      </Row>
      <Anchor
        offsetTop={0}
      >
        <DocsNav location={location} />
      </Anchor>
    </Sider>
    <Layout style={{
      minHeight: 'calc( 100vh )',
    }}>
      {/*Waiting for Algolia to get sorted out...*/}
      {/*<Header style={{*/}
        {/*minHeight: '66px',*/}
        {/*height: 'auto',*/}
        {/*background: '#fff',*/}
        {/*borderBottom: '1px solid #eaeaea'*/}
      {/*}}>*/}
        {/*<SiteHeader/>*/}
      {/*</Header>*/}
      <Content style={{ margin: '0' }}>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          {children}
        </div>
      </Content>
    </Layout>
  </Layout>
)

export default SiteLayout
