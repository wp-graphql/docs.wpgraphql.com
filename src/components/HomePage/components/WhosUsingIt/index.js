import React from 'react'
import { Row, Col } from 'antd'
import styled from 'styled-components'
import QuartzyLogo from './img/quartzy.svg'
import WorkQuartzLogo from './img/work.qz.svg'

const Logo = styled.div`
  padding: 50px 0;
  width: auto;
  &>img{
    width: 100%;
  }
`;

const WhosUsingIt = () => (
  <Row type="flex" justify="space-around" align="middle">
    <Col span={18}>
      <Row type="flex" justify="space-around" align="middle" gutter={16}>
        <Col xl={3} lg={4} md={8} sm={12} xs={12}>
          <Logo><img src={QuartzyLogo} /></Logo>
        </Col>
        <Col xl={3} lg={4} md={8} sm={12} xs={12}>
          <Logo><img src={WorkQuartzLogo} /></Logo>
        </Col>
        <Col xl={3} lg={4} md={8} sm={12} xs={12}>
          <Logo>Denver Post</Logo>
        </Col>
        <Col xl={3} lg={4} md={8} sm={12} xs={12}>
          <Logo>Digital First Media</Logo>
        </Col>
        <Col xl={3} lg={4} md={8} sm={12} xs={12}>
          <Logo>Hope Labs</Logo>
        </Col>
      </Row>
    </Col>
  </Row>
);

export default WhosUsingIt