import React from "react";
import Img from "gatsby-image";

export default ({data}) => {
  return (
    <div>
      <h1>Gallery</h1>
      {data.allContentfulGallery.edges.map(({node}, index) =>
        node.galleryImage.map(image => {
          return <Img key={image.id} sizes={image.sizes} />
        })
      )}
    </div>
  )
};


export const query   = graphql `
  query CatGalleryImages {
    allContentfulGallery {
      edges {
        node {
          id
          galleryImage {
            id
            sizes {
              ...GatsbyContentfulSizes
            }
          }
        }
      }
    }
  }
`
