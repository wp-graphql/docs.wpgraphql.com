import React from 'react'
import Link from 'gatsby-link'
import { Layout, Menu, Icon, Row, Col } from 'antd'
import logo from '../../assets/img/logo-horizontal.png'
import styled from 'styled-components'
import Search from '../Search'
const { Header } = Layout;
const SubMenu = Menu.SubMenu;

const Logo = styled.div`
  display:flex;
  justify-content: left;
  align-items: center;
  height:64px;
  >a{
    display:flex;
    justify-content: center;
    align-items: center;
  }
  >*>img {
    height 30px;
    width: auto;
    margin: 0;
  }
`;

const SiteHeader = () => (
  <div style={{background:'#001529'}}>
    <Row>
      <Col xxl={0} xl={0} lg={0} md={0} sm={24} xs={24}>
        <Logo>
          <Link to="/" >
            <img src={logo} />
          </Link>
        </Logo>
      </Col>
    </Row>
    <Header className="header" >
      <Row>
        <Col xxl={4} xl={5} lg={5} md={6} sm={0} xs={0}>
          <Logo>
            <Link to="/" >
              <img src={logo} />
            </Link>
          </Logo>
        </Col>
        <Col xxl={16} xl={15} lg={10} md={14} sm={24} xs={24}>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px', float: 'right' }}
          >
            <SubMenu title={<span> Learn</span>}>
              <Menu.Item key="/docs/getting-started/about">
                <Link to="/docs/getting-started/about"><Icon type="setting" /> Getting Started</Link>
              </Menu.Item>
              <Menu.Item key="/docs/extensions/wp-graphiql">
                <Link to="/docs/extensions/wp-graphiql"><Icon type="rocket" /> Extensions</Link>
              </Menu.Item>
              <Menu.Item key="/docs/extending/helpful-hooks-and-filters">
                <Link to="/docs/extending/helpful-hooks-and-filters"><Icon type="code-o" /> Extending</Link>
              </Menu.Item>
              <Menu.Item key="/docs/core-concepts/schema-and-types">
                <Link to="/docs/core-concepts/schema-and-types"><Icon type="book" /> Core Concepts</Link>
                <Link to="/docs/core-concepts/schema-and-types"><Icon type="book" /> Core Concepts</Link>
              </Menu.Item>
              <Menu.Item key="/docs/advanced/batch-requests">
                <Link to="/docs/advanced/batch-requests"><Icon type="api" /> Advanced</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="/docs/community/contributing-and-roadmap">
              <Link to="/docs/community/contributing-and-roadmap"><Icon type="user" /> Community </Link>
            </Menu.Item>
            <Menu.Item key="blog">
              <a href="https://wpgraphql.blog" >Blog</a>
            </Menu.Item>
            <Menu.Item key="github">
              <a href="https://github.com/wp-graphql/wp-graphql" target="_blank">Github <Icon type="github" /></a>
            </Menu.Item>
          </Menu>
        </Col>
        <Col xxl={4} xl={4} lg={9} md={4} sm={0} xs={0}>
          <Search/>
        </Col>
      </Row>
    </Header>
  </div>
);

export default SiteHeader;