import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectService from "./projectListService";

const initialState = {
  projectList: [],
  isSuccess: false,
  isError: false,
  message: ''
}

export const projectQuery = createAsyncThunk(
  'projectList/projectQuery',
  async (thunkAPI) => {
    try {
      return await projectService.projectQuery()
    } catch (error) {
      const message = error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const setProject = createAsyncThunk(
  'projectList/set',
  async (datas, thunkAPI) => {
    try {
      return await projectService.setProject(datas)
    } catch (error) {
      const message = error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const projectListSlice = createSlice({
  name: 'projectList',
  initialState,
  reducers: {
    reset: (state) => {
      state.projectList = []
      state.isSuccess = false
      state.isError = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(projectQuery.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.isSuccess = true
        state.projectList = action.payload.data
      } else {
        state.isError = true
        state.message = action.payload && action.payload.errorMsg
        state.projectList = []
      }
      
    })
    .addCase(projectQuery.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload && action.payload.errorMsg
      state.projectList = null
    })
    .addCase(setProject.fulfilled, (state, action) => {
      state.projectList = action.payload
    })
  }
})

export const {reset} = projectListSlice.actions
export default projectListSlice.reducer