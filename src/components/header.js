import React from 'react'
import Link from 'gatsby-link'
import HeaderNav from './HeaderNav'

import colors from './../utils/colors'

const styles = {
  header: {
    background: colors.primary,
    marginBottom: '1.45rem',
  },
  contentWrap: {
    margin: '0 auto',
    maxWidth: '960px',
    padding: '1.45rem',
  },
  title: {
    margin: 0,
    '>a': {
      color: 'white',
      textDecoration: 'none',
    }
  }
}

const Header = ({ siteTitle }) => (
  <header css={styles.header}>
    <div css={styles.contentWrap}>
      <h1 css={styles.title}>
        <Link to="/">{siteTitle}</Link>
      </h1>
      <HeaderNav />
    </div>
  </header>
)

export default Header
