import { request } from '../../utils/request'
import {
  API_URL_PROJECT_QUERY
} from '../../constants/apis'

const projectCategoryQuery = async () => {
  const response = await request(API_URL_PROJECT_QUERY)

  return response
}

const setProjectCategory = async (datas) => {
  return datas
}

const projectService = {
  projectCategoryQuery,
  setProjectCategory,
}

export default projectService
