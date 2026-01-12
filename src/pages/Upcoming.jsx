import React, { useEffect, useCallback, useState } from "react";
import "../style/Upcoming.css";
import { getAllTasks } from "../services/taskService";
import { useFormatDate } from "../hooks/useFormateDate";

function Upcoming() {
  const { formatDate } = useFormatDate();

  const [groupedTasks, setGroupedTasks] = useState({
    today: [],
    other: [],
  });

  const groupTasks = useCallback(
    (tasks) => {
      const grouped = {
        today: [],
        other: [],
      };

      tasks.forEach((task) => {
        if (task.date === formatDate) {
          grouped.today.push(task);
        } else {
          grouped.other.push(task);
        }
      });

      setGroupedTasks(grouped);
    },
    [formatDate] // ✅ dependency
  );

  async function fetchTask() {
    try {
      const response = await getAllTasks();
      groupTasks(response.tasks);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div className="Upcoming-main">
      <div className="Upcoming-main-title">
        <h1>Upcoming</h1>
      </div>

      <div className="Upcoming-top">
        <p className="Upcoming-titles">Today</p>
        <div className="Upcoming-task-div">
          {groupedTasks.today.length === 0 && <p>No tasks for today</p>}
          {groupedTasks.today.map((task) => (
            <TaskTemplate key={task.id} task={task} />
          ))}
        </div>
      </div>

      <div className="Upcoming-bottom">
        <p className="Upcoming-titles">Week</p>
        <div className="Upcoming-task-div">
          {groupedTasks.other.length === 0 && <p>No upcoming tasks</p>}
          {groupedTasks.other.map((task) => (
            <TaskTemplate key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}

const TaskTemplate = ({ task }) => {
  console.log(task, "task tem");
  return (
    <div className="Upcoming-task">
      <img
        src={task.complete ? "/assets/check-mark.png" : "/assets/dry-clean.png"}
        alt=""
        width={13}
        height={13}
      />
      <div className="Upcoming-task-subdiv">
        <p
          className="Upcoming-task-title"
          style={{
            color: task.complete ? "" : "inherit",
          }}
        >
          {task.title}
        </p>

        <img src="/assets/right-arrow.png" alt="" width={13} height={13} />
      </div>
    </div>
  );
};

export default Upcoming;
