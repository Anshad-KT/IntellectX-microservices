"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface channelState{
    value:[]
}

const initialState:channelState = {
    value:[]
}

export const addSlice = createSlice({
    name:"channel",
    initialState,
    reducers:{
        addChannel:(state,action)=>{state.value=action.payload}
    }
})

export const { addChannel } = addSlice.actions

export default addSlice.reducer