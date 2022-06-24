import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import projectReducer from '../features/project/projectSlice'
import projectListReducer from '../features/projectList/projectListSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    projectList: projectListReducer,
  },
});
