const visit = require('unist-util-visit')

module.exports = ({ markdownAST }, { language = 'graphql' } = {}) => {
  visit(markdownAST, 'code', node => {
    let lang = (node.lang || '').toLowerCase()
  if (lang === language) {
    node.type = 'html'
    node.value = `<div class="graphiql-playground">${node.value}</div>`
  }
})
}

module.exports = ({ markdownAST }, { language = 'tip' } = {}) => {
  visit(markdownAST, 'code', node => {
    let lang = (node.lang || '').toLowerCase()
    if (lang === language) {
      node.type = 'html'
      node.value = `<div class="ant-card ant-card-bordered ant-card-wider-padding ant-card-type-inner"><div class="ant-card-head"><div class="ant-card-head-wrapper"><div class="ant-card-head-title">Inner Card title</div><div class="ant-card-extra"><a href="#">More</a></div></div></div><div class="ant-card-body"><div>>${node.value}</div></div></div>`
    }
  })
}