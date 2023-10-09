import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import MapComponent from "../../tables/data/map"; // Import your MapComponent here
import { LoginContext } from "../../../context/AuthContext";
import cookie from "react-cookies";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ReservationForm from "./"; // Import your ReservationForm here
import { Grid, IconButton } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ClockSelector from "../ClockSelector/ClockSelector"

function ChargerCard({
  chargerId,
  ChargerType,
  status,
  price,
  chargerAddress,
  latitude,
  longitude,
  Provider_id,

}) {
  const userId = cookie.load("userId");
  const [isReservationDialogOpen, setIsReservationDialogOpen] = useState(false);
  const [reservationInfo, setReservationInfo] = useState({
    chargerId: chargerId, // Replace with the appropriate charger ID
    startTime: "", // Initialize start time
    endTime: "", // Initialize end time
  });
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');

  const { user } = useContext(LoginContext);

  const openReservationDialog = () => {
    setIsReservationDialogOpen(true);
  };

  const closeReservationDialog = () => {
   
    setIsReservationDialogOpen(false);
  };

  console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ",selectedStartTime);
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",selectedEndTime);
  

  const addReservation = async () => {
    const renter_id = parseInt(userId, 10);

console.log(renter_id);
    
  

    console.log (reservationInfo);
    const response = await fetch("https://ev-rental.onrender.com/api/v2/reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        charger_id: reservationInfo.chargerId,
        renter_id: renter_id,
        Provider_id: Provider_id,
        startClok: reservationInfo.startTime,
        endClok: reservationInfo.endTime,
      }),
    });
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", JSON.stringify({
      charger_id: reservationInfo.chargerId,
      renter_id: renter_id,
      Provider_id: Provider_id,
      startClok: reservationInfo.startTime,
      endClok: reservationInfo.endTime,

    }));
    if (response.ok) {
      console.log("Reservation added successfully");
      closeReservationDialog();
      

    } else {
      console.error("Error adding reservation:", response.statusText);
    }
  };





  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleTimeSelect = (hour, minute) => {
    setSelectedTime(`${hour}:${minute}`);
    handleClose();
  };
  const handleStartTimeSelect = (selectedTime) => {
    setSelectedStartTime(selectedTime);
    setReservationInfo({
      ...reservationInfo,
      startTime: selectedTime,
    });
  };
  
  // Define a callback function to handle selected end time
  const handleEndTimeSelect = (selectedTime) => {
    setSelectedEndTime(selectedTime);
    setReservationInfo({
      ...reservationInfo,
      endTime: selectedTime,
    });
  };
  
  return (
    <SoftBox>
      <SoftBox
        component="li"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="flex-start"
        bgColor="grey-100"
        borderRadius="lg"
        p={3}
        mb={1}
        mt={2}
      >
        <SoftBox width="100%">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <SoftTypography
                variant="button"
                fontWeight="medium"
                textTransform="capitalize"
                style={{ fontSize: "18px" }}
              >
                {ChargerType}
              </SoftTypography>
              <SoftTypography
                variant="body1"
                fontWeight="medium"
                style={{ fontSize: "14px" }}
              >
                Address: {chargerAddress}
              </SoftTypography>
            </div>
            <div style={{ textAlign: "center" }}>
              <SoftTypography
                variant="caption"
                color="text"
                fontWeight="bold"
                style={{ fontSize: "14px" }}
              >
                Status:&nbsp;&nbsp;&nbsp;
                <SoftTypography
                  variant="caption"
                  fontWeight="medium"
                  style={{ fontSize: "14px" }}
                >
                  {status}
                </SoftTypography>
              </SoftTypography>
            </div>
            <div>
              <SoftTypography
                variant="caption"
                color="text"
                fontWeight="bold"
                style={{ fontSize: "14px" }}
              >
                Price:&nbsp;&nbsp;&nbsp;
                <SoftTypography
                  variant="caption"
                  fontWeight="medium"
                  style={{ fontSize: "14px" }}
                >
                  {price} JD
                </SoftTypography>
              </SoftTypography>
            </div>
          </div>
          <SoftBox
            mt={1}
            style={{ display: "flex", justifyContent: "right" }}
          >
            <Button variant="text" color="dark" onClick={openReservationDialog}>
              Add Reservation
            </Button>
          </SoftBox>
        </SoftBox>
      </SoftBox>
      <Dialog
        open={isReservationDialogOpen}
        onClose={closeReservationDialog}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle>Add Reservation</DialogTitle>
        <DialogContent>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ margin: '16px' }}>
              <Typography variant="body1">Start Time:</Typography>
            </div>
            <ClockSelector style={{ margin: '16px' }} selectedTime={selectedStartTime} selectedTimeFromClok ={handleStartTimeSelect} />
            <div style={{ margin: '16px' }}>
              <Typography variant="body1">End Time:</Typography>
            </div>
            <ClockSelector style={{ margin: '16px' }} selectedTime={selectedEndTime} selectedTimeFromClok={handleEndTimeSelect} />
          </div>
        </DialogContent>


        <DialogActions>
          <Button onClick={closeReservationDialog}>Cancel</Button>
          <Button onClick={addReservation}>Add Reservation</Button>
        </DialogActions>
      </Dialog>
    </SoftBox>
  );
}

ChargerCard.propTypes = {
  chargerId: PropTypes.number.isRequired,
  ChargerType: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  chargerAddress: PropTypes.string.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  Provider_id: PropTypes.number.isRequired,
};

export default ChargerCard;
