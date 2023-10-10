import superagent from 'superagent';
import base64 from 'base-64';
import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
export const LoginContext = React.createContext();
import cookie from 'react-cookies';



const API = process.env.REACT_APP_SERVER_URL;

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
 
export default function LoginProvider(props) {
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState({});


  const checkToken = () => {
    const myToken = cookie.load('token');
    if (myToken) {
      const userFromToken = jwt_decode(myToken);
      setUser({ ...userFromToken, token: myToken });
      setLoginStatus(true);
    } else {
      setUser({});
      setLoginStatus(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const loginFunction = async (username, password) => {
    if (!username || !password) {
      console.error('Username and password are required');
      return;
    }

    try {
      const response = await superagent
        .post(`${API}/signin`)
        .set('authorization', `Basic ${base64.encode(`${username}:${password}`)}`);

      validateMyUser(response.body);
      return response;
    } catch (err) {
      console.error('Error during login:', err);
    }
  };

  const logoutFunction = () => {
    setLoginStatus(false);
    setUser({});
    cookie.remove('token');
    cookie.remove('username');
    cookie.remove('capabilities');
    cookie.remove('userId');
    cookie.remove('email');
    cookie.remove('address');
    cookie.remove('phoneNumber');
    cookie.remove('role');
    
    // window.location.reload();
  };

  const validateMyUser = (userData) => {
    console.log('userDataaaaaaaaaaaa',userData)
    if (userData.token) {
      const userFromToken = jwt_decode(userData.token);
      setUser({ ...userFromToken, token: userData.token });
      cookie.save('username', userFromToken.username);
      cookie.save('capabilities', userData.user.capabilities);
      cookie.save('token', userData.token);
      cookie.save('userId',userData.user.id);
      cookie.save('email', userData.user.email); 
      cookie.save('address', userData.user.location);
      cookie.save('phoneNumber', userData.user.phone);
      cookie.save('role', userData.user.role);
      setLoginStatus(true);
    } else {
      setUser({});
      setLoginStatus(false);
    }
  };

  const can = (action) => {
    return user?.capabilities?.includes(action);
  };

  const state = {
    loggedIn: loginStatus,
    user: user,
    login: loginFunction,
    logout: logoutFunction,
    can: can,
  };

  return (
    <LoginContext.Provider value={state}>
      {props.children}
    </LoginContext.Provider>
  );
}
