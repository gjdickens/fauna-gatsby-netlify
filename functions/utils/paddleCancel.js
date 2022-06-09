import fetch from 'node-fetch';

exports.paddleCancel = async (subID) => {
  return await fetch('https://sandbox-vendors.paddle.com/api/2.0/subscription/users_cancel', {
    method: 'POST',
    body: new URLSearchParams({
        'vendor_id': process.env.PADDLE_ID,
        'vendor_auth_code': process.env.PADDLE_AUTH_CODE,
        'subscription_id': subID
    })
  })
    .then((res) => res.json())
    .catch((err) => console.error(JSON.stringify(err, null, 2)));
};
