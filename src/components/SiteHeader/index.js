import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Layout, Menu, Row, Button, Icon
} from 'antd'
import Container from '../Container'
import { StaticQuery, graphql, navigate, Link } from 'gatsby'
import SiteSearch from '../SiteSearch'
import logo from '../../images/icon.png'

const ButtonGroup = Button.Group

const {
  Header,
} = Layout

const Logo = () => (
    <Link to="/" style={{
      marginRight: '20px'
    }}>
      <img src={logo} alt="" height="40" />
    </Link>
)

const menuItems = [
  {
    name: 'Docs',
    path: '/docs/quick-start/install-and-activate',
    key: '/docs'
  },
  {
    name: 'Community',
    path: '/community'
  },
  {
    name: 'Blog',
    path: '/blog'
  }
];

class SiteMenu extends Component {

  getSelectedKeys = () => {
    const { location } = this.props;

    if ( ! location || ! location.pathname ) {
      return null;
    }

    if ( location.pathname.includes( '/docs') ) {
      return ['/docs']
    }

    if ( location.pathname.includes( '/community') ) {
      return ['/community']
    }

    if ( location.pathname.includes( '/blog') ) {
      return ['/blog']
    }

    return [];

  }

  render() {
    return (
      <div style={{
        maxWidth: '600px',
      }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['/docs']}
          selectedKeys={this.getSelectedKeys()}
          style={{ lineHeight: '64px', borderBottom: '0px' }}
        >
          {menuItems.map(item => (
            <Menu.Item
              key={ item.key ? item.key : item.path}
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </div>
    )
  }
}

const UtilNav = () => {
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

const SiteHeader = ({ siteTitle, location }) => (
  <Header style={{ padding: 0, height: '66px', position: 'fixed', zIndex: 99, width: '100%' }}>
    <Container>
      <Row type="flex" justify="space-between">
        <div className="logo-menu">
          <Row type="flex" justify="start">
            <Logo siteTitle={siteTitle}/>
            <SiteMenu location={location} />
          </Row>
        </div>
        <div className="search-util">
          <Row type="flex" justify="end">
            <SiteSearch />
            <UtilNav/>
          </Row>
        </div>
      </Row>
    </Container>
  </Header>
)

SiteHeader.propTypes = {
  siteTitle: PropTypes.string,
}

SiteHeader.defaultProps = {
  siteTitle: ``,
}

export default SiteHeader
