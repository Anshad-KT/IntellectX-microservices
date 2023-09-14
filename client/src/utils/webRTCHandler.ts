// import * as wss from './wss';
// import Peer from 'simple-peer';
// import { socket } from '../app/(videocall)/conference/[id]/page';

const defaultConstraints: MediaStreamConstraints = {
  audio: true,
  video: true,
};

let localStream: MediaStream;
// export let remoteStream: MediaStream;
// export let peerConnection: RTCPeerConnection ;

// export const createOffer = async (
//   isRoomHost: boolean,
//   identity: string,
//   roomId: string
// ): Promise<void> => {
 
//   try {
//     await createPeerConnection(isRoomHost, identity, roomId);
//    } catch (error) {
//     console.log(error);
    
//    }
  

//   if (peerConnection) {
//     let offer: RTCSessionDescriptionInit | undefined = await peerConnection.createOffer();

//     if (offer) {
//       await peerConnection.setLocalDescription(offer);

//       console.log(`offer ${offer}`);

//       wss.emitOffer(offer, identity, roomId, isRoomHost);
//     }
//   }
// };

// export const createAnswer = async (
//   isRoomHost: boolean,
//   identity: string,
//   roomId: string,
//   offer: RTCSessionDescriptionInit
// ): Promise<void> => {
//    try {
//     await createPeerConnection(isRoomHost, identity, roomId);
//    } catch (error) {
//     console.log(error);
    
//    }
  
//   if (peerConnection) {
//     await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

//     let answer: RTCSessionDescriptionInit | undefined = await peerConnection.createAnswer();

//     if (answer) {
//       await peerConnection.setLocalDescription(answer);
//       wss.emitAnswer(answer, identity, roomId, isRoomHost);
//     }
//   }
// };

// export const addIceCandidates = async (
//  iceCandidates:any
// ) => {console.log(peerConnection);
//   console.log("hot candi");
//   if(peerConnection){
//     peerConnection.addIceCandidate(iceCandidates)
//     console.log("ice candiii");
    
//   }
// }

// export const createPeerConnection = async (
//   isRoomHost: boolean,
//   identity: string,
//   roomId: string
// ): Promise<RTCIceCandidate[] | undefined> => {
//   peerConnection = new RTCPeerConnection(servers);
//   remoteStream = new MediaStream();
//   console.log("createpeer conection",peerConnection,remoteStream,localStream);
  
//   if (localStream) {
//     localStream.getTracks().forEach((track) => {
//       remoteStream.addTrack(track);
//     });
//   }
  

//   peerConnection.ontrack = (event: RTCTrackEvent) => {
//     event.streams[0].getTracks().forEach((track: MediaStreamTrack) => {
//       remoteStream.addTrack(track);
//     });
//   };

//   peerConnection.onicecandidate =  (event: RTCPeerConnectionIceEvent) => {
//     console.log(event.candidate,"event.candidate");
    
//     if (event.candidate) {
//       console.log(`New ICE candidate: ${event.candidate}`);
//       wss.emitIceCandidates(event.candidate, identity, roomId, isRoomHost);
//     }
//   };

//   // Return candidates if needed elsewhere in your code
//   return peerConnection?.localDescription?.sdp ? [] : undefined;
// };

// export const addAnswer = async (answer: RTCSessionDescriptionInit) => {
//   console.log("asssd");
  
//   if (peerConnection && !peerConnection.currentRemoteDescription) {
//     await peerConnection?.setRemoteDescription(answer)
//     console.log("ASSSSSSSDD");
    
//   }
// };

export const getLocalPreviewAndInitRoomConnection = (
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
          ? wss.createNewRoom(identity, roomId, identity)
          : wss.joinRoom(identity,roomId);

        
        resolve(localStream); // Resolve the promise with the localStream
      })
      .catch((err) => {
        console.error(err);
        reject(err); // Reject the promise if there's an error
      });
  });
};

// // let peers: { [key: string]: Peer.Instance } | any = [];
// // let streams: MediaStream[] = [];

// // const getConfiguration = (): RTCConfiguration => {
// //   return {
// //     iceServers: [
// //       {
// //         urls: 'stun:stun1.l.google.com:19302',
// //       },
// //     ],
// //   };
// // };

// export const servers: RTCConfiguration = {
//   iceServers: [
//     {
//       urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
//     },
//   ],
// };
