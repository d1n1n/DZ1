import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";

type Task = {
  id: number;
  title: string;
  date: Date;
  priority: "low" | "medium" | "high";
  status: "to-do" | "done";
};

type FormData = {
  title: string;
  date: Date;
  priority: "low" | "medium" | "high";
};

export default function ListScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskId, setTaskId] = useState(1);

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      title: "",
      date: new Date(),
      priority: "medium",
    },
  });

  const onSubmit = (data: FormData) => {
    const newTask: Task = {
      id: taskId,
      title: data.title,
      date: data.date,
      priority: data.priority,
      status: "to-do",
    };
    setTasks([...tasks, newTask]);
    setTaskId((id) => id + 1);
    reset();
  };

  const toggleTaskStatus = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "to-do" ? "done" : "to-do" }
          : task
      )
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>📝 To-Do List</Text>

        {/* Form */}
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
                onChange={(e, selectedDate) => {
                  if (selectedDate) onChange(selectedDate);
                }}
                mode="date"
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

        {/* List */}
        <View style={{ paddingBottom: 100 }}>
          {tasks.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.taskCard,
                item.status === "done" && { backgroundColor: "#d0f0c0" },
              ]}
              onPress={() => toggleTaskStatus(item.id)}
            >
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text>{item.date.toDateString()}</Text>
              <Text>Priority: {item.priority}</Text>
              <Text>Status: {item.status}</Text>
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
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  form: {
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 12,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 4,
    borderRadius: 6,
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    marginTop: 4,
    borderRadius: 6,
    overflow: "hidden",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    marginTop: 16,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  taskCard: {
    backgroundColor: "white",
    marginTop: 10,
    padding: 12,
    borderRadius: 6,
    elevation: 1,
  },
  taskTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
