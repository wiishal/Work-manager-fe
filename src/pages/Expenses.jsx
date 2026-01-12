import "../style/expenses.css";
import ExpensesCard from "../componant/ExpensesCard";
import { useCallback, useEffect, useState } from "react";
import { fetchExpensesCards } from "../services/expensesService";
import ExpensesPopup from "../componant/ExpensesPopUp";

function Expenses() {
  const [cards, setCards] = useState([]);
  const [isAddCard, setIsAddCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchExpensesCards();
      setCards(res);
    } catch (error) {
      alert("error!");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchExpenses();
  }, []);
  return (
    <div className="expenses-main">
      <div className="expenses-UpperSection">
        <h1 className="expenses-mainTitle">Expenses</h1>
        <div className="expenses-TitleBtn">
          <button
            className="expenses-mainAddbtn"
            onClick={() => setIsAddCard(true)}
          >
            Add
          </button>
        </div>
      </div>
      {isAddCard && (
        <ExpensesPopup
          setIsAddCard={setIsAddCard}
          fetchExpenses={fetchExpenses}
        />
      )}
      <div className="expenses-LowerSection">
        {loading && <div className="spinner" />}
        <div className="expenses-cardDiv">
          {cards &&
            cards.length > 0 &&
            cards.map((item) => (
              <ExpensesCard item={item} fetchExpenses={fetchExpenses} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Expenses;
