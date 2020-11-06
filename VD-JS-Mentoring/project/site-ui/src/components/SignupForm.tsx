import React from 'react';
import { Link } from 'react-router-dom';

export const SignupForm = () => {
  return (
    <div
      style={{
        width: '25rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '10rem',
        paddingLeft: '5rem',
        paddingRight: '5rem',
        paddingTop: '2rem',
        paddingBottom: '2rem',
        border: '1px solid',
        borderColor: 'greenyellow',
        color: 'greenyellow',
      }}
    >
      <h2>Sign Up</h2>
      <div>
        <span>Email</span>
        <input type="text" />
      </div>
      <div>
        <span>Password</span>
        <input type="password" />
      </div>
      <div
        style={{
          border: '1px solid',
          borderColor: 'greenyellow',
          width: '25%',
          textAlign: 'center',
          cursor: 'pointer',
          padding: '0.5rem 1rem',
          boxSizing: 'border-box',
        }}
      >
        Register
      </div>
      <Link to="/login">Already has an account?</Link>
    </div>
  );
};
