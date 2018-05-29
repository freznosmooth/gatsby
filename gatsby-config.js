module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter test',
  },
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: 'husc055nilv7',
        accessToken: '027dc51800fe7f695ad87a2edd45654d93953525752e9ac4e0f87f3698611e4b',
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    'gatsby-plugin-react-helmet'
  ],
}
