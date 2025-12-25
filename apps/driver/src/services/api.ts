import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'http://localhost:3000/api/v1';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ['Orders', 'Earnings', 'Statistics'],
  endpoints: (builder) => ({
    // Orders
    getAvailableOrders: builder.query({
      query: (type) => `/rides/available?taxiType=${type}`,
      providesTags: ['Orders'],
    }),
    acceptOrder: builder.mutation({
      query: ({ orderId, driverId }) => ({
        url: `/rides/${orderId}/accept`,
        method: 'PATCH',
        body: { driverId },
      }),
      invalidatesTags: ['Orders'],
    }),
    startOrder: builder.mutation({
      query: (orderId) => ({
        url: `/rides/${orderId}/start`,
        method: 'PATCH',
      }),
    }),
    completeOrder: builder.mutation({
      query: (orderId) => ({
        url: `/rides/${orderId}/complete`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Orders', 'Earnings'],
    }),
    // Statistics
    getDriverStats: builder.query({
      query: (driverId) => `/statistics/driver/${driverId}`,
      providesTags: ['Statistics'],
    }),
  }),
});

export const {
  useGetAvailableOrdersQuery,
  useAcceptOrderMutation,
  useStartOrderMutation,
  useCompleteOrderMutation,
  useGetDriverStatsQuery,
} = apiSlice;
