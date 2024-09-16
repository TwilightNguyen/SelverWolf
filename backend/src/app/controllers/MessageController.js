
//Create Message
//Get Message

import { eq } from 'drizzle-orm';
import { messages } from '../../config/db/schema/message'; 

//Create Message
export const createMessage = async(db, body)=>{
    try{
        const response = await db().insert(messages).values({
            chatId: `${body.chatId}`,
            senderId: `${body.senderId}`,
            content: `${body.content}`,
            timestamp: new Date()
        });

        return response;

    }catch(error){
        console.log(error);
        return error;
    }
}

//Get Message
export const getMessages = async(db,chatId)=>{
    try{
        const message_result = await db()
            .select()
            .from(messages)
            .where(eq(messages.chatId,chatId));

        return message_result;
    }catch(error){
        return error;
        //res.status( 500).json(error);
    }
}

