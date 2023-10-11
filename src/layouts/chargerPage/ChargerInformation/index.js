/* eslint-disable react/no-unescaped-entities */
import React, { useState, useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ChargerCard from "../ChargerCard/index";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import InputLabel from "@mui/material/InputLabel";
import MapComponent from "../../tables/data/map";
import { LoginContext } from "../../../context/AuthContext";
import cookie from "react-cookies";
import Cookies from 'js-cookie'; // Import the Cookies library

function ChargerInformation({ userChargers }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openMapDialog, setOpenMapDialog] = useState(false);
  const [locationSelected, setLocationSelected] = useState(false);
  const [userMarkers, setUserMarkers] = useState([]);

  const [chargerInfo, setChargerInfo] = useState({
    ChargerType: "",
    status: "available",
    owner_id: 1,
    price: "1",
    chargerAddress: "", // Add chargerAddress to the state
    latitude: 0,
    longitude: 0,
  });

  const [chargers, setChargers] = useState([]);
  const { user } = useContext(LoginContext);

  useEffect(() => {
    const savedLatitude = Cookies.get('selectedLatitude');
    const savedLongitude = Cookies.get('selectedLongitude');

    if (savedLatitude && savedLongitude) {
      setChargerInfo({
        ...chargerInfo,
        latitude: parseFloat(savedLatitude),
        longitude: parseFloat(savedLongitude),
      });
    }
  }, []);

  const openAddChargerDialog = () => {
    setOpenDialog(true);
  };

  const closeAddChargerDialog = () => {
    setOpenDialog(false);
  };

  const openMap = () => {
    setLocationSelected(false);
    setOpenMapDialog(true);
  };

  const closeMap = () => {
    setUserMarkers([]);
    setOpenMapDialog(false);
  };

  const handleStatusChange = (event) => {
    setChargerInfo({ ...chargerInfo, status: event.target.value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setChargerInfo({ ...chargerInfo, [name]: value });
  };

  const handleLocationSelect = (e) => {
    if (e && e.latlng) {
      const { lat, lng } = e.latlng;
      const updatedChargerInfo = { ...chargerInfo };
      updatedChargerInfo.latitude = lat;
      updatedChargerInfo.longitude = lng;

      setChargerInfo(updatedChargerInfo);
      setLocationSelected(true);
      closeMap();

    }
  };

  const addCharger = async () => {
    const userId = cookie.load("userId");
    const chargerLat = cookie.load("selectedLatitude");
    const chargerLong = cookie.load("selectedLongitude");
    if (!userId) {
      console.error("User ID not available");
      return;
    }

    chargerInfo.owner_id = parseInt(userId, 10);
    chargerInfo.price = parseFloat(chargerInfo.price);
    chargerInfo.latitude = parseFloat(chargerLat);
    chargerInfo.longitude = parseFloat(chargerLong);

    if (!chargerInfo.ChargerType) {
      console.error("Charger Type is required");
      return;
    }

    try {
      const response = await fetch("https://ev-rental.onrender.com/api/v2/charger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(chargerInfo),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Charger added successfully. Response:", responseData);
        setChargers([...chargers, responseData]);
        closeAddChargerDialog();
        window.location.reload();


      } else {
        console.error("Error adding charger:", response.statusText);
      }
    } catch (error) {
      console.error("Error during charger addition:", error);
    }
  };

  return (
    <Card id="delete-account">
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" fontWeight="medium">
            Your Chargers
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{
              borderRadius: "4px",
              marginTop: "10px",
              color: "white",
            }}
            onClick={openAddChargerDialog}
          >
            + Add Charger
          </Button>
        </div>
        <Grid container spacing={2}>
          {userChargers.map((charger) => (
            <Grid item xs={12} key={charger.id}>
              <ChargerCard
                chargerId={charger.id}
                ChargerType={charger.ChargerType}
                status={charger.status}
                price={charger.price}
                chargerAddress={charger.chargerAddress} // Pass chargerAddress as a prop
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>

      <Dialog
        open={openDialog}
        onClose={closeAddChargerDialog}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle>Add New Charger</DialogTitle>
        <DialogContent>
          <MenuItem>
            <Select
              name="ChargerType"
              label="Charger Type"
              variant="outlined"
              fullWidth
              value={chargerInfo.ChargerType}
              onChange={handleInputChange}
              displayEmpty
              inputProps={{ "aria-label": "ChargerType" }}
              sx={{ marginTop: 2 }}
            >
              <MenuItem value="">
                Choose The Charger Type
              </MenuItem>
              <MenuItem value="Level 1- 110 V">Level 1- 110 V</MenuItem>
              <MenuItem value="Level 2- 220 V">Level 2- 220 V</MenuItem>
              <MenuItem value="Level 3- 440 V">Level 3- 440 V</MenuItem>
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
              <InputLabel htmlFor="price" sx={{ paddingRight: '16px', minWidth: '80px', fontSize: '14px' }}>
                Price
              </InputLabel>
              <TextField
                name="price"
                id="price"
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
                  paddingRight: '20px',
                }}
              />
              <span style={{ fontSize: '14px', color: '#666', marginLeft: '0px' }}>JD</span>
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
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <InputLabel htmlFor="chargerAddress" sx={{ paddingRight: '16px', minWidth: '150px', fontSize: '14px' }}>
                Charger Address
              </InputLabel>
              <Select
                name="chargerAddress"
                id="chargerAddress"
                variant="outlined"
                fullWidth
                value={chargerInfo.chargerAddress}
                onChange={handleInputChange}
              >
                <MenuItem value="">
                  <em>Select a city</em>
                </MenuItem>
                <MenuItem value="Amman">Amman</MenuItem>
                <MenuItem value="Irbid">Irbid</MenuItem>
                <MenuItem value="Zarqa">Zarqa</MenuItem>
                <MenuItem value="Aqaba">Aqaba</MenuItem>
                <MenuItem value="Mafraq">Mafraq</MenuItem>
                <MenuItem value="Madaba">Madaba</MenuItem>
                <MenuItem value="Karak">Karak</MenuItem>
                <MenuItem value="Tafilah">Tafilah</MenuItem>
                <MenuItem value="Balqa">Balqa</MenuItem>
                <MenuItem value="Ma'an">Ma'an</MenuItem>
                <MenuItem value="Jerash">Jerash</MenuItem>
                <MenuItem value="Ajloun">Ajloun</MenuItem>
              </Select>
            </div>
            <MenuItem style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={openMap} color="text">
                Add Location
              </Button>
            </MenuItem>
          </MenuItem>


          {/* <MenuItem>
            <Button onClick={openMap} color="text">
              Add Location
            </Button>
          </MenuItem> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddChargerDialog}>Cancel</Button>
          <Button onClick={addCharger}>Add Charger</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openMapDialog}
        onClose={closeMap}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle>Add Charger Location</DialogTitle>
        <DialogContent>
          <MapComponent onLocationSelect={handleLocationSelect} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeMap}>Take Location</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

ChargerInformation.propTypes = {
  userChargers: PropTypes.arrayOf(PropTypes.shape({
    ChargerType: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    chargerAddress: PropTypes.string.isRequired,
  })).isRequired,
};

export default ChargerInformation;
