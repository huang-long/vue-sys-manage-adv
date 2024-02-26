import axios from "axios";
import { message } from "ant-design-vue";

// 创建 axios 实例
const service = axios.create({
  baseURL: "/sys-api", // api base_url
  timeout: 20000, // 请求超时时间
});

const err = (error: { response: { status: number }; message: string }) => {
  if (error.response) {
    switch (error?.response?.status) {
      case 403:
        message.error("403");
        break;
      case 500:
        message.error("403");
        break;
      case 404:
        message.error("404");
        break;
      case 504:
        message.error("504");
        break;
      case 401:
        message.error("401");
        break;
      default:
        message.error("系统错误");
        break;
    }
  } else if (error?.message) {
    message.error(error.message);
  }
  return Promise.reject(error);
};

// request interceptor
service.interceptors.request.use(
  (config) => {
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use((response) => {
  return response.data;
}, err);

export { service as axios };
