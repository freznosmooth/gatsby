import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import Gallery from 'react-photo-gallery'
import Slider from 'react-slick'

class SlickGallery extends React.Component {
  constructor(props) {
    super(props)

    this.state = { 
      currentImage: 0, 
      sliderOpen: false,
    }
  }
  
  closeSlider = () => {
    enableBodyScroll()
    this.setState({
      currentImage: 0,
      sliderOpen: false,
    });
  }
  
  openSlider = (event, obj) => {
    disableBodyScroll()
    if (event) {
      event.preventDefault()
    }
    this.setState({
      currentImage: obj.index,
      sliderOpen: true,
    });
  }

  getGalleryImages = (images) => {
    return images.map(image => {
      return {
        key: image.id,
        src: image.file.url,
        srcSet: image.fluid.srcSet,
        width: image.file.details.image.width,
        height: image.file.details.image.height,
        alt: image.file.fileName,
      }
    })
  }

  renderSlider = (images, sliderSettings) => {
    const slides = images
      .map(image =>
        <img
          key={image.id}
          className="overlay-slider__image"
          src={image.file.url}
          alt={image.file.details.fileName} />
      )
    
    return (
      <div className="overlay-slider-container">
        <button
          style={{
            position: 'absolute', top: '20px', right: '20px', zIndex: 1, cursor: 'pointer'
          }}
          onClick={this.closeSlider}>
          Close
        </button>
        <Slider className="overlay-slider" {...sliderSettings}>
          {slides}
        </Slider>
      </div>
    )
  }

  render() {
    const { images } = this.props
    const sliderSettings = {
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      initialSlide: this.state.currentImage,
    }

    return (
      <div>
        <Gallery
          photos={this.getGalleryImages(images)}
          onClick={(event, obj) => this.openSlider(event, obj)}
        />
        <CSSTransition
          in={this.state.sliderOpen}
          timeout={300}
          classNames="overlay"
          unmountOnExit
        >
          {this.renderSlider(images, sliderSettings)}
        </CSSTransition>
      </div>
    )
  }
}

SlickGallery.propTypes = {
  images: PropTypes.array,
}

export default SlickGallery
