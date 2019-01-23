import navDocs from '../content/docs/nav.yml'

const docsNavList = navDocs.map(( item ) => ({...item, directory: `/docs/${item.directory}`}));

export {
  docsNavList
}
