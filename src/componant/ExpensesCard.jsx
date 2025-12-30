import { useState } from "react";
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
const apiUrl = import.meta.env.VITE_API_KEY;

function ExpensesCard({ item, id }) {
  const [spends, setSpends] = useState(item.expenses);
  const [spendInput, setSpendInput] = useState();
  const [totolExpense, setTotalExpense] = useState();
  const [isInputField, setIsInputField] = useState(false);

  async function getAIresult() {
    let arrofexpenses = promptForAI();
    const genAI = new GoogleGenerativeAI(apiUrl);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `${arrofexpenses}. calculate total spending give responce in json   `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    let expence = text.match(/"total_spending":\s*(\d+)/)[1];
    console.log(expence);
    if (expence) {
      setTotalExpense(expence);
    }
  }
  function promptForAI() {
    let prompt = spends.join(", ");
    return prompt;
  }
  function displayInputField(){
    setIsInputField(prev => !prev)
  }
  function addSpends() {
    setSpends([...spends, spendInput]);
  }

  function handleSpendInput(e) {
    setSpendInput(e.target.value);
  }
  return (
    <div key={id} className="expenses-card">
      <div className="expensesCard-titleDiv">
        <h4 className="expensesCard-title">{item.date}</h4>
        <img
          onClick={displayInputField}
          src="/assets/plus.png"
          alt=""
          width={15}
          height={15}
        />
        <button className="styled-button" onClick={getAIresult}>
          Calculate
        </button>
      </div>

      <div className="expenses-cardContent">
        {spends.map((item) => (
          <p>{item}</p>
        ))}
      </div>
      {isInputField == true ? (
        <div className="expenses-cardInputs">
          <input
            value={spendInput}
            onChange={handleSpendInput}
            type="text"
            name=""
            id=""
          />
          <button onClick={() => addSpends()}>add</button>
        </div>
      ) : null}
      <div className="expenses-totalExpenseDiv">{totolExpense}</div>
    </div>
  );
}

export default ExpensesCard;
