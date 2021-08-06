// src/components/profile.js
import React, { useState, useEffect } from 'react';
import { useIdentityContext } from 'react-netlify-identity-gotrue';
import { getPaddleSubscription, cancelPaddleSubscription } from '../utils/utils';


const Profile = () => {
  const identity = useIdentityContext();

  const [loadingSubscription, setLoadingSubscription] = useState(true);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    if (loadingSubscription) {
      getPaddleSubscription(identity.user.id)
        .then(newSub => {
          if (newSub.subs) {
            setSubscription(newSub.data);
          }
          setLoadingSubscription(false);
        })
        .catch(err => {
          setLoadingSubscription(false);
        })
    }
  }, [loadingSubscription, setSubscription, setLoadingSubscription, subscription, identity.user.id])

  if (!identity.user) {
    return <div>Loading...</div>;
  }
  return(
    <>
      <section className="blog-wrapper" style={{textAlign: 'center'}}>
        <h2>Account Details</h2>
        <p>Email: {identity.user.email}</p>
        <h3>Subscriptions</h3>
        {loadingSubscription && <p>Loading Subscriptions</p>}
        {!loadingSubscription && subscription !== null &&
          <p><span>Test Subscription: {subscription.paddleSubID} </span><button onClick={e => {cancelPaddleSubscription(identity.user.id); setSubscription(null); }}>Cancel</button></p>
        }
        {!loadingSubscription && subscription === null &&
          <p>No current subscriptions</p>
        }

      </section>
    </>
  )
}

export default Profile
