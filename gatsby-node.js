/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const defaultPageTemplate = path.resolve(`src/templates/defaultPage.js`);
    resolve(
      graphql(
        `
          {
            allContentfulPage {
              edges {
                node {
                  id
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors);
        }
        result.data.allContentfulPage.edges.forEach(({ node }) => {
          createPage({
            path: node.slug,
            component: defaultPageTemplate,
            layout: `index`,
            context: {
              slug: node.slug,
            },
          });
        });
      })
    );
  });
};
