/*
 * @Author: i1mT
 * @Date: 2022-10-18 23:09:57
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-25 23:52:18
 * @Description: Home
 * @FilePath: \YuqueBlog\src\pages\Home\index.tsx
 */
import { Outlet, useParams } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import { BlogInfoContext } from "@/App";

import styles from "./index.module.scss";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import ScrollToTop from "./components/ScrollToTop";
import { HomeHeader } from "@/types/blog";
export default function Home() {
  const blogInfo = useContext(BlogInfoContext);
  const params = useParams();
  const [homeHeader, setHomeHeader] = useState<HomeHeader>({
    cover:
      "https://static.wixstatic.com/media/0b340f_b3e8595169574d4098fbe2dee7b2fda1~mv2.jpg/v1/fill/w_2372,h_933,al_c,q_90,enc_auto/0b340f_b3e8595169574d4098fbe2dee7b2fda1~mv2.jpg",
  });

  const updateHomeHeader = () => {
    setHomeHeader({
      title: blogInfo?.settings.title,
      subtitle: blogInfo?.settings.sub_title,
      cover: blogInfo?.settings.cover!,
      slot: (
        <div className={styles.links}>
          {blogInfo?.settings.social_links.map((link, index) => (
            <div key={index} className={styles.socialLinkItem}>
              <a target="_blank" href={link.link}>
                <img src={link.img} />
              </a>
            </div>
          ))}
        </div>
      ),
    });
  };
  useEffect(() => {
    updateHomeHeader();
  }, [blogInfo, params]);
  const titleWidth = useMemo(() => {
    if (blogInfo?.settings.title === homeHeader?.title) return 450;
    const maxWidth = 0.7 * window.document.documentElement.scrollWidth;
    if (Object.keys(params).length) return maxWidth;
  }, [blogInfo, homeHeader, params]);
  return (
    <div className={styles.home}>
      <NavBar />
      <div className={styles.page} id="scrollEl">
        <div className={styles.cover}>
          <div className={styles.content}>
            <div
              className={styles.title}
              style={{
                width: `${titleWidth}px`,
              }}
            >
              {homeHeader?.title}
            </div>
            {homeHeader?.subtitle ? (
              <div className={styles.subTitle}>{homeHeader?.subtitle}</div>
            ) : null}
            {homeHeader?.slot}
          </div>
          <img
            className={styles.coverImg}
            src={homeHeader.cover || blogInfo?.settings.cover}
            onError={() =>
              setHomeHeader((v) => ({ ...v, cover: blogInfo?.settings.cover! }))
            }
          />
        </div>
        <div className={styles.main}>
          <Outlet context={[homeHeader, setHomeHeader]} />
        </div>
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  );
}
