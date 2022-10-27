/*
 * @Author: i1mT
 * @Date: 2022-10-17 23:54:50
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-27 22:41:21
 * @Description:
 * @FilePath: \YuqueBlog\src\index.tsx
 */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "@/common/i18n/index";

import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
