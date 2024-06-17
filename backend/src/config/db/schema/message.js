

import { mysqlTable } from 'drizzle-orm/mysql-core'; 
import { timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';

// * message Table
export const messages = mysqlTable('w_message', {  
  chatId: varchar('chat_id',{length: 100}),
  senderId: varchar('user_url', {length: 100}),
  text: varchar('user_pass', {length: 100}),
},{
    timestamps:true,
});

export const selectMessageSchema = createSelectSchema(messages);
export const insertMessageSchema = createInsertSchema(messages);

