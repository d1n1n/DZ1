import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store'; // adjust path accordingly
import { Stack } from 'expo-router/stack';
import { SQLiteProvider } from 'expo-sqlite';

export default function Layout() {
  return (
    <Provider store={store}>
      <SQLiteProvider databaseName="tasks_db" options={{ enableChangeListener: true }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SQLiteProvider>
    </Provider>
  );
}
