import React from 'react'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-images'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

class GalleryPage extends React.Component {
  constructor(props) {
    super(props)

    this.images = this.props.data.allContentfulGallery.edges[0].node.galleryImage

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

  getGalleryImages = () => {
    const galleryImageSet = this.images.map(image => {
      return Object.assign({}, {
        key: image.id,
        src: image.file.url,
        srcSet: image.sizes.srcSet,
        width: image.file.details.image.width,
        height: image.file.details.image.height,
        alt: image.file.fileName,
      })
    })

    return galleryImageSet
  }

  getLightboxImages = () => {
    const lightboxImageSet = this.images.map(image => {
      return Object.assign({}, {
        src: image.file.url,
        srcSet: image.sizes.srcSet,
      })
    })

    return lightboxImageSet
  }

  render() {
    return (
      <div>
        <Gallery photos={this.getGalleryImages()} onClick={(e, obj) => this.handleGalleryImageClick(e, obj)}/>
        <Lightbox
          images={this.getLightboxImages()}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.closeLightbox}
          showImageCount={false}
        />
      </div>
    )
  }
}

export default GalleryPage

export const query = graphql `
  query Gallery {
    allContentfulGallery {
      edges {
        node {
          id
          galleryImage {
            id
            sizes {
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
            resolutions {
              base64
              aspectRatio
              width
              height
              src
              srcSet
              srcWebp
              srcSetWebp
            }
            file {
              url
              fileName
              contentType
              details {
                size
                image {
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`
