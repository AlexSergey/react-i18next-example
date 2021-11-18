import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTask(state, action) {
      const lastTaskId = state.tasks[state.tasks.length - 1]?.id || 0
      state.tasks.push({
        id: lastTaskId + 1, name: action.payload, completed: false,
        date: new Date()
      })
    },
    toggleStatus(state, action) {
      state.tasks = state.tasks.map(item => {
        if (item.id === action.payload) {
          item.completed = true;
        }
        return item;
      });
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter(item => item.id !== action.payload);
    }
  }
})

export const { addTask, removeTask, toggleStatus } = todoSlice.actions

export default todoSlice.reducer
