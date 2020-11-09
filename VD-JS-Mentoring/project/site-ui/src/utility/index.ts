export const isAuth = async () => {
  try {
    const resp = await fetch('http://localhost:4000/isAuth', {
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true',
      },
    });
    const data = await resp.json();
    return data.success;
  } catch (e) {
    return false;
  }
};
