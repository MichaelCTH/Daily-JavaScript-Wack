import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export const LoginForm = ({ setLogged }: { setLogged: any }) => {
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSign = () => {
    if (!username || !password) {
      return;
    }

    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      body: data,
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
      .then((resp) => resp.json())
      .then((res) => {
        if (res.success) {
          setLogged(true);
          history.push('/');
        }
      })
      .catch(console.log);
  };

  const onGithub = () => {
    const git = window.open(
      'http://localhost:4000/auth/github',
      'myWindow',
      'width=800,height=600,scrollbars=yes'
    );
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
      <h2>Log In</h2>
      <div>
        <span>Username</span>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div>
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
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
        onClick={onSign}
      >
        Login
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
        onClick={onGithub}
      >
        Github
      </div>
      <div>
        Or <Link to="/signup">register now!</Link>
      </div>
    </div>
  );
};
