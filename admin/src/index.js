import React from "react";
import ReactDOM from "react-dom";
import Admin from "./Admin.js";
import { AuthContextProvider } from "./context/authcontext/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Admin />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
