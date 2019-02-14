import React from 'react'

import Layout from '../components/layout'
import SlickGallery from '../components/SlickGallery';

const IndexPage = ({ data }) => {

  const images = data.allContentfulGallery.edges[0].node.galleryImage

  return (
    <Layout>
      <SlickGallery images={images} />
    </Layout>
  )
}

export default IndexPage

export const query = graphql `
  query OgPageGallery {
    allContentfulGallery {
      edges {
        node {
          id
          galleryImage {
            id
            fluid {
              ...GatsbyContentfulFluid
            }
            file {
              url
              fileName
              details {
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
