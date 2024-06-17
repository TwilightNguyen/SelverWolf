

import { mysqlTable } from 'drizzle-orm/mysql-core'; 
import { varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';

// * chat Table
export const chats = mysqlTable('w_groupchat', {  
  members: varchar('chat_members',{length: 100})
});

export const selectChatSchema = createSelectSchema(chats);
export const insertChatSchema = createInsertSchema(chats);

