import React, { useState } from 'react';
import { useIdentityContext } from 'react-netlify-identity-gotrue';


const RegisterForm = ({ children, loginType, setShowPopup }) => {
  const identity = useIdentityContext();

  const [formValues, setFormValues] = useState({
  	email: '',
    password: ''
  });

  const handleEmailInputChange = (event) => {
  	setFormValues((values) => ({
  		...values,
  		email: event.target.value,
  	}));
  };

  const handlePasswordInputChange = (event) => {
    setFormValues((values) => ({
      ...values,
      password: event.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginType === 'login') {
      handleLogin(formValues);
    }
    else {
      handleSignup(formValues);
    }

  }

  const handleSignup = async ( formValues ) => {
    let newUser = {
      email: formValues.email,
      password: formValues.password
    }

    await identity.signup(newUser)
    .then(() => {
      console.log('registration successful');
      setShowPopup(false);
    })
    .catch((e) => {
      console.log(e);
    });

  }

  const handleLogin = async ( formValues ) => {
      await identity.login({
        email: formValues.email,
        password: formValues.password
      })
    .then(() => {
      setShowPopup(false);
    })
    .catch((e) => {
      console.log(e);
    });

  }

  return (

    <div className="member-form">
      <form onSubmit={handleSubmit}>
        <div className="member-form-group">
          <label htmlFor="username">Email</label>
          <input type="email" className='member-input' placeholder="youremail@example.com" value={formValues.email} onChange={handleEmailInputChange} />
        </div>
        <div className="member-form-group">
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" className='member-input' placeholder="Password" value={formValues.password} onChange={handlePasswordInputChange} />
          </div>
        </div>

        <div className="member-form-group" style={{textAlign: 'center', paddingTop: '2rem'}}>
          <button className="button member-submit" type="submit">
            <span className="button-content">{loginType ==='login' ? 'Login' : 'Register'}</span>
          </button>
        </div>
      </form>
    </div>
)

}


export default RegisterForm;
