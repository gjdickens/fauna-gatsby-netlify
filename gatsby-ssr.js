const React = require(`react`);
/**
 * Setup Paddle.js
 *
 * @link https://paddle.com/docs/paddle-checkout-web/
 */
exports.onRenderBody = ({ setPostBodyComponents }) => {
	if (process.env.NODE_ENV === `production`) {
		return setPostBodyComponents([
			<script key="gatsby-plugin-paddle" src="https://cdn.paddle.com/paddle/paddle.js" />,
			<script
				key={`gatsby-plugin-paddle-vendor`}
				type="text/javascript"
				dangerouslySetInnerHTML={{
					__html: `Paddle.Setup({ vendor: ${process.env.PADDLE_ID} });`
				}}
			/>
		]);
	}
	else {
		return setPostBodyComponents([
			<script key="gatsby-plugin-paddle" src="https://cdn.paddle.com/paddle/paddle.js" />,
			<script
				key={`gatsby-plugin-paddle-vendor`}
				type="text/javascript"
				dangerouslySetInnerHTML={{
					__html: `Paddle.Environment.set('sandbox'); Paddle.Setup({ vendor: ${process.env.PADDLE_ID} });`
				}}
			/>
		]);
	}
};
