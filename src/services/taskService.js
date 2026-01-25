const url = import.meta.env.VITE_API_URL;
import axiosInstance from "../lib/axiosInstance";
import { AppError } from "../lib/errors.ts/AppError";

export async function getAllTasks() {
  
  try {
    const res = await axiosInstance.get(`${url}/task/allTasks`);
    return res.data;
  } catch (error) {
    
    return false;
  }
}

export async function getTask(id) {
  try {
    const res = await axiosInstance.get(`${url}/task/getTask/${id}`);
    
    return res.data.task;
  } catch (error) {
    if(error.response){
      const {code,message} = error.response.data;
      throw new AppError(code,message);
    }else{
      throw new AppError("NETWORK_ERROR","Network error occurred");
    }
  }
}

export async function addTask(task) {
  try {
    const res = await axiosInstance.post(`${url}/task/addTask`, {
      task,
    });
    if (res.status !== 200) {
      return false;
    }
    return res.data;
  } catch (error) {
    console.log("error while adding task", error);
    return false;
  }
}
export async function updateTask(updatedTask) {
  try {
    const res = await axiosInstance.put(`${url}/task/updateTask`, {
      updatedTask,
    });
    if (res.status !== 200) {
      return false;
    }
    return res;
  } catch (error) {
    console.log("error while updating task", error);
    return false;
  }
}
export async function toggleStatus(id) {
  try {
    const res = await axiosInstance.put(`${url}/task/toggleStatus`, {
      id,
    });
    if (res.status !== 200) {
      return false;
    }
    return res;
  } catch (error) {
    console.log("error while updating task", error);
    return false;
  }
}

export async function deleteTask(id) {
  try {
    const res = await axiosInstance.delete(
      `${url}/task/deleteTask/${id}`
    );
    if (res.status !== 200) {
      return false;
    }
    return res.data;
  } catch (error) {
    console.log("error while deleting task", error);
    return false; 
  }
}
