import { useState } from "react";
import axios from "axios";
function AddSpendCard({ fetchSpends }) {
  function AddCard() {
    axios
      .post("http://localhost:3001/api/expenses/addExpenses", {
        id: Math.random(),
        date: new Date().toLocaleDateString,
        expenses_user: [""],
      })
      .then((res) => {
        console.log(res.data);
        fetchSpends();
      });
  }

  function handleIsAddSpendCard() {
    AddCard();
    console.log("addspend()");
  }
  return (
    <>
      {" "}
      <div>
        <button onClick={handleIsAddSpendCard} className="styled-button">
          Add
        </button>
      </div>
    </>
  );
}

export default AddSpendCard;
