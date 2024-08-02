import { configureStore } from '@reduxjs/toolkit'
import productSlice from '../components/product/productSlice'
import categorySlice from '../components/category/categorySlice'
import orderSlice from '../components/order/orderSlice'

export const store = configureStore({
  reducer: {
    products: productSlice,
    categories: categorySlice,
    orders: orderSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Export types for the state and dispatch to be used in your components
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch