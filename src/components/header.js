import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Grid from '@roam/cake-ui-v1/Grid'

import ContentContainer from './ContentContainer'
import HeaderNav from './HeaderNav'

import variables from '../utils/variables'
import colors from '../utils/colors'

const styles = {
  header: {
    padding: '1.45rem 0',
  },
  title: {
    margin: 0,
    '>a': {
      color: 'white',
      textDecoration: 'none',
    }
  },
  grid: {
    root: {
      'alignItems': 'center',
    },
  },
}

const Header = ({ siteTitle, sitePages }) => (
  <ContentContainer>
    <header css={styles.header}>
      <Grid style={styles.grid.root} container spacing={variables.gridSpacing}>
        <Grid item xs={12} md={6}>
          {/* <h1 css={styles.title}>
            <Link to="/">{siteTitle}</Link>
          </h1> */}
        </Grid>
        <Grid item xs={12} md={6}>
          <HeaderNav sitePages={sitePages}/>
        </Grid>
      </Grid>
    </header>
  </ContentContainer>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  sitePages: PropTypes.array,
}

export default Header
