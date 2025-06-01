import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

export default function TabLayout() {
  // Get count of tasks where status is 'to-do'
  const unfinishedCount = useSelector((state: RootState) =>
    state.tasks.tasks.filter(t => t.status === 'to-do').length
  );

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: 'List',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="list" color={color} />,
          tabBarBadge: unfinishedCount > 0 ? unfinishedCount : undefined,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
      <Tabs.Screen
        name="temperament"
        options={{
          title: 'Temperament',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="question" color={color} />,
        }}
      />
    </Tabs>
  );
}
