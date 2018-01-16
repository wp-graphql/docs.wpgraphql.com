import React from 'react'
import Link from 'gatsby-link'
import { Button } from 'antd'
import styled from 'styled-components'

const HomePageHero = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 500px;
  padding-top: 150px;
  padding-bottom: 150px;
  background-color: #2ea3f2;
  display: flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`;

function Product({ hit }) {
  return (
    <div>
      <Link to={hit.path}>
        <Highlight attributeName="title" hit={hit} />
      </Link>
      {/*<p>*/}
        {/*<Highlight attributeName="shortExcerpt" hit={hit} />*/}
      {/*</p>*/}
    </div>
  );
}


const IndexPage = () => (
  <HomePageHero>
    <div>
      <h1>Goo</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <Button type="primary">
        <Link to="/about">Go to page 2</Link>
      </Button>
    </div>
  </HomePageHero>
)

export default IndexPage
