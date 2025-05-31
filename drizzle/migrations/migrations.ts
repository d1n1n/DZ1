const migrations: Record<string, string> = {
  '0000_init': `
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      priority TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'to-do'
    );
  `,
};
export default migrations;
