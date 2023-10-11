import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ChargerInformation from "./ChargerInformation/index";
import { LoginContext } from '../../context/AuthContext'; // Import your LoginContext
import cookie from 'react-cookies';
import { TextField, Button, Paper, Select, MenuItem } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';

function ChargerPage() {
  // Step 1: Create a state variable to store user's charger data
  const [userChargers, setUserChargers] = useState([]);
  const { user } = useContext(LoginContext); // Access the user object from context
  const [searchQuery, setSearchQuery] = useState({
    renterLocation: '',
    chargerType: '',
  });

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

    console.log("user from dataaaaaaaaaaaaaaaaaaaaa", userId)
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

  const handleSearch = () => {
    const userId = cookie.load('userId');

    // Make an API request to fetch chargers using searchQuery
    // You can use the fetch or axios library for this purpose.
    fetch(`https://ev-rental.onrender.com/api/v2/charger/${searchQuery.renterLocation}/available/${searchQuery.chargerType}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`, // Replace with your access token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserChargers(data); // Set the fetched data to userChargers state
      })
      .catch((error) => {
        console.error('Error fetching chargers:', error);
      });
  };

  // List of 12 cities in Jordan
  const jordanCities = [
    'Amman',
    'Irbid',
    'Zarqa',
    'Aqaba',
    'Mafraq',
    'Madaba',
    'Karak',
    'Tafilah',
    'Balqa',
    'Ma\'an',
    'Jerash',
    'Ajloun',
  ];
  // console.log("Main user chargerrrrr",userChargers);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox my={3}>
        <div style={{ paddingBottom: '20px' }}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Grid container spacing={5}>

            <Grid item xs={12} sm={6}>
            <InputLabel id="renter-location-label">Renter Location</InputLabel>
            <Select
              fullWidth
              labelId="renter-location-label"
              id="renter-location"
              value={searchQuery.renterLocation}
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, renterLocation: e.target.value })
              }
            >
              {jordanCities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </Grid>
       

              <Grid item xs={12} sm={6} >
                <InputLabel id="demo-simple-select-label">Choose The Charger Type</InputLabel>

                <Select
                  fullWidth
                  name="ChargerType"
                  label="Charger Type"
                  value={searchQuery.chargerType}
                  onChange={(e) =>
                    setSearchQuery({ ...searchQuery, chargerType: e.target.value })
                  }

                >
                  <MenuItem value="">
                    Choose The Charger Type
                  </MenuItem>
                  <MenuItem value="Level 1- 110 V">Level 1- 110 V</MenuItem>
              <MenuItem value="Level 2- 220 V">Level 2- 220 V</MenuItem>
              <MenuItem value="Level 3- 440 V">Level 3- 440 V</MenuItem>
         
                </Select>
              </Grid>


              <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              bottom: '20px',
              right: '20px',
            }}
          >
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </Grid>
            </Grid>
          </Paper>
        </div>
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

