import { request } from '../../utils/request'
import {
  API_URL_PROJECT_LIST_QUERY
} from '../../constants/apis'

const projectQuery = async (params) => {
  const response = await request(API_URL_PROJECT_LIST_QUERY, params, 'POST')

  return response
}

const setProject = async (datas) => {
  return datas
}

const projectService = {
  projectQuery,
  setProject
}

export default projectService
