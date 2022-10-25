/*
 * @Author: i1mT
 * @Date: 2022-10-25 09:17:48
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-26 00:46:36
 * @Description:
 * @FilePath: \YuqueBlog\src\pages\Detail\PostSlot\index.tsx
 */
import { PostDetail } from "@/types/blog";
import dayjs from "dayjs";
import styles from "./index.module.scss";

interface IProps {
  post?: PostDetail;
  repo: string;
}
const RightTopIcon = () => (
  <svg
    className="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="3161"
    width="200"
    height="200"
  >
    <path
      d="M608.682667 355.882667L286.165333 678.4a42.666667 42.666667 0 0 0 60.330667 60.330667l322.517333-322.517334a8.533333 8.533333 0 0 1 14.549334 6.058667V682.666667a42.666667 42.666667 0 0 0 85.333333 0V341.333333a85.333333 85.333333 0 0 0-85.333333-85.333333h-341.333334a42.666667 42.666667 0 0 0 0 85.333333h260.394667a8.533333 8.533333 0 0 1 6.058667 14.549334z"
      fill="#ffffff"
      p-id="3162"
    ></path>
  </svg>
);
export default function PostSlot(props: IProps) {
  const { post, repo } = props;

  if (!post) return null;
  return (
    <div className={styles.postSlot}>
      <div className={styles.info}>
        <div>
          <span className={styles.item}>
            更新于: {dayjs(post.updated_at).format("YYYY-MM-DD HH:mm:ss")}
          </span>
          <span className={styles.dot} />
          <span className={styles.item}>
            发布于: {dayjs(post.published_at).format("YYYY-MM-DD HH:mm:ss")}
          </span>
        </div>
        <div className={styles.statistics}>
          <span className={styles.item}>{post.word_count} 字</span>
          <span className={styles.dot} />
          <span className={styles.item}>
            阅读 {Math.ceil(post.word_count / 300)} 分钟
          </span>
          <span className={styles.dot} />
          {post.likes_count ? (
            <span className={styles.item}>{post.likes_count} 赞</span>
          ) : null}
          <span className={styles.dot} />
          {post.comments_count ? (
            <span className={styles.item}>{post.comments_count} 评论</span>
          ) : null}
        </div>
        <div className={styles.yuque}>
          <a
            href={`https://www.yuque.com/iimt/${repo}/${post.slug}`}
            target="_blank"
          >
            在语雀中 阅读、点赞、评论
            <RightTopIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
