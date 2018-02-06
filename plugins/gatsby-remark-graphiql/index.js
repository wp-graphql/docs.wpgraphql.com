const visit = require('unist-util-visit')
let React = require('react')
let ReactDOMServer = require('react-dom/server')
let HtmlToReactParser = require('html-to-react').Parser

module.exports = ({markdownAST}, {language = 'graphiql', theme = 'default'} = {}) => {
  visit(markdownAST, 'code', node => {
    let lang = (node.lang || '').toLowerCase()
    console.info(`lang is ${lang}`)
    if (lang === language) {
      node.type = 'html'

      let lines = node.value.split('\n');
      let firstLine = lines.shift().match(/^\s*#\s*({.*})$/);

      if (firstLine) {
        let metaData;
        try {
          metaData = JSON.parse(firstLine[1]);
        } catch (e) {
          console.error('Invalid Metadata JSON:', firstLine[1]);
        }
        if (metaData) {
          let query = lines.join('\n');
          let variables = metaData.variables ? JSON.stringify(metaData.variables, null, 2) : '';

          let isValidNode = function () {
            return true;
          };

          let processingInstructions = [
            {
              // Custom <h1> processing
              shouldProcessNode: function (node) {

                console.log(node)

                return node && node.name === 'playground';
              },
              processNode: function (node, children) {
                return `<h2>asdfasdfa</h2>`;
              }
            }, {
              // Anything else
              shouldProcessNode: function (node) {
                return true;
              },
              processNode: function (node, children, index) {
                return React.createElement('GraphiQL', {key: index}, 'Goo')
              }
            }];

          let htmlToReactParser = new HtmlToReactParser();
          let reactElement = htmlToReactParser.parseWithInstructions(node.value, isValidNode, processingInstructions);
          node.value = ReactDOMServer.renderToStaticMarkup(reactElement);
        }
      }
    }
  })
};