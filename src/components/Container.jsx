import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import {
  MdEditAttributes,
  MdOutlineEditAttributes,
  MdDeleteForever,
  MdCheckBox,
  MdOutlineSearch,
} from "react-icons/md";

function Container() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState([]);
  const inputRef = useRef(false);

  useEffect(() => {
    const a = localStorage.getItem("tasks");
    const b = JSON.parse(a);
    if (a !== null) {
      setTasks(b);
      setSearch(b);
    }
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      const a = JSON.stringify(tasks);
      localStorage.setItem("tasks", a);
    }
    inputRef.current = true;
  }, [tasks]);
  function addTask() {
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
  }

  function values(e) {
    const v = e.target.value;
    console.log(tasks);
    if (v === "complete") {
      const updatedTasks = tasks.filter((task) => task.isComplete === true);
      setSearch(updatedTasks);
    } else if (v === "incomplete") {
      const updatedTasks = tasks.filter((task) => task.isComplete === false);
      setSearch(updatedTasks);
    } else {
      setSearch(tasks);
    }
  }

  function find(e) {
    const v = e.target.value;
    if (v !== "") {
      const updatedTasks = search.filter((task) =>
        task.task.toLowerCase().includes(v.toLowerCase())
      );
      setSearch(updatedTasks);
    }
    if (v === "") {
      setSearch(tasks);
    }
  }

  function editTask(index) {
    const newTasks = [...tasks];
    newTasks[index].isEdit = !newTasks[index].isEdit;
    setTasks(newTasks);
    setSearch(newTasks);
  }

  function allComplete() {
    const updatedTasks = tasks.map((task) => ({
      ...task,
      isComplete: true,
    }));

    setTasks(updatedTasks);
    setSearch(updatedTasks);
  }

  function deleteTask(index) {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    setSearch(newTasks);
  }

  function completeTask(index) {
    const newTasks = [...tasks];
    newTasks[index].isComplete = !newTasks[index].isComplete;
    setTasks(newTasks);
    setSearch(newTasks);
  }

  function updateTasks(index) {
    const task = document.getElementById("edit").value;
    const newTasks = [...tasks];
    newTasks[index].task = task;
    setTasks(newTasks);
    setSearch(newTasks);
    newTasks[index].isEdit = !newTasks[index].isEdit;
    const b = JSON.stringify([...tasks, newTasks]);
  }

  // function updateTasks(index) {
  // const newTaskValue = document.getElementById("edit").value;
  //
  // if (newTaskValue !== tasks[index].task) {
  // const updatedTasks = tasks.map((task, i) => {
  // if (i === index) {
  // return { ...task, task: newTaskValue };
  // }
  // return task;
  // });
  //
  // setTasks(updatedTasks);
  // }
  //
  // editTask(index);
  // }

  // function editTask(index) {
  // console.log("start");
  // const updatedTasks = tasks.map((task, i) => {
  // if (i === index) {
  // return { ...task, isEdit: !task.isEdit };
  // }
  // return task;
  // });
  //
  // setTasks(updatedTasks);
  // console.log(updatedTasks);
  // }

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="container-top">
        <input
          type="text"
          placeholder="Add Task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addTask}>+</button>
      </div>
      <div className="container-mid">
        <div className="container-mid-left">
          <select name="status" id="status" onChange={(e) => values(e)}>
            <option value="default" defaultValue={true}>
              All
            </option>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
          <button onClick={allComplete}>All Completed</button>
        </div>
        <div className="container-mid-right">
          <input
            type="search"
            placeholder="Search Task"
            onChange={(e) => find(e)}
          />

          <MdOutlineSearch />
        </div>
      </div>
      <div className="container-bottom">
        <p>All Tasks...</p>
      </div>
      {/* items*/}
      <div className="items">
        {search?.map((tasks, index) => (
          <div className="item" key={index}>
            <div className="item-left">
              <span>{index + 1 + ". "} </span>
              {!tasks.isEdit ? (
                tasks.isComplete ? (
                  <strike>{tasks.task}</strike>
                ) : (
                  <span>{tasks.task}</span>
                )
              ) : (
                <input
                  type="text"
                  defaultValue={tasks.task}
                  id="edit"
                  autoComplete="off"
                  autoCorrect="off"
                />
              )}
            </div>
            <div className="item-right">
              {!tasks.isEdit ? (
                <i>
                  <MdEditAttributes onClick={() => editTask(index)} />
                </i>
              ) : (
                <i>
                  <MdOutlineEditAttributes
                    onClick={() => updateTasks(index) && editTask(index)}
                  />
                </i>
              )}

              <i>
                <MdDeleteForever onClick={() => deleteTask(index)} />
              </i>

              <i>
                <MdCheckBox onClick={() => completeTask(index)} />
              </i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Container;
