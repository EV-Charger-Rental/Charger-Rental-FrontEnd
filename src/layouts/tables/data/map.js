/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie'; // Import the Cookies library

const customIcon = new L.Icon({
  iconUrl: 'marker.svg',
  iconSize: [32, 32],
});

function MapComponent({ onLocationSelect }) {
  const mapRef = useRef(null);
  const [userMarkers, setUserMarkers] = useState([]);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([31.956578, 35.945695], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);
    }

    userMarkers.forEach((marker) => {
      const markerPopup = L.popup().setContent(`<div>
        <p>User-added Marker</p>
        <button id="delete-marker-${marker.id}">Delete</button>
      </div>`);

      const userMarker = L.marker([marker.lat, marker.lng], { icon: customIcon })
        .addTo(mapRef.current)
        .bindPopup(markerPopup)
        .openPopup();

      const deleteButton = document.getElementById(`delete-marker-${marker.id}`);
      if (deleteButton) {
        deleteButton.addEventListener('click', () => deleteMarker(marker.id, userMarker));
      }
    });

    mapRef.current.on('click', handleMapClick);

    return () => {
      mapRef.current.off('click', handleMapClick);
    };
  }, [userMarkers]);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    console.log('Clicked on map:', lat, lng);

    const newUserMarker = {
      id: Date.now(),
      lat,
      lng,
    };

    setUserMarkers((prevMarkers) => [...prevMarkers, newUserMarker]);

    onLocationSelect(newUserMarker);

    Cookies.set('selectedLatitude', lat);
    Cookies.set('selectedLongitude', lng);
  };

  const deleteMarker = (markerId, userMarker) => {
    const updatedMarkers = userMarkers.filter((marker) => marker.id !== markerId);
    setUserMarkers(updatedMarkers);
    userMarker.closePopup();
    mapRef.current.removeLayer(userMarker);
  };

  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log('Current Location:', latitude, longitude);

        const newUserMarker = {
          id: Date.now(),
          lat: latitude,
          lng: longitude,
        };

        setUserMarkers((prevMarkers) => [...prevMarkers, newUserMarker]);

        onLocationSelect(newUserMarker);

        Cookies.set('selectedLatitude', latitude);
        Cookies.set('selectedLongitude', longitude);
      });
    } else {
      console.error('Geolocation is not available in this browser.');
    }
  };

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <Button onClick={handleCurrentLocationClick}>Current Location</Button>
    </div>
  );
}

export default MapComponent;
