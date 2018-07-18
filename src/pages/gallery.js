import React, { Component } from 'react';
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-images';

class GalleryPage extends Component {
  constructor() {
    super()

    this.state = { 
      currentImage: 0, 
      lightboxIsOpen: true,
    }
  }
  
  closeLightbox = () => {
    this.setState({
      currentImage: 0,
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

  getGalleryImages = (data) => {
    const images = data.allContentfulGallery.edges[0].node.galleryImage

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

    return galleryImageSet
  }

  getLightboxImages = () => {
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

  render() {
    const { data } = this.props
    
    return (
      <div>
        <Gallery photos={this.getGalleryImages(data)} onClick={(e, obj) => {console.log('clicked', e, obj)}}/>
        {/* <Lightbox
          images={[{ src: 'http://www.placehold.it/800x400' }, { src: 'http://www.placehold.it/600x900' }]}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.closeLightbox}
        /> */}
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
