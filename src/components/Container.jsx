import React, { useEffect, useRef } from "react";

import "./style.css";

import Tasks from "./Tasks";
import Header from "./Header";

import { useDispatch } from "react-redux";
import { addTask } from "../store/taskSlice";

function Container() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    const parsedTasks = JSON.parse(storedTasks);

    if (parsedTasks) {
      parsedTasks.map((task) => {
        const tasks = {
          task: { inputValue: task.task.inputValue },
          isComplete: task.isComplete,
          isEdit: task.isEdit,
          id: task.id,
        };
        dispatch(addTask(tasks));
      });
    }
  }, []);

  return (
    <div className="container">
      <Header />
      <Tasks />
    </div>
  );
}

export default Container;
