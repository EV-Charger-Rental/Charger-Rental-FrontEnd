import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Card from "@mui/material/Card";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { LoginContext } from '../../context/AuthContext';
import superagent from "superagent";
import cookie from 'react-cookies';

// import Auth from "./authCan";

function Dashboard() {
  const [isAddChargerMenuVisible, setAddChargerMenuVisible] = useState(false);
  const [chargerInfo, setChargerInfo] = useState({
    ChargerType: "",
    status: "available",
    owner_id: 1,
    price: "1",
    Chargerlocation: "amman",
  });
  const [chargers, setChargers] = useState([]);

  const { loggedIn, user } = useContext(LoginContext);

  useEffect(() => {
    if (loggedIn) {
      superagent
        .get("https://ev-rental.onrender.com/api/v2/charger")
        .set('Authorization', `Bearer ${user.token}`)
        .then((response) => {
          setChargers(response.body);
        })
        .catch((error) => {
          console.error("Error fetching chargers:", error);
        });
    }
  }, [loggedIn, user]);

  const toggleAddChargerMenu = () => {
    setAddChargerMenuVisible(!isAddChargerMenuVisible);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setChargerInfo({ ...chargerInfo, [name]: value });
  };

  const handleStatusChange = (event) => {
    setChargerInfo({ ...chargerInfo, status: event.target.value });
  };
  const handleAddCharger = async () => {
    const userId = cookie.load('userId');
    if (!userId) {
      console.error('User ID not available');
      return;
    }
  
    chargerInfo.owner_id = parseInt(userId, 10);
    chargerInfo.price = parseFloat(chargerInfo.price);
  
    console.log('Adding charger with the following data:', chargerInfo);
    console.log('Adding charger with the following data as JSON:', JSON.stringify(chargerInfo));
  
    if (!chargerInfo.ChargerType) {
      console.error('Charger Type is required');
      return;
    }
  
    try {
      const response = await fetch("https://ev-rental.onrender.com/api/v2/charger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify(chargerInfo), // Send as JSON
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Charger added successfully. Response:', responseData);
        setChargers([...chargers, responseData]);
        toggleAddChargerMenu();
      } else {
        console.error("Error adding charger:", response.statusText);
        console.log("Error response body:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error during charger addition:", error);
    }
  };
  
  

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mb={3}>
        <Card>
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              <SoftTypography variant="h6" fontWeight="medium">
                Add Your Charger
              </SoftTypography>
            </SoftBox>
            <SoftBox mb={1}>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                Your Chargers
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
              {chargers.map((charger) => (
                <Grid item xs={12} md={6} xl={3} key={charger.id}>
                  <DefaultProjectCard
                    label={`Charger #${charger.id}`}
                    title={charger.ChargerType}
                    description={`Status: ${charger.status}`}
                    action={{
                      type: "internal",
                      route: `/charger/${charger.id}`,
                      color: "info",
                      label: "View Charger",
                    }}
                  />
                </Grid>
              ))}
              <Grid item xs={12} md={6} xl={3}>
                <Button
                  onClick={toggleAddChargerMenu}
                  variant="outlined"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    height: "100%",
                    backgroundColor: "transparent",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "16px",
                    cursor: "pointer",
                  }}
                >
                  <Icon color="action" style={{ fontSize: 48, marginBottom: "8px" }}>
                    add_circle
                  </Icon>
                  <SoftTypography variant="h5" fontWeight="medium" color="text">
                    Add New Charger
                  </SoftTypography>
                </Button>
                <Menu
                  anchorEl={isAddChargerMenuVisible ? document.body : null}
                  open={isAddChargerMenuVisible}
                  onClose={toggleAddChargerMenu}
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "center",
                  }}
                  PaperProps={{
                    sx: {
                      padding: '24px',
                      margin: '24px',
                    },
                  }}
                >
                  <MenuItem>
                    <Select
                      name="ChargerType"
                      label="Charger Type"
                      variant="outlined"
                      fullWidth
                      value={chargerInfo.ChargerType}
                      onChange={handleInputChange}
                      displayEmpty
                      inputProps={{ 'aria-label': 'ChargerType' }}
                      sx={{ marginTop: 2 }}
                    >
                      <MenuItem value="">
                        Choose The Charger Type
                      </MenuItem>
                      <MenuItem value="type1">Type 1</MenuItem>
                      <MenuItem value="type2">Type 2</MenuItem>
                      <MenuItem value="type3">Type 3</MenuItem>
                    </Select>
                  </MenuItem>
                  <MenuItem>
                    <Select
                      name="status"
                      label="Status"
                      variant="outlined"
                      fullWidth
                      value={chargerInfo.status}
                      onChange={handleStatusChange}
                    >
                      <MenuItem value="available">Available</MenuItem>
                      <MenuItem value="not available">Not Available</MenuItem>
                    </Select>
                  </MenuItem>
                  <MenuItem>
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                      <TextField
                        name="price"
                        label="Price"
                        variant="outlined"
                        fullWidth
                        type="number"
                        inputProps={{
                          min: 0.5,
                          max: 4,
                          step: 0.5,
                        }}
                        value={chargerInfo.price}
                        onChange={handleInputChange}
                        sx={{
                          paddingRight: '32px',
                        }}
                      />
                      <span style={{ fontSize: '14px', color: '#666', marginLeft: '5px' }}>JD</span>
                    </div>
                    {chargerInfo.price > 4 && (
                      <div style={{ display: 'flex', alignItems: 'baseline', marginLeft: '5px' }}>
                        <Typography variant="caption" color="error" sx={{ fontSize: '12px' }}>
                          Price exceeds the maximum limit (4 JD).
                        </Typography>
                      </div>
                    )}
                  </MenuItem>
                  <MenuItem>
                    <TextField
                      name="Chargerlocation"
                      label="Location"
                      variant="outlined"
                      fullWidth
                      value={chargerInfo.Chargerlocation}
                      onChange={handleInputChange}
                    />
                  </MenuItem>
                  <MenuItem>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleAddCharger}
                    >
                      Add Charger
                    </Button>
                  </MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </SoftBox>
        </Card>
      </SoftBox>
      <SoftBox py={3}>
        <Grid container spacing={3}>
          {/* ... (Other content) */}
        </Grid>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            {/* ... (Other content) */}
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            {/* Add your content here */}
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            {/* Add your content here */}
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
