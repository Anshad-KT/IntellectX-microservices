"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface TempUser {
  addedUser: {
    email?: string;
    username: string;
    password?: string;
    id: string;
  };
  jwt: string;
}

const initialState: TempUser = {
  addedUser: {
    email: '',
    username: '',
    id: '',
    password: '',
  },
  jwt: '',
};

export const tempUserSlice = createSlice({
  name: "tempUser",
  initialState,
  reducers: {
    addTempUser: (state, action) => {
      const { addedUser, jwt } = action.payload;
      
      return {
        ...state,
        addedUser: {
          ...addedUser, // Spread the fields from addedUser
        },
        jwt, // Set jwt directly
      };
    },
  },
});

export const { addTempUser } = tempUserSlice.actions;

export default tempUserSlice.reducer;
