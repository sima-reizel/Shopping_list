import axios from 'axios'

const BASE_URL = 'http://localhost:4000/category'

export const fetchAllCategories = async () => {
  const response = await axios.get(`${BASE_URL}/`)
  return response.data
}
