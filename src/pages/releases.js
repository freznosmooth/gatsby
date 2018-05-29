import React from 'react'

export default ({ data }) => {
  return (
    <div>
      <h1>Releases</h1>
      <table>
        <thead>
          <tr>
            <td>Date</td>
            <td>Release Type</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          {data.allContentfulRelease.edges.map(({node}, index) =>
            <tr key={node.id}>
              <td>{node.date}</td>
              <td>
                {node.type}
              </td>
              <td>
                <a href={node.pdf.file.url} target="_blank">{node.title}</a>
                <p>{node.description.description}</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export const query = graphql `
  query Releases {
    allContentfulRelease {
      edges {
        node {
          id
          date
          type
          title
          description {
            id
            description
          }
          pdf {
            id
            file {
              url
              fileName
              contentType
            }
          }
        }
      }
    }
  }
`
