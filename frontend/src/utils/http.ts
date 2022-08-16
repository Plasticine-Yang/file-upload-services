import axios from 'axios'
import { PREFIX } from '~/constants'

export const request = axios.create({
  baseURL: PREFIX,
  timeout: 10000,
})
