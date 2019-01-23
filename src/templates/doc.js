import React from 'react'
import { graphql, navigate } from 'gatsby'
import { Layout, Menu, Icon, Anchor, Row, Col, Divider, Button } from 'antd'
import SiteLayout from '../components/SiteLayout'
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { MDXProvider } from '@mdx-js/tag';
import Container from '../components/Container'
import { docsNavList } from '../utils/nav'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/styles/hljs'
import AutoLinkHeader from '../components/AutolinkHeader'
const { Link: AnchorLink } = Anchor;

const { SubMenu } = Menu;
const {
  Content, Sider,
} = Layout;

const getOpenKey = (docsNavList, path) => {
  const list = docsNavList.map( item => {
    if (path.includes( item.directory )) {
      return item.directory;
    } else {
      return null;
    }
  })

  return list.filter( (el) => {
    return el != null;
  })

}

const DocsNav = ({location}) => (
  <Menu
    mode="inline"
    defaultSelectedKeys={['1']}
    defaultOpenKeys={getOpenKey(docsNavList, location.pathname)}
    selectedKeys={location.pathname ? location.pathname : []}
    style={{ height: '100%' }}
  >
    {docsNavList.map( item => {
      return(
        <SubMenu key={item.directory} title={<span><Icon type={item.icon} />{item.title}</span>}>
          {item.items.map( subItem => {
            return <Menu.Item key={ item.directory + '/' + subItem.id } onClick={() => { navigate( item.directory + '/' + subItem.id ) }}>{subItem.title}</Menu.Item>;
          })}
        </SubMenu>
      );
    })}
  </Menu>
);

const CodeSyntaxHighlighter = (props) => {
  const { children, className } = props;
  const language = className && className.includes('language-') ? className.replace('language-', '') : 'javascript';
  return <SyntaxHighlighter language={language} style={tomorrowNightEighties}>{children}</SyntaxHighlighter>;
};

const DocTemplate = ({data, location}) => {
  return(
    <SiteLayout location={location}>
      <Container>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => { console.log(broken); }}
            onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
            width={300}
            style={{ background: '#fff' }}
          >
            <Anchor className='docsnav-anchor' offsetTop={80}>
              <DocsNav location={location} />
            </Anchor>
          </Sider>
          <Content style={{ padding: '0px', minHeight: 280 }}>
            <Row>
              <Col span={18}>
                <div className="content" style={{ padding: '0px 48px 0 35px' }}>
                  <h1>{data.mdx.frontmatter.title}</h1>
                  <Divider />
                  <MDXProvider
                    components={{
                      code: props => <CodeSyntaxHighlighter {...props} />,
                      h1: props => <AutoLinkHeader is="h1" {...props} />,
                      h2: props => <AutoLinkHeader is="h2" {...props} />,
                      h3: props => <AutoLinkHeader is="h3" {...props} />,
                      h4: props => <AutoLinkHeader is="h4" {...props} />,
                      h5: props => <AutoLinkHeader is="h4" {...props} />,
                      h6: props => <AutoLinkHeader is="h4" {...props} />,
                    }}
                    >
                    <MDXRenderer>
                      {data.mdx.code.body}
                    </MDXRenderer>
                  </MDXProvider>
                  <Divider />
                  <a href={`https://github.com/wp-graphql/wpgraphql.com/tree/master/src/${data.mdx.fields.path}`} target="_blank" rel="noopener noreferrer" >
                  <Button icon='github' type='dashed'>Edit this page</Button>
                  </a>
                </div>
              </Col>
              <Col span={6}>
                {
                  data.mdx.tableOfContents.items && data.mdx.tableOfContents.items.length ?
                    <Anchor
                      offsetTop={80}>
                      <h4 style={{paddingLeft: '13px', marginTop: '10px'}}>On this page</h4>
                      {data.mdx.tableOfContents.items && data.mdx.tableOfContents.items.map( item => {
                        return (<AnchorLink href={item.url} title={item.title} >{
                          item.items && item.items.map( childItem => {
                            return (
                              <AnchorLink href={childItem.url} title={childItem.title} >
                                {
                                  childItem.items && childItem.items.map( grandChildItem => {
                                    return <AnchorLink href={grandChildItem.url} title={grandChildItem.title} />
                                  })
                                }
                              </AnchorLink>
                            )
                          })
                        }</AnchorLink>)
                      })}
                    </Anchor>
                  : null
                }
              </Col>
            </Row>
          </Content>
        </Layout>
      </Container>
    </SiteLayout>
  )
}

export default DocTemplate

export const pageQuery = graphql`
query GET_DOC_PAGE( $id: String! $fileAbsolutePath: String ) {
  mdx(id: {eq: $id}) {
    id
    timeToRead
    fileAbsolutePath
    frontmatter {
      title
      description
    }
    tableOfContents
    fields{
      path
    }
    wordCount {
      words
      sentences
      paragraphs
    }
    code {
      body
    }
  }
  file(absolutePath: {eq: $fileAbsolutePath}) {
    id
    birthTime(formatString:"MMMM DD, YYYY")
    modifiedTime
    changeTime
  }
}
`;
