// apiService.ts
import axios from 'axios';
import { API, BASE_URL } from './config';

// 创建 axios 实例，统一配置 baseURL、超时等参数
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export const fetchServerInfo = async () => {
  const response = await axiosInstance.get(API.get_server_info);
  return response.data;
};

export const fetchServerLoad = async () => {
  const response = await axiosInstance.get(API.get_server_load);
  return response.data;
};

/**
 * 将后端返回的对象转换为 Map<string, number> 格式
 * 如果 key 不存在或转换失败，则默认值为 0
 * 并且对有效数值保留两位小数
 *
 * @param input 后端返回的 Map 对象
 * @returns Map<string, number>
 */
export const transformServerLoad = (input: Map<string, string>): Map<string, number> => {
  // 后端返回数据中预期的 key 列表
  const requiredKeys = ['cpu', 'mem', 'disk-total', 'disk-free', 'net-w', 'net-r'];
  const result = new Map<string, number>();

  for (const key of requiredKeys) {
    // 获取对应的值，若不存在则赋值为 "0"
    const valueStr = input.get(key) ?? '0';
    // 尝试解析为浮点数
    const num = parseFloat(valueStr);
    // 如果解析失败（NaN），则赋值为 0
    const validNum = isNaN(num) ? 0 : num;
    // 保留两位小数
    const rounded = parseFloat(validNum.toFixed(2));
    result.set(key, rounded);
  }
  return result;
};

// 定义函数重载
export function transformBytes(bytesStr: string): [number, string];
export function transformBytes(bytesNum: number): [number, string];

// 实现函数
export function transformBytes(input: string | number): [number, string] {
  // 如果是字符串，先尝试转换为数值
  const bytes = typeof input === 'string' ? parseFloat(input) : input;

  // 非法输入或负数处理
  if (isNaN(bytes) || bytes < 0) {
    return [0, 'B'];
  }

  // 单位数组
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let index = 0;
  let value = bytes;

  // 进行单位换算
  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index++;
  }

  // 返回保留两位小数的转换结果
  return [parseFloat(value.toFixed(2)), units[index]];
}
