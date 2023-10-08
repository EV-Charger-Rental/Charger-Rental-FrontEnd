// store.js

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer'; // Correct the import path
import chargerReducer from './chargerReducer'; // Correct the import path


const store = configureStore({
  reducer: {
    user: userReducer, // Update the reducer key to 'user'
    charger: chargerReducer,

  },
});

export default store;
