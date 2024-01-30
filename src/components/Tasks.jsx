import React, { useEffect, useState } from "react";
import "./style.css";
import {
  MdEditAttributes,
  MdOutlineEditAttributes,
  MdDeleteForever,
  MdCheckBox,
} from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";
import { deleteTask, completeTask, updateTask } from "../store/taskSlice";

function Tasks() {
  const [editValue, setEditValue] = useState("");
  const tasks = useSelector((state) => state.task.task);
  const search = useSelector((state) => state.task.search);

  const dispatch = useDispatch();
  console.log(search);

  return (
    <div className="items">
      {(search.length > 0 ? search : tasks)?.map((task, index) => (
        <div className="item" key={task.id}>
          <div className="item-left">
            <span>{index + 1 + ". "} </span>
            {!task.isEdit ? (
              task.isComplete ? (
                <strike>{task.task.inputValue}</strike>
              ) : (
                <span>{task.task.inputValue}</span>
              )
            ) : (
              <input
                type="text"
                defaultValue={task.task.inputValue}
                onChange={(e) => setEditValue(e.target.value)}
                autoComplete="off"
                autoCorrect="off"
              />
            )}
          </div>
          <div className="item-right">
            {!task.isEdit ? (
              <i>
                <MdEditAttributes
                  onClick={() => {
                    dispatch(updateTask([task.id, task.task.inputValue])),
                      setEditValue(task.task.inputValue);
                  }}
                />
              </i>
            ) : (
              <i>
                <MdOutlineEditAttributes
                  onClick={() => {
                    dispatch(updateTask([task.id, editValue]));
                  }}
                />
              </i>
            )}

            <i>
              <MdDeleteForever onClick={() => dispatch(deleteTask(task.id))} />
            </i>

            <i>
              <MdCheckBox onClick={() => dispatch(completeTask(task.id))} />
            </i>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
