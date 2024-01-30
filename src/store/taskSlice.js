import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  task: [],
  search: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.task.push(action.payload);
    },

    deleteTask: (state, action) => {
      state.task = state.task.filter((task) => task.id !== action.payload);
    },
    completeTask: (state, action) => {
      const index = state.task.findIndex((task) => task.id === action.payload);
      state.task[index].isComplete = !state.task[index].isComplete;
    },
    completeallTask: (state) => {
      for (let i = 0; i < state.task.length; i++) {
        state.task[i].isComplete = true;
      }
    },
    updateTask: (state, action) => {
      const index = state.task.findIndex(
        (task) => task.id === action.payload[0]
      );
      state.task[index].isEdit = !state.task[index].isEdit;
      state.task[index].task.inputValue = action.payload[1];
    },
    searchTask: (state, action) => {
      state.search = state.task.filter((task) =>
        task.task.inputValue
          .toLowerCase()
          .includes(action.payload.toLowerCase())
      );
      if (action.payload.length === 0) {
        state.search = [];
      }
    },
  },
});

export const {
  addTask,
  deleteTask,
  completeTask,
  completeallTask,
  updateTask,
  searchTask,
} = taskSlice.actions;

export default taskSlice.reducer;
