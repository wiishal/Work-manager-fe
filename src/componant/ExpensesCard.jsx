import { useState, useEffect } from "react";
import ShowError from "./ShowError";
import {
  addExpense,
  calculateSpendAssistance,
} from "../services/expensesService";

function ExpensesCard({ item, fetchExpenses }) {
  
  const [spends, setSpends] = useState([]);
  const [spendInput, setSpendInput] = useState("");
  const [totolExpense, setTotalExpense] = useState(null);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState({
    addTaskProcessing: false,
    calculateSpentProcessing: false,
  });

  async function addSpends() {
    const value = spendInput.trim("");
    if (value == "") {
      setError("Empty inputs");
      return;
    }

    try {
      setProcessing((prev) => ({ ...prev, addTaskProcessing: true }));
      setError(null);
      const res = await addExpense(value, item.id);
      fetchExpenses();
    } catch (error) {
      if (error.isAppError) {
        setError(error.message);
      } else {
        setError("Error Adding expenses");
      }
    } finally {
      setProcessing((prev) => ({ ...prev, addTaskProcessing: false }));
      setSpendInput("");
    }
  }

  const calculateExpenseAssistance = async () => {
    try {
      setProcessing((prev) => ({ ...prev, calculateSpentProcessing: true }));
      setError(null);
      const res = await calculateSpendAssistance(spends);
      setTotalExpense(res.result);
      setProcessing((prev) => ({ ...prev, calculateSpentProcessing: false }));
    } catch (error) {
      setError("error while assist");
    } finally {
      setProcessing((prev) => ({ ...prev, calculateSpentProcessing: false }));
    }
  };

  useEffect(() => {
    setSpends(item.expenses);
  }, [item.expenses]);

  const handleKeyEvent = (e) => {
    if (e.key == "Enter") {
      addSpends();
    }
  };

  return (
    <div key={item.id} className="expenses-card">
      <div className="expensesCard-titleDiv">
        <p className="expensesCard-title">{item.createdAt.split("T")[0]}</p>
        <div className="expense-calculateSpendDiv">
          {processing.calculateSpentProcessing && (
            <div className="spinner"></div>
          )}
          <button
            className="expenses-Calculatebtn"
            onClick={calculateExpenseAssistance}
          >
            Calculate
          </button>
        </div>
      </div>

      <div className="expenses-cardContent">
        <div className="expenses-ItemTitleDiv">
          <h4>{item.name}</h4>
        </div>
        {spends &&
          spends.length > 0 &&
          spends.map((item) => <div>{item.details}</div>)}
      </div>
      {error && <ShowError error={error} closeErrorPopUp={setError} />}
      {processing.addTaskProcessing && <div className="spinner" />}
      {totolExpense && (
        <div className="expense-totalexpenseResultDiv">
          Total : {totolExpense}
        </div>
      )}
      <div className="expenses-cardInputs">
        <input
          onKeyDown={handleKeyEvent}
          className="expense-Addinput"
          value={spendInput}
          onChange={(e) => setSpendInput(e.target.value)}
          type="text"
          name=""
          id=""
          placeholder="Add expenses"
        />
        <button className="baseBtnClass" onClick={() => addSpends()}>
          add
        </button>
      </div>
    </div>
  );
}

export default ExpensesCard;
