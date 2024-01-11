import React, { useState } from "react";
import "./style.css";
import {
  MdEditAttributes,
  MdOutlineEditAttributes,
  MdDeleteForever,
  MdCheckBox,
} from "react-icons/md";

import useTask from "../components/hooks/useTask";

function Tasks() {
  const { tasks, setTasks, search, setSearch } = useTask();
  const [editValue, setEditValue] = useState("");

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
    const newTasks = [...tasks];
    newTasks[index].task = editValue;
    setTasks(newTasks);
    setSearch(newTasks);
    newTasks[index].isEdit = !newTasks[index].isEdit;
  }

  function editTask(index) {
    const newTasks = [...tasks];
    newTasks[index].isEdit = !newTasks[index].isEdit;
    setTasks(newTasks);
    setSearch(newTasks);
  }
  return (
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
                onChange={(e) => setEditValue(e.target.value)}
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
  );
}

export default Tasks;
