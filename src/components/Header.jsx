import React, { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import "./style.css";
import { addTask, completeallTask, searchTask } from "../store/taskSlice";

function Header() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task);
  const tasksString = JSON.stringify(tasks.task);
  const task = {
    task: { inputValue },
    isComplete: false,
    isEdit: false,
    id: Date.now(),
  };

  const saveTask = () => {
    localStorage.setItem("tasks", tasksString);
  };

  return (
    <>
      <div className="container-header">
        <h1>All Todo's...</h1>
        <button onClick={saveTask}>Save</button>
      </div>
      <div className="container-top">
        <input
          type="text"
          placeholder="Add Task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          onClick={() => {
            dispatch(addTask(task));
            setInputValue("");
          }}
        >
          +
        </button>
      </div>

      <div className="container-mid">
        <div className="container-mid-left">
          <select name="status" id="status" onChange={(e) => {}}>
            <option value="default" defaultValue={true}>
              All
            </option>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
          <button onClick={() => dispatch(completeallTask())}>
            All Completed
          </button>
        </div>
        <div className="container-mid-right">
          <input
            type="search"
            placeholder="Search Task"
            onChange={(e) => {
              dispatch(searchTask(e.target.value));
            }}
          />
          <MdOutlineSearch />
        </div>
      </div>
      <div className="container-bottom">
        <p>All Tasks...</p>
      </div>
    </>
  );
}

export default Header;
