// src/components/profile.js
import React from "react"
import { useIdentityContext } from 'react-netlify-identity-gotrue';


const Profile = () => {
  const identity = useIdentityContext();

  if (!identity.user) {
    return <div>Loading...</div>;
  }
  return(
    <>
      <section className="blog-wrapper" style={{textAlign: 'center'}}>
        <h2>Account Details</h2>
        <p>Email: {identity.user.email}</p>
      </section>
    </>
  )
}

export default Profile
