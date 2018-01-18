import React from 'react'
import Link from 'gatsby-link'
import { Button, Icon } from 'antd'
import styled from 'styled-components'
import { WhosUsingIt } from '../components/HomePage'

const HomePageHero = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 500px;
  padding: 150px 0;
  background-color: #001529;
  display: flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  text-align:center;
`;

const Content = styled.div`
  max-width: 900px;
  min-width: 300px;
  width: 100%;
`;

const Title = styled.h2`
  font-size:70px;
  color:white;
`;

const SubTitle = styled.h3`
  font-size:30px;
  color:white;
  margin-bottom:50px;
`;

const IndexPage = () => (
  <div>
    <HomePageHero>
      <Content>
        <Title>GraphQL API for WordPress</Title>
        <SubTitle>WPGraphQL is a free, open-source WordPress plugin that provides an extendable GraphQL schema and API for any WordPress site.</SubTitle>
        <Button type="primary" size="large">
          <Link to="/getting-started/about" ><Icon type="file" /> Docs</Link>
        </Button>  <Button type="primary" size="large">
          <Link to="https://github.com/wp-graphql/wp-graphql" ><Icon type="github" /> View on Github</Link>
      </Button>
      </Content>
    </HomePageHero>
    <WhosUsingIt/>
  </div>
)

export default IndexPage
