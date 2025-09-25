import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, AuthTokens } from '../types';

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  loading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<AuthTokens>) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      state.loading = false;
      
      localStorage.setItem('accessToken', action.payload.access_token);
      localStorage.setItem('refreshToken', action.payload.refresh_token);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.loading = false;
      
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    initializeAuth: (state) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        state.isAuthenticated = true;
        state.accessToken = token;
        state.refreshToken = localStorage.getItem('refreshToken');
      }
    }
  }
});

export const { setLoading, loginSuccess, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;