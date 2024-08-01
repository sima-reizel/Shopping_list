import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchAllProducts, addProductToDb } from '../../api/productService'

export interface Product {
  name: string
  category: string
  cnt?: number
}

export interface ProductState {
  isProdAdded: Product & {
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
  }
  prodArr: Product[]
}

const initialState: ProductState = {
    isProdAdded: {
        name: '',
        status: 'idle',
        category: ''
      },
      prodArr: []
}

export const fetchAllProd = createAsyncThunk(
    'fetchAllProd',
     async () => {
      const response = await fetchAllProducts()
      return response
})

export const addProd = createAsyncThunk(
   'addProd',
    async (product: Product) => {
      const response = await addProductToDb(product)
      return response
    }
)

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProd.fulfilled, (state, action: PayloadAction<Product[]>) => {
        const { payload: result } = action
        state.prodArr = result
      })
      .addCase(addProd.pending, (state) => {
        state.isProdAdded.status = 'pending'
      })
      .addCase(addProd.fulfilled, (state, action: PayloadAction<Product>) => {
        state.isProdAdded.name = action.payload.name
        state.isProdAdded.status = 'fulfilled'
        alert(`${state.isProdAdded.name}:  added successfully`)
      })
      .addCase(addProd.rejected, (state) => {
        state.isProdAdded.status = 'rejected'
        alert(state.isProdAdded.status)
      })
  },
})

export default productSlice.reducer
