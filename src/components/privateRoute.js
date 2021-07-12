// src/components/privateRoute.js
import React from "react";
import { useIdentityContext } from 'react-netlify-identity-gotrue';

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const identity = useIdentityContext();


  return identity.user ? <Component {...rest} /> : null;
}

export default PrivateRoute
