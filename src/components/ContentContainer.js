import React from 'react'
import PropTypes from 'prop-types'

import variables from "../utils/variables";

const styles = {
  root: {
    margin: '0 auto',
    maxWidth: variables.contentMaxWidth,
    padding: '0px 1.45rem',
    paddingTop: 0,
  },
}

const ContentContainer = ({ children, component: Component }) => {
  return (
    <Component css={styles.root}>
      {children}
    </Component>
  )
}

ContentContainer.propTypes = {
  children: PropTypes.node,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

ContentContainer.defaultProps = {
  component: 'div',
}

export default ContentContainer
