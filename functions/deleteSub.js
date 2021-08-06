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

  await faunaFetch({
    query: `
      mutation ($faunaID: ID!) {
        deleteUser(id: $faunaID) {
          netlifyID
          paddleSubID
        }
      }
    `,
    variables: {
      faunaID: result.data.getUserByNetlifyID._id,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify('Sub Deleted'),
  };
};
