
export const handleKeyDown = (ev, showPopup, setShowPopup) => {
  if (ev.keyCode === 13 && !showPopup) {
    // enter to open
    setShowPopup(true);
  } else if (ev.keyCode === 27 && showPopup) {
    // escape to close
    setShowPopup(false);
  }
}

export const openPaddleCheckout = (email) => {
  let options = {product: process.env.PADDLE_PRODUCT_ID};
  if(email) {
    options.email = email;
  }
  let Paddle = window['Paddle'];
  if (Paddle) {
    Paddle.Checkout.open(options);
  }
}
