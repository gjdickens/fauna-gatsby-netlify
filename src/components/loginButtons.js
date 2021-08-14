import React from 'react';
import { Link } from "gatsby";
import { useIdentityContext } from 'react-netlify-identity-gotrue';

import Button from './button';

const LoginButtons = ({ children, showRegisterPopup, setShowRegisterPopup, showLoginPopup, setShowLoginPopup }) => {

  const identity = useIdentityContext();

  return (
    <>
      {!identity.user &&
        <>
        <div className="headerButton">
          <Button showPopup={showRegisterPopup} setShowPopup={setShowRegisterPopup}>Sign Up</Button>
          <Button showPopup={showLoginPopup} setShowPopup={setShowLoginPopup}>Login</Button>
        </div>
        </>

      }
      {identity.user &&
        <>
        <div className="headerButton">
          <button
             ><Link to="/account/profile">Profile</Link></button>
          <button
            className="link"
            onClick={identity.logout}
            onKeyDown={identity.logout}
             >Logout</button>
        </div>
        </>
      }
    </>
  )

}

export default LoginButtons;
