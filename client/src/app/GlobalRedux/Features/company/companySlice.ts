"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface companyState{
    value:string
    name:string
}

const initialState:companyState = {
    value:"",
    name:""
}

export const addSlice = createSlice({
    name:"company",
    initialState,
    reducers:{
        addCompany:(state,action)=>{state.value=action.payload},
        addCompanyName:(state,action)=>{state.name=action.payload}
    }
})

export const { addCompany } = addSlice.actions
export const { addCompanyName } = addSlice.actions
export default addSlice.reducer