/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { When } from 'react-if';
import { LoginContext } from '../../context/AuthContext'; 

function Auth(props) {
  const { loggedIn, can } = useContext(LoginContext);

  const isLoggedIn = loggedIn;
  const canDo = props.capabilities ? can(props.capabilities) : true;
  const okToRender = isLoggedIn && canDo;

  return (
    <When condition={okToRender}>
      {props.children}
    </When>
  );
}

export default Auth;
