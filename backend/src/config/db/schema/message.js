

import { mysqlTable } from 'drizzle-orm/mysql-core'; 
import { timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';

// * message Table
export const messages = mysqlTable('w_message', { 
  chatId: varchar('chat_id',{length: 100}),
  senderId: varchar('user_id', {length: 100}),
  content: varchar('message_content', {length: 100}),
  timestamp: timestamp('message_timestamp')
});

export const selectMessageSchema = createSelectSchema(messages);
export const insertMessageSchema = createInsertSchema(messages);

