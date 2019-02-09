import PropTypes from 'prop-types'
import React from 'react'
import {
  Layout, Row, Col
} from 'antd'
import SiteSearch from '../SiteSearch'
import Logo from '../Logo'

const {
} = Layout

const SiteHeader = ({ siteTitle, location }) => (
    <Row type="flex" justify="end">
      <Col
        xs={24}
        md={0}
        style={{
          textAlign: 'center'
        }}
      >
        <Logo size={40} />
        <SiteSearch />
      </Col>
      <Col xs={0} md={8} xl={8} xxl={6}>
        <SiteSearch />
      </Col>
    </Row>
)

SiteHeader.propTypes = {
  siteTitle: PropTypes.string,
}

SiteHeader.defaultProps = {
  siteTitle: ``,
}

export default SiteHeader
