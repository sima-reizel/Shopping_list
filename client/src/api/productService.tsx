import axios from 'axios'

const BASE_URL = 'http://localhost:4000/product'

interface Product {
    name: string
    category: string
  }

export const fetchAllProducts = async () => {
  const response = await axios.get(`${BASE_URL}/`)
  return response.data
}

export const addProductToDb = async (product: Product) => {
  const response = await axios.post(`${BASE_URL}/add`, product)
  return response.data
}