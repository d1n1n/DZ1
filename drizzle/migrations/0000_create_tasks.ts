import { sql } from 'drizzle-orm';

export default {
  up: (db: any) => {
    return db.execute(sql`
      CREATE TABLE tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        done BOOLEAN NOT NULL DEFAULT 0
      )
    `);
  },
  down: (db: any) => {
    return db.execute(sql`DROP TABLE tasks`);
  },
};
