/*
 * @Author: i1mT
 * @Date: 2022-10-17 23:54:50
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-22 21:34:21
 * @Description:
 * @FilePath: \YuqueBlog\src\App.tsx
 */
import "./App.scss";
import { RouterProvider } from "react-router-dom";
import router from "./route";
import { createContext, useState, useEffect } from "react";
import { BlogInfo } from "./types/blog";
import fetch from "./request/fetch";

export const BlogInfoContext = createContext<BlogInfo | null>(null);

function App() {
  const [blogInfo, setBlogInfo] = useState<BlogInfo | null>(null);
  function getBlogInfo() {
    // 防止到404后陷入循环
    if (window.location.pathname === "/404") return;
    fetch
      .get("/blog/info")
      .then((res) => {
        setBlogInfo(res?.data?.data);
      })
      .catch(() => {
        window.location.href = "/404";
      });
  }
  useEffect(() => {
    getBlogInfo();
  }, []);
  return (
    <BlogInfoContext.Provider value={blogInfo}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </BlogInfoContext.Provider>
  );
}

export default App;
