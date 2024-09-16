

import { int, mysqlTable } from 'drizzle-orm/mysql-core'; 
import { timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';

// * chat Table
export const chats = mysqlTable('w_groups', {  
  id: int('group_id'),
  members: varchar('group_members',{length: 100}),
  type: int('group_type'),
  name: int('group_name'),
  message: varchar('group_message',{length: 100}),
  createAt: timestamp('group_create_at'),
  status: int('group_status')
});

export const selectChatSchema = createSelectSchema(chats);
export const insertChatSchema = createInsertSchema(chats);

