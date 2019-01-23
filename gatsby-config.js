const path = require(`path`)
let activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV || 'development'

/**
 * Access environmental variables
 */
require('dotenv').config({
  path: `.env.${activeEnv}`,
})

const sitePages = `
{
  allSitePage {
    edges {
      node {
        id
        component
        path
        componentChunkName
        title: jsonName
        internal {
          type
          contentDigest
          owner
        }
      }
    }
  }
}
`;

const siteContent = `
{
  allMdx(filter: {fileAbsolutePath: {regex: "/content/docs/([\\\\w\\\\-/]+)/gm"}}) {
    edges {
      node {
        id
        timeToRead
        fileAbsolutePath
        wordCount {
          words
          paragraphs
          sentences
        }
        tableOfContents
        frontmatter {
          title
          description
        }
        content: html
        fields { 
          slug
        }
      }
    }
  }
}`

const queries = [
  {
    query: sitePages,
    transformer: ({ data }) => data.allSitePage.edges.map(({ node }) => {
      return node;
    })
  },
  {
    query: siteContent,
    transformer: ({ data }) => data.allMdx.edges.map(({ node }) => {

      node.path = node.fields.slug ? node.fields.slug : null;
      node.title = node.frontmatter.title ? node.frontmatter.title : node.fileAbsolutePath;

      if ( node.path && node.title ) {
        return node;
      } else {
        return null;
      }

    })
  }
];


module.exports = {
  siteMetadata: {
    title: `WPGraphQL`,
    description: `Documentation and marketing site for WPGraphQL. Built with Gatsby.`,
    author: `@wpgraphql`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-antd',
      options: {
        style: true,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-mdx`,
      options: {
        defaultLayouts: {
          default: path.resolve('./src/components/SiteLayout.js')
        },
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1035,
              sizeByPixelDensity: true
            }
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
          },
        ]
      },
    },
    {
      resolve: 'gatsby-plugin-less',
      options: {
        javascriptEnabled: true,
        modifyVars: {
          // DEFAULTS FOR ANT DESIGN
          // Full list of variables can be found here:
          // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
          // @primary-color: #1890ff;
          'layout-header-background': '#102032',
          // primary color for all components
          'primary-color': '#1890ff',
          // @link-color: #1890ff;
          'link-color': '#1890ff',
          // @success-color: #52c41a;
          'success-color': '#52c41a',
          // @warning-color: #faad14;
          'warning-color': '#faad14',
          // @error-color: #f5222d;
          'error-color': '#f5222d',
          // @font-size-base: 14px;
          // major text font size
          'font-size-base': '17px',
          // @heading-color: rgba(0, 0, 0, .85);
          'heading-color': 'rgba(0, 0, 0, .85)',
          // @text-color: rgba(0, 0, 0, .65);
          'text-color': 'rgba(0, 0, 0, .65)',
          // @text-color-secondary : rgba(0, 0, 0, .45);
          'text-color-secondary': 'rgba(0, 0, 0, .45)',
          // @disabled-color : rgba(0, 0, 0, .25);
          'disabled-color': 'rgba(0, 0, 0, .25)',
          // @border-radius-base: 4px;
          'border-radius-base': '4px',
          // @border-color-base: #d9d9d9;
          'border-color-base': '#d9d9d9',
          // @box-shadow-base: 0 2px 8px rgba(0, 0, 0, .15);
          'box-shadow-base': '0 2px 8px rgba(0, 0, 0, .15)',
        },
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        queries,
        chunkSize: 10000,
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        // This type will contain remote schema Query type
        typeName: 'SWAPI',
        // This is field under which it's accessible
        fieldName: 'swapi',
        // Url to query from
        url: 'https://api.graphcms.com/simple/v1/swapi',
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: 'GitHub',
        fieldName: 'github',
        // Url to query from
        url: 'https://api.github.com/graphql',
        // HTTP headers
        headers: {
          // Learn about environment variables: https://gatsby.app/env-vars
          Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content`,
        name: 'content'
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#102032`,
        theme_color: `#102032`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-111783024-1'
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
