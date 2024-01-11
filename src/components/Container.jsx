import React, { useEffect, useRef } from "react";

import "./style.css";
import useTask from "../components/hooks/useTask";
import Tasks from "./Tasks";
import Header from "./Header";

function Container() {
  const { tasks, setTasks, setSearch } = useTask();
  const inputRef = useRef(false);

  useEffect(() => {
    // Load tasks from localStorage on component mount
    const storedTasks = localStorage.getItem("tasks");
    const parsedTasks = JSON.parse(storedTasks);

    if (storedTasks !== null) {
      setTasks(parsedTasks);
      setSearch(parsedTasks);
    }
  }, []);

  useEffect(() => {
    // Save tasks to localStorage whenever tasks change
    if (inputRef.current) {
      const serializedTasks = JSON.stringify(tasks);
      localStorage.setItem("tasks", serializedTasks);
    }

    inputRef.current = true;
  }, [tasks]);

  return (
    <div className="container">
      <h1>Todo App</h1>
      <Header />
      <div className="container-bottom">
        <p>All Tasks...</p>
      </div>

      <Tasks />
    </div>
  );
}

export default Container;
