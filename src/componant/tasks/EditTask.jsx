import { useEffect, useState } from "react";
import { getTask, updateTask } from "../../services/taskService";
import { useDate } from "../../hooks/useDate";
import AddSubTask from "../AddSubTask";

function EditTask({ setRender, editTaskDiv, seteditTaskDiv }) {
  const today = useDate();
  const [processing, setProcessing] = useState(false);
  const [Task, setTask] = useState({
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
  const [edit, setEdit] = useState({ title: false, des: false });
  const [isLoading, setIsLoading] = useState(true);

  async function fetchtask(editTaskDiv) {
    const res = await getTask(editTaskDiv);
    if (res) {
      setTask({
        id: res.task.id,
        userId: res.task.UserId,
        complete: res.task.complete,
        title: res.task.title,
        taskDescription: res.task.taskDescription,
        date: res.task.date,
        list: res.task.list,
        tags: res.task.tags,
        Subtask: res.task.Subtask,
      });
      setIsLoading(false);
      return;
    }
  }

  useEffect(() => {
    console.log("editTaskComp! effect trigg");
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
    const data = { title: Task.title, date: Task.date };
    const isInputEmpty = checkInputs(data);
    if (isInputEmpty) {
      alert("Check title and Date");
      return;
    }
    try {
      const res = await updateTask({
        ...data,
        id: Task.id,
        complete: Task.complete,
        taskDescription: Task.taskDescription,
        tags: Task.list,
        list: Task.tags,
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
            value={Task.title || ""}
          ></input>
        ) : (
          <p className="edit-titleText">{Task.title || ""}</p>
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
            value={Task.taskDescription || ""}
            onChange={(e) => inputHandler(e, "taskDescription")}
            type="text"
          />
        ) : (
          <p className="edit-DesText">{Task.taskDescription || ""}</p>
        )}
      </div>
      <div className="edit-date">
        {/* {Task.date} */}
        <input
          type="date"
          className="edit-dateInput"
          onChange={(e) => inputHandler(e, "date")}
          value={Task.date || Date.now()}
        />
      </div>
      <div className="edit-tagList">
        <div className="edit-tag ">
          <label htmlFor="">tags </label>
          {Task.tags.length > 0 ? (
            <div className="edit-tagItem">
              {Task.tags.map((i, k) => (
                <p key={k}>{i}</p>
              ))}
            </div>
          ) : (
            <div>no Tags</div>
          )}
        </div>
        <div className="edit-list">
          <label htmlFor="">List</label>
          {Task.list.length > 0 ? (
            <div className="edit-listItem">
              {Task.list.map((i, k) => (
                <p key={k}>{i}</p>
              ))}
            </div>
          ) : (
            <div>no list</div>
          )}
        </div>
      </div>
      <div>
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
        TaskId={Task.id}
        taskTitle={Task.title}
        taskDescription={Task.taskDescription}
      />
    </div>
  );
}

export default EditTask;
