import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ChargerInformation from "./ChargerInformation/index";
import { LoginContext } from '../../context/AuthContext'; // Import your LoginContext
import cookie from 'react-cookies';

function ChargerPage() {
  // Step 1: Create a state variable to store user's charger data
  const [userChargers, setUserChargers] = useState([]);
  const { user } = useContext(LoginContext); // Access the user object from context

  useEffect(() => {
    // Step 2: Fetch the user's charger data
    if (user && user.token) {
      fetchUserChargers();
    }
  }, [user]); // Only fetch chargers when the user object changes

  // useEffect(() => {
  //   fetchUserChargers();

  // }, [userChargers]); // Only fetch chargers when the user object changes


  const fetchUserChargers = async () => {
      const userId = cookie.load('userId');
      
      console.log("user from dataaaaaaaaaaaaaaaaaaaaa",userId)
    try {
      const response = await fetch(`https://ev-rental.onrender.com/api/v2/charger`, {
        method: "GET",
        headers: {
          // Add any headers you need here, e.g., Authorization header
          "Authorization": `Bearer ${user.token}`,
        },
      });
    //  console.log('chargerdaatttttttttttttttttttt',response)

      if (response.ok) {
        const chargerData = await response.json();
        // Step 3: Set the user's charger data in the state
        setUserChargers(chargerData);
      } else {
        console.error("Error fetching user's charger data:", response.statusText);
      }
    } catch (error) {
      console.error("Error during charger data fetch:", error);
    }
  };

 // console.log("Main user chargerrrrr",userChargers);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox my={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={25}>
            {/* Step 4: Pass the userChargers data as a prop to BillingInformation */}
            <ChargerInformation userChargers={userChargers} />
          
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ChargerPage;
