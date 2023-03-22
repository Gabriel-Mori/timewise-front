import { constants } from './constants';
import axios from 'axios'


const http = axios.create({ baseURL: constants.baseAPI })

export default http