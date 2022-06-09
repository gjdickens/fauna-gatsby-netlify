<h1 align="center">
  Serverless Subscription Management with Fauna, Paddle, Gatsby and Netlify
</h1>

Code repository for: [Serverless Subscription Management with Fauna, Paddle, Gatsby and Netlify](https://www.epilocal.com/developers/serverless-subscription-management/).


## Deploy Notes

- This repo has been updated to use Gatsby v4 which means you need to run at least Node v14 to avoid build errors.  If you are using Netlify, you can set ``NODE_VERSION`` as an environment variable. More details [here](https://docs.netlify.com/configure-builds/manage-dependencies/).
- Fauna uses different API endpoints depending on the region you create your database.  You can find the latest endpoints [here] (https://docs.fauna.com/fauna/current/api/graphql/endpoints) and you will need to update the URL in ``functions/utils/fauna.js``
