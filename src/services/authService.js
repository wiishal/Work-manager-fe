const url = import.meta.env.VITE_API_URL;
import axios from "axios";
console.log(url);
export async function login(userDetails) {
  try {
    const response = await axios.post(`${url}/api/v1/auth/login`, userDetails, {
      withCredentials: true,
    });
    if (response) {
      return response;
    }
  } catch (error) {
    console.log("error during login", error);
    return false;
  }
}
export async function signUp(userDetails) {
  try {
    const response = await axios.post(`${url}/api/v1/auth/signup`, userDetails);
    if (response) {
      return response;
    }
    return false;
  } catch (error) {
    console.log("error during signup", error);
    return false;
  }
}
export async function validateViaToken(userToken) {
  try {
    const response = await axios.post(`${url}/api/v1/auth/validate`, {
      token: userToken,
    });
    if (response) {
      return response;
    }
  } catch (error) {
    console.log("error while validation", error);
    return false;
  }
}
