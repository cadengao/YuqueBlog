/*
 * @Author: i1mT
 * @Date: 2022-10-19 09:34:51
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-20 22:22:16
 * @Description:
 * @FilePath: \YuqueBlog\src\pages\Home\components\Navbar\index.tsx
 */
import { Link } from "react-router-dom";
import styles from "./index.module.scss";

export default function Navbar() {
  const routes = [
    {
      label: "All Post",
      route: "/posts",
    },
    {
      label: "Tags",
      route: "/tags",
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
        {routes.reverse().map((r, index) => (
          <Link className={styles.routeItem} key={index} to={r.route}>
            {r.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
