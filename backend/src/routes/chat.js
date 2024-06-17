import Elysia from "elysia";

import { ctx } from '../context'; 
import * as chatsController from '../app/controllers/ChatController';


//Define Plugin
export const chat = new Elysia()
    .use(ctx) 
    .group('/chats', route => route
        .post('/', ({db,body}) => {return chatsController.createChat(db,body)})
        .get('/:userId', async ({db,params: {userId}}) => { return chatsController.findUserChats(db,userId)})
        .get('/find/:firstId/:secondId', ({db, params: {firstId,secondId}}) => {return chatsController.findChat(db,firstId,secondId)})
    )

    