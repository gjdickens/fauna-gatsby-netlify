import React from 'react';

import { handleKeyDown } from '../utils/utils';

const RegisterButton = ({ children, showPopup, setShowPopup, showPaddleCheckout, setShowPaddleCheckout, user }) => {

  const handleLoginClick = () => {
    if (!user) {
      setShowPopup(!showPopup);
    }
    if (setShowPaddleCheckout && !showPaddleCheckout) {
      setShowPaddleCheckout(true);
    }
  }

  const handleLoginKeyDown = (e) => {
    if (!user) {
      handleKeyDown(e, showPopup, setShowPopup);
    }
    if (setShowPaddleCheckout && !showPaddleCheckout) {
      setShowPaddleCheckout(true);
    }
  }

  return (
    <button
      onClick={ (e) => handleLoginClick() }
      onKeyDown={ (e) => handleLoginKeyDown(e) }
       >{children}</button>

  )
}

export default RegisterButton
