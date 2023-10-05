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

// Add missing imports here
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function ChargerCard({ ChargerType, Chargerlocation, status, price, chargerId, updateChargerData }) {
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",chargerId);
  const userId = cookie.load("userId");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [chargerInfo, setchargerInfo] = useState({
    ChargerType,
    Chargerlocation,
    status,
    price,
    owner_id:userId,
  });
  const { user } = useContext(LoginContext);

  const openEditDialog = () => {
    setIsEditDialogOpen(true);
    setchargerInfo({
      ChargerType,
      Chargerlocation,
      status,
      price,
      owner_id:userId,
    });
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    window.location.reload();
  };

  const handleStatusChange = (event) => {
    setchargerInfo({ ...chargerInfo, status: event.target.value });
  };

  const updateCharger = async () => {
    const userId = cookie.load('userId');
    console.log("////////////////////////////////////////////////////////////////////",userId);

    if (!userId) {
      console.error('User ID not available');
      return;
    }

    chargerInfo.price = parseFloat(chargerInfo.price);

    if (!chargerInfo.ChargerType) {
      console.error('Charger Type is required');
      return;
    }
    try {
      console.log("###################################################",chargerId);

      const response = await fetch(`https://ev-rental.onrender.com/api/v2/charger/${chargerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify(chargerInfo),
      
      });

      console.log(":::::::::::::::::::::::::::::::::::::::::::::", JSON.stringify(chargerInfo));

      if (response.ok) {
        // Handle successful update, e.g., display a success message1
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", response.body);
        console.log('Charger updated successfully');
        closeEditDialog();

        // Call the callback function to update the local state with edited data
        updateChargerData(chargerInfo);
      } else {
        console.error("Error updating charger:", response.statusText);
      }
    } catch (error) {
      console.error("Error during charger update:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setchargerInfo({ ...chargerInfo, [name]: value });
  };

  const handleDeleteClick = async () => {
    // Add your delete functionality here
    try {
      const response = await fetch(`https://ev-rental.onrender.com/api/v2/charger/${chargerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        // Handle successful delete, e.g., update the UI or display a message
        console.log('Charger deleted successfully');
        window.location.reload();

        // You can also pass a flag or some data to the parent component to indicate that the charger has been deleted
      } else {
        console.error('Error deleting charger:', response.statusText);
        // Handle error scenarios as needed
      }
    } catch (error) {
      console.error('Error during charger deletion:', error);
      // Handle error scenarios as needed
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
            {ChargerType}
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
                {Chargerlocation}
              </SoftTypography>
            </SoftTypography>
            <SoftTypography variant="caption" color="text" fontWeight="bold" style={{ fontSize: "14px" }}>
              Status:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium" style={{ fontSize: "14px" }}>
                {status}
              </SoftTypography>
            </SoftTypography>
            <SoftTypography variant="caption" color="text" fontWeight="bold" style={{ fontSize: "14px" }}>
              Price:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium" style={{ fontSize: "14px" }}>
                {price} JD
              </SoftTypography>
            </SoftTypography>
          </SoftBox>
          <SoftBox mt={1} style={{ display: 'flex', justifyContent: 'right' }}>
            <SoftButton variant="text" color="dark" onClick={openEditDialog}>
              <Icon>edit</Icon>&nbsp;edit
            </SoftButton>
            <SoftButton variant="text" color="error" onClick={handleDeleteClick}>
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
          <Button onClick={closeEditDialog}>Cancel</Button>
          <Button onClick={updateCharger}>Update Charger</Button>
        </DialogActions>
      </Dialog>
    </SoftBox>
  );
}

ChargerCard.propTypes = {
  ChargerType: PropTypes.string.isRequired,
  Chargerlocation: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  chargerId: PropTypes.number.isRequired,
  updateChargerData: PropTypes.func.isRequired,
};

export default ChargerCard;
