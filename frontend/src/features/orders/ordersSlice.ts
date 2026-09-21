import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Order } from '../../types/order'

interface OrdersState {
  items: Order[]
}

const initialState: OrdersState = {
  items: [],
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.items.push(action.payload);
    },
  },
})

export const { addOrder } = ordersSlice.actions
export default ordersSlice.reducer