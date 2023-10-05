import React, { useState, useContext, useCallback } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ChargerCard from "../RequestCard/index";
import PropTypes from "prop-types";
import { LoginContext } from "../../../context/AuthContext";
import ReservationCard from "../RequestCard/index";


function RequestInformation({ userRequests }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [requestInfo, setRequestInfo] = useState({
    charger_id: "",
    renter_id: "",
    owner_id: "",
    start_time: "",
    end_time: "",
    totalPrice:""
  });



  const { user } = useContext(LoginContext);

  return (
    <Card id="delete-account">
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" fontWeight="medium">
            Your Requests
          </Typography>

        </div>
        <Grid container spacing={2}>
          {userRequests ? (
            userRequests.map((reservation, index) => (
              <Grid item xs={12} key={index}>
                <ReservationCard
                  charger_id={reservation. charger_id}
                  renter_id={reservation.renter_id}
                  owner_id={reservation.owner_id}
                  start_time={reservation.start_time}
                  end_time={reservation.end_time}
                  totalPrice={reservation. totalPrice}
                  // updateChargerData={updateChargerData}
                />
              </Grid>
            ))
          ) : (
            <Typography>No Requests available.</Typography>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

RequestInformation.propTypes = {
  userRequests: PropTypes.arrayOf(PropTypes.shape({
    charger_id: PropTypes.number.isRequired,
    renter_id: PropTypes.number.isRequired,
    owner_id: PropTypes.number.isRequired,
    start_time: PropTypes.string.isRequired,
    end_time: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
  })).isRequired,
};

export default RequestInformation;
