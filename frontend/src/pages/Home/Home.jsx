
import React, { useEffect, useState, useRef } from 'react';

import classNames from 'classnames/bind';
import { SentIcon } from '../../components/icons';

import {useToken} from '../../store';
import styles from './Home.module.scss';


const cx = classNames.bind(styles);

function Home() {
  const [username,setUsername] = useState(sessionStorage.getItem('logged_user')); 
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const {token,setToken} = useToken();
  //const [socket, setSocket] = useState();
  const ws = useRef(); 
  
  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:3200?username=${username}`);
    //setSocket(socket);
    ws.current.onopen = () => {
      console.log('socket opened.');
    }

    ws.current.onclose = () => {
      console.log('socket closed.');
    }
    
    ws.current.onmessage = (ev) => {
      setMessages(prev => [...prev ?? [], JSON.parse(ev.data)]);
      console.log(`message received: ${ev.data}`); 
    }

    return () => {
      ws.current?.close();
    }
  }, [username]);

  useEffect(() => {
    if(!ws.current) return;
  }, [ws.current]);
 

  //Function handle sent message
  const handleOnSubmit = (e) =>{
    e.preventDefault();
    if(!message || !ws.current){
      return;
    } 
    console.log(`Message sent: ${message}`);
    ws.current.send(message);
    setMessage('');
  } 

  return (
    <div className={cx('wrapper')}>
      <div className={cx('list-chat')}>
        list chat
      </div>
      <div className={cx('content')}>
        <div id='message' className={cx('message')}>
          {!messages.length && (
            <p>No message.</p>
          )}
            {
              messages.map((data, i) => { 
                return <p key={i}  style={data.isAutomated?{color:'gray'}:{color: 'black'}}>{data.message}</p>
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
    </div>
  )
}

export default Home;
