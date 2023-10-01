// store.js

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer'; // Correct the import path

const store = configureStore({
  reducer: {
    user: userReducer, // Update the reducer key to 'user'
  },
});

export default store;
