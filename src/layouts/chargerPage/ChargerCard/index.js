import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
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

function ChargerCard({
  ChargerType,
  status,
  price,
  chargerId,
  chargerAddress, // Add chargerAddress as a prop
  latitude, // Add latitude as a prop
  longitude, // Add longitude as a prop
}) {
  const userId = cookie.load("userId");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [chargerInfo, setChargerInfo] = useState({
    ChargerType,
    status,
    price,
    owner_id: userId,
    latitude, // Initialize latitude from prop
    longitude, // Initialize longitude from prop
    chargerAddress, // Initialize chargerAddress from prop
  });
  const { user } = useContext(LoginContext);

  const openEditDialog = () => {
    setIsEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleStatusChange = (event) => {
    setChargerInfo({ ...chargerInfo, status: event.target.value });
  };

  const handleMapLocationSelect = (e) => {
    if (e && e.latlng) {
      const { lat, lng } = e.latlng;
      const updatedChargerInfo = { ...chargerInfo };
      updatedChargerInfo.latitude = lat;
      updatedChargerInfo.longitude = lng;
      setChargerInfo(updatedChargerInfo);
      // Save the latitude and longitude to cookies when opening the map
      cookie.get("selectedLatitude", lat); // New cookie for edited latitude
      cookie.get("selectedLongitude", lng); // New cookie for edited longitude
    }
  };

  const updateCharger = async () => {
    const userId = cookie.load("userId");
    const chargerLat = cookie.load("selectedLatitude");
    const chargerLong = cookie.load("selectedLongitude");
    if (!userId) {
      console.error("User ID not available");
      return;
    }

    chargerInfo.price = parseFloat(chargerInfo.price);
    chargerInfo.latitude = parseFloat(chargerLat);
    chargerInfo.longitude = parseFloat(chargerLong);

    if (!chargerInfo.ChargerType) {
      console.error("Charger Type is required");
      return;
    }
    try {
      const response = await fetch(
        `https://ev-rental.onrender.com/api/v2/charger/${chargerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(chargerInfo),
        }
      );

      if (response.ok) {
        console.log("Charger updated successfully");
        closeEditDialog();
        window.location.reload();
      } else {
        console.error("Error updating charger:", response.statusText);
      }
    } catch (error) {
      console.error("Error during charger update:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setChargerInfo({ ...chargerInfo, [name]: value });
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(
        `https://ev-rental.onrender.com/api/v2/charger/${chargerId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        console.log("Charger deleted successfully");
        window.location.reload();
      } else {
        console.error("Error deleting charger:", response.statusText);
      }
    } catch (error) {
      console.error("Error during charger deletion:", error);
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
            <SoftButton variant="text" color="dark" onClick={openEditDialog}>
              <Icon>edit</Icon>&nbsp;edit
            </SoftButton>
            <SoftButton
              variant="text"
              color="error"
              onClick={handleDeleteClick}
            >
              <Icon>delete</Icon>&nbsp;delete
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </SoftBox>
      <Dialog
        open={isEditDialogOpen}
        onClose={closeEditDialog}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle>Edit Charger</DialogTitle>
        <DialogContent>
          {/* Charger Type */}
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
                  <MenuItem value="Level 1- 110 V">Level 1- 110 V</MenuItem>
              <MenuItem value="Level 2- 220 V">Level 2- 220 V</MenuItem>
              <MenuItem value="Level 3- 440 V">Level 3- 440 V</MenuItem>
            </Select>
          </MenuItem>

          {/* Status */}
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

          {/* Price */}
          <MenuItem>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <InputLabel
                htmlFor="price"
                sx={{
                  paddingRight: "16px",
                  minWidth: "80px",
                  fontSize: "14px",
                }}
              >
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
                  paddingRight: "20px",
                }}
              />
              <span style={{ fontSize: "14px", color: "#666", marginLeft: "0px" }}>
                JD
              </span>
            </div>
            {chargerInfo.price > 4 && (
              <div style={{ display: "flex", alignItems: "baseline", marginLeft: "5px" }}>
                <Typography variant="caption" color="error" sx={{ fontSize: "12px" }}>
                  Price exceeds the maximum limit (4 JD).
                </Typography>
              </div>
            )}
          </MenuItem>

          {/* Charger Address */}
          <MenuItem>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <InputLabel
                htmlFor="chargerAddress"
                sx={{
                  paddingRight: "16px",
                  minWidth: "150px",
                  fontSize: "14px",
                }}
              >
                Charger Address
              </InputLabel>
              <TextField
                name="chargerAddress"
                id="chargerAddress"
                variant="outlined"
                fullWidth
                value={chargerInfo.chargerAddress}
                onChange={handleInputChange}
              />
            </div>
          </MenuItem>

          {/* Relocate Charger */}
          <MenuItem>
            <Button onClick={handleMapLocationSelect} color="text">
              Relocate Charger
            </Button>
          </MenuItem>
          <MapComponent onLocationSelect={handleMapLocationSelect} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog}>Cancel</Button>
          <Button onClick={updateCharger}>Update Charger</Button>
        </DialogActions>
      </Dialog>
    </SoftBox>
  );
}

ChargerCard.propTypes = {
  ChargerType: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  chargerId: PropTypes.number.isRequired,
  chargerAddress: PropTypes.string.isRequired, // Add chargerAddress as a prop
  latitude: PropTypes.number.isRequired, // Add latitude as a prop
  longitude: PropTypes.number.isRequired, // Add longitude as a prop
};

export default ChargerCard;
