import axios from "axios"

const API_URL_PROJECT_QUERY = `${process.env.REACT_APP_BASE_URL}/api/project-category/query`

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const projectCategoryQuery = async () => {
  const response = await axios.get(API_URL_PROJECT_QUERY, {
    headers: {
      'Authorization': `Bearer ${user && user.token}`,
      'Content-Type': 'application/json',
    }
  })

  console.log(response)

  return response.data
}

const setProjectCategory = async (datas) => {
  return datas
}

const projectService = {
  projectCategoryQuery,
  setProjectCategory,
}

export default projectService
