/*
 * @Author: i1mT
 * @Date: 2022-10-18 23:09:57
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-19 22:32:11
 * @Description: Home
 * @FilePath: \YuqueBlog\src\pages\Home\index.tsx
 */
import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

import styles from "./index.module.scss";

export default function Home() {
  return (
    <div className={styles.home}>
      <NavBar />
      <div className={styles.cover}>
        <div className="title"></div>
        <img src="https://static.wixstatic.com/media/0b340f_b3e8595169574d4098fbe2dee7b2fda1~mv2.jpg/v1/fill/w_2372,h_933,al_c,q_90,enc_auto/0b340f_b3e8595169574d4098fbe2dee7b2fda1~mv2.jpg" />
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
