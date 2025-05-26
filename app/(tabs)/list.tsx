import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const api = "https://dummyjson.com/todos";

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

const TodoItem = ({ item, onPress }: { item: Todo; onPress: (item: Todo) => void }) => (
  <TouchableOpacity style={styles.item} onPress={() => onPress(item)}>
    <Text style={[styles.text, item.completed && styles.completed]}>
      {item.todo}
    </Text>
  </TouchableOpacity>
);

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(api);
      const data = await response.json();
      setTodos(data.todos); 
    } catch (error) {
      Alert.alert("Error", "Failed to load todos.");
    } finally {
      setLoading(false);
    }
  };

  const handlePress = (item: Todo) => {
    Alert.alert("Todo", item.todo);
  };

 return (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <>
          <Text style={styles.header}>TODO List</Text>
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <TodoItem item={item} onPress={handlePress} />}
          />
        </>
      )}
    </SafeAreaView>
  </SafeAreaProvider>
);

}

const styles = StyleSheet.create({
  header: {
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 16,
  marginTop: 8,
  color: '#333',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f4f4f4',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
});
