
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import { EllipsisIcon, SearchIcon, UserGroupIcon, UserIcon } from '../../components/icons';
import { getRequest } from '../../utils/services';
import ChatGroup from '../../layouts/components/ChatGroup';
import Chat  from './Chat';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);

async function loadChatList(userId) {
  return await getRequest(`/chats/${userId}`);
}

function Home() {
  const username = localStorage.getItem('logged_user'); 
  const [chatList, setChatList] = useState([]);
  const [filterMessage, setFilterMessage] = useState(false);
  const [chat, setChat] = useState(0);

  const handleChatList = async () => {
    const result = await loadChatList(1);
    setChatList(result);
  }

  useEffect(() => {
    handleChatList();
  },[]);
  console.log(chatList);
  return (
    <div className={cx('wrapper')}>
      
      <div className={cx('chats-sidebar')}> 
        <div className={cx('header')}>
          <div className={cx('username')}>
            {username}
          </div>
          
          <div className={cx('search-box')}>
            <div className={cx('search')}>
              <div className={cx('icon')}>
                <SearchIcon className={cx('search-icon')} />
              </div>
              <input className={cx('search-input')}  type='text' placeholder='Search'/>
            </div>
            <div className={cx('add-friend')}>
              <UserIcon className={cx('add-friend-icon')} />
            </div>
            <div className={cx('add-group')}>
              <UserGroupIcon className={cx('add-group-icon')}/>
            </div>
          </div>
          <div className={cx('filter')}>
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
        </div>
        <div className={cx('items')}>
          {
            chatList.map((value,index)=>{
              return (
                <ChatGroup 
                  key={index}
                  avatar={'Avatar'} 
                  username={'Username ' + index} 
                  message={'Message '+ index}
                  className={chat===index?'active':''}
                  onClick={()=>{setChat(index);}}
                />
              );
            })
          }
        </div>
      </div>
      <Chat username = {username} chatGroupID = {chat}/>
    </div>
  )
}

export default Home;
