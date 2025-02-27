// apiService.ts
import axios from 'axios';
import { BASE_URL, API } from './config';

// 创建 axios 实例，统一配置 baseURL、超时等参数
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export const fetchServerInfo = async () => {
  const response = await axiosInstance.get(API.get_server_info)
  return response.data
}
