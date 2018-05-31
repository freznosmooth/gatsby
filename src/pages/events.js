import React from 'react'
import { css } from 'glamor'

const style = {
  col1: css({
    width: '120px',
    backgroundColor: 'lightBlue',
  }),
  col2: css({
    backgroundColor: 'lightYellow',
  }),
  col3: css({
    backgroundColor: 'lightGreen',
  })
};

export default ({ data }) => {
  return (
    <div>
      <h1>Events</h1>
      <table>
        <thead>
          <tr>
            <td css={style.col1}>Date</td>
            <td css={style.col2}>Event</td>
            <td css={style.col3}>Description</td>
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
