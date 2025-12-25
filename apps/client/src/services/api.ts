import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'http://localhost:3000/api/v1';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      // Add auth token if available
      // const token = (getState() as RootState).auth.token;
      // if (token) {
      //   headers.set('authorization', `Bearer ${token}`);
      // }
      return headers;
    },
  }),
  tagTypes: ['Rides', 'Deliveries', 'User', 'Wallet'],
  endpoints: (builder) => ({
    // Auth
    sendOtp: builder.mutation({
      query: (phone) => ({
        url: '/auth/send-otp',
        method: 'POST',
        body: { phone },
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body: data,
      }),
    }),
    // Rides
    createRide: builder.mutation({
      query: (rideData) => ({
        url: '/rides',
        method: 'POST',
        body: rideData,
      }),
      invalidatesTags: ['Rides'],
    }),
    getRides: builder.query({
      query: (clientId) => `/rides/client/${clientId}`,
      providesTags: ['Rides'],
    }),
    // Deliveries
    createDelivery: builder.mutation({
      query: (deliveryData) => ({
        url: '/deliveries',
        method: 'POST',
        body: deliveryData,
      }),
      invalidatesTags: ['Deliveries'],
    }),
    // User
    getUser: builder.query({
      query: (userId) => `/users/${userId}`,
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ userId, ...data }) => ({
        url: `/users/${userId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    // Wallet
    getWallet: builder.query({
      query: (userId) => `/wallet/${userId}`,
      providesTags: ['Wallet'],
    }),
    getTransactions: builder.query({
      query: (userId) => `/wallet/${userId}/transactions`,
      providesTags: ['Wallet'],
    }),
  }),
});

export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useCreateRideMutation,
  useGetRidesQuery,
  useCreateDeliveryMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useGetWalletQuery,
  useGetTransactionsQuery,
} = apiSlice;
