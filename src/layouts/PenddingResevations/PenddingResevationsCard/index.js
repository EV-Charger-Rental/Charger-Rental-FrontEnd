import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from '@mui/material/InputLabel';
import { LoginContext } from '../../../context/AuthContext';
import cookie from 'react-cookies';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function PenddingResevationsCard({ charger_id, renter_id, Provider_id, startClok, endClok, total_price, reservation_status, reservationId }) {
  const userId = cookie.load("userId");

  const [reservationInfo, setReservationInfo] = useState({
    charger_id,
    renter_id,
    Provider_id,
    startClok,
    endClok,
    total_price,
    reservation_status,
    reservationId,
  });
  const { user } = useContext(LoginContext);

  const updateReservationStatus = async (newStatus) => {
    try {
      console.log("cccccccccccccccccccccccc",charger_id)
      const updatedReservationInfo = {
        ...reservationInfo,
        reservation_status: newStatus,
        
      };

      const response = await fetch(`https://ev-rental.onrender.com/api/v2/reservation/${reservationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedReservationInfo),
      });

      if (response.ok) {
        console.log(`Reservation status updated to ${newStatus}`);
        setReservationInfo(updatedReservationInfo);
        console.log(newStatus);
        
        if (newStatus === 'In-progress') {
          // Call the API to update charger status to "not available"
          const chargerResponse = await fetch(`https://ev-rental.onrender.com/api/v2/charger/${charger_id}`, {
            method: 'PATCH', // Use PATCH method for partial updates
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${user.token}`,
            },
            body: JSON.stringify({ status: 'not available' }), // Update charger status
          });
          console.log("nnnnnnnn", chargerResponse);

          if (chargerResponse.ok) {
            console.log('Charger status updated to "not available"');
          } else {
            console.error('Error updating charger status:', chargerResponse.statusText);
          }
        } else if (newStatus === 'Finished') {
          // Update charger status when the reservation status is "finished"
          // Call the API to update charger status to "available"
          const chargerResponse = await fetch(`https://ev-rental.onrender.com/api/v2/charger/${charger_id}`, {
            method: 'PATCH', // Use PATCH method for partial updates
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${user.token}`,
            },
            body: JSON.stringify({ status: 'available' }), // Update charger status
          });

          if (chargerResponse.ok) {
            console.log('Charger status updated to "available"');

          } else {
            console.error('Error updating charger status:', chargerResponse.statusText);
          }
        }
      } else {
        console.error('Error updating reservation status:', response.statusText);
      }

      window.location.reload();

    } catch (error) {
      console.error('Error during reservation status update:', error);
    }
  };


  const handleAcceptClick = () => {
    updateReservationStatus('In-progress');

  };

  const handleFinishClick = () => {
    updateReservationStatus('Cancelled');


  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`https://ev-rental.onrender.com/api/v2/reservation/${reservationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        window.location.reload();
        console.log('Reservation deleted successfully');
      } else {
        console.error('Error deleting reservation:', response.statusText);
      }
    } catch (error) {
      console.error('Error during reservation deletion:', error);
    }
  };
  const handleCancelledClick=()=>{
        updateReservationStatus('Cancelled');


  }

  const deleteCard = () => {
    handleDeleteClick();
    // Implement the logic to remove the card from the page
    // e.g., you can use state management to remove it from the component's parent
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
          <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize" style={{ fontSize: "18px" }}>
            Charger ID: {charger_id}
          </SoftTypography>
          <SoftBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
          >
            <SoftTypography variant="caption" color="text" fontWeight="bold" style={{ fontSize: "14px" }}>
              Renter ID:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize" style={{ fontSize: "14px" }}>
                {renter_id}
              </SoftTypography>
            </SoftTypography>
            <SoftTypography variant="caption" color="text" fontWeight="bold" style={{ fontSize: "14px" }}>
              Owner ID:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium" style={{ fontSize: "14px" }}>
                {Provider_id}
              </SoftTypography>
            </SoftTypography>
            <SoftTypography variant="caption" color="text" fontWeight="bold" style={{ fontSize: "14px" }}>
              Start Time:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium" style={{ fontSize: "14px" }}>
                {startClok}
              </SoftTypography>
            </SoftTypography>
            <SoftTypography variant="caption" color="text" fontWeight="bold" style={{ fontSize: "14px" }}>
              End Time:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium" style={{ fontSize: "14px" }}>
                {endClok}
              </SoftTypography>
            </SoftTypography>

            <SoftTypography variant="caption" color="text" fontWeight="bold" style={{ fontSize: "14px" }}>
              Reservation Status:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium" style={{ fontSize: "14px" }}>
                {reservationInfo.reservation_status}
              </SoftTypography>
            </SoftTypography>

            <SoftTypography variant="caption" color="text" fontWeight="bold" style={{ fontSize: "14px" }}>
              Total Price:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium" style={{ fontSize: "14px" }}>
                {total_price}
              </SoftTypography>
            </SoftTypography>

          </SoftBox>
         
        </SoftBox>
      </SoftBox>
    </SoftBox>
  );
}

PenddingResevationsCard.propTypes = {
  charger_id: PropTypes.number.isRequired,
  renter_id: PropTypes.number.isRequired,
  Provider_id: PropTypes.number.isRequired,
  startClok: PropTypes.string.isRequired,
  endClok: PropTypes.string.isRequired,
  total_price: PropTypes.number.isRequired,
  reservationId: PropTypes.number.isRequired,
  reservation_status: PropTypes.string.isRequired,
};

export default PenddingResevationsCard;
