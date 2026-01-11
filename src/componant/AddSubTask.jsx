import { useEffect, useState } from "react";
import { getSubTasks } from "../services/subtaskService";
import ShowError from "./ShowError";
import { addSubTask, subTaskAssistance } from "../services/subtaskService";
import { checkBoxEmpty, checkBoxChecked,deletePng } from "../assets/assets";

function AddSubTask({ Task }) {

  
  const [subtaskInput, setSubTaskInput] = useState("");
  const [processing, setProcessing] = useState(false);
  const [subTasks, setSubTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isbtnDisable, setIsBtnDisable] = useState(false);
  const [subTaskSuggestions, setSubTaskSuggestions] = useState([]);



  const getAssistanceSubTask = async () => {

    setIsBtnDisable(true);

    const taskDetails = {
      title: Task.title,
      description: Task.taskDescription,
    };


    console.log("assistance for task :", taskDetails);
    try {
      const data = await subTaskAssistance(taskDetails);
      setSubTaskSuggestions(data);
      console.log(data, ": suggestions");
    } catch (error) {
      setError("error while assistance! ");
      console.log(error);
    } finally {
      setIsBtnDisable(false);
    }
  };



  const fetchSubtask = async () => {
    setProcessing(true);
    try {
      const res = await getSubTasks(Task.id);
      console.log(res);
      setSubTasks(res.subtasks);
    } catch (error) {
      console.log(error);
      alert("error");
    } finally {
      setProcessing(false);
    }
  };


  const addSubTaskFunc = async () => {
    if (subtaskInput == "") {
      setError("Empty input");
      return;
    }
    try {
      const res = await addSubTask(subtaskInput, Task.id);
      setSubTasks((prev) => [...prev, res.subtask]);
    } catch (error) {
      setError("something went Wrong!");
    } finally {
      setSubTaskInput("");
    }
  };




  useEffect(() => {
    fetchSubtask();
  }, []);



  return (
    <div className="addsubTask">
      <h3>Sub Task</h3>
      {error && <ShowError error={error} closeErrorPopUp={setError} />}
      <div>
        <input
          className="baseInputClass"
          type="text"
          value={subtaskInput}
          onChange={(e) => setSubTaskInput(e.target.value)}
          name=""
          id=""
        />
        <button className="baseBtnClass" onClick={() => addSubTaskFunc()}>
          Add
        </button>
        <button
          className="baseBtnClass"
          onClick={() => {
            if (!isbtnDisable) {
              getAssistanceSubTask();
            }
          }}
        >
          Assist
        </button>
        {isbtnDisable && <div className="spinner"></div>}
      </div>
      {processing && <div className="spinner" />}

      {subTasks.length > 0 &&
        
        subTasks.map((task, i) => (
          <div className="subtaskRender">
            {!task.complete ? (
              <img
                onClick={() => checkSubTask(Task.taskId, i)}
                src={checkBoxEmpty}
                alt=""
                width={14}
                height={14}
              />
            ) : (
              <img
                onClick={() => checkSubTask(Task.taskId, i)}
                src={checkBoxChecked}
                alt=""
                width={14}
                height={14}
              />
            )}

            <p key={i}>{task.detail}</p>
            <img
              onClick={() => {
                deleteSubTask(Task.taskId, i);
              }}
              src={deletePng}
              alt=""
              width={10}
              height={10}
            />
          </div>
        ))}
      {subTaskSuggestions.length > 0 &&
        subTaskSuggestions.map((item) => <div>{item.title}</div>)}
    </div>
  );
}

export default AddSubTask;
