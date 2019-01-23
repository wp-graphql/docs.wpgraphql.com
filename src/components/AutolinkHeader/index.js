import React from 'react'

const createSlug = title => {
  return title.toLowerCase()
    .split(' ').join('-').split(':').join('').split('(').join('').split(')').join('').split('/').join('');
}

const AutoLinkHeader = ({ is: Component, ...props }) => (
  <Component id={ createSlug( props.children ) } {...props} />
);

AutoLinkHeader.defaultProps = { is: "h2" };

export default AutoLinkHeader;
