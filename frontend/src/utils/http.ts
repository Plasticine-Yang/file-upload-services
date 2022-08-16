import axios from 'axios'
import { BASE_URL, PREFIX } from '~/constants'

export const request = axios.create({
  baseURL: `${BASE_URL}${PREFIX}`,
  timeout: 10000,
})
