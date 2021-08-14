import React, { useState } from 'react';
import { Link } from "gatsby"

import Popup from './popup';
import RegisterForm from './registerForm';
import LoginButtons from './loginButtons';

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath
  let header

  const[showRegisterPopup, setShowRegisterPopup] = useState(false);
  const[showLoginPopup, setShowLoginPopup] = useState(false);


  header = (
    <>
      {isRootPath ?
        <h1 className="main-heading">
          <Link to="/">{title}</Link>
        </h1>
         :
         <Link className="header-link-home" to="/">
           {title}
         </Link>
       }
      <LoginButtons showRegisterPopup={showRegisterPopup} setShowRegisterPopup={setShowRegisterPopup} showLoginPopup={showLoginPopup} setShowLoginPopup={setShowLoginPopup} />
      <Popup showPopup={showRegisterPopup} setShowPopup={setShowRegisterPopup} >
        <h1 style={{textAlign: 'center', paddingBottom: '2rem'}}>Join now</h1>
        <RegisterForm loginType='register' setShowPopup={setShowRegisterPopup} />
      </Popup>
      <Popup showPopup={showLoginPopup} setShowPopup={setShowLoginPopup} >
        <h1 style={{textAlign: 'center', paddingBottom: '2rem'}}>Sign in to access your account</h1>
        <RegisterForm loginType='login' setShowPopup={setShowLoginPopup} />
      </Popup>
    </>
  )

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
