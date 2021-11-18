import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';

const rootReducer = combineReducers({
  todo: todoReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: false,
      thunk: {
        extraArgument: {}
      },
    })
  )
});
