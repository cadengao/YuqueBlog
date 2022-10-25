/*
 * @Author: i1mT
 * @Date: 2022-10-23 15:10:24
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-25 09:06:27
 * @Description:
 * @FilePath: \YuqueBlog\src\pages\Post\components\PostCard\index.tsx
 */
import { Post } from "@/types/blog";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import styles from "./index.module.scss";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
interface IProps {
  post: Post;
  repo?: string;
  index: number;
}
const DEFAULT_COVER = "http://rjuhs1s8m.hd-bkt.clouddn.com/unnamed.png";

enum ITimeFormatType {
  exact, // 如 几月几日
  latest, // 如 几分钟前
}
function formatTime(time: string, type: ITimeFormatType) {
  const exact = (t: string) => {
    return dayjs(t).format("YYYY-MM-DD HH:mm:ss");
  };
  const latest = (t: string) => {
    return dayjs(t).fromNow();
  };
  return type === ITimeFormatType.exact ? exact(time) : latest(time);
}
export default function PostCard(props: IProps) {
  const { post, index, repo } = props;
  return (
    <div className={`${styles.postCard} ${index % 2 ? styles.reverse : ""}`}>
      <div className={styles.cover}>
        <Link to={`/doc/${post.slug}`}>
          <img src={DEFAULT_COVER || post.cover} alt={post.title} />
        </Link>
      </div>
      <div className={styles.right}>
        <div className={styles.time}>
          {formatTime(post.published_at, ITimeFormatType.exact)}
          <span className={styles.dot}>·</span>
          {formatTime(post.published_at, ITimeFormatType.latest)}
        </div>
        <Link to={`/doc/${post.repo}/${post.slug}`} className={styles.title}>
          {post.title}
        </Link>
        <div className={styles.description}>{post.description}</div>
        <div className={styles.statics}>
          <span>
            {post.word_count} word{post.word_count > 1 ? "s" : ""}
          </span>
          <span className={styles.dot}>·</span>
          <span>
            {post.likes_count} like{post.likes_count > 1 ? "s" : ""}
          </span>
          <span className={styles.dot}>·</span>
          <span>
            {post.comments_count} comment{post.comments_count > 1 ? "s" : ""}
          </span>
          <span className={styles.dot}>·</span>
          <a
            href={`https://www.yuque.com/iimt/${repo}/${post.slug}`}
            target="_blank"
          >
            Read in Yuque
          </a>
        </div>
      </div>
    </div>
  );
}
