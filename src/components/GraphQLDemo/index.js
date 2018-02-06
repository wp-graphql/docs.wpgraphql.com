import React, { Component } from 'react'
import SplitPane from 'react-split-pane'
import SyntaxHighlighter from 'react-syntax-highlighter/prism'
import {light, xonokai} from 'react-syntax-highlighter/styles/prism'
import fetch from 'isomorphic-fetch'
import styled from 'styled-components'

const ClickMe = styled.div`
  height: 150px;
  width: 150px;
  border-radius: 100px;
  border: 1px solid #fff;
  margin: 55px auto 0;
  text-align:center;
  color: #fff;
  font-size: 100px;
  line-height: 130px;
  cursor: 'pointer';
  &:hover{
    background: rgba( 255, 255, 255, 0.3 )
    cursor: 'pointer';
  }
  
`;

class MockResults extends Component {

  constructor(props) {
    super(props)
    this.state = {
      results: null,
    };
  };


  fetch() {
    let self = this;
    let query = this.props.query ? this.props.query : null;
    let graphQLParams = {
      query: query
    };
    self.setState({results: 'Loading...'});

    return fetch('https://api.wpgraphql.com/graphql', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(graphQLParams),
    }).then(
      response => {
        return response.json();
      }
    ).then(function(data) {
      self.setState({results: JSON.stringify(data, null, 2)});
    });
  }

  renderResults() {
    return (
      <SyntaxHighlighter
        showLineNumbers
        language='json'
        style={xonokai}
      >
        { this.state.results !== false ? this.state.results : 'Loading response...' }
      </SyntaxHighlighter>
    )
  }

  renderButton() {
    return (
      <ClickMe onClick={() => this.fetch()}> > </ClickMe>
    )
  }

  render() {
    return (
      <div>
        { this.state.results !== null ? this.renderResults() : this.renderButton() }
      </div>
    )
  }

}

const GraphQLDemo = ({children, title}) => (
  <div style={{
    border: '2px solid linear-gradient(#f0f0f0, #dedede)',
    borderRadius: '5px 5px 0 0',
    boxShadow: 'inset 0 2px 2px -2px white, 0 1px rgba(0, 0, 0)',
    marginBottom: '30px',
    maxWidth: '1200px',
    overflow:'auto',
    margin: '20px auto 50px'
  }}>
    <h3 style={{
      background: '#eaeaea',
      'marginBottom': 0,
      'padding': 10,
      'borderRadius': '25 25 0 0'
    }}>{title ? title : 'Playground'}</h3>
    <SplitPane defaultSize={'50%'} split="vertical" style={{ backgroundColor: '#F4F0EE', position: 'relative'}}>
      <div style={{backgroundColor: '#F4F0EE', height: '100%', maxHeight:'500px', overflow:'auto'}}>
        <SyntaxHighlighter language='graphql' style={light}>{children}</SyntaxHighlighter>
      </div>
      <div style={{backgroundColor: '#262626', maxHeight:'500px', overflow:'auto'}}>
        <MockResults query={children}/>
      </div>
    </SplitPane>
  </div>
);

export default GraphQLDemo