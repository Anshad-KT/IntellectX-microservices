"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface videoConferenceState{
    isRoomHost:boolean
    identity:string
    roomId:string
    participants:any[]
}

const initialState:videoConferenceState = {
    isRoomHost:false,
    identity:"anshad",
    roomId:"ansahd",
    participants:[]
}

export const videoConferenceSlice = createSlice({
    name:"counter",
    initialState,
    reducers:{
        addvideoConferenceIsRoomHost:(state,action)=>{state.isRoomHost=action.payload},
        addvideoConferenceIdentity:(state,action)=>{state.identity=action.payload},
        addvideoConferenceRoomId:(state,action)=>{state.roomId=action.payload},
        addvideoConferenceParticipants: (state, action) => {
            // Push action.payload as a new item into the participants array
            state.participants=action.payload
          },
    }
})

export const { addvideoConferenceIsRoomHost,addvideoConferenceIdentity,addvideoConferenceRoomId,addvideoConferenceParticipants } = videoConferenceSlice.actions

export default videoConferenceSlice.reducer