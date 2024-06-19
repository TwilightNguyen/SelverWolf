import Elysia from 'elysia';

import { ctx } from '../context';
import * as MessageController from '../app/controllers/MessageController';

//Define Plugin
export const message = new Elysia() 
    .use(ctx)
    .group('/message', route => route
        .get('/', () => '')
        .get('/:chatId', ({db, params: {chatId}}) => MessageController.getMessages(db,chatId))
        .post('/', ({db, body}) => MessageController.createMessage(db,body))
    )


