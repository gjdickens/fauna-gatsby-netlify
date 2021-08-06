const { faunaFetch } = require('./utils/fauna');
const { paddleCancel } = require('./utils/paddle');

exports.handler = async (event) => {
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
          paddleSubID
          _id
        }
      }
    `,
    variables: {
      netlifyID: netlifyID,
    },
  });

  const paddleResult = await paddleCancel(result.data.getUserByNetlifyID.paddleSubID);
  console.log(paddleResult);

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
