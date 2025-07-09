import axios from "axios"
import { store } from "@/store"

export const apiService = axios.create({
  baseURL: "https://flexcoa-api-uat-h4cshndgegg6e5dt.eastus-01.azurewebsites.net/api",
  headers: {
    "Content-Type": "application/json",
  },
})

apiService.interceptors.request.use((config) => {
  const token = store.getState().session.session?.accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// apiService.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("API Error:", error?.response?.data || error.message)
//     return Promise.reject(error)
//   },
// )
