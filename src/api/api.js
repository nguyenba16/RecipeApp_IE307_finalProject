import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.56.1:5000',
})

export const getUsers = async () => {
  try {
    const response = await api.get('/users')
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

// Search
export const searchDish = async (nameDish) => {
  try {
    const response = await api.get('/search', { params: { nameDish } })
    return response.data
  } catch (err) {
    console.error('Error search: ', err)
    return []
  }
}
