"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface employeeState{
    value:[]
}

const initialState:employeeState = {
    value:[]
}

export const addSlice = createSlice({ 
    name:"employee",
    initialState, 
    reducers:{
        addEmployee:(state,action)=>{state.value=action.payload}
    } 
})

export const { addEmployee } = addSlice.actions

export default addSlice.reducer