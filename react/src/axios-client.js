import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

// console.log(import.meta.env.VITE_API_BASE_URL);

axiosClient.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  } catch (error) {
    console.log(error);
  }
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    console.log(error);
    if (response.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN");
    }

    throw error;
  }
);

export default axiosClient;
