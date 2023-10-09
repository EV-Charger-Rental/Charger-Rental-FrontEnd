import React, { useState, useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ReservationCard from "../ReservationCard/index";
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
import Cookies from 'js-cookie';

function ReservationInformation({ userReservations }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openMapDialog, setOpenMapDialog] = useState(false);
  const [locationSelected, setLocationSelected] = useState(false);
  const [userMarkers, setUserMarkers] = useState([]);
  const [reservationInfo, setReservationInfo] = useState({
    charger_id: "",
    renter_id: "",
    Provider_id: 1,
    startClok: "",
    endClok: "",
    total_price: ""
  });
  
  const [reservations, setReservations] = useState([]);
  const { user } = useContext(LoginContext);

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
    setReservationInfo({ ...reservationInfo, status: event.target.value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReservationInfo({ ...reservationInfo, [name]: value });
  };

  const handleLocationSelect = (e) => {
    if (e && e.latlng) {
      const { lat, lng } = e.latlng;
      const updatedReservationInfo = { ...reservationInfo };
      updatedReservationInfo.latitude = lat;
      updatedReservationInfo.longitude = lng;
      setReservationInfo(updatedReservationInfo);
      setLocationSelected(true);
      closeMap();
    }
  };

  const addReservation = async () => {
    const userId = cookie.load("userId");
    if (!userId) {
      console.error("User ID not available");
      return;
    }

    reservationInfo.owner_id = parseInt(userId, 10);
    reservationInfo.price = parseFloat(reservationInfo.price);

    if (!reservationInfo.ChargerType) {
      console.error("Charger Type is required");
      return;
    }

    try {
      const response = await fetch("https://ev-rental.onrender.com/api/v2/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(reservationInfo),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Charger added successfully. Response:", responseData);
        setReservations([...reservations, responseData]);
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
            Your Reservations
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
            + Add Reservation
          </Button>
        </div>



        <Grid container spacing={2}>
          {userReservations.map((reservation) => (
            <Grid item xs={12} key={reservation.id}>
              <ReservationCard
               
               startClok={reservation.startClok}
               endClok={reservation.endClok}
               ChargerType={reservation.endClok}
               location={reservation.location}


 // Pass chargerAddress as a prop
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
        <DialogTitle>Add New Reservation</DialogTitle>
        <DialogContent>
          <MenuItem>
            <Select
              name="ChargerType"
              label="Charger Type"
              variant="outlined"
              fullWidth
              value={reservationInfo.ChargerType}
              onChange={handleInputChange}
              displayEmpty
              inputProps={{ "aria-label": "ChargerType" }}
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
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <InputLabel htmlFor="yourAddress" sx={{ paddingRight: '16px', minWidth: '150px', fontSize: '14px' }}>
                Your Address
              </InputLabel>
              <TextField
                name="yourAddress"
                id="yourAddress"
                variant="outlined"
                fullWidth
                value={reservationInfo.chargerAddress}
                onChange={handleInputChange}
              />
            </div>
            <MenuItem style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={openMap} color="text">
                Add Location
              </Button>
            </MenuItem>
          </MenuItem>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddChargerDialog}>Cancel</Button>
          <Button onClick={addReservation}>Add Reservation</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openMapDialog}
        onClose={closeMap}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle>Add Your Location</DialogTitle>
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

// Corrected PropTypes validation
ReservationInformation.propTypes = {
  userReservations: PropTypes.arrayOf(PropTypes.shape({
    charger_id: PropTypes.number.isRequired,
    renter_id: PropTypes.number.isRequired,
    Provider_id: PropTypes.number.isRequired,
    startClok: PropTypes.string.isRequired,
    endClok: PropTypes.string.isRequired,
    total_price: PropTypes.number.isRequired,
  })).isRequired,
};

export default ReservationInformation;
