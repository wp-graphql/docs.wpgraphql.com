import React from 'react'
import { Link } from 'gatsby'
import logo from '../../images/icon.png'

const Logo = () => (
  <Link to="/" style={{
    marginRight: '20px'
  }}>
    <img src={logo} alt="" height="150" />
  </Link>
)

export default Logo;
