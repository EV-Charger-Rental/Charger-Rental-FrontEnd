import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { LoginContext } from '../../../context/AuthContext';
import cookie from 'react-cookies';

function InProgressCard({ charger_id, renter_id, Provider_id, start_time, end_time, total_price, reservation_status, reservationId }) {
  const userId = cookie.load("userId");

  const { user } = useContext(LoginContext);

  const handleFinishClick = async () => {
    try {
      // Call the API to update reservation status to "Finished"
      const response = await fetch(`https://ev-rental.onrender.com/api/v2/reservation/${reservationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify({ reservation_status: 'Finished' }), // Update reservation status
      });
  
      if (response.ok) {
        console.log('Reservation status updated to "Finished"');
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
          window.location.reload();
        } else {
          console.error('Error updating charger status:', chargerResponse.statusText);
        }
      } else {
        console.error('Error updating reservation status:', response.statusText);
      }
    } catch (error) {
      console.error('Error during reservation status update:', error);
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
                {start_time}
              </SoftTypography>
            </SoftTypography>
            <SoftTypography variant="caption" color="text" fontWeight="bold" style={{ fontSize: "14px" }}>
              End Time:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium" style={{ fontSize: "14px" }}>
                {end_time}
              </SoftTypography>
            </SoftTypography>

            <SoftTypography variant="caption" color="text" fontWeight="bold" style={{ fontSize: "14px" }}>
              Reservation Status:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium" style={{ fontSize: "14px" }}>
                {reservation_status}
              </SoftTypography>
            </SoftTypography>

            <SoftTypography variant="caption" color="text" fontWeight="bold" style={{ fontSize: "14px" }}>
              Total Price:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium" style={{ fontSize: "14px" }}>
                {total_price}
              </SoftTypography>
            </SoftTypography>

          </SoftBox>
          <SoftBox mt={1} style={{ display: 'flex', justifyContent: 'right' }}>
            {reservation_status === 'In-progress' && (
              <SoftButton variant="contained" color="info" onClick={handleFinishClick}>
                <Icon>done</Icon>&nbsp;Finish
              </SoftButton>
            )}
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </SoftBox>
  );
}

InProgressCard.propTypes = {
  charger_id: PropTypes.number.isRequired,
  renter_id: PropTypes.number.isRequired,
  Provider_id: PropTypes.number.isRequired,
  start_time: PropTypes.string.isRequired,
  end_time: PropTypes.string.isRequired,
  total_price: PropTypes.number.isRequired,
  reservation_status: PropTypes.string.isRequired,
  reservationId: PropTypes.number.isRequired,
};

export default InProgressCard;
