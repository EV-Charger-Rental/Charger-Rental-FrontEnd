import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import RequestInformation from "./RequestInformation/index";
import { LoginContext } from '../../context/AuthContext';
import cookie from 'react-cookies';

function RequestPage() {
  const [userRequests, setUserRequests] = useState([]);
  const { user } = useContext(LoginContext); 
  console.log(userRequests);
  useEffect(() => {
  
    if (user && user.token) {
      fetchUserRequests();
    }
  }, [user]); 

  const fetchUserRequests = async () => {
    const userId = cookie.load('userId');
    try {
      const response = await fetch(`https://ev-rental.onrender.com/api/v2/reservation/user-reservation/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
      });
  
      if (response.ok) {
        const requestData = await response.json();
        // Filter the requests to keep only those with the status "open"
        const openRequests = requestData.filter(request => request.reservation_status === 'open');
        setUserRequests(openRequests);
        console.log(openRequests);
      } else {
        console.error("Error fetching user's request data:", response.statusText);
      }
    } catch (error) {
      console.error("Error during request data fetch:", error);
    }
  };
  

console.log(userRequests);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox my={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={25}>
            <RequestInformation userRequests={userRequests} />
          
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default RequestPage;
