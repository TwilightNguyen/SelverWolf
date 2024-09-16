
import React, { useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import { SentIcon } from '../../../components/icons';

import style from './Chat.module.scss';

const cx = classNames.bind(style);

function Chat({username,groupId}) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); 
  // const [filterMessage, setFilterMessage] = useState(false);
  // const [chat, setChat] = useState(0);

  const ws = useRef(); 
  
  useEffect(() => {
    setMessages([]);
    ws.current = new WebSocket(`ws://localhost:3200/?username=${username}&groupId=${groupId}`);
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

    return () => {
      ws.current?.close();
    }
  }, [groupId]);

  useEffect(() => {
    if(!ws.current) return;
  }, [ws.current]);
 
  useEffect(() => {
    document.getElementById('messages').scrollTop = document.getElementById('messages').offsetHeight;
  },[messages]);

  //Function handle sent message
  const handleOnSubmit = (e) =>{
    e.preventDefault();
    if(!message || !ws.current){
      return;
    } 
    //console.log(`Message sent: ${message}`);
    ws.current.send(message);
    setMessage('');
  } 
  return(
    <div className={cx('content')}>
        <div id='messages' className={cx('messages')}>
          {!messages.length && (
            <p>No message.</p>
          )}
            {
              messages.map((data, i) => { 
                return <div 
                  key={i} 
                  className={cx(data.isAutomated ? 'message-system' : 'message-receive')}
                > 
                  <p className={cx('message')}  >{data.message}</p>
                </div>
              })
            }
        </div>
        <form onSubmit={handleOnSubmit} className={cx('chat-box')}>
            <input 
              type='text' value={message ?? ''} 
              onChange={(e) => { setMessage(e.target.value) }}
            />
            <button className={cx('btn-submit',!message&&'disabled')} type='submit' disabled={!message}>
              <SentIcon className={cx('sent-icon')}/>
            </button>
        </form>
      </div>
  );
}

Chat.propTypes = {
  username: PropTypes.string,
  groupId: PropTypes.string
};

export default Chat;
