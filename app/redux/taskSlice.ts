import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  title: string;
  date: string;
  priority: string;
  status: 'to-do' | 'done';
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    toggleTaskStatus(state, action: PayloadAction<string>) {
      // Toggle status by id
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.status = task.status === 'done' ? 'to-do' : 'done';
      }
    },
    removeTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    
  },
});

export const { addTask, toggleTaskStatus, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
