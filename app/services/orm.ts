import { drizzle } from 'drizzle-orm/expo-sqlite';
import { eq, asc } from 'drizzle-orm';
import { useSQLiteContext } from 'expo-sqlite';
import * as schema from '../../db/schema';

export function useORM() {
  const db = drizzle(useSQLiteContext(), { schema });

  const getTasks = async () => {
    return await db.select()
      .from(schema.tasksTable)
      .orderBy(asc(schema.tasksTable.id));
  };

  const addTask = async (task: { title: string; date: string; priority: string }) => {
    await db.insert(schema.tasksTable).values({
      title: task.title,
      date: task.date,
      priority: task.priority,
      status: 'to-do',
    });
  };

  const deleteTask = async (id: number) => {
    await db.delete(schema.tasksTable).where(eq(schema.tasksTable.id, id));
  };

  const toggleTaskStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'to-do' ? 'done' : 'to-do';
    await db.update(schema.tasksTable)
      .set({ status: newStatus })
      .where(eq(schema.tasksTable.id, id));
  };

  return { getTasks, addTask, deleteTask, toggleTaskStatus };
}
