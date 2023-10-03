/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Bill from "layouts/billing/components/Bill";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function BillingInformation({ userChargers }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [chargerInfo, setChargerInfo] = useState({
    ChargerType: "",
    status: "available",
    owner_id: 1,
    price: "1",
    Chargerlocation: "amman",
  });
  const [chargers, setChargers] = useState([]);

  const openAddChargerDialog = () => {
    setOpenDialog(true);
  };

  const closeAddChargerDialog = () => {
    setOpenDialog(false);
  };



  const handleStatusChange = (event) => {
    setChargers({ ...chargers, Status: event.target.value });
  };


  const addchargers = () => {
    // You can add logic here to handle the new charger data
    console.log("New Charger Data:", chargers);
    closeAddChargerDialog();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setChargerInfo({ ...chargerInfo, [name]: value });
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

      <Dialog
        open={openDialog}
        onClose={closeAddChargerDialog}
        maxWidth="md" // You can use 'xs', 'sm', 'md', 'lg', 'xl', 'false', or a specific CSS value like '600px'
        fullWidth={true} // This will make the dialog take the full width of its container
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
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddChargerDialog}>Cancel</Button>
          <Button onClick={addchargers}>Add Charger</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default BillingInformation;
