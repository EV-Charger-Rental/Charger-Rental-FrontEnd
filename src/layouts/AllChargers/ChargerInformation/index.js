import React, { useState, useContext, useEffect } from "react";
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
import MapComponent from "../../tables/data/map";
import { LoginContext } from "../../../context/AuthContext";
import cookie from "react-cookies";
import Cookies from 'js-cookie'; // Import the Cookies library

function ChargerInformation({ userChargers }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openMapDialog, setOpenMapDialog] = useState(false);
  const [locationSelected, setLocationSelected] = useState(false);
  const [userMarkers, setUserMarkers] = useState([]);

  const [chargerInfo, setChargerInfo] = useState({
    ChargerType: "",
    status: "available",
    owner_id: 1,
    price: "1",
    chargerAddress: "", // Add chargerAddress to the state
    latitude: 0,
    longitude: 0,

  });

  const [chargers, setChargers] = useState([]);
  const { user } = useContext(LoginContext);

  useEffect(() => {
    const savedLatitude = Cookies.get('selectedLatitude');
    const savedLongitude = Cookies.get('selectedLongitude');

    if (savedLatitude && savedLongitude) {
      setChargerInfo({
        ...chargerInfo,
        latitude: parseFloat(savedLatitude),
        longitude: parseFloat(savedLongitude),
      });
    }
  }, []);

  const openAddChargerDialog = () => {
    setOpenDialog(true);
  };

  const closeAddChargerDialog = () => {
    setOpenDialog(false);
  };

  const openMap = () => {
    setLocationSelected(false);
    setOpenMapDialog(true);
  };

  const closeMap = () => {
    setUserMarkers([]);
    setOpenMapDialog(false);
  };

  const handleStatusChange = (event) => {
    setChargerInfo({ ...chargerInfo, status: event.target.value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setChargerInfo({ ...chargerInfo, [name]: value });
  };

  const handleLocationSelect = (e) => {
    if (e && e.latlng) {
      const { lat, lng } = e.latlng;
      const updatedChargerInfo = { ...chargerInfo };
      updatedChargerInfo.latitude = lat;
      updatedChargerInfo.longitude = lng;

      setChargerInfo(updatedChargerInfo);
      setLocationSelected(true);
      closeMap();

    }
  };

 
  return (
    <Card id="delete-account">
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" fontWeight="medium">
            Your Chargers
          </Typography>
         
        </div>
        <Grid container spacing={2}>
          {userChargers.map((charger) => (
            <Grid item xs={12} key={charger.id}>
              <ChargerCard
                chargerId={charger.id}
                ChargerType={charger.ChargerType}
                status={charger.status}
                price={charger.price}
                chargerAddress={charger.chargerAddress} // Pass chargerAddress as a prop
                Provider_id = {charger.owner_id}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>

    </Card>
  );
}

ChargerInformation.propTypes = {
  userChargers: PropTypes.arrayOf(PropTypes.shape({
    ChargerType: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    chargerAddress: PropTypes.string.isRequired,
    Provider_id:PropTypes.number.isRequired,
  })).isRequired,
};

export default ChargerInformation;
