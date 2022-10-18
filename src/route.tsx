/*
 * @Author: i1mT
 * @Date: 2022-10-18 23:08:34
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-18 23:47:04
 * @Description: router
 * @FilePath: \YuqueBlog\src\route.tsx
 */
import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";

export default createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);
