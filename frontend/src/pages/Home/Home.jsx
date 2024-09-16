
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import { SearchIcon, UserGroupIcon, UserIcon } from '../../components/icons';
import { getRequest } from '../../utils/services';
import ChatGroup from '../../layouts/components/ChatGroup';
import Chat  from './Chat';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);

async function loadChatList(userId) {
  return await getRequest(`/chats/${userId}`);
}

async function loadUserInfo(id) {
  return await getRequest(`/user/${id}/false`);
}


function Home() {
  const username = localStorage.getItem('logged_user'); 
  const userId = localStorage.getItem('logged_id');
  //const [userId, setUserId] = useState(localStorage.getItem('logged_id'));
  const [chatList, setChatList] = useState([]);
  const [filterMessage, setFilterMessage] = useState(false);
  const [chat, setChat] = useState(-1);
  
  const handleChatList = async (uid) => {
    const groups = await loadChatList(uid);
    // setChatList([]);
    var temp = [];
    await groups
    .map(async (value)=>{
      var array = value.members
        .split(",")
        .map(Number)
        .find(id => id != 0 && id != uid);
      
      var res = await loadUserInfo(array);
      
      if(res.length > 0)
      {
        temp = [...temp,res[0]];
        setChatList(temp);
      }
    });
  }

  // handleChatList(userId);
  //console.log(chatList);
  useEffect(() => {
    handleChatList(userId);

    //Cleanup
    return () => {
      setChatList([]);
    }
  }, [userId]);

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
            <div className={cx('all', !filterMessage && 'active')}
              onClick={() => setFilterMessage(false)}
            >
              All
            </div>
            <div className={cx('unread', filterMessage && 'active')}
              onClick={() => setFilterMessage(true)}
            >
              Unread
            </div>
          </div>
        </div>
        <div className={cx('items')}>
          {
            chatList.length > 0 && chatList.map((value, index)=>{
              return (
                <ChatGroup 
                  key={index}
                  avatar={'Avatar'} 
                  username={value.username} 
                  message={'Message '+ value.id}
                  className={[chat===value.id ? 'active' : '']}
                  onClick={()=>{setChat(value.id);}}
                />
              );
            })
          }
        </div>
      </div>
        {chat > -1 && <Chat username = {username} groupId = {chat.toString()}/>}
    </div>
  )
}

export default Home;
