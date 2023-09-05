import { useDispatch } from 'react-redux';
import io from 'socket.io-client'
import {socket} from '../app/(videocall)/conference/[id]/page'


export const createNewRoom = (identity:string,roomId:string,userId:string) => {
    const data = {
        identity,
        roomId,
        userId
    }
    console.log("+++++++++++++++++++++++");
    
    socket.emit('create-new-room',data)
}

export const joinRoom = (identity:string,roomId:string) => {
    const data = {
        roomId,
        identity
    }
    console.log("--------------------");
    
    socket.emit('join-new-room',data)
}

export const signalPeerData = (data) =>{
  socket.emit('conn-signal',data)
} 