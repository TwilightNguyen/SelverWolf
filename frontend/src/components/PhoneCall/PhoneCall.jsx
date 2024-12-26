
// import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { 
    MicrophoneIcon,
    MicrophoneSlashIcon,
    PhoneSlashIcon, 
    VideoIcon, 
    VideoSlashIcon
   } from '../../components/Icons';

import styles from './PhoneCall.module.scss';

const cx = classNames.bind(styles);

function PhoneCall({ws, callAccepted, receivingCall, userId, groupId}){
    const [stream, setStream] = useState();
    const [videoCall, setVideoCall] = useState(false);
    const [audioCall, setAudioCall] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [sender, setSender] = useState();
    const peerRef = useRef(new RTCPeerConnection());
    const peerRemoteRef = useRef(new RTCPeerConnection());
    const myVideoRef = useRef();
    const remoteVideoRef = useRef();  

    console.log("re-render");
    // Handle remote stream 
    peerRef.current.ontrack = event => { 
        const [remoteStream] = event.streams; 
        //remoteVideo.srcObject = remoteStream;
        addVideoStream(remoteVideoRef, remoteStream);
    }
    
    // Handle ICE candidates 
    peerRef.current.onicecandidate = event => { 
        if (event.candidate) { 
            ws.current.send(JSON.stringify({
                type: 'onCall', signal: event.candidate
            }));
        }
    }

    ws.current.onmessage = async event => {
        const message = JSON.parse(event.data); 
        // if (message.type == 'onCall' && !receivingCall) {
        if (message.type == 'onCall' && 
            message.signal.type=='offer'
        ) {
            if (peerRef.current.signalingState === 'stable' && 
                +userId != +message.from
            ) {
                await peerRef.current.setRemoteDescription(
                    new RTCSessionDescription(message.signal)
                ); 
                
                const answer = await peerRef.current.createAnswer(); 
                await peerRef.current.setLocalDescription(answer); 
                
                ws.current.send(JSON.stringify({
                    type: 'onCall', 
                    signal: answer
                })); 
            }else{
                console.error('Received offer in wrong signaling state: ', peerRef.current.signalingState);
            }
        }
        
        if (message.type == 'onCall' && 
            message.signal.type == 'answer'
        ) { 
            //console.log(message.signal);
            if (peerRef.current.signalingState === 'have-local-offer' && +userId != +message.from) {
                await peerRef.current.setRemoteDescription(
                    new RTCSessionDescription(message.signal)
                ); 
            }else{
                console.error('Received answer in wrong signaling state: ', peerRef.current.signalingState);
            }
        } 
        
        if (message.type == 'onCall' && 
            message.signal.candidate && 
            +userId != +message.from
        ) { 
            await peerRef.current.addIceCandidate(new RTCIceCandidate(message.candidate)); 
        } 
    };

    useEffect(()=>{
        myVideoRef.current.muted = true;
    
        !stream && navigator.mediaDevices.enumerateDevices().then(devices => {
            devices.forEach(device => {
                if (device.kind === 'videoinput') {
                    navigator.mediaDevices.getUserMedia({
                        video: { deviceId: { exact: device.deviceId }},
                        audio: true
                    }).then(stream => {
                        addVideoStream(myVideoRef, stream);
                        stream.getTracks().forEach(track => peerRef.current.addTrack(track, stream));
                        console.log("send stream");
                        setStream(stream);
                        send();
                    }).catch(error => {
                    });

                    return false;
                }
            });
        });

        async function send() {
            const offer = await peerRef.current.createOffer();
            // console.log(offer);
            await peerRef.current.setLocalDescription(offer); 
            ws.current.send(JSON.stringify({ 
                type: 'onCall', 
                signal: offer
            }));
        }
    },[]);

    function addVideoStream(video, stream){
        video.current.srcObject = stream;
        video.current.addEventListener('loadedmetadata', () => {
            video.current.play();
        });
    }

    useEffect(()=>{
        callEnded && stream && stream.getTracks().forEach(async function(track){
            peerRef.current.removeTrack(track);
            await track.stop();
        });
        
        peerRef.current.close();
        //stream.remoteStream;

        if(callEnded){
            myVideoRef.current.srcObject = null; 
        } 
    },[callEnded]);

    return (
        <div className = {cx('wrapper')}>
            <video ref={myVideoRef} className={cx('my-video')}></video>
            <video ref={remoteVideoRef} className={cx('remote-video')}></video>
            <div className={cx('control')}>
                <div 
                    className={cx('audio-btn')}
                    onClick={()=>{
                        setAudioCall(!audioCall);
                    }}
                >
                    {
                        audioCall ? 
                        <MicrophoneIcon className={cx('icon')} /> : 
                        <MicrophoneSlashIcon className={cx('icon')} />
                    }
                </div>
                <div 
                    className={cx('phone-btn')}
                    id="phone-btn"
                    onClick={()=>{
                        setAudioCall(false);
                        setVideoCall(false);
                        setCallEnded(true);
                    }}
                >
                    {
                        <PhoneSlashIcon className={cx('icon')}/>
                    }
                </div>
                <div 
                    className={cx('video-btn')}
                    onClick={()=>{
                        setVideoCall(!videoCall);
                    }}
                >
                    {
                        videoCall ? 
                        <VideoIcon className={cx('icon')}/> : 
                        <VideoSlashIcon className={cx('icon')}/>
                    }
                </div>
            </div>
        </div>
    );
}

PhoneCall.propTypes = {
    ws: PropTypes.object,
    groupId: PropTypes.string,
    userId: PropTypes.number
};
  
export default PhoneCall;
