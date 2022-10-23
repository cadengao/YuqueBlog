/*
 * @Author: i1mT
 * @Date: 2022-10-19 22:01:26
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-23 17:03:05
 * @Description:
 * @FilePath: \YuqueBlog\src\pages\Home\components\Footer\index.tsx
 */
import styles from "./index.module.scss";
export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.item}>
        Designed by <a href="#">iimT</a>
      </div>
      <div className={styles.item}>
        Knowledge base power by <a href="https://www.yuque.com/iimt">Yuque</a>
      </div>
    </div>
  );
}
