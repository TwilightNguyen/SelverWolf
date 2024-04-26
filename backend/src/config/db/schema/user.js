import { int, mysqlTable } from 'drizzle-orm/mysql-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';

// * Users Table
export const users = mysqlTable('w_users', {
  user_id: int('user_id',Number|null)
});

//export type User = typeof users.$inferSelect;
//export type InsertUsers = typeof users.$inferInsert;

export const selectUserSchema = createSelectSchema(users);
export const insertUserSchema = createInsertSchema(users);
