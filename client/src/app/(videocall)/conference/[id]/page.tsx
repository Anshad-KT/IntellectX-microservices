"use client"
import React, { useEffect, useRef, useState } from 'react'
import * as webRTCHandler from "../../../../utils/webRTCHandler"
// import { connectToSocket } from '@/utils/wss'
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client'
import { addvideoConferenceIdentity, addvideoConferenceParticipants, addvideoConferenceRoomId } from '@/app/GlobalRedux/Features/videoConfererence/videoConferenceSlice';
import { RootState } from '@/app/GlobalRedux/store';
import { useParams } from 'next/navigation';
import { localStream } from '../../../../utils/webRTCHandler'

export let socket: any;
let streamLine: MediaStream | null
const Page = () => {


    const { isRoomHost, identity, roomId } = useSelector((state: RootState) => state.videoConference)
    const {value} = useSelector((state: RootState) => state.id)
    const [state, setState] = useState<any>()
    const { id }: any = useParams()
    const SERVER = "https://brototype.intellectx.com"
    const dispatch = useDispatch()
    const videoRef = useRef(null);
    const videoRef2 = useRef(null);
    const connectToSocket = () => {
        socket = io(SERVER)
        socket.on("connect", () => {
            console.log("successfully connected with socket io server");
            console.log(socket.id);
            dispatch(addvideoConferenceIdentity(value))
        })
        console.log("still running");
        
        
    }
    connectToSocket()
    
    useEffect(() => {
        socket.on("room-id", (data: any) => {
            const { roomId } = data
            dispatch(addvideoConferenceRoomId(roomId))
        })
        socket.on("room-update", (data: any) => {
         
            // webRTCHandler.createOffer(isRoomHost, identity, roomId);
            dispatch(addvideoConferenceParticipants(data.connectedUsers))
        })
        socket.on("updateConnection", (data: any) => {
            console.log(data, "11");
            console.log(isRoomHost, identity, id);
            
            setTimeout(() => {
                webRTCHandler.createOffer(isRoomHost, identity, id);
                console.log("lllllllllllll");
            
            }, 10000); // 10 seconds delay
            
        });
        socket.on("offer-recieved", (offer: any) => {
            console.log(offer, "offer recieved",identity);
            if(identity!=offer.identity){
                webRTCHandler.createAnswer(isRoomHost, identity, id, offer.offer)
                console.log("inside");
                
            }
            
        })
        socket.on("answer-recieved", (answer: any) => {
            console.log(answer, "answer recieved",identity,answer.identity);
            // webRTCHandler.createAnswer(isRoomHost,identity,roomId,offer)
            if(identity!=answer.identity){
                 webRTCHandler.addAnswer(answer.answer)
                 console.log("inside2");
            }
           
        })
        socket.on("ICE-recieved", (ICE: any) => {
            console.log(ICE, "ICE recieved");
            if(identity!=ICE?.identity){
webRTCHandler.addIceCandidates(ICE)
            }
            // webRTCHandler.createAnswer(isRoomHost,identity,roomId,offer)
            
        })
        return () => {
            socket.off("room-id", (data: any) => {
                const { roomId } = data
                dispatch(addvideoConferenceRoomId(roomId))
            })
            socket.off("room-update", (data: any) => {
                console.log(data, "dataaaaaaaaaaa");
                webRTCHandler.createOffer(isRoomHost, identity, roomId);
                dispatch(addvideoConferenceParticipants(data.connectedUsers))
            })
            socket.off("offer-recieved", (offer: any) => {
                console.log(offer, "offer recieved");
                webRTCHandler.createAnswer(isRoomHost, identity, roomId, offer)
            })
            socket.off("answer-recieved", (answer: any) => {
                console.log(answer, "offer recieved");
                // webRTCHandler.createAnswer(isRoomHost,identity,roomId,offer)
                webRTCHandler.addAnswer(answer)
            })
            socket.off("ICE-recieved", (ICE: any) => {
                console.log(ICE, "offer recieved");
                // webRTCHandler.createAnswer(isRoomHost,identity,roomId,offer)
                webRTCHandler.addIceCandidates(ICE)
            })
        }
    }, [socket])




    const { participants } = useSelector((state: RootState) => state.videoConference)
    const videoRefs = useRef<Array<React.RefObject<HTMLVideoElement>>>([]);
    videoRefs.current = Array(participants.length).fill(null).map(() => React.createRef());
    console.log(videoRefs.current);

    useEffect(() => {
        if(webRTCHandler.peerConnection){
             webRTCHandler.peerConnection.addEventListener("track", async (ev: any) => {
            const remoteStream = ev.streams;
            console.log(remoteStream);
            
            console.log("GOT TRACKS!!", remoteStream[0]);
            //  setRemoteStream(remoteStream[0]);
            if (videoRef2.current && remoteStream[0]) {
                videoRef2.current.srcObject = remoteStream[0];
            }
        });
        }
       


    }, []);

    useEffect(() => {

        const call = async () => {

            const Lstream = await webRTCHandler.getLocalPreviewAndInitRoomConnection(isRoomHost, identity, id)
            
            streamLine = Lstream
            if (videoRef.current) {
                
                videoRef.current.srcObject = streamLine;
                console.log(videoRef.current.srcObject);

            }

        }
        call()


    }, [])






    return (
        <main className='bg-white w-full h-screen'>
            <div className='bg-gray-400 w-full h-5/6 grid lg:grid-cols-5'>
                <div className='bg-gray-800 col-span-4 h-full flex justify-center items-center'>
                    <video ref={videoRef} autoPlay playsInline muted width="900" height="850" />
                </div>
                <div className='bg-green-700 col-span-1 h-full flex flex-col items-center'>

                    {/* <div className='w-5/6 h-1/4 bg-violet-400 mt-5'>

                    </div>
                    <div className='w-5/6 h-1/4 bg-violet-400 mt-5'>

                    </div> */}
                    {participants.map((item, index) => (
                        <div className='w-5/6 h-1/4 bg-violet-400 mt-5' key={index}>
                            <video ref={videoRefs.current[index]} autoPlay playsInline muted width="324" height="200" />
                        </div>
                    ))}

                    <div className='w-5/6 h-1/4 bg-violet-400 mt-5'>
                        <video ref={videoRef2} autoPlay playsInline muted width="324" height="200" />
                    </div>


                </div>

            </div>

            <div className='bg-gray-800 px-4 w-full h-1/6 flex justify-evenly items-center absolute'>
                <div className='flex w-32 border-white justify-evenly h-12 items-center rounded'>
                    <div className='bg- '>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                    </div>
                    <div >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                        </svg>

                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                        </svg>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Page