import React, {useEffect} from 'react';
import { useIdentityContext } from 'react-netlify-identity-gotrue';

import Popup from './popup';
import RegisterForm from './registerForm';

const PopupForm = ({ children, setShowPopup, handleKeyDown, showPopup, loginType, setLoginType, s}) => {
  const identity = useIdentityContext();

  return (
    <>
      {children}
      <Popup showPopup={showPopup} setShowPopup={setShowPopup} handleKeyDown={handleKeyDown} >
        <h1 style={{textAlign: 'center', paddingBottom: '2rem'}}>Join to get free access to all of our members-only resources</h1>
        <RegisterForm setLoginType={setLoginType} loginType={loginType} />
      </Popup>
    </>
  );



};

export default PopupForm;
