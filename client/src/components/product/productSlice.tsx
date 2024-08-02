import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllProducts, addProductToDb } from '../../api/productService';

// Define the product interface
export interface Product {
  name: string;
  category: string;
  cnt?: number;
}

// Define the initial state structure
export interface ProductState {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  isProdAdded: Product | null;
  prodArr: Product[];
}

// Define the initial state
const initialState: ProductState = {
  status: 'idle',
  isProdAdded: null,
  prodArr: []
};

// Async thunk for fetching all products
export const fetchAllProd = createAsyncThunk<Product[]>(
  'products/fetchAllProd',
  async () => {
    const response = await fetchAllProducts();
    return response;
  }
);

// Async thunk for adding a product
export const addProd = createAsyncThunk<Product, Product>(
  'products/addProd',
  async (product: Product) => {
    const response = await addProductToDb(product);
    return response;
  }
);

// Create a slice of the state
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProd.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchAllProd.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.prodArr = action.payload;
        state.status = 'fulfilled';
      })
      .addCase(fetchAllProd.rejected, (state, action) => {
        state.status = 'rejected';
        console.error('Error fetching products:', action.error.message);
      })
      .addCase(addProd.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addProd.fulfilled, (state, action: PayloadAction<Product>) => {
        state.isProdAdded = action.payload;
        state.status = 'fulfilled';
        alert(`${action.payload.name}: added successfully`);
      })
      .addCase(addProd.rejected, (state, action) => {
        state.status = 'rejected';
        alert(`Failed to add product: ${action.error.message}`);
      });
  },
});

export default productSlice.reducer;