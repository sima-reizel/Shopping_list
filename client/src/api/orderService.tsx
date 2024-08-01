import axios from 'axios'
import { Product } from '../components/product/productSlice'

const BASE_URL = 'http://localhost:4000/order'

interface Order {
    items: Product[]
  }

export const fetchAllOrders = async () => {
  const response = await axios.get(`${BASE_URL}/`)
  return response.data
}

export const addOrderToDb = async (order: Order) => {
  const response = await axios.post(`${BASE_URL}/add`, order)
  return response.data
}