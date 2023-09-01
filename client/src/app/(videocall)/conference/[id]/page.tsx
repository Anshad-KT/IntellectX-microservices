"use client"
import React, { useEffect } from 'react'
import * as webRTCHandler from "../../../../utils/webRTCHandler"
// import { connectToSocket } from '@/utils/wss'
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client'
import { addvideoConferenceParticipants, addvideoConferenceRoomId } from '@/app/GlobalRedux/Features/videoConfererence/videoConferenceSlice';
import { RootState } from '@/app/GlobalRedux/store';
import { useParams } from 'next/navigation';
export let socket: any;
const Page = () => {
    

    const { isRoomHost,identity } = useSelector((state: RootState) => state.videoConference)
    
    const { id }:any = useParams()
    const SERVER = "https://brototype.intellectx.com"
    const dispatch = useDispatch()
    const connectToSocket = () => {
        socket = io(SERVER)
        socket.on("connect", () => {
            console.log("successfully connected with socket io server");
            console.log(socket.id);
        })
        socket.on("room-id", (data: any) => {
            const { roomId } = data
            dispatch(addvideoConferenceRoomId(roomId))
        })
        socket.on("room-update", (data: any) => {
            console.log(data,"dataaaaaaaaaaa");
            dispatch(addvideoConferenceParticipants(data.connectedUsers))
        })         
    }

    const socketConnection = connectToSocket()
    console.log(socketConnection);
    
    const { participants } = useSelector((state: RootState) => state.videoConference)
    useEffect(() => {
      const a=  webRTCHandler.getLocalPreviewAndInitRoomConnection(isRoomHost,identity, id)
console.log(a);

    }, [])
    return (
        <main className='bg-white w-full h-screen'>
            <div className='bg-gray-400 w-full h-5/6 grid lg:grid-cols-5'>
                <div className='bg-red-300 col-span-4 h-full'>

                </div>
                <div className='bg-green-700 col-span-1 h-full flex flex-col items-center'>

                    {/* <div className='w-5/6 h-1/4 bg-violet-400 mt-5'>

                    </div>
                    <div className='w-5/6 h-1/4 bg-violet-400 mt-5'>

                    </div> */}
                    {participants.map((item) => {
                        return (
                            <div key={item.id} className='w-5/6 h-1/4 bg-violet-400 mt-5'>
                                {item.id}
                            </div>
                        )
                    })}
                </div>

            </div>

            <div className='bg-white px-4 w-full h-1/6 flex justify-evenly items-center absolute'>
                <div className='flex w-32 bg-red-300 justify-evenly h-12 items-center'>
                    <div className='bg-red-300'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                    </div>
                    <div >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                        </svg>

                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                        </svg>
                    </div>
                </div>


            </div>
        </main>
    )
}

export default Page