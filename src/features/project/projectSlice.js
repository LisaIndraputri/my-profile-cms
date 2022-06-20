import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectService from "./projectService";

const initialState = {
  projectCategory: [],
  isSuccess: false,
  isError: false,
  message: ''
}

export const projectCategoryQuery = createAsyncThunk(
  'project/projectCategoryQuery',
  async (thunkAPI) => {
    try {
      return await projectService.projectCategoryQuery()
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const setProjectCategory = createAsyncThunk(
  'project/set',
  async (datas, thunkAPI) => {
    try {
      return await projectService.setProjectCategory(datas)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    reset: (state) => {
      state.projectCategory = []
      state.isSuccess = false
      state.isError = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(projectCategoryQuery.fulfilled, (state, action) => {
      console.log(action, 'a')
      if (action.payload.success) {
        state.isSuccess = true
        state.projectCategory = action.payload.data
      } else {
        state.isError = true
        state.message = action.payload.errorMsg
        state.projectCategory = []
      }
      
    })
    .addCase(projectCategoryQuery.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload.errorMsg
      state.projectCategory = null
    })
    .addCase(setProjectCategory.fulfilled, (state, action) => {
      state.projectCategory = action.payload
    })
  }
})

export const {reset} = projectSlice.actions
export default projectSlice.reducer