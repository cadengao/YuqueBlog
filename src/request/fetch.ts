/*
 * @Author: i1mT
 * @Date: 2022-10-18 22:48:16
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-19 09:23:49
 * @Description:
 * @FilePath: \YuqueBlog\src\request\fetch.ts
 */
import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:8000" : "",
});
