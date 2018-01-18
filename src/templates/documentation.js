import React, { Component } from 'react';
import SidebarNav from '../components/SidebarNav'
import { Layout } from 'antd'
import Link from 'gatsby-link'
import JsxParser from 'react-jsx-parser'
import styled from 'styled-components'

// const StyledTip = styled.div`
//     background-color: rgba(255,229,100,0.3);
//     border-left-color: #ffe564;
//     border-left-width: 9px;
//     border-left-style: solid;
//     padding: 20px 45px 20px 26px;
//     margin-bottom: 30px;
//     margin-top: 20px;
// `;
//
// const Tip = ({children}) => <div><StyledTip>{children}</StyledTip></div>;
// const Playground = ({children}) => <div className="graphiql"><StyledTip>{children}</StyledTip></div>;



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

class DocumentationTemplate extends React.Component {
  render() {
    const context = this.props.pathContext;
    const doc = this.props.data.markdownRemark;
    const prev = context.previous;
    const next = context.next;
    return (
      <Layout>
        <SidebarNav pathContext={this.props.pathContext} location={this.props.location} />
        <Layout style={{ padding: '0 24px 24px', minHeight: 'calc(100vh - 64px)' }}>
          <Content style={{ background: '#fff', padding: 24, margin: "24px 0px 0px 0px" }}>
            <h1>{doc.frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{__html: doc.html }} />
            {/*<JsxParser*/}
              {/*jsx={doc.html}*/}
              {/*components={{*/}
                {/*PLAYGROUND: Playground,*/}
                {/*TIP: Tip,*/}
              {/*}}*/}
              {/*showWarnings={true}*/}
            {/*/>*/}
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