import React, { useState } from 'react';
import { Link } from "gatsby"
import { useIdentityContext } from 'react-netlify-identity-gotrue';

import PopupForm from './popupForm';
import RegisterButton from './registerButton';
import { handleKeyDown } from '../utils/utils';

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath
  let header

  const identity = useIdentityContext();

  const[showRegisterPopup, setShowRegisterPopup] = useState(false);
  const[showLoginPopup, setShowLoginPopup] = useState(false);

  const LoginButtons = () => (
    <>
      {!identity.user &&
        <>
        <div className="headerButton">
          <RegisterButton showPopup={showRegisterPopup} setShowPopup={setShowRegisterPopup}>Sign Up</RegisterButton>
          <RegisterButton showPopup={showLoginPopup} setShowPopup={setShowLoginPopup}>Login</RegisterButton>
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

  if (isRootPath) {
    header = (
      <>
        <h1 className="main-heading">
          <Link to="/">{title}</Link>
        </h1>
        <LoginButtons />
        <PopupForm showPopup={showRegisterPopup} setShowPopup={setShowRegisterPopup} loginType='register' />
        <PopupForm showPopup={showLoginPopup} setShowPopup={setShowLoginPopup} loginType='login' />
      </>
    )
  } else {
    header = (
      <>
        <Link className="header-link-home" to="/">
          {title}
        </Link>
        <LoginButtons />
        <PopupForm showPopup={showRegisterPopup} setShowPopup={setShowRegisterPopup} loginType='register' />
        <PopupForm showPopup={showLoginPopup} setShowPopup={setShowLoginPopup} loginType='login' />
      </>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
