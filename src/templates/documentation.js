import React, { Component } from 'react';
import SidebarNav from '../components/SidebarNav'
import { Layout } from 'antd'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Parser from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';

const { Content } = Layout

const DocFooterWrap = styled.div`
  background: #021529;
  width:100%;
  padding: 24px;
`;

const NextLink = styled.div`
  float: right;
`;

const PrevLink = styled.div`
  float: left;
`;

class DocFooter extends Component {

  renderNextLink() {
    if ( this.props.next && this.props.next.frontmatter.path ) {
      return (
        <NextLink>
          <Link to={this.props.next.frontmatter.path}> {this.props.next.frontmatter.title + " >"}</Link>
        </NextLink>
      )
    }
  }

  renderPrevLink() {
    if ( this.props.prev && this.props.prev.frontmatter.path ) {
      return (
        <PrevLink>
          <Link to={this.props.prev.frontmatter.path}>{ "< " + this.props.prev.frontmatter.title}</Link>
        </PrevLink>
      )
    }
  }

  render() {
    return(
      <DocFooterWrap>
        {this.renderPrevLink()}
        {this.renderNextLink()}
      </DocFooterWrap>
    )
  }

}

const Playground = ({children}) => <div><h1>GraphiQL, Yo</h1>{children}</div>
const Tip = () => <div>TIPPPPPP</div>

class DocumentationTemplate extends React.Component {
  render() {
    const context = this.props.pathContext;
    const doc = this.props.data.markdownRemark;
    const prev = context.previous;
    const next = context.next;

    /**
     * Parse the content and replace inline components from Markdown content with actual React components
     */
    const content = Parser(doc.html, {
      replace: (domNode) => {
        /**
         * Replace inline <Playground> components with the actual Playground component
         */
        if (domNode.type === 'tag' && domNode.name === 'playground') {
          return <Playground>{domToReact(domNode.children)}</Playground>;
        }

        /**
         * Replace inline <Tip> components with the actual Tip component
         */
        if (domNode.type === 'tag' && domNode.name === 'tip') {
          return <Tip/>
        }
      }
    });

    return (
      <Layout>
        <SidebarNav pathContext={this.props.pathContext} location={this.props.location} />
        <Layout style={{ padding: '0 24px 24px', minHeight: 'calc(100vh - 64px)' }}>
          <Content style={{ background: '#fff', padding: 24, margin: "24px 0px 0px 0px" }}>
            <h1>{doc.frontmatter.title}</h1>
            <div>
              {content}
            </div>
          </Content>
          <DocFooter next={next} prev={prev} />
        </Layout>
      </Layout>
    )
  }
}

export default DocumentationTemplate

export const pageQuery = graphql`
    query DocumentByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                path
                title
            }
        }
    }
`;