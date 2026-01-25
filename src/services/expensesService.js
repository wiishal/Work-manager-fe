import axiosInstance from "../lib/axiosInstance";
import { AppError } from "../lib/errors.ts/AppError";

const url = import.meta.env.VITE_API_URL;

export async function fetchExpensesCards() {
  try {
    const res = await axiosInstance.get(`${url}/expenses`);
    return res.data.expensesCards;
  } catch (error) {
    if (error.response) {
      const { code, message } = error.response.data;
      throw new AppError(code, message);
    } else {
      throw new AppError("SERVER_ERROR", "Internal Server Error");
    }
  }
}

export async function addNewCard(title) {
  try {
    const res = await axiosInstance.post(`${url}/expenses/addCard`, {
      title,
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

export async function addExpense(spend, expenseCardId) {
  try {
    const res = await axiosInstance.post(`${url}/expenses/addExpense`, {
    spend,
    expenseCardId,
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

export async function calculateSpendAssistance(spends) {
  try {
    const res = await axiosInstance.post(
    `${url}/expenses/calculateSpendAssistance`,
    {
      spends,
    },
  );
  return res.data.aiResponse;
  } catch (error) {
    if(error.response){
      const {code,message}=error.response.data;
      throw new AppError(code, message);
    }else{
      throw new AppError("SERVER_ERROR", "Internal Server Error");
    } 
  }
}
