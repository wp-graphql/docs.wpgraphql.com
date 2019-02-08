import navDocs from '../content/nav.yml'

const docsNavList = navDocs.map(( item ) => ({...item, directory: item.directory}));

export {
  docsNavList
}
