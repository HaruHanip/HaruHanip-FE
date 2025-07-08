import axios from '../lib/axios'

export async function fetchCategories() {
  const res = await axios.get('/api/v1/category')
  return res.data
}