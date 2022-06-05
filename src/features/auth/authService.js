import axios from "axios"

const API_URL_LOGIN = `${process.env.REACT_APP_BASE_URL}/api/users/login`

const login = async (userData) => {
  const response = await axios.post(API_URL_LOGIN, userData)

  console.log(response)

  if(response.data && response.data.success) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const logout = () => localStorage.removeItem('user')

const authService = {
  login,
  logout
}

export default authService
