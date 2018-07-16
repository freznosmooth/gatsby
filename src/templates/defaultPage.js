import React from 'react'
import Link from 'gatsby-link'

const DefaultPage = ({ data }) => (
  <div>
    <h1>{data.contentfulPage.heading}</h1>
    <div dangerouslySetInnerHTML={{__html: data.contentfulPage.content.childMarkdownRemark.html}} />
  </div>
)

export default DefaultPage

export const query = graphql`
  query pageQuery($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      id
      slug
      heading
      content {
        id
        childMarkdownRemark {
          id
          html
        }
      }
    }
  }
`
