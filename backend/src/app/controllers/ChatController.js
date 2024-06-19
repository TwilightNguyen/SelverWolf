
//createChat
//findUserChats
//findChat

import { and, like } from 'drizzle-orm';
import { chats } from '../../config/db/schema/chat'; 

export const createChat = async(db,body)=>{
    try{
        const chatGroup = 
        await db()
        .select()
        .from(chats)
        .where(
            and( 
                like(chats.members,`%,${body.firstId},%`),
                like(chats.members,`%,${body.secondId},%`)
        ));
        
        if(!!Object.keys(chatGroup).length) {
            console.log(chatGroup);
            return chatGroup;
        }

        const response = await db().insert(chats).values({
            members:`,${body.firstId},${body.secondId},`
        });

        return response;

    }catch(error){
        console.log(error);
        return error;
    }
}


export const findUserChats = async(db,userId)=>{
    try{
        const chatGroup = await db()
        .select()
        .from(chats)
        .where(like(chats.members,`%,${userId},%`));
        return chatGroup;
    }catch(error){
        return error;
        //res.status( 500).json(error);
    }
}

export const findChat = async(db,firstId,secondId)=>{
    try{
        const chatGroup = await db()
        .select()
        .from(chats)
        .where(
            and( 
                like(chats.members,`%,${firstId},%`),
                like(chats.members,`%,${secondId},%`)
        ));
        return chatGroup;
    }catch(error){
        return error;
        //res.status( 500).json(error);
    }
}
