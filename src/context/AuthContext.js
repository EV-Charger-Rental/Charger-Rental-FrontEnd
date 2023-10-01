import superagent from 'superagent';
import base64 from 'base-64';
import jwt_decode from 'jwt-decode'; 
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
export const LoginContext = React.createContext();
import cookie from 'react-cookies';

const API = `https://ev-rental.onrender.com`;
LoginProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
export default function LoginProvider(props) {
 
    console.log(props);
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState({});

  const loginFunction = async (username, password) => {
    if (!username || !password) {
      console.error('Username and password are required');
      return;
    }
  
    try {

      const response = await superagent
      
        .post(`${API}/signin`)
        .set('authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
        console.log(username);
        console.log(password);
        console.log(response);
      
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
    window.location.reload();

  };

  const validateMyUser = (userData) => {
    if (userData.user.token) {
      const userFromToken = jwt_decode(userData.user.token);
      setLoginStatus(true);
      setUser(userFromToken);
  console.log("////////////////////////////////////////////////////",userData.user.token);
  console.log("////////////////////////////////////////////////////",userFromToken);

      cookie.save('username', userFromToken.username);
      cookie.save('capabilities', userData.user.capabilities);
      cookie.save('token', userData.user.token);
    } else {
      setLoginStatus(false);
      setUser({});
    }
  };
  

  useEffect(() => {
    const myToken = cookie.load('token');
    if (myToken) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }, []);

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