'use strict';

const path = require("path");
const parseFilepath = require(`parse-filepath`);
const { syncToAlgolia } = require('./node/algoliasync');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const docTemplate = path.resolve(`src/templates/documentation.js`);

  return graphql(`
    query getAllMarkdown {
      allMarkdownRemark(limit: 1000, sort: {order: ASC, fields: [fileAbsolutePath]}, filter: {fileAbsolutePath: {regex: "//content/docs//"}}) {
        edges {
          previous {
            id
            fields {
              slug
            }
            frontmatter {
              title
              description
            }
          }
          node {
            fileAbsolutePath
            fields {
              slug
            }
            id
            shortExcerpt:excerpt(pruneLength:100)
            excerpt(pruneLength:1000)
            html
            timeToRead
            frontmatter {
              title
              description
            }
          }
          next {
            id
            fields {
              slug
            }
            frontmatter {
              title
              description
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    /**
     * Get all the pages from the GraphQL Request
     */
    const allPages = result.data.allMarkdownRemark.edges;

    if ( process.env.CONTEXT && process.env.CONTEXT === 'production' ) {
      console.log( 'Syncing to Algolia...' );
      syncToAlgolia(result.data);
    }

    /**
     * Creates the pages
     */
    allPages.forEach(({ node, next, previous } ) => {

      let path = node.fields && node.fields.slug ? node.fields.slug : '/';

      if ( path ) {

        /**
         * Create the page, passing context that can be used
         * by GraphQL Variables in page level GraphQL Queries
         */
        createPage({
          path: path,
          component: docTemplate,
          context: {
            path: path,
            node: node,
          },
        });

      }

    });
  });
};


function capitalize(string) {
  return string && string[0].toUpperCase() + string.slice(1);
}

// Create slugs for files.
exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const {createNodeField} = boundActionCreators
  let slug = '';
  if (node.internal.type === `MarkdownRemark`) {


    const fileNode = getNode(node.parent)
    const parsedFilePath = parseFilepath(fileNode.relativePath)

    if (parsedFilePath && parsedFilePath.dir) {

      if (fileNode.sourceInstanceName === `content`) {
        if (parsedFilePath.name !== `index` && parsedFilePath.dir !== ``) {
          slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`
        } else if (parsedFilePath.dir === ``) {
          slug = `/${parsedFilePath.name}/`
        } else {
          slug = `/${parsedFilePath.dir}/`
        }
      }

      if (slug) {
        createNodeField({ node, name: `slug`, value: slug })
      }
    }
  }
}