"use client"
class PeerService {
  peer: any;

  constructor() {
    if (!this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
          },
        ],
      });
    }
  }

  async setRemoteDescription(ans:any) {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
    }
  }

  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
  }

  async getAnswer(offer: any) {
    if (!this.peer) {
      console.error('Peer connection is not initialized.');
      return null;
    }
  console.log(this.peer.iceConnectionState,"lll");
  
    try {
      // Set the remote description (offer) received from the remote peer
      await this.peer.setRemoteDescription(offer);
  
      // Create the answer
      const answer = await this.peer.createAnswer();
  
      // Set the local description (answer) before sending it to the remote peer
      await this.peer.setLocalDescription(answer);
  
      return answer;
    } catch (error) {
      console.error('Error in getAnswer:', error);
      return null;
    }
  }
  
}

export default new PeerService();