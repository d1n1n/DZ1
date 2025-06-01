import React, { useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addTask, deleteTask, toggleTaskStatus, fetchTasks } from '../redux/';

import type { Task } from '../../db/schema';

type FormData = {
  title: string;
  date: Date;
  priority: 'low' | 'medium' | 'high';
};

export default function ListScreen() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      title: '',
      date: new Date(),
      priority: 'medium',
    },
  });

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const onSubmit = (data: FormData) => {
    dispatch(
      addTask({
        title: data.title,
        date: data.date.toISOString(),
        priority: data.priority,
      })
    );
    reset();
  };

  const onToggleStatus = (task: Task) => {
    if (task.status === 'done') {
      dispatch(deleteTask(task.id));
    } else {
      dispatch(toggleTaskStatus({ id: task.id, status: task.status }));
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>📝 To-Do List</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Title</Text>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter task title"
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Text style={styles.label}>Date</Text>
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <DateTimePicker
                value={value}
                mode="date"
                onChange={(e, selectedDate) => {
                  if (selectedDate) onChange(selectedDate);
                }}
              />
            )}
          />

          <Text style={styles.label}>Priority</Text>
          <View style={styles.pickerWrapper}>
            <Controller
              control={control}
              name="priority"
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={{ height: 40 }}
                >
                  <Picker.Item label="Low" value="low" />
                  <Picker.Item label="Medium" value="medium" />
                  <Picker.Item label="High" value="high" />
                </Picker>
              )}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingBottom: 100 }}>
          {tasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={[
                styles.taskCard,
                task.status === 'done' && { backgroundColor: '#d0f0c0' },
              ]}
              onPress={() => onToggleStatus(task)}
            >
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text>{new Date(task.date).toDateString()}</Text>
              <Text>Priority: {task.priority}</Text>
              <Text>Status: {task.status}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  form: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 12,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 4,
    borderRadius: 6,
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    marginTop: 4,
    borderRadius: 6,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    marginTop: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  taskCard: {
    backgroundColor: 'white',
    marginTop: 10,
    padding: 12,
    borderRadius: 6,
    elevation: 1,
  },
  taskTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
