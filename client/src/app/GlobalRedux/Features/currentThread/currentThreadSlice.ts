"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface currentThreadState{
    value:string
}
const initialState:currentThreadState = {
    value:''
}

export const currentThreadSlice = createSlice({
    name:"currentThread",
    initialState,
    reducers:{
        currentThread:(state,action)=>{state.value=action.payload}
    }
})

export const { currentThread } =currentThreadSlice.actions

export default currentThreadSlice.reducer