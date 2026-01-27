import { useState } from "react";
import ShowError from "./ShowError";
import { addNewCard } from "../services/expensesService";
export default function ExpensesPopup({ setIsAddCard, fetchExpenses }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const addExpenseTitle = async () => {
    if (title == "") {
      setError("Empty input");
      return;
    }

    try {
      const res = await addNewCard(title);
      fetchExpenses();
    } catch (error) {
      if (error.isAppError) {
        setError(error.message);
      } else {
        setError("error while adding card");
      }
    } finally {
      setTitle("");
    }
  };

  return (
    <div className="expense-AddTitlePOPUP">
      <h4>Card title</h4>
      {error && <ShowError error={error} closeErrorPopUp={setError} />}
      <input
        className="expenses-PopUpInput"
        value={title}
        placeholder="Enter title"
        onChange={(e) => setTitle(e.target.value)}
        type="text"
      />

      <div>
        <button className="baseBtnClass" onClick={() => addExpenseTitle()}>
          {" "}
          save
        </button>
        <button className="baseBtnClass" onClick={() => setIsAddCard(false)}>
          close
        </button>
      </div>
    </div>
  );
}
