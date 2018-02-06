module.exports = {
  siteMetadata: {
    title: `WPGraphQL Docs`
  },
  pathPrefix: "http://wpgraphql.com/",
  plugins: [
    `gatsby-plugin-antd`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-twitter`,

    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/favicon.png",
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content`,
        name: 'content'
      }
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/pages/docs/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-graphiql'
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-responsive-iframe`,
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-remark-prismjs`
          },
        ]
      }
    },
    {
      resolve: 'gatsby-remark-embed-snippet',
      options: {
        // Class prefix for <pre> tags containing syntax highlighting;
        // defaults to 'language-' (eg <pre class="language-js">).
        // If your site loads Prism into the browser at runtime,
        // (eg for use with libraries like react-live),
        // you may use this to prevent Prism from re-processing syntax.
        // This is an uncommon use-case though;
        // If you're unsure, it's best to use the default value.
        classPrefix: 'language-',

        // Example code links are relative to this dir.
        // eg examples/path/to/file.js
        directory: `${__dirname}/code-examples/`,
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#9D7CBF`,
        showSpinner: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-111783024-1'
      }
    }
  ]
};
