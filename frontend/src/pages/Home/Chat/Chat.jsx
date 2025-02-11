
import React, { useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import { 
  MicrophoneIcon,
  PhoneIcon, 
  PhoneSlashIcon, 
  SentIcon, 
  VideoIcon, 
 } from '../../../components/Icons';
import Avatar from "../../../components/Avatar";
import ReceivingCall from "../../../components/ReceivingCall/ReceivingCall";

import style from './Chat.module.scss';

const cx = classNames.bind(style);

function Chat({
  userId,
  userName,
  groupId,
  groupName
}) {
  const [stream, setStream] = useState();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); 
  const [videoCall, setVideoCall] = useState(false);
  const [audioCall, setAudioCall] = useState(false);
  const [me, setMe] = useState('');
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState(-1);
  const [callerSignal, setCallerSignal] = useState();
  const [idToCall, setIdToCall] = useState('');
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');
  
  
  const ws = useRef(); 
  const inputRef = useRef();
  const contentRef = useRef();
  const myVideoRef = useRef();

  console.log('mute');

  useEffect(() => {
    setMessages([]);
    ws.current = new WebSocket(`ws://localhost:3200/?userId=${userId}&username=${userName}&groupId=${groupId}`);
    
    ws.current.onopen = () => {
      console.log('socket opened.');
    }

    ws.current.onclose = () => {
      console.log('socket closed.');
    }
    
    ws.current.onmessage = (ev) => {
      var res = JSON.parse(ev.data);
      console.log(res);
      if(res.type === 'onReceivingCall'){
        setReceivingCall(true);
        setCallAccepted(false);
        setCallEnded(false);
        setCaller(+res.from);
      }else if(res.type === "onAccepted"){
        setCallAccepted(true);
      }
      else if(res.type === 'onCall'){
        setCallAccepted(false);
        setReceivingCall(false);
        setCallEnded(false);
      }else if(res.type === 'onEndCall'){
        // removeVideoStream();
        // setCallAccepted(false);
        // setReceivingCall(false);
        // setCallEnded(true);
        
      }
      
      setMessages(prev => [...prev ?? [], JSON.parse(ev.data)]);
    }

    setMessage('');

    return () => {
      ws.current?.close();
    }
  }, [groupId]);

  useEffect(() => {
    if(!ws.current) return;
  }, [ws.current]);
 
  useEffect(() => {
    if(
      document.getElementById('content') &&
      contentRef.current
    ){
      document.getElementById('content').scrollTop = contentRef.current.offsetHeight;
    }
  },[messages]);

  useEffect(()=>{
    inputRef.current != null && inputRef.current.focus();
  });

  useEffect(()=>{
    if(stream){
      addVideoStream();
      //stream.getTracks().forEach(track => peerRef.current.addTrack(track, stream));
    }
  },[stream]);
  
  //Function handle sent message
  const handleOnSubmit = (e) =>{
    e.preventDefault();
    if(!message || !ws.current){
      return;
    } 

    if(message.replaceAll(' ','') === ''){
      return;
    }
    //console.log(`Message sent: ${message}`);
    ws.current.send(JSON.stringify({type: 'onText', data: message}));
    setMessage('');
  } 

  const HandleCall = () => {
    ws.current.send(JSON.stringify({type: 'onReceivingCall'}));
  }
  
  const HandleEndCall = async () => {
    await removeVideoStream();
    ws.current.send(JSON.stringify({type: 'onEndCall'}));
  }

  function addVideoStream(){
    if(stream){
      try{ 
        console.log('add stream');
        myVideoRef.current.srcObject = stream;
        myVideoRef.current.addEventListener('loadedmetadata', () => {
          myVideoRef.current.play();
        });
      }
      catch(ex){
        console.error(ex);
      }
    }
  }

  function removeVideoStream(){

    console.log('remove');
    stream && stream.getTracks().forEach(async function(track){
      await track.stop();
      console.log(track);
    });

    //myVideoRef.current.srcObject = null; 
  }

  if((receivingCall && caller == userId || callAccepted) && !callEnded){
    if(receivingCall && caller == userId){
      //myVideoRef.current.muted = true;
    
      !stream && navigator.mediaDevices.enumerateDevices().then(devices => {
          devices.forEach(device => {
              if (device.kind === 'videoinput') {
                  navigator.mediaDevices.getUserMedia({
                      video: { deviceId: { exact: device.deviceId }},
                      audio: true
                  }).then(vStream => {
                      setStream(vStream);
                  }).catch(error => {
                  });
              }
          });
      });
    }

    return (
      <div className={cx('call-wrapper')}>
          <video ref={myVideoRef} className={cx('my-video')}></video>
          {callAccepted && <video className={cx('remote-video')}></video>}
          <div className={cx('control')}>
            <div className={cx('video-btn')}>
              <VideoIcon className={cx('icon')}/>
            </div>

            <div className={cx('phone-btn')}
              onClick={HandleEndCall}
            >
              <PhoneSlashIcon className={cx('icon')}/>
            </div>
            
            <div className={cx('audio-btn')}>
              <MicrophoneIcon className={cx('icon')}/>
            </div>
          </div>
      </div>
    );
  }
  
  return(
    <div className={cx('wrapper')}>
      <div className={cx('messages')}>
        <div className={cx('header')}>
          <div className={cx('left')}>
            <Avatar />
            <div className={cx('info')}>
              <div className={cx('username')}>
                {groupName}
              </div>
              <div className={cx('note')}>offline</div>
            </div>
          </div>
          <div className={cx('right')}>
            <div
              className={cx('audio-call')}
              onClick={()=> HandleCall()}
            >
              <PhoneIcon
                className={cx('icon')}
                />
            </div>
            <div
              className={cx('video-call')}
              onClick={()=>HandleCall()}
            >
              <VideoIcon 
                className={cx('icon')}
              />
            </div>
          </div>
        </div>
        <div id="content" className={cx('content')}>
          <div ref={contentRef} >
            {!messages.length && (
              <p>No message.</p>
            )}
              {
                messages.map((data, i) => { 
                  if(data.type === 'onText'){
                    return <div 
                      key={i} 
                      className={cx(data.isAutomated ? 'message-system' : +data.from === +userId ? 'message-sent' : 'message-receive')}
                    > 
                      {
                        (!data.isAutomated && +data.from !== +userId && (i > 0 && messages[i-1].from != data.from))&&
                        <Avatar className={cx('avatar')}/>
                      }
                      <p className={cx('message')} >{data.message}</p>
                    </div>
                  }
                })
              }
            </div>
        </div>
      </div>
      <form onSubmit={handleOnSubmit} className={cx('chat-box')}>
          <input 
            type='text' value={message ?? ''} 
            onChange={(e) => { setMessage(e.target.value) }}
            placeholder="Enter Message..."
            ref={inputRef}
          />
          <button className={cx('btn-submit')} type='submit' disabled={!message}>
            <SentIcon className={cx('sent-icon')}/>
          </button>
      </form>
      { (callEnded === false && caller !== -1 && caller !== userId) && <ReceivingCall ws={ws} groupName={groupName} />}
    </div>
  );
}

Chat.propTypes = {
  userId: PropTypes.number,
  userName: PropTypes.string,
  groupId: PropTypes.string,
  groupName: PropTypes.string
};

export default Chat;
