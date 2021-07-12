import React, { useState } from 'react';
import { Link } from "gatsby"
import { useIdentityContext } from 'react-netlify-identity-gotrue';

import PopupForm from './popupForm';

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath
  let header

  const identity = useIdentityContext();

  const[showPopup, setShowPopup] = useState(false);
  const[loginType, setLoginType] = useState('login');


  const handleLoginClick = (loginType) => {
    setLoginType(loginType);
    setShowPopup(!showPopup);
  }

  const handleLoginKeyDown = (e, loginType) => {
    setLoginType(loginType);
    handleKeyDown(e);
  }


  const handleKeyDown = ev => {
    if (ev.keyCode === 13 && !showPopup) {
      // enter to open
      setShowPopup(true);
    } else if (ev.keyCode === 27 && showPopup) {
      // escape to close
      setShowPopup(false);
    }
  }

  const LoginButtons = () => (
    <>
      {!identity.user &&
        <>
        <div className="headerButton">
          <button
            onClick={ (e) => handleLoginClick('register') }
            onKeyDown={ (e) => handleLoginKeyDown(e, 'register') }
             >Become Member</button>
          <button
            onClick={ (e) => handleLoginClick('login') }
            onKeyDown={ (e) => handleLoginKeyDown(e, 'login') }
             >Login</button>
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
        <PopupForm showPopup={showPopup} setShowPopup={setShowPopup} handleKeyDown={handleKeyDown} loginType={loginType} setLoginType={setLoginType} />
      </>
    )
  } else {
    header = (
      <>
        <Link className="header-link-home" to="/">
          {title}
        </Link>
        <LoginButtons />
        <PopupForm showPopup={showPopup} setShowPopup={setShowPopup} handleKeyDown={handleKeyDown} loginType={loginType} setLoginType={setLoginType} />
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
