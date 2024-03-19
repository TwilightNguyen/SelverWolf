
import { ServerWebSocket } from 'bun';
import figlet from 'figlet'; 
import KSUID from 'ksuid';

let openSocket = [];
const mysql = require('mysql2');

//connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'local@123',
    database: 'db_whale',
});

//connect to mysql
connection.connect((err) => {
    if (err) throw err;
    console.log('Database connected.');
    //select data
    connection.query('SELECT * FROM w_users', (err, rows) => {
        if (err) {
            throw err;
        } else {
            //console.log(rows)
        }
    });
});

const sendToEveryone = (message) => {
    openSocket.forEach(ws => {
        ws.send(message);
    });
}

const server = Bun.serve({
    port: 3200,
    async fetch(req, server) {
        //upgrade the request to websocket
        const uid = await KSUID.random();
        if(server.upgrade(req, {data: {id: uid.string}})){
            return;
        }
        //return new Response("Success!");
        const body = figlet.textSync('Bun!'); 
        return new Response(body);
    },
    websocket: {
        open(ws) {
            openSocket.push(ws);
            const msg = `a user has entered the chat.`;
            sendToEveryone(msg);
        },
        message(ws, message) {
            console.log(message);
            sendToEveryone(message);
        },
        close(ws, code, message) {
            const msg = `a user has left the chat.`;
            sendToEveryone(msg);
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
