/*
 * @Author: i1mT
 * @Date: 2022-10-19 09:34:51
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-27 00:45:09
 * @Description:
 * @FilePath: \YuqueBlog\src\pages\Home\components\Navbar\index.tsx
 */
import { Lang } from "@/types/blog";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { IGlobalContext, GlobalContext } from "../..";
import BooksMenu from "./BooksMenu";
import styles from "./index.module.scss";

export default function Navbar() {
  const [globalState, setGlobalState] =
    useContext<IGlobalContext>(GlobalContext);

  const routes = [
    {
      label: "All Post",
      route: "/",
    },
    {
      label: "Books",
      route: "/books",
      hoverElement: BooksMenu,
    },
    {
      label: "About",
      route: "/about",
    },
  ];
  const handleToggleLang = () => {
    if (globalState.lang === Lang.en) {
      setGlobalState((s) => ({ ...(s || {}), lang: Lang.cn }));
    } else {
      setGlobalState((s) => ({ ...(s || {}), lang: Lang.en }));
    }
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <Link to="/">iimT's Blog</Link>
      </div>
      <div className={styles.right}>
        {routes.reverse().map((r, index) => {
          const Hover = r.hoverElement;
          if (Hover) {
            return (
              <div key={index} className={styles.routeItem}>
                {r.label}
                <Hover className={styles.hoverElement} />
              </div>
            );
          }
          return (
            <div key={index} className={styles.routeItem}>
              <Link to={r.route}>{r.label}</Link>
            </div>
          );
        })}
        <div className={styles.switch} onClick={handleToggleLang}>
          <span
            className={`${styles.switchOption} ${
              globalState.lang === Lang.en ? styles.switchActive : ""
            }`}
          >
            en
          </span>
          <span
            className={`${styles.switchOption} ${
              globalState.lang === Lang.cn ? styles.switchActive : ""
            }`}
          >
            cn
          </span>
        </div>
      </div>
    </div>
  );
}
