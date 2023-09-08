"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface idState{
    value:string
}

const initialState:idState = {
    value:"anshad"
}

export const idSlice = createSlice({
    name:"counter",
    initialState,
    reducers:{
        addId:(state,action)=>{state.value=action.payload}
    }
})

export const { addId } = idSlice.actions

export default idSlice.reducer