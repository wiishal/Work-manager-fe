const url = import.meta.env.VITE_API_URL;
import { AppError } from "../lib/errors.ts/AppError";
import axiosInstance from "../lib/axiosInstance";

export async function login(userDetails) {
  console.log("userDetails", userDetails);
  try {
    const response = await axiosInstance.post(`${url}/auth/login`, userDetails);
    return response.data;
  } catch (error) {
    if (error.response) {
      const { code, message } = error.response.data;
      throw new AppError(code, message);
    } else {
      throw new AppError("SERVER_ERROR", "Internal Server Error");
    }
  }
}
export async function signUp(userDetails) {
  try {
    const response = await axiosInstance.post(
      `${url}/auth/signup`,
      userDetails,
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const { code, message } = error.response.data;
      throw new AppError(code, message);
    } else {
      throw new AppError("SERVER_ERROR", "Internal Server Error");
    }
  }
}
export async function validateViaToken(userToken) {
  try {
    const response = await axiosInstance.post(`${url}/auth/validate`, {
      token: userToken,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      const { code, message } = error.response.data;
      throw new AppError(code, message);
    } else {
      throw new AppError("SERVER_ERROR", "Internal Server Error");
    }
  }
}
