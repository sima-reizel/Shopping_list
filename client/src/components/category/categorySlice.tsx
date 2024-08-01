import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchAllCategories } from '../../api/categoryService'

interface Category {
    name: string
}

interface CategoryState {
  categoriesArr: Category[]
}

const initialState: CategoryState = {
    categoriesArr: []
}

export const fetchAllCategory = createAsyncThunk(
    'fetchAllCategory',
     async () => {
      const response = await fetchAllCategories()
      return response
})

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategory.fulfilled, (state, action) => {
                const { payload: result } = action
                state.categoriesArr = result
            })
            .addCase(fetchAllCategory.rejected, (state, action) => {
                alert(action.error.message)
            })
    },
})

export default categorySlice.reducer
