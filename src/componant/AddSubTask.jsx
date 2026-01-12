import { useEffect, useState } from "react";
import { getSubTasks } from "../services/subtaskService";
import ShowError from "./ShowError";
import {
  addSubTask,
  subTaskAssistance,
  deleteSubTask,
} from "../services/subtaskService";
import { checkBoxEmpty, checkBoxChecked, deletePng } from "../assets/assets";

function AddSubTask({ TaskId, taskTitle, taskDescription }) {
  const [subtaskInput, setSubTaskInput] = useState("");
  const [processing, setProcessing] = useState(false);
  const [subTasks, setSubTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isbtnDisable, setIsBtnDisable] = useState(false);
  const [subTaskSuggestions, setSubTaskSuggestions] = useState([]);

  const getAssistanceSubTask = async () => {
    setIsBtnDisable(true);

    const taskDetails = {
      title: taskTitle,
      description: taskDescription,
    };

    try {
      const data = await subTaskAssistance(taskDetails);
      console.log(data);
      setSubTaskSuggestions(data);
      console.log(data, ": suggestions");
    } catch (error) {
      setSubTaskSuggestions([]);
      setError("error while assistance! ");
    } finally {
      setIsBtnDisable(false);
    }
  };

  const fetchSubtask = async () => {
    setProcessing(true);

    try {
      const res = await getSubTasks(TaskId);
      console.log(res);
      setSubTasks(res.subtasks);
    } catch (error) {
      setError("error while getting! ");
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
      console.log(error)
      setError("something went Wrong!");
    } finally {
      setSubTaskInput("");
    }
  };

  const addSuggestedSubTaskFunc = async (subSuggestedtaskInput, i) => {
    if (subSuggestedtaskInput == "") {
      setError("Empty input");
      return;
    }
    console.log(subSuggestedtaskInput, "id: ", i);
    try {
      const res = await addSubTask(subSuggestedtaskInput, TaskId);
      const filterSuggestions = subTaskSuggestions.filter(
        (_, index) => index != i
      );

      setSubTaskSuggestions(filterSuggestions);
      setSubTasks((prev) => [...prev, res.subtask]);
    } catch (error) {
            console.log(error)

      setError("something went Wrong!");
    } finally {
      setSubTaskInput("");
    }
  };
  const deleteSubTaskFunc = async (id, i) => {
    try {
      const res = await deleteSubTask(id);
      const filterSubtask = subTasks.filter((_, index) => index != i);
      setSubTasks(filterSubtask);
    } catch (error) {
      setError("something went Wrong! while deleting subtask");
      console.log("error", error);
    } finally {
    }
  };
  useEffect(() => {
    setSubTasks([]);
    fetchSubtask();
  }, [TaskId]);

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
      <div className="subtaskRenderDiv">
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
                  deleteSubTaskFunc(task.id, i);
                }}
                src={deletePng}
                alt=""
                width={10}
                height={10}
              />
            </div>
          ))}
      </div>
      <div className="subtaskSuggestionRenderDiv">
        {subTaskSuggestions.length > 0 &&
          subTaskSuggestions.map((item, i) => (
            <p
              className="subtaskSuggestionRenderItem"
              onClick={() => addSuggestedSubTaskFunc(item.title, i)}
            >
              {item.title}
            </p>
          ))}
      </div>
    </div>
  );
}

export default AddSubTask;
