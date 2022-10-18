/*
 * @Author: i1mT
 * @Date: 2022-10-18 22:48:16
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-18 22:52:40
 * @Description:
 * @FilePath: \YuqueBlog\src\request\fetch.ts
 */
import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:8000" : "";

export default axios;
