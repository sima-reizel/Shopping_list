import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addOrderToDb } from '../../api/orderService';
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
  'fetchAllOrders',
  async () => {
    const response = await fetchAllOrders();
    return response;
  }
);

export const addOrder = createAsyncThunk(
  'addOrder',
  async (order: Order, { rejectWithValue }) => {
    try {
      const response = await addOrderToDb(order);
      return response;
    } catch (error) {
      console.error('Error adding order:', error);
      return rejectWithValue(error);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        const { payload: result } = action;
        state.ordersArr = result;
      })
      .addCase(addOrder.pending, (state) => {
        state.isOrderAdded.status = 'pending';
        console.log('Pending state');
        alert('pending');
      })
      .addCase(addOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.isOrderAdded.status = 'fulfilled';
        const { payload: result } = action;
        console.log('Fulfilled state', result);
        alert(`Order added successfully with total: ${result.total} items`);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.isOrderAdded.status = 'rejected';
        console.log('Rejected state', action.payload);
        alert(`Failed to add order: ${action.payload}`);
      });
  },
});

export default orderSlice.reducer;
