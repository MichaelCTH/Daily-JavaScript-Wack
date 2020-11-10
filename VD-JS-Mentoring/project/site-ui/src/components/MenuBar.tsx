import React from 'react';
import { useHistory } from 'react-router-dom';

export const MenuBar = ({
  logged,
  setLogged,
}: {
  logged: boolean;
  setLogged: any;
}) => {
  const history = useHistory();

  const logout = () => {
    fetch('http://127.0.0.1:4000/auth/logout', {
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
      .then((rep) => rep.json())
      .then(() => {
        setLogged(false);
        history.push('/login');
      })
      .catch(console.log);
  };

  return (
    <div
      style={{
        backgroundColor: 'black',
        paddingLeft: '2rem',
        border: '0.1rem solid',
        borderColor: 'greenyellow',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <h1 style={{ color: 'greenyellow' }}>Mac’s File Server</h1>
      {logged && (
        <input
          type="button"
          value="Logout"
          onClick={logout}
          style={{
            position: 'absolute',
            right: '1.5rem',
            top: '1.3rem',
            fontSize: '1.2rem',
            color: 'yellowgreen',
            backgroundColor: 'black',
            border: '1px solid',
            padding: '0.5rem 1rem',
          }}
        />
      )}
    </div>
  );
};
