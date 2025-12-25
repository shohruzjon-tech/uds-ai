import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'http://localhost:3000/api/v1';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ['Users', 'Rides', 'Deliveries', 'Statistics', 'Config'],
  endpoints: (builder) => ({
    // Users
    getUsers: builder.query({
      query: (role) => role ? `/users?role=${role}` : '/users',
      providesTags: ['Users'],
    }),
    // Rides
    getRides: builder.query({
      query: (status) => status ? `/rides?status=${status}` : '/rides',
      providesTags: ['Rides'],
    }),
    // Deliveries
    getDeliveries: builder.query({
      query: () => '/deliveries',
      providesTags: ['Deliveries'],
    }),
    // Statistics
    getDashboardStats: builder.query({
      query: () => '/statistics/dashboard',
      providesTags: ['Statistics'],
    }),
    // Configuration
    getConfig: builder.query({
      query: (key) => `/config?key=${key}`,
      providesTags: ['Config'],
    }),
    setConfig: builder.mutation({
      query: (data) => ({
        url: '/config',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Config'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetRidesQuery,
  useGetDeliveriesQuery,
  useGetDashboardStatsQuery,
  useGetConfigQuery,
  useSetConfigMutation,
} = apiSlice;
