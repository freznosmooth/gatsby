import React from 'react'
import PropTypes from 'prop-types'

const LaptopCarouselNextArrow = ({ className, onClick }) => {
  return (
    <div
      className={className}
      onClick={onClick}>
      <svg width="40" height="13" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#FFF" strokeWidth="2" fill="none" fillRule="evenodd">
          <path d="M37.849 6.34H0h37.849zM33 1l5.197 5.337L33 11.58"/>
        </g>
      </svg>
    </div>
  )
}

LaptopCarouselNextArrow.proptypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
}

export default LaptopCarouselNextArrow
