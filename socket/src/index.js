
import { ServerWebSocket } from 'bun';
import figlet from 'figlet'; 
import KSUID from 'ksuid';


const port = process.env.PORT || 5000;

let openSocket = [];


// const mysql = require('mysql2');

//connection
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'local@123',
//     database: 'db_whale',
// });

//connect to mysql
// connection.connect((err) => {
//     if (err) throw err;
//     console.log('Database connected.');
//     //select data
//     connection.query('SELECT * FROM w_users', (err, rows) => {
//         if (err) {
//             throw err;
//         } else {
//             //console.log(rows)
//         }
//     });
// });

const sendToEveryone = (data) => {
    openSocket.forEach(ws => {
        ws.send(JSON.stringify(data));
    });
}

const server = Bun.serve({
    port: 3200,
    async fetch(req, server) {
        const uid = await KSUID.random();

        //get username
        const url = new URL(req.url);
        const username = url.searchParams.get('username');

        //upgrade the request to websocket
        if(server.upgrade(req, {data: {id: uid.string, username: username}})){
            return;
        } 
        return new Response('Update failed', {status: 500});
    },
    
    websocket: {
        open(ws) {
            openSocket.push(ws);
            const msg = `${ws.data.username} has entered the chat.`;
            sendToEveryone({message:msg, isAutomated: true});
            // retrieve previous unread messages from db
        },
        message(ws, message) {
            console.log(message);
            sendToEveryone({message: `${ws.data.username}: ${message}`, isAutomated: false});
            // persist data in db
        },
        close(ws, code, message) {
            const msg = `${ws.data.username} has left the chat.`;
            sendToEveryone({message:msg, isAutomated: true});
            const uid = ws.data?.id;
            console.log(uid, 'closed');
            openSocket = openSocket.filter(ws => ws.data.id !== uid);
        },
        drain(ws) {
            //console.log('the socket is ready to receive more data.')
        },
    },
});

console.log(`Listening to port:${server.port}`);
