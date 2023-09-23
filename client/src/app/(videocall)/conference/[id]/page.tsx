"use client"
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSocket } from '@/context/videoSocket'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/GlobalRedux/store'
import { useParams } from 'next/navigation'
import { Socket } from 'socket.io-client'



const Page = () => {

  const socket= useSocket(); // Replace with your actual socket hook
  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideoSrc = useRef<HTMLVideoElement | null>(null);
  const localStream = useRef<MediaStream | null>(null);
  const remoteStream = useRef<MediaStream | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const [slash, setSlash] = useState({ audio: false, video: false });
  const [callEnd, setCallEnd] = useState(false);
  const roomIds= useParams()
  const roomId = roomIds.id
  const { value }:any = useSelector((state: RootState) => state.id)
  const Servers = useMemo(() => {
    return {
      iceServers: [
        {
          urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
      ],
    };
  }, []);

  const createPeerConnection = useCallback(async () => {
    peerConnection.current = new RTCPeerConnection(Servers);

    remoteStream.current = new MediaStream();

    if (userVideoSrc.current && remoteStream.current) {
      userVideoSrc.current.srcObject = remoteStream.current;
    }

    if (localStream.current && peerConnection.current) {
      localStream.current.getTracks().forEach(async (track) => {
        await peerConnection.current!.addTrack(track, localStream.current!);
      });
    }

    if (peerConnection.current) {
      peerConnection.current.ontrack = async (event) => {
        if (remoteStream.current) {
          event.streams[0].getTracks().forEach(async (track) => {
            await remoteStream.current!.addTrack(track);
            if (userVideoSrc.current && remoteStream.current) {
              userVideoSrc.current.srcObject = remoteStream.current;
            }
          });
        }
      };
    }

    if (peerConnection.current) {
      peerConnection.current.onicecandidate = async (event) => {
        if (event.candidate&&socket) {
          socket.emit('sendMessageToPeer', {
            type: 'candidate',
            candidate: event.candidate,
            roomId,
          });
        }
      };
    }
  }, [Servers, roomId, socket]);
  
  const createOffer = useCallback(async (user_id: string) => {
    if (!peerConnection.current) {
      await createPeerConnection();
    }
    
    if (peerConnection.current) {
      try {
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        socket?.emit("sendMessageToPeer", { type: "offer", offer, roomId });
      } catch (error) {
        console.error('Error creating offer:', error);
      }
    }
  }, [createPeerConnection, roomId, socket]);
    const handleUserJoined = useCallback(async (user_id: string) => {
    await createOffer(user_id);
  }, [createOffer]);

  // const handleRoomUpdation = useCallback(async (user_id: string) => {
  //   await createOffer(user_id);
  // }, [createOffer]);

  
  const createAnswer = useCallback(async (user_id: string, offer: RTCSessionDescriptionInit) => {
    if (!peerConnection.current) {
      await createPeerConnection();
    }
  
    if (peerConnection.current) {
      try {
        await peerConnection.current.setRemoteDescription(offer);
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        socket?.emit("sendMessageToPeer", { type: "answer", answer, roomId });
      } catch (error) {
        console.error('Error creating answer:', error);
      }
    }
  }, [createPeerConnection, roomId, socket]);
  useEffect(() => {
    const userVideo = async () => {
      

      await socket?.emit("join-video-chat", { roomId, user_id: value });

      try {
        localStream.current = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

        if (myVideo.current && localStream.current) {
          myVideo.current.srcObject = localStream.current;
        }

        if (peerConnection.current && localStream.current) {
          localStream.current.getTracks().forEach(async (track) => {
            await peerConnection.current!.addTrack(track, localStream.current!);
          });
        }

        if (userVideoSrc.current && remoteStream.current) {
          userVideoSrc.current.srcObject = remoteStream.current;
        }

        await createOffer(value);
      } catch (error) {
        console.error('Error accessing user media:', error);
      }
    };

    userVideo();
  }, [value, roomId, socket, createOffer]);

  const addAnswer = async (answer: RTCSessionDescriptionInit) => {
    if (peerConnection.current && !peerConnection.current.currentRemoteDescription) {
      try {
        await peerConnection.current.setRemoteDescription(answer);
      } catch (error) {
        console.error('Error setting remote description:', error);
      }
    }

    if (userVideoSrc.current && remoteStream.current) {
      userVideoSrc.current.srcObject = remoteStream.current;
    }
  };
  useEffect(() => {
    
      socket?.on("call-end", (room_id: string) => {
        localStream.current?.getTracks().forEach((track: MediaStreamTrack) => track.stop());
        remoteStream.current?.getTracks().forEach((track: MediaStreamTrack) => track.stop());
        setCallEnd(true);
      });
  
      socket?.on("newUser", async (user_id: string) => await handleUserJoined(user_id));
      
      socket?.on("receivedPeerToPeer", async (data: any) => {
        if (data.type === "offer") {
          await createAnswer(data.user_id, data.offer);
        }
        if (data.type === "answer") {
          await addAnswer(data.answer);
        }
        if (data.type === "candidate") {
          if (peerConnection.current) {
            await peerConnection.current.addIceCandidate(data.candidate);
          }
        }
      });
    
  }, [createAnswer, handleUserJoined,handleRoomUpdation, socket]);
  
  const toggleCamera = () => {
    const videoTrack = localStream.current?.getVideoTracks()[0];
    if (videoTrack?.enabled) {
      videoTrack.enabled = false;
      setSlash({ ...slash, video: true });
    } else {
      if (videoTrack) {
        videoTrack.enabled = true;
        setSlash({ ...slash, video: false });
      }
    }
  };
  
  const toggleMic = () => {
    const audioTrack = localStream.current?.getAudioTracks()[0];
  
    if (audioTrack?.enabled) {
      audioTrack.enabled = false;
      setSlash({ ...slash, audio: true });
    } else {
      if (audioTrack) {
        audioTrack.enabled = true;
        setSlash({ ...slash, audio: false });
      }
    }
  };
  const endCall = async () => {
    if (localStream.current) {
      localStream.current.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      if(remoteStream.current)
      remoteStream.current.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      socket?.emit("call-end", roomId);
      window.location.reload();
    }
  };
  

    return (
        <main className='bg-white w-full h-screen'>
            <div className='bg-gray-400 w-full h-5/6 grid lg:grid-cols-5'>
                <div className='bg-gray-800 col-span-4 h-full flex justify-center items-center'>
                    <video ref={myVideo} autoPlay playsInline muted width="900" height="850" />
                </div>
                <div className='bg-green-700 col-span-1 h-full flex flex-col items-center'>


                    <div className='w-5/6 h-1/4 bg-violet-400 mt-5'>
                        <video ref={userVideoSrc} autoPlay playsInline muted width="324" height="200" />
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