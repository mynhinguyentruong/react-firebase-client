import { configureStore } from "@reduxjs/toolkit";

// TODO: import other reducer into this folder
import userReducer from './userReducer';
import dataReducer from './dataReducer';
import uiReducer from './uiReducer';

export const store = configureStore({
  reducer: {
      user: userReducer,
      data: dataReducer,
      ui: uiReducer
  }

})