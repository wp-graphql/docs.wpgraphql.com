import React from 'react'
import { Row, Col } from 'antd'

const Container = ({children}) => (
    <Row type="flex" justify="center">
        <Col span={18} >
             {children}
        </Col>
    </Row>
);

export default Container;
