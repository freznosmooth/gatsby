import React from 'react'
import Gallery from 'react-photo-gallery'
// import Lightbox from 'react-images'
import Img from 'gatsby-image'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

class GalleryPage extends React.Component {
  constructor(props) {
    super(props)

    this.images = this.props.data.allContentfulGallery.edges[0].node.galleryImage
    console.log(this.images)

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
  
  handleClick = (e, obj) => {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }

  getGalleryImages = () => {
    const galleryImageSet = this.images.map(image => {
      console.log(image)
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
    // console.log(images)

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
        <Gallery photos={this.getGalleryImages()} onClick={(e, obj) => this.handleClick(e, obj)}/>
        {/* {this.state.lightboxIsOpen && */}
          <Carousel
            dynamicHeight
            showThumbs={false}
            selectedItem={this.state.currentImage}>
            {this.images.map(image => (
              <div  key={image.id} style={{ margin: '0 auto', maxWidth: '80vw', maxHeight: '60vh'}}>
                <Img sizes={image.sizes} />
              </div>
            ))}
          </Carousel>
        {/* } */}
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
