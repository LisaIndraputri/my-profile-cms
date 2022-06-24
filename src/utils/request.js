import axios from 'axios'

const postReq = async (api, params) => {
  const user = JSON.parse(localStorage.getItem('user'))
  return await axios.post(api, params, {
    headers: {
      'Authorization': `Bearer ${user && user.token}`,
      'Content-Type': 'application/json',
    }
  })
}
const getReq = async (api) => {
  const user = JSON.parse(localStorage.getItem('user'))
  return await axios.get(api, {
    headers: {
      'Authorization': `Bearer ${user && user.token}`,
      'Content-Type': 'application/json',
    }
  })
}

export const request = async (api, params, methods) => {
  let response = {}
  if (methods === 'POST') {
    response = await postReq(api, params)
  } else {
    response = await getReq(api)
  }
  if (response.data) {
    return response.data
  }
  return response
}