import React, { useState, useCallback } from "react";
import { MdOutlineSearch } from "react-icons/md";

import "./style.css";
import useTask from "./hooks/useTask";

function Header() {
  const [inputValue, setInputValue] = useState("");
  const { tasks, setTasks, search, setSearch } = useTask();

  function handelStatusChange(e) {
    const selectedValue = e.target.value;
    let updatedTasks;

    if (selectedValue === "complete") {
      updatedTasks = tasks.filter((task) => task.isComplete === true);
    } else if (selectedValue === "incomplete") {
      updatedTasks = tasks.filter((task) => task.isComplete === false);
    } else {
      updatedTasks = tasks;
    }

    setSearch(updatedTasks);
  }

  const handelAllComplete = useCallback(() => {
    const updatedTasks = tasks.map((task) => ({
      ...task,
      isComplete: true,
    }));

    setTasks(updatedTasks);
    setSearch(updatedTasks);
  }, [tasks, setTasks, setSearch]);

  const handelSearch = useCallback(
    (e) => {
      const searchValue = e.target.value;
      let updatedTasks;

      if (searchValue !== "") {
        updatedTasks = tasks.filter((task) =>
          task.task.toLowerCase().includes(searchValue.toLowerCase())
        );
      } else {
        updatedTasks = tasks;
      }

      setSearch(updatedTasks);
    },
    [tasks, setSearch]
  );

  const handeladdTask = useCallback(() => {
    const newTask = {
      task: inputValue,
      isComplete: false,
      isEdit: false,
      id: Date.now(),
    };

    if (newTask.task.length > 0) {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setSearch((prevTasks) => [...prevTasks, newTask]);
      setInputValue("");
    }
  }, [inputValue, setTasks, setSearch]);

  return (
    <>
      <div className="container-top">
        <input
          type="text"
          placeholder="Add Task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handeladdTask}>+</button>
      </div>

      <div className="container-mid">
        <div className="container-mid-left">
          <select
            name="status"
            id="status"
            onChange={(e) => handelStatusChange(e)}
          >
            <option value="default" defaultValue={true}>
              All
            </option>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
          <button onClick={handelAllComplete}>All Completed</button>
        </div>
        <div className="container-mid-right">
          <input
            type="search"
            placeholder="Search Task"
            onChange={(e) => handelSearch(e)}
          />
          <MdOutlineSearch />
        </div>
      </div>
    </>
  );
}

export default Header;
