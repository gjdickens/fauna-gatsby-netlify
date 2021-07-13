import React, {useEffect} from 'react';
import { useIdentityContext } from 'react-netlify-identity-gotrue';

import Popup from './popup';
import RegisterForm from './registerForm';

const PopupForm = ({ children, setShowPopup, showPopup, loginType }) => {
  const identity = useIdentityContext();

  return (
    <>
      {children}
      <Popup showPopup={showPopup} setShowPopup={setShowPopup} >
        <h1 style={{textAlign: 'center', paddingBottom: '2rem'}}>Join to get free access to all of our members-only resources</h1>
        <RegisterForm loginType={loginType} setShowPopup={setShowPopup} />
      </Popup>
    </>
  );



};

export default PopupForm;
