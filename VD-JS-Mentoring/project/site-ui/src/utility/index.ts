export const isAuth = async () => {
  try {
    const resp = await fetch('http://127.0.0.1:4000/isAuth', {
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
        'Access-Control-Allow-Credentials': 'true',
      },
    });
    const data = await resp.json();
    return data.success;
  } catch (e) {
    return false;
  }
};
