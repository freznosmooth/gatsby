import React from 'react'

export default ({ data }) => {
  return (
    <div>
      <h1>Events</h1>
      <table>
        <thead>
          <tr>
            <td>Date</td>
            <td>Event</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          {data.allContentfulEvent.edges.map(({node}, index) =>
            <tr key={node.id}>
              <td>{node.date}</td>
              <td>
                <h2>{node.title}</h2>
                {node.location}
              </td>
              <td>
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
  query Events {
    allContentfulEvent {
      edges {
        node {
          id
          date
          title
          location
          description {
            description
          }
        }
      }
    }
  }
`
