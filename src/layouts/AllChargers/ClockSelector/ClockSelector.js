import React, { useState } from 'react';
import { Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PropTypes from "prop-types";

function ClockSelector({ selectedTimeFromClok }) {
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTimeSelect = (hour, minute) => {
    const formattedMinute = minute === 0 ? '00' : minute;
    const newSelectedTime = `${hour}:${formattedMinute}`;
    setSelectedTime(newSelectedTime); // Update the selectedTime state
    selectedTimeFromClok(newSelectedTime); // Pass the newSelectedTime to the parent component
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleOpen} color="primary">
        <AccessTimeIcon />
      </IconButton>
      <Typography variant="body1" className="clock-text">
        {selectedTime}
      </Typography>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select Time</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {/* Create grid of time options */}
            {Array.from({ length: 24 }, (_, hour) => (
              <Grid item xs={4} key={hour}>
                <Button
                  fullWidth
                  variant="text"
                  onClick={() => handleTimeSelect(hour, 0)}
                >
                  {hour < 10 ? `0${hour}` : hour}:00
                </Button>
                <Button
                  fullWidth
                  variant="text"
                  onClick={() => handleTimeSelect(hour, 30)}
                >
                  {hour < 10 ? `0${hour}` : hour}:30
                </Button>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Set Time
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ClockSelector.propTypes = {
  selectedTimeFromClok: PropTypes.func.isRequired,
};

export default ClockSelector;
