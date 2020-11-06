import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export const SignupForm = () => {
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = () => {
    if (!username || !password) {
      return;
    }

    fetch('http://localhost:4000/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      mode: 'no-cors',
    })
      .then((res) => {
        history.push('http://localhost:3000');
      })
      .catch(console.log);
  };

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
        <span>Username</span>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
        onClick={onRegister}
      >
        Register
      </div>
      <Link to="/login">Already has an account?</Link>
    </div>
  );
};
