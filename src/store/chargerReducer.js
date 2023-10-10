// chargerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const chargerSlice = createSlice({
  name: "charger",
  initialState: {
    userChargers: [],
  },
  reducers: {
    setUserChargers: (state, action) => {
      state.userChargers = action.payload;
    },
  },
});

export const { setUserChargers } = chargerSlice.actions;

export default chargerSlice.reducer;
