const url = import.meta.env.VITE_API_URL;
import axiosInstance from "../lib/axiosInstance";
import { AppError } from "../lib/errors.ts/AppError";
export async function getUserTaskStr() {
  try {
    const res = await axiosInstance.get(`${url}/userStr/userTaskStr`);
    return res.data;
  } catch (error) {
    if (error.response) {
      const { code, message } = error.response.data;
      throw new AppError(message, code);
    } else {
      throw new AppError("SERVER_ERROR", "Internal Server Error");
    }
  }
}

export async function addtag(tag) {
  try {
    const res = await axiosInstance.post(`${url}/userStr/addTag`, { tag });
    return res.data;
  } catch (error) {
    if (error.response) {
      const { code, message } = error.response.data;
      throw new AppError(message, code);
    } else {
      throw new AppError("SERVER_ERROR", "Internal Server Error");
    }
  }
}
export async function getUserTags() {
  try {
    const res = await axiosInstance.get(`${url}/userStr/userTags`); 
    return res.data.tags;
  } catch (error) {
    if (error.response) {
      const { code, message } = error.response.data;
      throw new AppError(message, code);
    } else {
      throw new AppError("SERVER_ERROR", "Internal Server Error");
    }
  }
}
export async function getTagTask(tag) {
  try {
    const res = await axiosInstance.get(`${url}/userStr/tag/${tag}`);
    if (res.status !== 200) {
      return false;
    }
    return res.data;
  } catch (error) {
    console.error(
      "Error getting tagged tasks:",
      error.response?.data || error.message,
    );
    return false;
  }
}

export async function getListTask(list) {
  try {
    const res = await axiosInstance.get(`${url}/userStr/list/${list}`);
    if (res.status !== 200) {
      return false;
    }
    return res.data;
  } catch (error) {
    console.error(
      "Error getting tagged tasks:",
      error.response?.data || error.message,
    );
    return false;
  }
}
