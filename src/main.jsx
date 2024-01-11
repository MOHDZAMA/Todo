import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { TaskProvider } from "./components/contexApi/Contex.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <TaskProvider>
      <App />
    </TaskProvider>
  </>
);
