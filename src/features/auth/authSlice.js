import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const login = createAsyncThunk(
  'auth/login',
  async (user, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (user, thunkAPI) => {
    console.log('lg')
    await authService.logout()
  }
)


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => {
      state.isLoading = true
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      if (action.payload.success) {
        state.isSuccess = true
        state.user = action.payload
      } else {
        state.isError = true
        state.message = action.payload.errorMsg
        state.user = null
      }
      
    })
    .addCase(login.rejected, (state, action) => {
      console.log('a')
      state.isLoading = false
      state.isError = true
      state.message = action.payload.errorMsg
      state.user = null
    })
    .addCase(logout.fulfilled, (state, action) => {
      state.user = null
      
    })
  }
})

export const {reset} = authSlice.actions
export default authSlice.reducer