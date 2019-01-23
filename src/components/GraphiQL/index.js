import React, { Component } from 'react'
import GraphiQL from 'graphiql'
import { parse, print } from 'graphql'
import fetch from 'isomorphic-fetch'
import classNames from 'classnames'
import 'graphiql/graphiql.css'
import './style.css'

function graphQLFetcher(graphQLParams) {

  const extensions = {
    tracing: false,
    queryLog: false,
  }

  graphQLParams = { ...graphQLParams, extensions }

  return fetch('https://www.wpgraphql.com/graphql', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json())
}

class GraphiQLComponent extends Component {
  state = {
    render: false,
  }

  componentDidMount() {
    this.setState({
      render: true,
    })
  }

  render() {
    const { render } = this.state
    const { query, variables, response, withDocs } = this.props
    const formattedQuery = print(parse(query))
    const showDocs = true === withDocs ? 'with-docs' : null;
    return render ?
      <div
        className={ classNames( 'graphiql-wrapper', showDocs ) }
        style={{
          height: '500px',
          width: '100%',
          margin: '15px 0',
          padding: '0',
        }}
      >
        <GraphiQL
          fetcher={graphQLFetcher}
          query={formattedQuery}
          variables={variables ? JSON.stringify(variables) : null}
        />
      </div> : 'GraphiQL Loading...'
  }
}

export default GraphiQLComponent
