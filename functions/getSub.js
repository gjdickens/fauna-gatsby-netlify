const { faunaFetch } = require('./utils/fauna');

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 200,
      body: JSON.stringify('Method not allowed')};
  }

  const { netlifyID } = JSON.parse(event.body);

  const result = await faunaFetch({
    query: `
      query ($netlifyID: ID!) {
        getUserByNetlifyID(netlifyID: $netlifyID) {
          netlifyID
          _id
        }
      }
    `,
    variables: {
      netlifyID: netlifyID,
    },
  });

  return {
    statusCode: 200,
    body: result.data.getUserByNetlifyID,
  };
};
