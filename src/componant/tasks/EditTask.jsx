import { useEffect, useState } from "react";
import { getTask, updateTask } from "../../services/taskService";
import { useDate } from "../../hooks/useDate";
import AddSubTask from "../AddSubTask";
import ShowError from "../ShowError";

function EditTask({ setRender, editTaskDiv, seteditTaskDiv }) {
  const today = useDate();
  const [processing, setProcessing] = useState(false);
  const [edit, setEdit] = useState({ title: false, des: false });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // task state definition
  const [task, setTask] = useState({
    id: null,
    userId: null,
    complete: false,
    title: "",
    taskDescription: "",
    date: today,
    list: [],
    tags: [],
    Subtask: [],
  });

  async function fetchtask(editTaskDiv) {
    setIsLoading(true);
    try {
      const task = await getTask(editTaskDiv);
      setTask(task);
      setIsLoading(false);
    } catch {
      if (error.isAppError) {
        setError(error);
      } else {
        setError(new Error("An unexpected error occurred"));
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchtask(editTaskDiv);
  }, [editTaskDiv]);

  function inputHandler(e, field) {
    setTask((prev) => ({ ...prev, [field]: e.target.value }));
  }
  function checkInputs(data) {
    const isempty = Object.values(data).some((detail) => detail === "");
    return isempty;
  }

  async function update() {
    setProcessing(true);
    const data = { title: task.title, date: task.date };
    const isInputEmpty = checkInputs(data);
    if (isInputEmpty) {
      alert("Check title and Date");
      return;
    }
    try {
      const res = await updateTask({
        ...data,
        id: task.id,
        complete: task.complete,
        taskDescription: task.taskDescription,
        tags: task.tags,
        list: task.list,
      });
      if (res) {
        alert("task updated successfully");
        setRender((prev) => !prev);
        return;
      }
    } catch (error) {
      alert("failed to update task");
    } finally {
      setProcessing(false);
    }
  }

  function setEditHandler(field) {
    const toggleValue = edit[field];
    setEdit((prev) => ({ ...prev, [field]: !toggleValue }));
  }

  if (isLoading) return <div className="loading-div">Loading...</div>;
  return (
    <div className="edit-main">
      {error && <ShowError error={error} closeErrorPopUp={setError} />}
      <div className="edit-title">
        <div className="edit-titleEditBtn">
          <label htmlFor="">task</label>
          <button
            onClick={() => setEditHandler("title")}
            className="edit-editBtns"
          >
            {edit.title ? "Cancel" : "Edit"}
          </button>
        </div>
        {edit.title ? (
          <input
            className="edit-titleInput"
            onChange={(e) => inputHandler(e, "title")}
            value={task.title || ""}
          ></input>
        ) : (
          <p className="edit-titleText">{task.title || ""}</p>
        )}
      </div>
      <div className="edit-des">
        <div className="edit-DesEditBtn">
          <label htmlFor="">Description</label>
          <button
            onClick={() => setEditHandler("des")}
            className="edit-editBtns"
          >
            {edit.des ? "Cancel" : "Edit"}
          </button>
        </div>
        {edit.des ? (
          <textarea
            className="edit-DesInput"
            style={{ width: "15rem", height: "fit-content" }}
            value={task.taskDescription || ""}
            onChange={(e) => inputHandler(e, "taskDescription")}
            type="text"
          />
        ) : (
          <p className="edit-DesText">{task.taskDescription || ""}</p>
        )}
      </div>
      <div className="edit-date">
        {/* {Task.date} */}
        <input
          type="date"
          className="edit-dateInput"
          onChange={(e) => inputHandler(e, "date")}
          value={task.date || Date.now()}
        />
      </div>
      <div className="edit-tagList">
        <div className="edit-tag ">
          <label htmlFor="">tags </label>
          {task.tags.length > 0 ? (
            <div className="edit-tagItem">
              {task.tags.map((i, k) => (
                <p key={k}>{i}</p>
              ))}
            </div>
          ) : (
            <div>no Tags</div>
          )}
        </div>
        <div className="edit-list">
          <label htmlFor="">List</label>
          {task.list.length > 0 ? (
            <div className="edit-listItem">
              {task.list.map((i, k) => (
                <p key={k}>{i}</p>
              ))}
            </div>
          ) : (
            <div>no list</div>
          )}
        </div>
      </div>
      <div className="edit-saveBtnDiv">
        {processing ? (
          <div className="spinner" />
        ) : (
          <button onClick={update} className="baseBtnClass">
            save
          </button>
        )}
        <button
          onClick={() => {
            seteditTaskDiv(null);
          }}
          className="baseBtnClass"
        >
          Cancel
        </button>
      </div>
      <AddSubTask
        TaskId={task.id}
        taskTitle={task.title}
        taskDescription={task.taskDescription}
      />
    </div>
  );
}

export default EditTask;
