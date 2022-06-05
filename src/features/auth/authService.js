import axios from "axios"

const API_URL_LOGIN = 'http://localhost:5000/api/users/login'

const login = async (userData) => {
  const response = await axios.post(API_URL_LOGIN, userData)

  console.log(response)

  if(response.data && response.data.success) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const authService = {
  login,
}

export default authService
