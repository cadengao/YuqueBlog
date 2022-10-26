/*
 * @Author: i1mT
 * @Date: 2022-10-18 23:09:57
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-27 00:39:14
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
import { GlobalState, Lang } from "@/types/blog";

export type IGlobalContext = [
  GlobalState,
  React.Dispatch<React.SetStateAction<GlobalState>>
];
export const GlobalContext = createContext<IGlobalContext>([] as any);

export default function Home() {
  const blogInfo = useContext(BlogInfoContext);
  const params = useParams();
  const [globalState, setGlobalState] = useState<GlobalState>({
    lang: Lang.en,
    cover:
      "https://static.wixstatic.com/media/0b340f_b3e8595169574d4098fbe2dee7b2fda1~mv2.jpg/v1/fill/w_2372,h_933,al_c,q_90,enc_auto/0b340f_b3e8595169574d4098fbe2dee7b2fda1~mv2.jpg",
  });

  const updateHomeHeader = () => {
    setGlobalState((state) => ({
      ...(state || {}),
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
    }));
  };
  useEffect(() => {
    updateHomeHeader();
  }, [blogInfo, params]);
  const titleWidth = useMemo(() => {
    if (blogInfo?.settings.title === globalState?.title) return 450;
    const maxWidth = 0.7 * window.document.documentElement.scrollWidth;
    if (Object.keys(params).length) return maxWidth;
  }, [blogInfo, globalState, params]);
  return (
    <GlobalContext.Provider value={[globalState, setGlobalState]}>
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
                {globalState?.title}
              </div>
              {globalState?.subtitle ? (
                <div className={styles.subTitle}>{globalState?.subtitle}</div>
              ) : null}
              {globalState?.slot}
            </div>
            <img
              className={styles.coverImg}
              src={globalState.cover || blogInfo?.settings.cover}
              onError={() =>
                setGlobalState((v) => ({
                  ...v,
                  cover: blogInfo?.settings.cover!,
                }))
              }
            />
          </div>
          <div className={styles.main}>
            <Outlet context={[globalState, setGlobalState]} />
          </div>
          <Footer />
        </div>
        <ScrollToTop />
      </div>
    </GlobalContext.Provider>
  );
}
