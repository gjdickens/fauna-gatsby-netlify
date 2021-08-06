
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
   postData('/api/addsub/')
     .then(data => {
       console.log("Sub Added: ", data);
     })
     .catch((error) => {
        console.log(error);
      });
  }

export const openPaddleCheckout = (user) => {
  addPaddleSubscription('294002b9-901e-436f-b063-f46256c7c510', '119283');

  /*
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
  */
}
