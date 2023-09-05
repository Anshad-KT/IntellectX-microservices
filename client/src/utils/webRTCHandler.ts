import * as wss from './wss';
import Peer from 'simple-peer';

const defaultConstraints: MediaStreamConstraints = {
  audio: true,
  video: true,
};

export let localStream: MediaStream;
export let localStreamSuccess: MediaStream;
export const getLocalPreviewAndInitRoomConnection = (
    isRoomHost: boolean,
    identity: string,
    roomId: string
  ) => {
    return new Promise<MediaStream>((resolve, reject) => {
      navigator.mediaDevices
        .getUserMedia(defaultConstraints)
        .then((stream) => {
          console.log('successfully received local stream', stream);
  
          localStream = stream;
  
          console.log(isRoomHost, identity, 'lklklklk');
  
          isRoomHost
            ? wss.createNewRoom(identity, identity, identity)
            : wss.joinRoom(roomId, identity);
  
          resolve(localStream); // Resolve the promise with the localStream
        })
        .catch((err) => {
          console.error(err);
          reject(err); // Reject the promise if there's an error
        });
    });
  };
  

// const showLocalVideoPreview = (stream: MediaStream) => {
//   // Implement your logic here
// };

let peers: { [key: string]: Peer.Instance } | any= [];
let streams: MediaStream[] = [];

const getConfiguration = (): RTCConfiguration => {
  return {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
      },
    ],
  };
};

export const prepareNewPeerConnection = (
  connUserSocketId: string,
  isInitiator: boolean
) => {
  const configuration = getConfiguration();
  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
  });
  peers[connUserSocketId].on('signal', (data) => {
    const signalData = {
        signal:data,
        connUserSocketId
    }
    wss.signalPeerData(signalData)
  })
  peers[connUserSocketId].on('stream', (stream) => {
    console.log('New stream');
    addStream(stream, connUserSocketId);
    streams = [...streams, stream];
  });
};

const addStream = (stream: MediaStream, connUserSocketId: string) => {
  
};

export const handleSignalingData = (data) => {
  //add signaling data to the peer connection
  peers[data.connUserSocketId].signal(data.signal)
}