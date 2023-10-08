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



function RequestCard({ charger_id, renter_id, owner_id, start_time, end_time, totalPrice}) {
  const userId = cookie.load("userId");

  const [reservationInfo, setreservationInfo] = useState({
    charger_id,
    renter_id,
    owner_id,
    start_time,
    end_time,
    totalPrice
  });
  const { user } = useContext(LoginContext);



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
        console.log('Reservation deleted successfully');
      } else {
        console.error('Error deleting reservation:', response.statusText);
      }
    } catch (error) {
      console.error('Error during reservation deletion:', error);
    }
  };


  const updateCharger = async () => {
    try {
      const response = await fetch(`https://ev-rental.onrender.com/api/v2/reservation/${reservationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        console.log('Reservation deleted successfully');
      } else {
        console.error('Error deleting reservation:', response.statusText);
      }
    } catch (error) {
      console.error('Error during reservation deletion:', error);
    }
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
            {charger_id}
          </SoftTypography>
          <SoftBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
          >
            <SoftTypography variant="caption" color="text" fontWeight="bold" style={{ fontSize: "14px" }}>
              Charger Address:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize" style={{ fontSize: "14px" }}>
                {renter_id}
              </SoftTypography>
            </SoftTypography>
            <SoftTypography variant="caption" color="text" fontWeight="bold" style={{ fontSize: "14px" }}>
              Status:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium" style={{ fontSize: "14px" }}>
                {owner_id}
              </SoftTypography>
            </SoftTypography>
            <SoftTypography variant="caption" color="text" fontWeight="bold" style={{ fontSize: "14px" }}>
              Price:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium" style={{ fontSize: "14px" }}>
                {start_time} 
              </SoftTypography>
            </SoftTypography>
          </SoftBox>
          <SoftBox mt={1} style={{ display: 'flex', justifyContent: 'right' }}>
            <SoftButton variant="text" color="success" onClick={updateCharger}>
              <Icon>check_circle</Icon>&nbsp;Accept
            </SoftButton>
            <SoftButton variant="text" color="error" onClick={handleDeleteClick}>
              <Icon>cancel</Icon>&nbsp;Cancel
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </SoftBox>
      
        
        
      
     
    </SoftBox>
  );
}

RequestCard.propTypes = {
  charger_id: PropTypes.number.isRequired,
  renter_id: PropTypes.number.isRequired,
  owner_id: PropTypes.number.isRequired,
  start_time: PropTypes.string.isRequired,
  end_time: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default RequestCard;

