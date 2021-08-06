const { faunaFetch } = require('./utils/fauna');

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 200,
      body: JSON.stringify('Method not allowed')};
  }

  try {
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

    return {
      statusCode: 200,
      body: JSON.stringify({subs: true, data: result.data.getUserByNetlifyID}),
    };

  }
  catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 200,
      body: JSON.stringify({subs: false, data: {} }),
    };
  }
};
