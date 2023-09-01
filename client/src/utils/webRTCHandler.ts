import * as wss from './wss'


const defaultConstraints = {
    audio:true,
    video:true
}

let localStream;


export const getLocalPreviewAndInitRoomConnection = (
    isRoomHost:boolean,
    identity:string,
    roomId:string
) => {
    console.log(navigator);
    
    navigator.mediaDevices.getUserMedia(defaultConstraints)
    .then((stream)=>{
        console.log("successfully recieved localstream",stream);
        
    localStream = stream
    showLocalVideoPreview(localStream)
    //dispatch action to hide overlay
    console.log(isRoomHost,identity,"lklklklk");
    
    isRoomHost ? wss.createNewRoom(identity,identity,identity) : wss.joinRoom(roomId,identity)
    })
    .catch((err)=>{
        console.log(err);
        
    })
}

const showLocalVideoPreview = (stream:any) => {

}