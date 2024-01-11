import { useContext } from "react";

import { TaskContex } from "../contexApi/Contex";

function useTask() {
  const task = useContext(TaskContex);
  return task;
}

export default useTask;
