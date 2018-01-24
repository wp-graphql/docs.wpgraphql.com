import React from 'react'
import styled from 'styled-components'

const StyledInfo = styled.div`
  padding: 12px 24px 12px 20px;
  margin: 2em 0;
  border-left: 4px solid;
  position: relative;
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;
  border-left-color: #3a6bbd;
  background-color: #eff5ff;
  &:before {
    background-color: #3a6bbd;
    content: "!";
    position: absolute;
    top: 14px;
    left: -12px;
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    text-align: center;
    line-height: 20px;
    font-weight: 300;
    font-family: Dosis,Source Sans Pro,Helvetica Neue,Arial,sans-serif;
  }
`;

const Info = ({children}) => <StyledInfo>{children}</StyledInfo>;

export default Info;