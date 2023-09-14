// import { useDispatch } from 'react-redux';
// import io from 'socket.io-client'
// import { socket } from '../app/(videocall)/conference/[id]/page'
// import { createOffer } from './webRTCHandler';


// export const createNewRoom = (identity: string, roomId: string, userId: string) => {
//     const data = {
//         identity,
//         roomId,
//         userId
//     }
//     console.log("+++++++++++++++++++++++");

//     socket.emit('create-new-room', data)
// }

// export const joinRoom = async (identity: string, roomId: string) => {
//     const data = {
//         roomId,
//         identity
//     }
//     console.log("--------------------");
    
//     socket.emit('join-new-room', data)
// }

// export const emitOffer = (offer: any, identity: string, roomId: string, isRoomHost:boolean) => {
//     console.log("offer");
//     socket.emit('offer', {
//         data: {
//             roomId,
//             identity,
//             isRoomHost
//         }, offer
//     })
//     console.log("offered",offer,identity,roomId,isRoomHost);
// }

// export const emitAnswer = (answer: any, identity: string, roomId: string, isRoomHost:boolean) => {
//     console.log("answer", answer);
//     socket.emit('answer', {
//         data: {
//             roomId,
//             identity,
//             isRoomHost
//         }, answer
//     })
//     console.log("answered");
// }

// export const emitIceCandidates = (iceCandidates: any, identity: string, roomId: string, isRoomHost:boolean) => {
//     console.log("iceCandidates", iceCandidates);
//     socket.emit('ICE', {
//         data: {
//             roomId,
//             identity,
//             isRoomHost
//         }, iceCandidates
//     })
// }


// // export const signalPeerData = (data) => {
// //     socket.emit('conn-signal', data)
// // }

