import React from 'react'
import styled from 'styled-components'

const StyledDanger = styled.div`
  padding: 12px 24px 12px 20px;
  margin: 2em 0;
  border-left: 4px solid;
  position: relative;
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;
  border-left-color: #f66;
  background-color: hsla(0,100%,70%,.06);
  &:before {
    background-color: #f66;
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

const Danger = ({children}) => <StyledDanger>{children}</StyledDanger>;

export default Danger;