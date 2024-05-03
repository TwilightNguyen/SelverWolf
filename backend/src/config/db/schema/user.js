

import { datetime, int, mysqlTable } from 'drizzle-orm/mysql-core'; 
import { varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';

// * Users Table
export const users = mysqlTable('w_users', {  
  email: varchar('user_email',{length: 100})
  ,url: varchar('user_url', {length: 100})
  ,password: varchar('user_pass', {length: 100})
  ,username: varchar('user_name', {length: 100})
  ,gender: varchar('user_gender', {length: 20})
  ,birthday: datetime('user_birthday') 
});

//export type User = typeof users.$inferSelect;
//export type InsertUsers = typeof users.$inferInsert;

export const selectUserSchema = createSelectSchema(users);
export const insertUserSchema = createInsertSchema(users);

