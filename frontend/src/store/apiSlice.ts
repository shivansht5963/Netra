import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './index';
import { 
  DetectionResult, 
  AuthTokens, 
  LoginCredentials, 
  SignupCredentials, 
  StatsResponse 
} from '../types';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'https://netra-lmrc.onrender.com/api',
  prepareHeaders: (headers, { getState }) => {
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
  credentials: 'omit', // Changed from 'include' to 'omit' since we don't need credentials
  mode: 'cors',
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Stats'],
  endpoints: (builder) => ({
    detectPhishing: builder.mutation<DetectionResult, { url: string }>({
      query: (data) => ({
        url: '/detect/',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation<AuthTokens, LoginCredentials>({
      query: (credentials) => ({
        url: '/auth/token/',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation<void, SignupCredentials>({
      query: (userData) => ({
        url: '/signup/',
        method: 'POST',
        body: userData,
      }),
    }),
    reportUrl: builder.mutation<{ msg: string }, { url: string }>({
      query: (data) => ({
        url: '/report/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Stats'],
    }),
    getStats: builder.query<StatsResponse, { page?: number; page_size?: number }>({
      query: (params) => ({
        url: '/stats/',
        params,
      }),
      providesTags: ['Stats'],
    }),
  }),
});

export const {
  useDetectPhishingMutation,
  useLoginMutation,
  useSignupMutation,
  useReportUrlMutation,
  useGetStatsQuery,
} = apiSlice;