import React, { Component } from 'react';
import SidebarNav from '../components/SidebarNav'
import { Layout } from 'antd'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Parser from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { light, xonokai } from 'react-syntax-highlighter/styles/prism';
import SplitPane from 'react-split-pane'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { graphql } from 'graphql';

const typeDefs = `
 type Query {
   post: Post
 }
 type Post {
   id: ID!
   title: String
   date: String
   excerpt: String
 }
`;

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({
  schema,
  mocks: {
    Post: () => ({
      id: btoa( 'post:1' ),
      title: "Hello World",
      date: Date.now(),
      excerpt: 'Mock Excerpt'
    })
  },
  preserveResolvers: false
});

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

class MockResults extends Component {

  constructor(props) {
    super(props)
    this.state = {
      results: null
    };
  };

  componentDidMount() {
    let self = this;
    let query = this.props.query ? this.props.query : null;
    graphql(schema, query).then((result) => {
      self.setState({ results: JSON.stringify( result, null, 2 ) });
    });
  }

  render() {
      return <SyntaxHighlighter language='json' style={xonokai}>{ this.state.results !== null ? this.state.results : 'Loading...' }</SyntaxHighlighter>
  }

}

const Playground = ({children, title}) => (
  <div style={{border: '2px solid linear-gradient(#f0f0f0, #dedede)', borderRadius:'5px 5px 0 0', boxShadow: 'inset 0 2px 2px -2px white, 0 1px rgba(0, 0, 0)', marginBottom:'30px'}}>
    <h3 style={{background: '#eaeaea', 'marginBottom': 0, 'padding': 10, 'borderRadius': '25 25 0 0'}}>{title ? title : 'Playground'}</h3>
    <SplitPane defaultSize={'50%'} split="vertical" style={{backgroundColor: '#F4F0EE', position:'relative'}}>
      <div style={{backgroundColor:'#F4F0EE', height:'100%'}}>
        <SyntaxHighlighter language='graphql' style={light}>{children}</SyntaxHighlighter>
      </div>
      <div style={{backgroundColor:'#262626'}}>
        <MockResults query={children} />
      </div>
    </SplitPane>
  </div>
);

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
          return <Playground title={domNode.attribs.title}>{domToReact(domNode.children)}</Playground>;
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