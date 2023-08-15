"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface companyState{
    value:string
}

const initialState:companyState = {
    value:""
}

export const addSlice = createSlice({
    name:"company",
    initialState,
    reducers:{
        addCompany:(state,action)=>{state.value=action.payload}
    }
})

export const { addCompany } = addSlice.actions

export default addSlice.reducer