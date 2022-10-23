/*
 * @Author: i1mT
 * @Date: 2022-10-19 09:34:51
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-23 14:59:35
 * @Description:
 * @FilePath: \YuqueBlog\src\pages\Home\components\Navbar\index.tsx
 */
import { Link } from "react-router-dom";
import BooksMenu from "./BooksMenu";
import styles from "./index.module.scss";

export default function Navbar() {
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
      </div>
    </div>
  );
}
