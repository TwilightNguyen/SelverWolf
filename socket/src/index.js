
import KSUID from 'ksuid';

const port = process.env.PORT || 5000;

let openSocket = [];

const sendToEveryone = (data, groupId) => {
    openSocket.forEach(ws => {
        if(ws.data.groupId === groupId){
            ws.send(JSON.stringify(data));
        }
    });
}

const server = Bun.serve({
    port: 3200,
    async fetch(req, server) {
        const uId = await KSUID.random();

        //get username
        const url = new URL(req.url);
        const userId = url.searchParams.get('userId');
        const username = url.searchParams.get('username');
        const groupId = url.searchParams.get('groupId');

        //upgrade the request to websocket
        if(server.upgrade(req, {
            data: {
                id: uId.string, 
                groupId: groupId, 
                userId: userId, 
                username: username
            }
        })){
            return;
        } 
        return new Response('Update failed', {status: 500});
    },
    websocket: {
        open(ws) {
            //Ip address
            // console.log(ws.remoteAddress);
            openSocket.push(ws);
            const msg = `${ws.data.username} has entered the chat.`;
            sendToEveryone({
                type: 'onText',
                message:msg, 
                isAutomated: true
            }, ws.data.groupId);
            // retrieve previous unread messages from db
        },
        message(ws, message) {
            message = JSON.parse(message);
            if(message.type==='onText'){
                sendToEveryone({ 
                    type: 'onText',
                    from: `${ws.data.userId}`, 
                    message: `${message.data}`,
                    isAutomated: false
                }, ws.data.groupId);
            }else if(message.type==='onCall'){
                sendToEveryone({ 
                    type: 'onCall',
                    signal: message.signal, 
                    from: `${ws.data.userId}`, 
                    name: `${ws.data.username}`, 
                    isAutomated: false
                }, ws.data.groupId);
            }else if(message.type==='onEndCall'){
                sendToEveryone({ 
                    type: 'onEndCall', 
                    from: `${ws.data.userId}`, 
                    name: `${ws.data.username}`, 
                    isAutomated: false
                }, ws.data.groupId);
            }else if(message.type==='onReceivingCall'){
                sendToEveryone({ 
                    type: 'onReceivingCall',
                    from: `${ws.data.userId}`, 
                    isAutomated: false
                }, ws.data.groupId);
            }else if(message.type==='onAnswerCall'){
                sendToEveryone({ 
                    type: 'onAnswerCall', 
                    signal: message.signal, 
                    from: `${ws.data.userId}`, 
                    name: `${ws.data.username}`, 
                    isAutomated: false
                }, ws.data.groupId);
            }
            
            // server.publish(ws.data.groupId, data = {message: `${ws.data.username}: ${message}`, isAutomated: false})
            // persist data in db
        },
        close(ws, code, message) {
            const msg = `${ws.data.username} has left the chat.`;

            sendToEveryone({
                type: 'onText',
                message:msg, 
                isAutomated: true
            }, ws.data.groupId);

            const uId = ws.data?.id;
            console.log(uId, 'closed');
            openSocket = openSocket.filter(ws => ws.data.id !== uId);
        },
        drain(ws) {
            //console.log('the socket is ready to receive more data.')
        },
    },
});

console.log(`Listening to port:${server.port}`);

