import React from 'react'
import Gallery from 'react-photo-gallery'

class GalleryPage extends React.Component {
  
  render() {
    const { data } = this.props

    this.getImages = () => {
      console.log(data)
      const images = data.allContentfulGallery.edges[0].node.galleryImage
      console.log(images)

      const formattedImageArray = images.map(image => {
        return Object.assign({}, {
          key: image.id,
          src: image.file.url,
          srcSet: image.sizes.srcSet,
          width: image.file.details.image.width,
          height: image.file.details.image.height,
          alt: image.file.fileName,
        })
      })

      console.log(formattedImageArray)

      return formattedImageArray
    }
    
    return (
      <div>
        <Gallery photos={this.getImages()} />
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
