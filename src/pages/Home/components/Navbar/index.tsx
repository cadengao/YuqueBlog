/*
 * @Author: i1mT
 * @Date: 2022-10-19 09:34:51
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-19 09:46:42
 * @Description:
 * @FilePath: \YuqueBlog\src\pages\Home\components\Navbar\index.tsx
 */
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
      <div className={styles.left}>Blog</div>
      <div className={styles.right}>
        {routes.map((r, index) => (
          <div
            className={styles.routeItem}
            key={index}
            onClick={() => (window.location.href = r.route)}
          >
            {r.label}
          </div>
        ))}
      </div>
    </div>
  );
}
