import React from 'react'
import PropTypes from 'prop-types'

import Gallery from 'react-photo-gallery'
import Lightbox from 'react-images'

class LightboxGallery extends React.Component {
  constructor(props) {
    super(props)

    this.state = { 
      currentImage: 0, 
      lightboxIsOpen: false,
    }
  }
  
  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  
  handleGalleryImageClick = (e, obj) => {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }

  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  getGalleryImages = (images) => {
    const galleryImageSet = images.map(image => {
      return Object.assign({}, {
        key: image.id,
        src: image.file.url,
        srcSet: image.fluid.srcSet,
        width: image.file.details.image.width,
        height: image.file.details.image.height,
        alt: image.file.fileName,
      })
    })

    return galleryImageSet
  }

  getLightboxImages = (images) => {
    const lightboxImageSet = images.map(image => {
      return Object.assign({}, {
        src: image.file.url,
        srcSet: image.fluid.srcSet,
      })
    })

    return lightboxImageSet
  }

  render() {
    const { images } = this.props

    return (
      <div>
        <Gallery
          photos={this.getGalleryImages(images)}
          onClick={(e, obj) => this.handleGalleryImageClick(e, obj)}
        />
        <Lightbox
          images={this.getLightboxImages(images)}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.closeLightbox}
          showImageCount={false}
          backdropClosesModal={true}
        />
      </div>
    )
  }
}

LightboxGallery.propTypes = {
  images: PropTypes.array,
}

export default LightboxGallery
