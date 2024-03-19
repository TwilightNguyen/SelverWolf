import React, { useEffect, useState, useRef } from 'react';


export default function Index() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    //const [socket, setSocket] = useState();
    const ws = useRef();

    useEffect(() => {
      ws.current = new WebSocket('ws://localhost:3200');
      //setSocket(socket);
      ws.current.onopen = () => {
        console.log('socket opened.');
      }

      ws.current.onclose = () => {
        console.log('socket closed.');
      }
      
      ws.current.onmessage = (ev) => {
        //setMessages(prev => prev?.push(` ${ev.data}`));
        console.log(typeof ev.data);
        console.log(`message received: ${ev.data}`); 
      }

      return () => {
        ws.current?.close();
      }
    }, []);

    useEffect(() => {
      if(!ws.current) return;
    }, [ws.current]);

    const handleOnSubmit = (e) =>{
      e.preventDefault();
      if(!message || !ws.current){
        return;
      } 
      console.log(`Message sent: ${message}`);
      ws.current.send(message);
    }
  return (
    <>
        <div id='message'>
          {!messages.length && (
            <p>No message.</p>
          )}
            {
              messages.map(msg => {
                return <p>msg</p>
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
