import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Layout, Menu, Row, Button, Icon
} from 'antd'
import { StaticQuery, graphql, navigate, Link } from 'gatsby'
import SiteSearch from '../SiteSearch'

const ButtonGroup = Button.Group

const {
} = Layout



const menuItems = [
  {
    name: 'Docs',
    path: '/docs/getting-started/install-and-activate',
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

    <Row type="flex" justify="end">
      <SiteSearch />
      <UtilNav/>
    </Row>
)

SiteHeader.propTypes = {
  siteTitle: PropTypes.string,
}

SiteHeader.defaultProps = {
  siteTitle: ``,
}

export default SiteHeader
