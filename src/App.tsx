/*
 * @Author: i1mT
 * @Date: 2022-10-17 23:54:50
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-18 23:44:42
 * @Description:
 * @FilePath: \YuqueBlog\src\App.tsx
 */
import "./App.scss";
import { RouterProvider } from "react-router-dom";
import router from "./route";

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
