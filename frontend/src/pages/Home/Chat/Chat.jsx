
import React, { useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import { SentIcon } from '../../../components/Icons';
import Avatar from "../../../components/Avatar";

import style from './Chat.module.scss';

const cx = classNames.bind(style);

function Chat({userId,username,groupId}) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); 
  // const [filterMessage, setFilterMessage] = useState(false);
  // const [chat, setChat] = useState(0);

  const ws = useRef(); 
  const inputRef = useRef();
  const messagesRef = useRef();
  
  useEffect(() => {
    setMessages([]);
    ws.current = new WebSocket(`ws://localhost:3200/?userId=${userId}&username=${username}&groupId=${groupId}`);
    //setSocket(socket);
    ws.current.onopen = () => {
      console.log('socket opened.');
    }

    ws.current.onclose = () => {
      console.log('socket closed.');
    }
    
    ws.current.onmessage = (ev) => {
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
    document.getElementById('messages').scrollTop = messagesRef.current.offsetHeight;
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
    ws.current.send(message);
    setMessage('');
  } 

  useEffect(()=>{
    inputRef.current.focus();
  });

  return(
    <div className={cx('content')}>
        <div id='messages' className={cx('messages')}>
          <div ref={messagesRef}>
          {!messages.length && (
            <p>No message.</p>
          )}
            {
              messages.map((data, i) => { 
                return <div 
                  key={i} 
                  className={cx(data.isAutomated ? 'message-system' : +data.userId===+userId?'message-sent':'message-receive')}
                > 
                  {
                    (!data.isAutomated && +data.userId!==+userId && (i > 0 && messages[i-1].userId != data.userId))&&
                    <Avatar className={cx('avatar')}/>
                  }
                  <p className={cx('message')} >{data.message}</p>
                </div>
              })
            }
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
  username: PropTypes.string,
  groupId: PropTypes.string
};

export default Chat;
