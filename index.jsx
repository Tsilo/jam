import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./style.css";

console.log(Pear);

const root = createRoot(document.getElementById("root"));
const { app } = await Pear.versions();

root.render(
  <App
    topic={
      app.key ||
      "54137a386673415371314f125z6d386f504574574259624e32446a7377393752"
    }
  />,
);
