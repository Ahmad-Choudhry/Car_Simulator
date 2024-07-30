import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-page">
      {isLogin ? <Login /> : <SignUp />}
      <button onClick={toggleForm}>
        {isLogin ? 'Don\'t have an account? Sign Up' : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default AuthPage;
