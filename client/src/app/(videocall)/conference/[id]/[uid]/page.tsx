"use client"
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSocket } from '@/context/videoSocket'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/GlobalRedux/store'
import { useParams, useRouter } from 'next/navigation'
import { Socket } from 'socket.io-client'
import OtherVideoComponents from '@/components/ChildrenVideo/ChildrenVideo'
import ChildrenVideo from '@/components/ChildrenVideo/ChildrenVideo'
import Image from 'next/image'


const Page = () => {
  const router = useRouter();
  const returnValue: any = useSelector((state: RootState) => state.channel)
  const socket = useSocket(); // Replace with your actual socket hook
  const [streams, setStreams] = useState<any>([])
  const [selected, setSelected] = useState<any>([])
  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideoSrc = useRef<HTMLVideoElement | null>(null);
  const userVideoSrc2 = useRef<HTMLVideoElement | null>(null);
  const localStream = useRef<MediaStream | null>(null);
  const remoteStream = useRef<MediaStream | null | any>({});
  const peerConnection = useRef<RTCPeerConnection | null | any>({});
  const videoRef = useRef(null);
  const [slash, setSlash] = useState({ audio: false, video: false });
  const [callEnd, setCallEnd] = useState(false);
  const roomIds = useParams()
  const roomId = roomIds.id
  const value = roomIds.uid as string
  const Servers = useMemo(() => {
    return {
      iceServers: [
        {
          urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
      ],
    };
  }, []);

  const createPeerConnection = useCallback(async (user_id: string) => {
    peerConnection.current[user_id] = new RTCPeerConnection(Servers);

    remoteStream.current[user_id] = new MediaStream();

    // if (userVideoSrc.current && remoteStream.current) {
    //   userVideoSrc.current.srcObject = remoteStream.current;
    // }
    if (userVideoSrc.current && remoteStream.current[user_id] && userVideoSrc2.current) {
      if (userVideoSrc.current.srcObject) {
        console.log("doneee", remoteStream.current[user_id], remoteStream.current, peerConnection.current);

        userVideoSrc2.current.srcObject = remoteStream.current[user_id]
      } else {
        console.log("doneee", remoteStream.current[user_id], remoteStream.current, peerConnection.current);

        userVideoSrc.current.srcObject = remoteStream.current[user_id]
      }

    }

    if (localStream.current && peerConnection.current[user_id]) {
      console.log("track checking", localStream.current);

      localStream.current.getTracks().forEach(async (track) => {
        const sender = peerConnection.current[user_id]!.addTrack(track, localStream.current!);
        if (sender) {
          console.log(`Track added to sender: ${sender.track.kind}`);
        } else {
          console.error(`Failed to add track to sender`);
        }
      });
    }
    console.log("pasas");

    if (peerConnection.current[user_id]) {
      peerConnection.current[user_id].ontrack = async (event: any) => {
        if (remoteStream.current[user_id]) {
          event.streams[0].getTracks().forEach(async (track: any) => {
            await remoteStream.current![user_id].addTrack(track, remoteStream.current[user_id]);

          });
     

          setStreams((prev: any) => ({
            ...prev,
            [user_id]: remoteStream.current[user_id],
          }))

          // if (userVideoSrc.current && remoteStream.current) {
          //   userVideoSrc.current.srcObject = remoteStream.current;
          // }
          ///////////check here//////////
          console.log("events");

        }
      };
    }


    if (peerConnection.current[user_id]) {
      peerConnection.current[user_id].onicecandidate = async (event: any) => {
        if (event.candidate && socket) {
          socket.emit('sendMessageToPeer', {
            type: 'candidate',
            candidate: event.candidate,
            roomId,
            user_id: value,
            remoteUser_id: user_id
          });
        }
      };
    }
  }, [Servers, roomId, socket, value]);

  const createOffer = useCallback(async (user_id: string) => {
    if (!peerConnection.current[user_id]) {
      await createPeerConnection(user_id);
    }

    if (peerConnection.current[user_id]) {
      try {
        const offer = await peerConnection.current[user_id].createOffer();
        await peerConnection.current[user_id].setLocalDescription(offer);
        socket?.emit("sendMessageToPeer", { type: "offer", offer, roomId, user_id: value, remoteUser_id: user_id });
      } catch (error) {
        console.error('Error creating offer:', error);
      }
    }
  }, [createPeerConnection, roomId, socket, value]);
  const handleUserJoined = useCallback(async (user_id: string) => {
    await createOffer(user_id);
  }, [createOffer]);

  // const handleRoomUpdation = useCallback(async (user_id: string) => {
  //   await createOffer(user_id);
  // }, [createOffer]);


  const createAnswer = useCallback(async (user_id: string, offer: RTCSessionDescriptionInit) => {
    console.log(user_id);

    if (!peerConnection.current[user_id]) {
      await createPeerConnection(user_id);
    }

    if (peerConnection.current) {
      try {
        await peerConnection.current[user_id].setRemoteDescription(offer);
        const answer = await peerConnection.current[user_id].createAnswer();
        await peerConnection.current[user_id].setLocalDescription(answer);
        socket?.emit("sendMessageToPeer", { type: "answer", answer, roomId, user_id: value, remoteUser_id: user_id });
      } catch (error) {
        console.error('Error creating answer:', error);
      }
    }
  }, [createPeerConnection, roomId, socket, value]);
  useEffect(() => {
    const userVideo = async () => {



      try {
        localStream.current = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

        if (myVideo.current && localStream.current) {
          myVideo.current.srcObject = localStream.current;
        }

        console.log(peerConnection.current);







        await socket?.emit("join-video-chat", { roomId, user_id: value });


      } catch (error) {
        console.error('Error accessing user media:', error);
      }
    };

    userVideo();
  }, [value, roomId, socket]);

  const addAnswer = async (answer: RTCSessionDescriptionInit, user_id: string) => {
    if (peerConnection.current[user_id] && !peerConnection.current[user_id].currentRemoteDescription) {
      try {
        await peerConnection.current[user_id].setRemoteDescription(answer);
      } catch (error) {
        console.error('Error setting remote description:', error);
      }
    }

    if (userVideoSrc.current && remoteStream.current[user_id] && userVideoSrc2.current) {
      if (userVideoSrc.current.srcObject) {
        console.log("doneee", remoteStream.current[user_id], remoteStream.current, peerConnection.current);

        userVideoSrc2.current.srcObject = remoteStream.current[user_id]
      } else {
        console.log("doneee", remoteStream.current[user_id], remoteStream.current, peerConnection.current);

        userVideoSrc.current.srcObject = remoteStream.current[user_id]
      }


    }
  };
  useEffect(() => {
    const handleCallEnd = (userData: any) => {
      const { remoteUser_id } = userData;
      peerConnection.current[remoteUser_id] = null;
  
      // Stop remote stream tracks if they exist
      if (remoteStream.current[remoteUser_id]) {
        remoteStream.current[remoteUser_id].getTracks().forEach((track: MediaStreamTrack) => track.stop());
      }
      remoteStream.current[remoteUser_id] = null;
      console.log(`${remoteUser_id} logged out`);
    };
  
    const handleNewUser = async (user_id: string) => {
      await handleUserJoined(user_id);
    };
  
    const handleReceivedPeerToPeer = async (data: any) => {
      console.log("remoteUser_id ", data.remoteUser_id, " value ", value);
  
      if (data.remoteUser_id == value) {
        if (data.type === "offer") {
          console.log("offered");
          await createAnswer(data.user_id, data.offer);
        }
        if (data.type === "answer") {
          console.log("answered");
          await addAnswer(data.answer, data.user_id);
        }
        if (data.type === "candidate") {
          if (peerConnection.current[data.user_id]) {
            console.log("ince candiadding");
            await peerConnection.current[data.user_id].addIceCandidate(data.candidate, data.user_id);
          }
        }
      }
    };
  
    // Attach socket event listeners
    socket?.on("call-end", handleCallEnd);
    socket?.on("newUser", handleNewUser);
    socket?.on("receivedPeerToPeer", handleReceivedPeerToPeer);
  
    // Clean up event listeners when the component unmounts
    return () => {
      socket?.off("call-end", handleCallEnd);
      socket?.off("newUser", handleNewUser);
      socket?.off("receivedPeerToPeer", handleReceivedPeerToPeer);
    };
  }, [createAnswer, handleUserJoined, socket, value]);
  



  useEffect(() => {
    const updateVideoRef = (selectedStream: any) => {
      if (selectedStream && videoRef.current) {
        // Assign the video element to the ref
        videoRef.current.srcObject = selectedStream; // Use srcObject to set the stream
      }
    };

    // Update the video ref when selectedStream changes
    updateVideoRef(remoteStream.current[selected]);
  }, [remoteStream, selected, setSelected]);

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
      if (remoteStream.current) {
        {
          Object.entries(remoteStream.current).map(([streamKey, streamValue], index) => {
            remoteStream.current[streamKey].getTracks().forEach((track: MediaStreamTrack) => track.stop());
          })
        }
      }


      socket?.emit("call-end", { remoteUser_id: value,roomId });

      router?.push(`/thread/${returnValue.value[0].id}`);

    }


  };


  return (
    <main className='bg-primary w-full h-screen'>
      <div className='bg-gray-400 w-full h-5/6 grid lg:grid-cols-5'>

        <div className='bg-red-800 col-span-4 h-full relative flex-row'>
          <div className='bg-primary h-14 w-full flex justify-center items-center text-center'>
            I - MEET
          </div>
          <div className="bg-gray-600 pl-64 w-full h-4/5 flex relative justify-end items-center rounded-lg">
            <div className="w-full">
              <video className='rounded-3xl shadow-3xl' ref={videoRef} autoPlay playsInline width={650} />
            </div>
          </div>




        </div>

        <div className='bg-primary col-span-1 h-full flex flex-col items-center overflow-y-auto'>
          <div className='w-5/6 h-1/4 bg-violet-400 mt-5 shadow-lg rounded-3xl'>
            <video className='shadow-3xl rounded-3xl' ref={myVideo} autoPlay playsInline muted width="324" height="200" />
          </div>
          <br />
          {Object.entries(remoteStream.current).map(([streamKey, streamValue], index) => {
            if (streamKey !== selected) {
            

              return (
                <ChildrenVideo onClick={() => setSelected(streamKey)} key={index} userVideoSrc={streamValue} />
              );
            }
            return null; // Return null for the selected component to exclude it
          })}
        </div>


      </div>

      <div className='bg-white-700  w-full h-8 flex items-center justify-center m-10 mr-4 '>

       
          <div onClick={toggleCamera} className='mr-5'>

            {slash.video ? (
              <button className='font-bold py-2 px-4 rounded bg-blue-500 text-white bg-blue-700'>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 01-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 00-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409" />
              </svg>
              </button>
              
            ) : (
              <button className='font-bold py-2 px-4 rounded bg-blue-500 text-white bg-blue-700'>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
              </svg>
              </button>
             

            )}



          </div>
          <div onClick={toggleMic} className='mr-5' >
            {slash.audio ? (
              <button className='font-bold py-2 px-4 rounded  text-white bg-blue-700'>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

              </button>
              
            ) : (
              <button className='font-bold py-2 px-4 rounded  text-white bg-blue-700'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

              </button>
              


            )}


          </div>
          <div onClick={endCall} className='mr-5'>
          <button className='font-bold py-2 px-4 rounded  text-white bg-blue-700'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
            </svg>
          </button>
            
          </div>
     
      </div>
    </main>
  )

}

export default Page