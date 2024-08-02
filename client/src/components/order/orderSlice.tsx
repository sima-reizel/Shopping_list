import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addOrderToDb, fetchAllOrder } from '../../api/orderService';
import { Product } from '../product/productSlice';

interface Order {
  items: Product[];
  total?: number;
}

interface OrderState {
  isOrderAdded: {
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  };
  ordersArr: Order[];
}

const initialState: OrderState = {
  isOrderAdded: {
    status: 'idle'
  },
  ordersArr: []
};

export const fetchAllOrders = createAsyncThunk(
  'order/fetchAllOrders',
  async () => {
      const response = await fetchAllOrder();
      return response;
  }
);

export const addOrder = createAsyncThunk(
  'order/addOrder',
  async (order: Order) => {
      const response = await addOrderToDb(order);
      return response;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.ordersArr = action.payload;
      })
      .addCase(addOrder.pending, (state) => {
        state.isOrderAdded.status = 'pending';
      })
      .addCase(addOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.isOrderAdded.status = 'fulfilled';
        const { total } = action.payload;
        alert(`Order added successfully with ${total ?? 0} items`);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.isOrderAdded.status = 'rejected';
        alert(`Failed to add order: ${action.error.message}`);
      });
  },
});

export default orderSlice.reducer;
