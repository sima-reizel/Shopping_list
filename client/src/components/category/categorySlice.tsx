import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllCategories } from '../../api/categoryService';

interface Category {
  name: string;
}

interface CategoryState {
  categoriesArr: Category[];
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error?: string;
}

const initialState: CategoryState = {
  categoriesArr: [],
  status: 'idle',
};

export const fetchAllCategory = createAsyncThunk<Category[]>(
  'fetchAllCategory',
  async () => {
    const response = await fetchAllCategories();
    return response;
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategory.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchAllCategory.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.status = 'fulfilled';
        state.categoriesArr = action.payload;
      })
      .addCase(fetchAllCategory.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
