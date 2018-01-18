import React from 'react'
import { Row, Col } from 'antd'
import styled from 'styled-components'
import QuartzyLogo from './img/quartzy.svg'
import WorkQuartzLogo from './img/work.qz.svg'
import TwinCitiesLogo from './img/twincities.png'
import DenverPostLogo from './img/denverpost.svg'
import HopeLabLogo from './img/hopelab.png'

const Logo = styled.div`
  padding: 50px 0;
  width: auto;
  &>img{
    width: 100%;
  }
`;

const StlyedHeadline = styled.h3`
  text-align: center;
  font-size: 30px;
  margin-top:50px;
`;

const WhosUsingIt = () => (
  <Row type="flex" justify="space-around" align="middle">
    <Col span={18}>
      <StlyedHeadline>Who's Using WPGraphQL?</StlyedHeadline>
      <Row type="flex" justify="space-around" align="middle" gutter={16}>
        <Col xl={3} lg={4} md={8} sm={12} xs={12}>
          <Logo><img src={QuartzyLogo} /></Logo>
        </Col>
        <Col xl={3} lg={4} md={8} sm={12} xs={12}>
          <Logo><img src={WorkQuartzLogo} /></Logo>
        </Col>
        <Col xl={3} lg={4} md={8} sm={12} xs={12}>
          <Logo><img src={TwinCitiesLogo} /></Logo>
        </Col>
        <Col xl={3} lg={4} md={8} sm={12} xs={12}>
          <Logo><img src={DenverPostLogo} /></Logo>
        </Col>
        <Col xl={3} lg={4} md={8} sm={12} xs={12}>
          <Logo><img src={HopeLabLogo} /></Logo>
        </Col>
      </Row>
    </Col>
  </Row>
);

export default WhosUsingIt