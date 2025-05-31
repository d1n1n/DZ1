import React, { useEffect } from 'react';
import { Stack } from 'expo-router/stack';
import { SQLiteProvider, openDatabaseSync } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import migrations from '../drizzle/migrations';
import { migrate } from 'drizzle-orm/expo-sqlite/migrator';

export default function Layout() {
  const DATABASE_NAME = 'tasks_db';

  const expoDb = openDatabaseSync(DATABASE_NAME);

  const db = drizzle(expoDb);

  useEffect(() => {
    async function runMigrations() {
      await migrate(db, { migrations });
    }
    runMigrations();
  }, []);

  return (
    <SQLiteProvider databaseName={DATABASE_NAME} options={{ enableChangeListener: true }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider>
  );
}
