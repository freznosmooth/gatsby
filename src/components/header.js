import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <div
    style={{
      background: 'rebeccapurple',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <nav
        style={{
          marginTop: '10px',
          backgroundColor: '#ffffff',
          padding: '10px',
        }}
        >
        <Link to="/about-us/">About Us</Link>
        &nbsp;|&nbsp;
        <Link to="/counter/">Counter</Link>
        &nbsp;|&nbsp;
        <Link to="/events/">Events</Link>
        &nbsp;|&nbsp;
        <Link to="/releases/">Releases</Link>
      </nav>
    </div>
  </div>
)

export default Header
