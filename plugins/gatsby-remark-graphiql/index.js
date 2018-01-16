const visit = require('unist-util-visit')

module.exports = ({ markdownAST }, { language = 'graphql', theme = 'default' } = {}) => {
  visit(markdownAST, 'code', node => {
    let lang = (node.lang || '').toLowerCase()
    console.info(`lang is ${lang}`)
  if (lang === language) {
    node.type = 'html'

    console.log( node );

    var lines = node.value.split('\n');
    var firstLine = lines.shift().match(/^\s*#\s*({.*})$/);

    console.log( firstLine );

    if (firstLine) {
      var metaData;
      try {
        metaData = JSON.parse(firstLine[1]);
      } catch (e) {
        console.error('Invalid Metadata JSON:', firstLine[1]);
      }
      if (metaData) {
        var query = lines.join('\n');
        var variables = metaData.variables ? JSON.stringify(metaData.variables, null, 2) : '';
        node.value = `<div class="graphiql" data-query="${query}" data-variables="${variables}" >${node.value}</div>`
      }
    }
  }
})
}