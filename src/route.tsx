/*
 * @Author: i1mT
 * @Date: 2022-10-18 23:08:34
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-23 13:27:25
 * @Description: router
 * @FilePath: \YuqueBlog\src\route.tsx
 */
import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";
import NotFound from "@/pages/404";
import Post from "@/pages/Post";

export default createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Post />,
      },
      {
        path: "/books/:repo",
        element: <Post />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
    errorElement: <NotFound />,
  },
]);
