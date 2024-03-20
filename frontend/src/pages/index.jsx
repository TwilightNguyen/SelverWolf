import React, { useEffect, useState, useRef } from 'react';


export default function Index() {
  const [username,setUsername] = useState('');
  const [usernameField,setUsernameField] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
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

  //Function enter username
  const handleStartChat = (e) => {
    e.preventDefault();
    setUsername(usernameField);
  }

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

  if(!username){
    return(
      <main>
        <form onSubmit={handleStartChat}>
          <label>
            Enter a username: 
            <input 
              name='username'
              type='text' value={usernameField ?? ''} 
              onChange={(e) => { setUsernameField(e.target.value); }}
            />
          </label>
          <button type='submit' disabled={!usernameField}>Start chat</button>
        </form>
      </main>
    )
  }

  return (
    <>
        <div id='message'>
          {!messages.length && (
            <p>No message.</p>
          )}
            {
              messages.map((data, i) => { 
                return <p key={i}  style={data.isAutomated?{color:'gray'}:{color: 'black'}}>{data.message}</p>
              })
            }
        </div>
        <form onSubmit={handleOnSubmit}>
            <input 
              type='text' value={message ?? ''} 
              onChange={(e) => { setMessage(e.target.value) }}
            />
            <button type='submit' disabled={!message}>Send</button>
        </form>
    </>
  )
}
