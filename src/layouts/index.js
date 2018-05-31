import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { TypographyStyle, GoogleFont } from 'react-typography'
import typography from './../utils/typography'

import Header from '../components/header'

const styles = {
  main: {
    margin: '0 auto',
    maxWidth: 960,
    padding: '0px 1.45rem',
    paddingTop: 0,
  },
}

const Layout = ({ children, data }) => (
  <div>
    <Helmet>
      <title>{data.site.siteMetadata.title}</title>
      <meta name="description" content="JAMstack starter project. Gatsby, Contenful, Netlify." />
      <meta name="keywords" content="JAMstack, starter, Gatsby, Contentful, Netlify" />
      <TypographyStyle typography={typography} />
      <GoogleFont typography={typography} />
    </Helmet>
    <Header siteTitle={data.site.siteMetadata.title} />
    <main css={styles.main}>
      {children()}
    </main>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
