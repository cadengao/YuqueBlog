/*
 * @Author: i1mT
 * @Date: 2022-10-18 23:09:57
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-23 17:34:11
 * @Description: Home
 * @FilePath: \YuqueBlog\src\pages\Home\index.tsx
 */
import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import { BlogInfoContext } from "@/App";

import styles from "./index.module.scss";
import { useContext } from "react";
import ScrollToTop from "./components/ScrollToTop";

export default function Home() {
  const blogInfo = useContext(BlogInfoContext);
  return (
    <div className={styles.home}>
      <NavBar />
      <div className={styles.page}>
        <div className={styles.cover}>
          <div className={styles.content}>
            <div className={styles.title}>{blogInfo?.settings.title}</div>
            <div className={styles.subTitle}>
              {blogInfo?.settings.sub_title}
            </div>
            <div className={styles.links}>
              {blogInfo?.settings.social_links.map((link, index) => (
                <div key={index} className={styles.socialLinkItem}>
                  <a target="_blank" href={link.link}>
                    <img src={link.img} />
                  </a>
                </div>
              ))}
            </div>
          </div>
          <img src="https://static.wixstatic.com/media/0b340f_b3e8595169574d4098fbe2dee7b2fda1~mv2.jpg/v1/fill/w_2372,h_933,al_c,q_90,enc_auto/0b340f_b3e8595169574d4098fbe2dee7b2fda1~mv2.jpg" />
        </div>
        <div className={styles.main}>
          <Outlet />
        </div>
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  );
}
