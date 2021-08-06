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
        }
      }
    `,
    variables: {
      netlifyID: netlifyID,
    },
  });
  console.log(result)
  const faunaID = result.ref.id;
  console.log(faunaID);


  return {
    statusCode: 200,
    body: JSON.stringify('Sub Deleted'),
  };
};
