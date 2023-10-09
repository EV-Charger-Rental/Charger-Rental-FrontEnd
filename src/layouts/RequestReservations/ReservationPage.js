import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReservationInformation from "./ReservationInformation/index";
import { LoginContext } from '../../context/AuthContext'; 
import cookie from 'react-cookies';

function ReservationPage() {
  const [userReservations, setUserReservations] = useState([]);
  const { user } = useContext(LoginContext); 

  useEffect(() => {
    if (user && user.token) {
      fetchUserReservations();
    }
  }, [user]); 


  const fetchUserReservations = async () => {
      const userId = cookie.load('userId');
      console.log(userId);
    try {
      const response = await fetch(`https://ev-rental.onrender.com/api/v2/reservation/renter/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        const reservationData = await response.json();
        setUserReservations(reservationData);
      } else {
        console.error("Error fetching user's charger data:", response.statusText);
      }
    } catch (error) {
      console.error("Error during charger data fetch:", error);
    }
  };

  
  console.log("**********************",userReservations);
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox my={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={25}>
            <ReservationInformation userReservations={userReservations} />
          
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ReservationPage;
