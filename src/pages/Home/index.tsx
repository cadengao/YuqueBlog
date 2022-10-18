/*
 * @Author: i1mT
 * @Date: 2022-10-18 23:09:57
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-18 23:49:03
 * @Description: Home
 * @FilePath: \YuqueBlog\src\pages\Home\index.tsx
 */
import { Outlet } from "react-router-dom";
export default function Home() {
  return (
    <div>
      <div>
        <a href="/">Home</a>
      </div>
      <div>
        <a href="/about">about</a>
      </div>
      <hr />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
