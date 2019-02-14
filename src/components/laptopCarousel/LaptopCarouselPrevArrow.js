import React from 'react'
import PropTypes from 'prop-types'

const LaptopCarouselPrevArrow = ({ className, onClick }) => {
  return (
    <div
      className={className}
      onClick={onClick}>
      <svg width="40" height="13" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#FFF" strokeWidth="2" fill="none" fillRule="evenodd">
          <path d="M2.151 6.66H40 2.151zM7 12L1.803 6.663 7 1.42"/>
        </g>
      </svg>
    </div>
  )
}

LaptopCarouselPrevArrow.proptypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
}

export default LaptopCarouselPrevArrow
