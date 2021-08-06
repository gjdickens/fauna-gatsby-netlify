const { faunaFetch } = require('./utils/fauna');

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 200,
      body: JSON.stringify('Method not allowed')};
  }

  const { netlifyID, paddleSubID } = JSON.parse(event.body);

  // link the Netlify and Paddle Sub IDs in Fauna
  await faunaFetch({
    query: `
      mutation ($netlifyID: ID!, $paddleSubID: ID!) {
        createUser(data: { netlifyID: $netlifyID, paddleSubID: $paddleSubID }) {
          netlifyID
          paddleSubID
        }
      }
    `,
    variables: {
      netlifyID: netlifyID,
      paddleSubID: paddleSubID,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify('Sub Added')
  };
};
