
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import { SearchIcon, UserGroupIcon, UserIcon } from '../../components/Icons';
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
  const [filterMessage, setFilterMessage] = useState('all');
  const [chat, setChat] = useState({id:-1,name:''});
  const [groupID,setGroupID] = useState([]);
  
  const handleChatList = async (uid) => {
    const groups = await loadChatList(uid);
    // setChatList([]);
    var temp = [];
    var group = [];
    
    await groups
    .map(async (value)=>{
      var array = await value.members
        .split(",")
        .map(Number)
        .find(id => id != 0 && id != uid);
      
      var res = await loadUserInfo(array);
      
      if(res.length > 0)
      {
        temp = [...temp, res[0]];
        group = [...group, value.id];
        setChatList(temp);
        setGroupID(group);
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
        <div className={cx('username')}>
          {username}
        </div>
        <div className={cx('header')}>
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
          <div className={cx('filter',filterMessage === 'all' ? 'filter-all' : filterMessage === 'unread' ? 'filter-unread' : '')}>
            <div className={cx('all', filterMessage === 'all' && 'active')}
              onClick={() => setFilterMessage('all')}
            >
              All
            </div>
            <div className={cx('unread', filterMessage === 'unread' && 'active')}
              onClick={() => setFilterMessage('unread')}
            >
              Unread
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
                    className={[chat.id===groupID[index] ? 'active' : '']}
                    onClick={()=>{
                      setChat({id:groupID[index], name:value.username});
                    }}
                  />
                );
              })
            }
          </div>
        </div>
      </div>
        {
          chat.id > -1 && 
          <Chat 
            userId={+userId} 
            userName = {username} 
            groupId = {chat.id.toString()} 
            groupName={chat.name.toString()}
          />
        }
    </div>
  )
}

export default Home;
