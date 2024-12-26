
import React, { useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import { 
  PhoneIcon, 
  SentIcon, 
  VideoIcon, 
 } from '../../../components/Icons';

import Avatar from "../../../components/Avatar";

import style from './Chat.module.scss';
import PhoneCall from "../../../components/PhoneCall";

const cx = classNames.bind(style);

function Chat({userId,userName,groupId,groupName}) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); 
  const [videoCall, setVideoCall] = useState(false);
  const [audioCall, setAudioCall] = useState(false);
  const [me, setMe] = useState('');
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState();
  const [idToCall, setIdToCall] = useState('');
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');
  

  const ws = useRef(); 
  const inputRef = useRef();
  const contentRef = useRef();
  const myVideo = useRef();
  const userVideo = useRef();

  useEffect(() => {
    setMessages([]);
    ws.current = new WebSocket(`ws://localhost:3200/?userId=${userId}&username=${userName}&groupId=${groupId}`);
    //setSocket(socket);
    ws.current.onopen = () => {
      console.log('socket opened.');
    }

    ws.current.onclose = () => {
      console.log('socket closed.');
    }
    
    ws.current.onmessage = (ev) => {
      if(JSON.parse(ev.data).type === 'onCall'){
        setCallAccepted(true);
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

  useEffect(()=>{
    inputRef.current !=null&&inputRef.current.focus();
  });

  if((callAccepted || receivingCall) && !callEnded){
    return (
      <div className={cx('call-wrapper')}>
        <div className={cx('video')}>
          <PhoneCall 
            ws={ws} 
            callAccepted={callAccepted}
            receivingCall={receivingCall}
            groupId = {groupId}
            userId = {userId}
          />
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
                onClick={()=>{
                  setVideoCall(false);
                  setAudioCall(true);
                  setReceivingCall(true);
                }}
              >
                <PhoneIcon
                  className={cx('icon')}
                  />
              </div>
              <div
                className={cx('video-call')}
                onClick={()=>{
                  setAudioCall(true);
                  setVideoCall(true);
                  setReceivingCall(true);
                }}
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
                        className={cx(data.isAutomated ? 'message-system' : +data.from===+userId?'message-sent':'message-receive')}
                      > 
                        {
                          (!data.isAutomated && +data.from!==+userId && (i > 0 && messages[i-1].from != data.from))&&
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
            <button className={cx('btn-submit',!message&&'disabled')} type='submit' disabled={!message}>
              <SentIcon className={cx('sent-icon')}/>
            </button>
        </form>
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
