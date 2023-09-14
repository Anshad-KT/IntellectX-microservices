"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as webRTCHandler from "../../../../utils/webRTCHandler"
// import { connectToSocket } from '@/utils/wss'
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client'
import { addvideoConferenceIdentity, addvideoConferenceParticipants, addvideoConferenceRoomId } from '@/app/GlobalRedux/Features/videoConfererence/videoConferenceSlice';
import { RootState } from '@/app/GlobalRedux/store';
import { useParams } from 'next/navigation';
// import { localStream } from '../../../../utils/webRTCHandler'
import { useSocket } from '@/context/videoSocket';
import peer from '@/utils/peer';

export let socket: any;
let streamLine: MediaStream | null
const Page = () => {

    const defaultConstraints: MediaStreamConstraints = {
        audio: true,
        video: true,
      };
      
      let localStream: MediaStream;
    const { isRoomHost, identity, roomId } = useSelector((state: RootState) => state.videoConference)
    const {value} = useSelector((state: RootState) => state.id)
    const [stream, setStream] = useState<any>()
    const { id }: any = useParams()

    const dispatch = useDispatch()
    const videoRef = useRef(null);
    const videoRef2 = useRef(null);
    const socket = useSocket()

    //functions
     const getLocalPreviewAndInitRoomConnection = (
        isRoomHost: boolean,
        identity: string,
        roomId: string
      ): Promise<MediaStream> => {
        return new Promise<MediaStream>((resolve, reject) => {
          navigator.mediaDevices
            .getUserMedia(defaultConstraints)
            .then((stream) => {
              console.log('successfully received local stream', stream);
      
              localStream = stream;
      
              console.log(isRoomHost, identity, 'lklklklk');
      
              isRoomHost
                ? createRoom(identity, roomId, identity)
                : joinRoom(identity,roomId);
      
              
              resolve(localStream); // Resolve the promise with the localStream
            })
            .catch((err) => {
              console.error(err);
              reject(err); // Reject the promise if there's an error
            });
        });
      };
    const useHandleJoinRoom = () => useCallback((identity: string, roomId: string) => {
    const data = {
        roomId,
        identity
    }
    console.log("--------------------");
    if(socket)
    socket.emit('join-new-room', data)
  },[])
  const useHandleCreateRoom = () => useCallback((identity: string, roomId: string, userId: string) => {
    const data = {
        identity,
        roomId,
        userId
    }
    console.log("+++++++++++++++++++++++",socket);
    if(socket)
    socket?.emit('create-new-room', data)
  },[])
  const useHandleEmitOffer = () => useCallback((offer: any, identity: string, roomId: string, isRoomHost:boolean) => {
    if(socket){
        socket.emit('offer', {
        data: {
            roomId,
            identity,
            isRoomHost
        }, offer
    })
    console.log("offered",offer,identity,roomId,isRoomHost);
    }
    
  },[])
  const useHandleEmitAnswer = () => useCallback((answer: any, identity: string, roomId: string, isRoomHost:boolean) => {
    console.log("answer", answer);
    if(socket){
        socket.emit('answer', {
        data: {
            roomId,
            identity,
            isRoomHost
        }, answer
    })
    console.log("answered");
    }
    
  },[])
  const useHandleEmitIceCandidates = () => useCallback((iceCandidates: any, identity: string, roomId: string, isRoomHost:boolean) => {
    console.log("iceCandidates", iceCandidates);
    if(socket){
        socket.emit('ICE', {
        data: {
            roomId,
            identity,
            isRoomHost
        }, iceCandidates
    })
    }
    
  },[])
  
 
  const emitICE = useHandleEmitIceCandidates();
  const sendOffer = useHandleEmitOffer();
  const sendAnswer = useHandleEmitAnswer();
  const createRoom = useHandleCreateRoom()
 const joinRoom = useHandleJoinRoom()
  

    useEffect(() => {
        if(socket){
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
            
            setTimeout(async () => {
                const offer = await peer.getOffer();
                sendOffer(offer,identity,id,isRoomHost)
                console.log("lllllllllllll");
            }, 10000); // 10 seconds delay
            
        });
        socket.on("offer-recieved", async (offer: any) => {
            console.log(offer, "offer recieved",identity);
            if(identity!=offer.identity){
                const answer = await peer.getAnswer(offer.offer)
                sendAnswer(answer, identity, id,isRoomHost)
            }
            
        })
        socket.on("answer-recieved", async (answer: any) => {
            console.log(answer, "answer recieved",identity,answer.identity);
            // webRTCHandler.createAnswer(isRoomHost,identity,roomId,offer)
            if(identity!=answer.identity){
                 await peer.setRemoteDescription(answer)
                 console.log("inside2");
                 for(const track of stream.getTracks()){
                    peer.peer.addTrack(track, stream)
                 }
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

            const Lstream = await getLocalPreviewAndInitRoomConnection(isRoomHost, identity, id)
            
            streamLine = Lstream
            setStream(Lstream)
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