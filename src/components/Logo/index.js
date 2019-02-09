import React from 'react'
import { Link } from 'gatsby'
import logo from '../../images/icon.png'

const Logo = ({size = 150, margin = '1rem' }) => (
  <Link to="/">
    <img style={{margin: margin }} src={logo} alt="" height={size} />
  </Link>
)

export default Logo;
