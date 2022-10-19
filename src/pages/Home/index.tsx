/*
 * @Author: i1mT
 * @Date: 2022-10-18 23:09:57
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-19 09:52:44
 * @Description: Home
 * @FilePath: \YuqueBlog\src\pages\Home\index.tsx
 */
import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";

import styles from "./index.module.scss";

export default function Home() {
  return (
    <div className={styles.home}>
      <NavBar />
      <div className={styles.cover}>
        <img
          src="https://static.wixstatic.com/media/0b340f_b3e8595169574d4098fbe2dee7b2fda1~mv2.jpg/v1/fill/w_2372,h_933,al_c,q_90,enc_auto/0b340f_b3e8595169574d4098fbe2dee7b2fda1~mv2.jpg"
          alt=""
        />
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
}
