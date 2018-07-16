import React from 'react'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-images'

class GalleryPage extends React.Component {
  constructor() {
    super();
    this.state = { 
      currentImage: 0, 
      lightboxIsOpen: true,
    }
  }
  
  render() {
    const { data } = this.props

    this.openLightbox = (event, obj) => {
      this.setState({
        currentImage: obj.index,
        lightboxIsOpen: true,
      });
    }

    this.closeLightbox = () => {
      this.setState({
        currentImage: 0,
        lightboxIsOpen: false,
      });
    }

    this.gotoPrevious = () => {
      this.setState({
        currentImage: this.state.currentImage - 1,
      });
    }

    this.gotoNext = () => {
      this.setState({
        currentImage: this.state.currentImage + 1,
      });
    }

    this.getGalleryImages = () => {
      console.log(data)
      const images = data.allContentfulGallery.edges[0].node.galleryImage
      console.log(images)

      const galleryImageSet = images.map(image => {
        return Object.assign({}, {
          key: image.id,
          src: image.file.url,
          srcSet: image.sizes.srcSet,
          width: image.file.details.image.width,
          height: image.file.details.image.height,
          alt: image.file.fileName,
        })
      })

      console.log(galleryImageSet)

      return galleryImageSet
    }

    this.getLightboxImages = () => {
      console.log(data)
      const images = data.allContentfulGallery.edges[0].node.galleryImage
      console.log(images)

      const lightboxImageSet = images.map(image => {
        return Object.assign({}, {
          src: image.file.url,
        })
      })

      console.log(lightboxImageSet)

      return lightboxImageSet
    }
    
    return (
      <div>
        <Gallery photos={this.getGalleryImages()} />
        <Lightbox images={this.getLightboxImages()}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
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
