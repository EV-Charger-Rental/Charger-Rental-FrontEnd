/* eslint-disable react/prop-types */
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Bill from "layouts/billing/components/Bill";
import Button from "@mui/material/Button";

function BillingInformation({ userChargers }) {
  return (
    <Card id="delete-account">
      <CardContent>
        {/* Use flex container for alignment */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" fontWeight="medium">
            Your Chargers
          </Typography>
          {/* Add Charger Button */}
          <Button
            variant="contained"
            color="primary"
            style={{
              borderRadius: "4px",
              marginTop:"10px",
              color: "white",
            }}
          >
            + Add Charger
          </Button>
        </div>
        <Grid container spacing={2}>
          {userChargers.map((charger, index) => (
            <Grid item xs={12} key={index}>
              <Bill
                ChargerType={charger.ChargerType}
                Chargerlocation={charger.Chargerlocation}
                status={charger.status}
                price={charger.price}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default BillingInformation;
