
export const handleKeyDown = (ev, showPopup, setShowPopup) => {
  if (ev.keyCode === 13 && !showPopup) {
    // enter to open
    setShowPopup(true);
  } else if (ev.keyCode === 27 && showPopup) {
    // escape to close
    setShowPopup(false);
  }
}

const addPaddleSubscription = ( netlifyID, paddleSubID ) => {
  async function postData(url) {
     const response = await fetch(url, {
       method: 'POST',
       mode: 'cors',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({netlifyID: netlifyID, paddleSubID: paddleSubID})
     });
     return response.json();
   }
   postData('/api/addSub/')
     .then(data => {
       console.log("Success: ", data);
     })
     .catch((error) => {
        console.log('Error: ', JSON.stringify(error));
      });
  }

export const openPaddleCheckout = (user) => {

  const checkoutComplete = (data) => {
    var checkoutId = data.checkout.id;

    Paddle.Order.details(checkoutId, function(data) {
      console.log(data.order.subscription_id);
      addPaddleSubscription(user.id, data.order.subscription_id)
    });
  }
  let options = {product: process.env.PADDLE_PRODUCT_ID, successCallback: checkoutComplete};
  if(user && user.email) {
    options.email = user.email;
  }
  let Paddle = window['Paddle'];
  if (Paddle) {
    Paddle.Checkout.open(options);
  }

}


export const getPaddleSubscription = ( netlifyID ) => {
  async function postData(url) {
     const response = await fetch(url, {
       method: 'POST',
       mode: 'cors',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({netlifyID: netlifyID})
     });
     return response.json();
   }
   postData('/api/getSub/')
     .then(data => {
       return data;
     })
     .catch((error) => {
        console.log('Error: ', JSON.stringify(error));
      });
  }
