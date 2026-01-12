import axiosInstance from "../lib/axiosInstance";
const url = import.meta.env.VITE_API_URL;

export async function fetchExpensesCards() {
  const res = await axiosInstance.get(`${url}/expenses`);
  return res.data.expensesCards;
}

export async function addNewCard(title) {
  const res = await axiosInstance.post(`${url}/expenses/addCard`, {
    title,
  });
  return res.data;
}

export async function addExpense(spend, expenseCardId) {
  const res = await axiosInstance.post(`${url}/expenses/addExpense`, {
    spend,
    expenseCardId,
  });
  return res.data;
}

export async function calculateSpendAssistance(spends) {
  const res = await axiosInstance.post(`${url}/expenses/calculateSpendAssistance`, {
    spends
  });
  return res.data.aiResponse;
}