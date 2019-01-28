import React from 'react'
import { Row, Col } from 'antd'

const Container = ({children}) => (
    <Row type="flex" justify="center">
        <Col  xs={24} lg={24} xl={20} >
             {children}
        </Col>
    </Row>
);

export default Container;
