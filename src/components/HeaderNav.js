import React from 'react'
import Link from 'gatsby-link'

import colors from './../utils/colors'

const styles = {
  nav: {
    paddingTop: '1rem',
    '>a': {
      color: '#fff',
      marginRight: '2rem',
    }
  },
}

const HeaderNav = () => (
  <nav css={styles.nav}>
    <Link to="/">Home</Link>
    <Link to="/theme">Theme</Link>
    <Link to="/events/">Events</Link>
    <Link to="/releases/">Releases</Link>
    <Link to="/gallery/">Gallery</Link>
  </nav>
)

export default HeaderNav
