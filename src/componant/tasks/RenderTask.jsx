import { useState, useEffect } from "react";
import {
  getAllTasks,
  deleteTask,
} from "../../services/taskService";
import ShowError from "../ShowError";
import { checkBoxChecked,checkBoxEmpty } from "../../assets/assets";
import { toggleStatus } from "../../services/taskService";



export default function RenderTask({
  render,
  setAddTask,
  seteditTaskDiv,
  addTask,
  setRender,
}) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [render]);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await getAllTasks();
      setTasks(res.tasks);
    } catch (err) {
      if (err?.isAppError) {
        setError(err.message);
      } else {
        setError("Failed to fetch tasks");
      }
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  };

  async function handleDeleteTask(id) {
    if (!id) return;

    try {
      await deleteTask(id);
      setRender((prev) => !prev); 
    } catch (err) {
      if (err?.isAppError) {
        setError(err.message);
      } else {
        setError("Failed to delete task");
      }
    }
  }

  function handleEditTask(id) {
    seteditTaskDiv(null);
    seteditTaskDiv(id);
    if (addTask) setAddTask(false);
  }

  if (isLoading) return <div className="spinner" />;

  return (
    <>
      {error && <ShowError error={error} closeErrorPopUp={setError} />}

      {tasks.length === 0 && !error && (
        <p className="empty-text">No tasks found</p>
      )}

      {tasks.map((task) => (
        <div key={task.id} className="render-main">
          <div className="render-taskDetails">
            <BoxImage
              task={task}
              setTasks={setTasks}
              setError={setError}
            />
            <p>{task.title}</p>
          </div>

          <div className="render-taskdescription">
            <p>{task.taskDescription}</p>
          </div>

          <div className="render-taskstatus">
            <img
              src="https://res.cloudinary.com/ddg85vpnk/image/upload/v1739965624/calendar_s9wgbg.png"
              width={15}
              alt="calendar"
            />
            <p>{task.date}</p>
          </div>

          <div className="render-Btn">
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="render-btn"
            >
              delete
            </button>
            <button
              onClick={() => handleEditTask(task.id)}
              className="render-btn"
            >
              edit
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

function BoxImage({ task, setTasks, setError }) {
  const [processing, setProcessing] = useState(false);

  async function handleToggleStatus() {
    setProcessing(true);

    try {
      const res = await toggleStatus(task.id);

      setTasks((prev) =>
        prev.map((item) =>
          item.id === task.id
            ? { ...item, complete: res.data.taskStatus }
            : item
        )
      );
    } catch (err) {
      if (err.isAppError) {
        setError(err.message);
      } else {
        setError("Failed to update task status");
      }
    } finally {
      setProcessing(false);
    }
  }

  if (processing) return <div className="spinner small" />;

  return (
    <img
      style={{ cursor: "pointer" }}
      onClick={handleToggleStatus}
      src={task.complete ? checkBoxChecked : checkBoxEmpty}
      width={15}
      height={15}
      alt="checkbox"
    />
  );
}
