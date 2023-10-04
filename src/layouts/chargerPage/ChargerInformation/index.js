import React, { useState, useContext, useEffect, useCallback } from "react";
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
import { LoginContext } from "../../../context/AuthContext";
import cookie from "react-cookies";

function ChargerInformation({ userChargers }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [chargerInfo, setChargerInfo] = useState({
    ChargerType: "",
    status: "available",
    owner_id: 1,
    price: "1",
    Chargerlocation: "Amman",
  });
  const [chargers, setChargers] = useState([]);
  const { user } = useContext(LoginContext);

  // useEffect(() => {
  //   setChargers(userChargers);
  // }, [userChargers]);

  const openAddChargerDialog = () => {
    setOpenDialog(true);
  };

  const closeAddChargerDialog = () => {
    setOpenDialog(false);
  };

  const handleStatusChange = (event) => {
    setChargerInfo({ ...chargerInfo, status: event.target.value });
  };

  const addCharger = async () => {
    const userId = cookie.load("userId");
    if (!userId) {
      console.error("User ID not available");
      return;
    }

    chargerInfo.owner_id = parseInt(userId, 10);
    chargerInfo.price = parseFloat(chargerInfo.price);

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setChargerInfo({ ...chargerInfo, [name]: value });
  };

  const updateChargerData = useCallback((editedCharger) => {
    setChargers((prevChargers) => {
      const index = prevChargers.findIndex((charger) => charger.id === editedCharger.id);

      if (index !== -1) {
        prevChargers[index] = editedCharger;
      }

      return [...prevChargers];
    });
  }, []);

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
              <ChargerCard
                chargerId={charger.id}
                ChargerType={charger.ChargerType}
                Chargerlocation={charger.Chargerlocation}
                status={charger.status}
                price={charger.price}
                updateChargerData={updateChargerData}
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
              <InputLabel htmlFor="Chargerlocation" sx={{ paddingRight: '16px', minWidth: '80px', fontSize: '14px' }}>
                Location
              </InputLabel>
              <TextField
                name="Chargerlocation"
                id="Chargerlocation"
                variant="outlined"
                fullWidth
                value={chargerInfo.Chargerlocation}
                onChange={handleInputChange}
              />
            </div>
          </MenuItem>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddChargerDialog}>Cancel</Button>
          <Button onClick={addCharger}>Add Charger</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

ChargerInformation.propTypes = {
  userChargers: PropTypes.arrayOf(PropTypes.shape({
    ChargerType: PropTypes.string.isRequired,
    Chargerlocation: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  })).isRequired,
};

export default ChargerInformation;
