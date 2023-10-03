
import { LoginContext } from '../../../context/AuthContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

function Logout() {
  const { logout } = useContext(LoginContext);
  const navigate = useNavigate();

  // Handle the logout action (clear cookies and sign out)
  const handleLogout = () => {
    logout();
  };

  return null; // Render nothing or replace with a loading indicator if needed
}

export default Logout;
