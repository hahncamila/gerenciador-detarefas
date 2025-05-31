import axios from "axios";

const API_URL = "http://localhost:8080";

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    username,
    password,
  });

  const token = response.data.token;

  if (token) {
    localStorage.setItem("token", token);
  }

  return response.data;
};

export const register = async (username: string, password: string, roles?: string[]) => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    username,
    password,
    roles,
  });
  return response.data;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const apiWithAuth = () => {
  const token = getToken();
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
