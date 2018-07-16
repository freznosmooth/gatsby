import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'

import colors from '../utils/colors'

const styles = {
  nav: {
    ' a': {
      color: 'white',
      textDecoration: 'none',
    },
    ' ul': {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    ' li': {
      padding: 0,
      margin: 0,
    },
  },
  mainNavList: {
    display: 'flex',
    ' li:hover': {
      '>ul': {
        display: 'block',
      },
    },
    ' a': {
      color: 'white',
      marginRight: '2rem',
    }
  },
  subNavList: {
    display: 'none',
    ' a': {
      color: 'white',
    }
  }
}

function sortByTitle(a, b) {
  const titleA = a.node.title.toUpperCase()
  const titleB = b.node.title.toUpperCase()
  if (titleA < titleB) {
    return -1
  }
  if (titleA > titleB) {
    return 1
  }
  return 0
}

function generateNavLink(page) {
  return (<Link key={page.id} to={page.slug}>{page.title}</Link>)
}

function generateNav(pages) {
  const mainNavPages = pages.filter(page => page.node.parentPage === null)
  const subNavPages = pages.filter(page => page.node.parentPage !== null)
  let siteNav = []

  mainNavPages.forEach(mainPage => {
    const mainPageLink = generateNavLink(mainPage.node)
    const childPages = subNavPages.filter(subPage => subPage.node.parentPage.slug === mainPage.node.slug)
    
    childPages.sort(sortByTitle)
    
    siteNav.push(
      <li key={mainPage.node.id}>
        {mainPageLink}
        {childPages &&
          <ul css={styles.subNavList}>
            {childPages.map(childPage => {
              return (
                <li key={childPage.node.id}>
                  {generateNavLink(childPage.node)}
                </li>
              )
            })}
          </ul>}
      </li>
    )
  });

  return siteNav
}

const HeaderNav = ({ sitePages }) => {
  return (
    <nav css={styles.nav}>
      <ul css={styles.mainNavList}>
        {generateNav(sitePages)}
        <li><Link key={'gallery'} to={'/gallery'}>Gallery</Link></li>
      </ul>
    </nav>
  )
}

HeaderNav.propTypes = {
  sitePages: PropTypes.array.isRequired,
}

export default HeaderNav
