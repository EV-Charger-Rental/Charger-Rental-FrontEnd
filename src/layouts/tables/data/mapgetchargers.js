import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Button from '@mui/material/Button';
import cookie from 'react-cookies';

const customIcon = new L.Icon({
  iconUrl: 'marker.svg',
  iconSize: [32, 32],
});

function MapComponent() {
  const mapRef = useRef(null);
  const [chargerMarkers, setChargerMarkers] = useState([]);
  const userToken = cookie.load('token'); // Retrieve the user token from the cookie

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([31.956578, 35.945695], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);
    }

    // Fetch charger data from your API with Bearer token authorization
    fetch('https://ev-rental.onrender.com/api/v2/charger', {
      method: 'GET',
      headers: {
        // Add the Authorization header with the Bearer token
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((chargers) => {
        chargers.forEach((charger) => {
          const chargerMarker = L.marker([charger.latitude, charger.longitude], { icon: customIcon })
            .addTo(mapRef.current)
            .bindPopup(`<div>
              <p>Charger Type: ${charger.ChargerType}</p>
              <p>Status: ${charger.status}</p>
              <p>Price: ${charger.price}</p>
            </div>`);
          setChargerMarkers((prevMarkers) => [...prevMarkers, chargerMarker]);
        });
      })
      .catch((error) => {
        console.error('Error fetching charger data:', error);
      });
  }, [userToken]);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
}

export default MapComponent;
