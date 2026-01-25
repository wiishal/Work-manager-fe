import axiosInstance from "../lib/axiosInstance";
const url = import.meta.env.VITE_API_URL;
import { AppError } from "../lib/errors.ts/AppError";

export async function getSubTasks(taskId) {
  try {
    const res = await axiosInstance.post(`${url}/subtask`, { taskId });
    return res.data;
  } catch (error) {
    if (error.response) {
      const { code, message } = error.response.data;
      throw new AppError(code, message);
    } else {
      throw new AppError("SERVER_ERROR", "Internal Server Error");
    }
  }
}
export async function addSubTask(detail, taskId) {
  try {
    const res = await axiosInstance.post(`${url}/subtask/addSubTask`, {
      subTask: { detail, taskId },
    });

    return res.data;
  } catch (error) {
    if (error.response) {
      const { code, message } = error.response.data;
      throw new AppError(code, message);
    } else {
      throw new AppError("SERVER_ERROR", "Internal Server Error");
    }
  }
}

export async function deleteSubTask(id) {
  try {
    const res = await axiosInstance.delete(
      `${url}/subtask/deleteSubTask/${id}`,
    );

    return res.data;
  } catch (error) {
    if (error.response) {
      const { code, message } = error.response.data;
      throw new AppError(code, message);
    } else {
      throw new AppError("SERVER_ERROR", "Internal Server Error");
    }
  }
}
export async function toggleSubtask(id) {
  try {
    const res = await axiosInstance.post(`${url}/subtask/toggleSubtask`, {
      id,
    });

    return res.data;
  } catch (error) {
    if (error.response) {
      const { code, message } = error.response.data;
      throw new AppError(code, message);
    } else {
      throw new AppError("SERVER_ERROR", "Internal Server Error");
    }
  }
}
export async function subTaskAssistance(taskDetails) {
  try {
    const res = await axiosInstance.post(`${url}/subtask/assistance`, {
      taskDetails,
    });
    return res.data.subtasks;
  } catch (error) {
    if (error.response) {
      const { code, message } = error.response.data;
      throw new AppError(code, message);
    } else {
      throw new AppError("SERVER_ERROR", "Internal Server Error");
    }
  }
}
