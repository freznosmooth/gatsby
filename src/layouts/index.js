import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { TypographyStyle, GoogleFont } from 'react-typography'
import typography from './../utils/typography'

import ContentContainer from '../components/ContentContainer'
import Header from '../components/Header'

const Layout = ({ children, data }) => (
  <div>
    <Helmet>
      <title>{data.site.siteMetadata.title}</title>
      <meta name="description" content="JAMstack starter project. Gatsby, Contenful, Netlify." />
      <meta name="keywords" content="JAMstack, starter, Gatsby, Contentful, Netlify" />
      <TypographyStyle typography={typography} />
      <GoogleFont typography={typography} />
    </Helmet>
    <Header siteTitle={data.site.siteMetadata.title} sitePages={data.allContentfulPage.edges}/>
    <ContentContainer component={'main'}>
      {children()}
    </ContentContainer>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object.isRequired
}

export default Layout

export const query = graphql`
  query SiteDataQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPage(
      filter: { showInSiteNavigation: { eq: true } }
      sort: { fields: [ siteNavigationOrder ], order: ASC }
    ) {
      edges {
        node {
          id
          slug
          title
          parentPage {
            id
            slug
          }
        }
      }
    }
  }
`
