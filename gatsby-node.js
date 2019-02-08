/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({graphql, actions}) => {
  const { createPage } = actions;
  const docTemplate = path.resolve(`./src/templates/doc.js`);
  return graphql(`
    query ALL_MARKDOWN_PAGES {
      allMdx {
        edges {
          node {
            id
            fileAbsolutePath
          }
          next {
            id
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
          previous {
            id
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }   
  `).then( result => {

    if ( result.errors ) {
      throw result.errors
    }

    const docs = result.data.allMdx.edges;

    docs.forEach((doc, index) => {

      const regex = /content\/([\w\-\/]+)/gm;
      const str = doc.node.fileAbsolutePath;
      let path = regex.exec(str);

      if ( path && path.length && path[1] ) {

        createPage({
          path: path[1],
          component: docTemplate,
          context: {
            id: doc.node.id,
            fileAbsolutePath: doc.node.fileAbsolutePath,
            next: doc.next ? doc.next : null,
            prev: doc.previous ? doc.previous : null
          }
        })
      }

    });

  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;


  if (node.internal.type === "Mdx") {

    const value = createFilePath({node, getNode});
    const {relativePath, sourceInstanceName} = getNode(node.parent);

    /**
     * Create a URL friendly slug
     */
    createNodeField({
      name: 'slug',
      node,
      value
    });

    /**
     * Creates the path to the file. Helpful for use in linking to the source
     * file in the Github repo for `edit this page` links, etc
     */
    createNodeField({
      node,
      name: 'path',
      value: path.join(sourceInstanceName, relativePath),
    });

  }

}
