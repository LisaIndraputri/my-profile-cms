import {
  request
} from '../../utils/request'

import {
  API_URL_LOGIN
} from '../../constants/apis'

const login = async (userData) => {
  const response = await request(API_URL_LOGIN, userData, 'POST')

  if(response.success) {
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
