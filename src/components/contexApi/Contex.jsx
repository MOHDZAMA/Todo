import { createContext, useState } from "react";

export const TaskContex = createContext();

export const TaskProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState([]);

  return (
    <TaskContex.Provider value={{ tasks, setTasks, search, setSearch }}>
      {props.children}
    </TaskContex.Provider>
  );
};
