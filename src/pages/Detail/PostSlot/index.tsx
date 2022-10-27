/*
 * @Author: i1mT
 * @Date: 2022-10-25 09:17:48
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-27 09:50:16
 * @Description:
 * @FilePath: \YuqueBlog\src\pages\Detail\PostSlot\index.tsx
 */
import BookIcon from "@/common/icon/book";
import RightTopIcon from "@/common/icon/rightTop";
import { PostDetail } from "@/types/blog";
import dayjs from "dayjs";
import styles from "./index.module.scss";

interface IProps {
  post: PostDetail;
}

export default function PostSlot(props: IProps) {
  const { post } = props;
  const { book } = post || {};

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
        <div className={styles.book}>
          <a
            href={`https://www.yuque.com/iimt/${book.slug}`}
            target="_blank"
            className={styles.item}
          >
            <BookIcon />
            {book.name}
          </a>
        </div>
        <div className={styles.yuque}>
          <a
            href={`https://www.yuque.com/iimt/${book.slug}/${post.slug}`}
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
