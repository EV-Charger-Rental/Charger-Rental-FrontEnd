import React, { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import { LoginContext } from "../../../context/AuthContext";
import HistoryReservationsCard from "../HistoryReservationsCard/HistoryReservationsCard";

function HistoryReservationsInfo({ userRequests }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [requestInfo, setRequestInfo] = useState({
    charger_id: "",
    renter_id: "",
    Provider_id: "",
    startClok: "",
    endClok: "",
    total_price: "",
    reservation_status: "",
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
                <HistoryReservationsCard
                  reservationId={reservation.id}
                  charger_id={reservation.charger_id}
                  renter_id={reservation.renter_id}
                  Provider_id={reservation.Provider_id}
                  startClok={reservation.startClok}
                  endClok={reservation.endClok}
                  total_price={reservation.total_price}
                  reservation_status={reservation.reservation_status}
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

HistoryReservationsInfo.propTypes = {
  userRequests: PropTypes.arrayOf(
    PropTypes.shape({
      charger_id: PropTypes.number.isRequired,
      renter_id: PropTypes.number.isRequired,
      Provider_id: PropTypes.number.isRequired,
      startClok: PropTypes.string.isRequired,
      endClok: PropTypes.string.isRequired,
      total_price: PropTypes.number.isRequired,
      reservationId: PropTypes.number.isRequired,
      reservation_status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default HistoryReservationsInfo;
