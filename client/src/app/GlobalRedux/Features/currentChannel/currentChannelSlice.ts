"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface currentChannelState{
    value:string
}
const initialState:currentChannelState = {
    value:''
}

export const addSlice = createSlice({
    name:"currentChannel",
    initialState,
    reducers:{
        currentChannel:(state,action)=>{state.value=action.payload}
    }
})

export const { currentChannel } = addSlice.actions

export default addSlice.reducer