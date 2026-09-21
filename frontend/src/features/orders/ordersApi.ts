import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Order } from '../../types/order'

interface CreateOrderRequest {
  product: string
  quantity: number
}

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
  }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => '/orders',
      providesTags: ['Orders'],
    }),

    createOrder: builder.mutation<Order, CreateOrderRequest>({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
})

export const { useGetOrdersQuery, useCreateOrderMutation } = ordersApi