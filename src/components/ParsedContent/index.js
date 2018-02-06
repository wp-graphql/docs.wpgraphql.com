import React, { Component } from 'react'
import Parser from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';
import Tip from '../Tip';
import Info from '../Info';
import Danger from '../Danger';
import Warning from '../Warning';
import GraphQLDemo from '../GraphQLDemo'
import { Card, Collapse } from 'antd';
import styled from 'styled-components'


const Panel = Collapse.Panel;

const StyledHighlight = styled.span`
  color: #525035;
  background: #FDF37D;
  display: inline-block;
  padding: .05rem .2rem;
  margin: 0;
`;

const HighlightText = ({children}) => <StyledHighlight>{children}</StyledHighlight>


class ParsedContent extends Component {

  render() {

    let html = this.props.html;

    /**
     * Parse the content and replace inline components from Markdown content with actual React components
     */
    let content = Parser(html, {
      replace: (domNode) => {
        /**
         * Replace inline <Playground> components with the actual Playground component
         */
        if (domNode.type === 'tag' && domNode.name === 'graphql') {
          return <GraphQLDemo title={domNode.attribs.title}>{domToReact(domNode.children)}</GraphQLDemo>;
        }

        /**
         * Replace inline <Tip> components with the actual Tip component
         */
        if (domNode.type === 'tag' && domNode.name === 'tip') {
          return <Tip>{domToReact(domNode.children)}</Tip>;
        }

        if (domNode.type === 'tag' && domNode.name === 'info') {
          return <Info>{domToReact(domNode.children)}</Info>;
        }

        if (domNode.type === 'tag' && domNode.name === 'warning') {
          return <Warning>{domToReact(domNode.children)}</Warning>;
        }

        if (domNode.type === 'tag' && domNode.name === 'danger') {
          return <Danger>{domToReact(domNode.children)}</Danger>;
        }

        if (domNode.type === 'tag' && domNode.name === 'highlight') {
          return <HighlightText>{domToReact(domNode.children)}</HighlightText>;
        }

        if (domNode.type === 'tag' && domNode.name === 'collapse') {

          const customPanelStyle = {
            background: '#f8f8f8',
            borderRadius: 0,
            marginBottom: 24,
            border: 0,
            overflow: 'hidden',
          };

          return (
            <Collapse bordered={false}>
              <Panel header={domNode.attribs.title} key="1" style={customPanelStyle}>
                {domToReact(domNode.children)}
              </Panel>
            </Collapse>
          )
        }

        if (domNode.type === 'tag' && domNode.name === 'card') {
          return <Card title={domNode.attribs.title} loading={domNode.attribs.loading}>
            {domToReact(domNode.children)}
          </Card>;
        }

      }
    });

    return(
      <div>
        {content && content.length ? content : <Info>More info coming soon on this topic...</Info> }
      </div>
    )

  }

}

export default ParsedContent