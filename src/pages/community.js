import React from 'react'
import Link from 'gatsby-link'
import { Button, Icon, Row, Col } from 'antd'
import styled from 'styled-components'

const CommunityPage = () => (
  <div>
    <Row>
      <Col span={12}>
        Slack
        <form netlify name="join-slack">
          <input name="email" type="email" />
          <button typr="submit" />
        </form>
      </Col>
      <Col span={12}>
        Github
      </Col>
    </Row>
    <Row>
      <Col span={12}>
        Twitter
      </Col>
      <Col span={12}>
        What else?
      </Col>
    </Row>
  </div>
)

export default CommunityPage
