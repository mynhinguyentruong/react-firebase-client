import { configureStore } from "@reduxjs/toolkit";

// TODO: import other reducer into this folder
import userReducer from './userReducer';
import dataReducer from './dataReducer';
import uiReducer from './uiReducer';

export const store = configureStore({
  reducer: {
      // define a global state
      // pass a reducer to determine the value of the state
  }

})