import http from '@/api/http'
import type { Category } from '@/types/api'

export async function fetchCategories(): Promise<Category[]> {
  const res = await http.get<Category[]>('/api/v1/category')
  return res.data
}
