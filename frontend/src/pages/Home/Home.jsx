
import React, { useEffect, useState, useRef } from 'react';

import classNames from 'classnames/bind';
import { EllipsisIcon, SearchIcon, SentIcon, UserGroupIcon, UserIcon } from '../../components/icons';
 
import styles from './Home.module.scss';


const cx = classNames.bind(styles);

function Home() {
  const username = sessionStorage.getItem('logged_user'); 
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); 
  const [filterMessage, setFilterMessage] = useState(false);
  const [chat, setChat] = useState(0);
  
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

  return (
    <div className={cx('wrapper')}>
      <div className={cx('list-chat')}>
        <div className={cx('header')}>
          <div className={cx('search-box')}>
            <div className={cx('search')}>
              <div className={cx('icon')}>
                <SearchIcon className={cx('search-icon')} />
              </div>
              <input />
            </div>
            <div className={cx('add-friend')}>
              <UserIcon className={cx('add-friend-icon')} />
            </div>
            <div className={cx('add-group')}>
              <UserGroupIcon className={cx('add-group-icon')}/>
            </div>
          </div>
          <div className={cx('filter')}>
            <div className={cx('left')}>
              <div className={cx('all',!filterMessage&&'active')}
                onClick={() => setFilterMessage(false)}
              >
                All
              </div>
              <div className={cx('unread',filterMessage&&'active')}
                onClick={() => setFilterMessage(true)}
              >
                Unread
              </div>
            </div>
            <div className={cx('right')}>
              <div className={cx('classify')}>
                Classify 
                <div className={cx('icon')}></div>
              </div>
              <div className={cx('more')}>
                <EllipsisIcon className={cx('more-icon')} />
              </div>
            </div>
          </div>
        </div>
        <div className={cx('items')}>
          <div className={cx('item',chat===0?'active':'')}
            onClick={()=> setChat(0)}
          >
            <div className={cx('icon')}>
              icon
            </div>
            <div className={cx('content')}>
              <div className={cx('title')}>Title</div>
              <div className={cx('note')}>Note</div>
            </div>
          </div>
          <div className={cx('item', chat===1?'active':'')}
            onClick={()=> setChat(1)}
          >
            <div className={cx('icon')}>
              icon
            </div>
            <div className={cx('content')}>
              <div className={cx('title')}>Title</div>
              <div className={cx('note')}>Note</div>
            </div>
          </div>
        </div>
      </div>
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
    </div>
  )
}

export default Home;
