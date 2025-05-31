import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const tasksTable = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  date: text('date').notNull(),  // store as ISO string
  priority: text('priority').notNull(),
  status: text('status').notNull().default('to-do'),
});

export type Task = typeof tasksTable.$inferSelect;
