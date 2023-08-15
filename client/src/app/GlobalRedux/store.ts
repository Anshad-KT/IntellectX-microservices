"use client";

import { configureStore } from "@reduxjs/toolkit";

import idReducer from "./Features/id/idSlice"
import companyReducer from './Features/company/companySlice'
import channelReducer from './Features/channel/channelSlice'
import employeeReducer from './Features/employee/employeeSlice'

export const store = configureStore({
    reducer:{
        id:idReducer,
        company:companyReducer,
        channel:channelReducer,
        employee:employeeReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch