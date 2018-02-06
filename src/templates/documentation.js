import React, {Component} from 'react';
import SidebarNav from '../components/SidebarNav'
import Link from 'gatsby-link'
import { Row, Col } from 'antd'
import {light} from 'react-syntax-highlighter/styles/prism';
import {graphql} from 'graphql';

import { Layout } from 'antd';
import ParsedContent from '../components/ParsedContent'

const {Content} = Layout

class DocumentationTemplate extends React.Component {
  render() {
    const context = this.props.pathContext;
    const doc = this.props.data.markdownRemark;
    const nav = this.props.data.allDocsNavYaml;
    return (
      <Layout style={{padding: '24px', minHeight: 'calc(100vh - 64px)'}}>
        <Row type="flex" justify="space-around" align="top">
          <Layout style={{padding: '0 24px 24px', minHeight: 'calc(100vh - 64px)'}}>
            <SidebarNav pathContext={context} navItems={nav} location={this.props.location}/>
            <Content style={{background: '#fff', padding: 24}}>
              <Row type="flex" justify="space-around" align="top" gutter={16}>
                <Col xl={22} lg={22} md={22} sm={22} xs={24}>
                  <h1>{doc.frontmatter.title}</h1>
                  <ParsedContent html={doc.html} />
                </Col>
              </Row>
            </Content>
          </Layout>
        </Row>
      </Layout>
    )
  }
}

export default DocumentationTemplate

export const pageQuery = graphql`
    query DocumentByPath($path: String!) {
      markdownRemark( fields: { slug: { eq: $path } } ) {
        frontmatter {
          title
          description
        }
        fields {
          slug
        }
        html
        timeToRead
        tableOfContents
        headings {
          value
          depth
        }
      }
      allDocsNavYaml {
        edges {
          node {
            title
            section
            items {
              title
              link
            }
          }
        }
      }
    }
`;