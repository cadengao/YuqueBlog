/*
 * @Author: i1mT
 * @Date: 2022-10-25 09:17:48
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-28 01:07:12
 * @Description:
 * @FilePath: \YuqueBlog\src\pages\Detail\PostSlot\index.tsx
 */
import BookIcon from "@/common/icon/book";
import RightTopIcon from "@/common/icon/rightTop";
import { PostDetail } from "@/types/blog";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";

interface IProps {
  post: PostDetail;
}

export default function PostSlot(props: IProps) {
  const { post } = props;
  const { book } = post || {};
  const { t } = useTranslation();
  const needMinute = Math.ceil(post.word_count / 300);

  if (!post) return null;
  return (
    <div className={styles.postSlot}>
      <div className={styles.info}>
        <div>
          <span className={styles.item}>
            {t("postDetail.slot.update_at")}:{" "}
            {dayjs(post.updated_at).format("YYYY-MM-DD HH:mm:ss")}
          </span>
          <span className={styles.dot} />
          <span className={styles.item}>
            {t("postDetail.slot.created_at")}:{" "}
            {dayjs(post.published_at).format("YYYY-MM-DD HH:mm:ss")}
          </span>
        </div>
        <div className={styles.statistics}>
          <span className={styles.item}>
            {post.word_count}{" "}
            {t(`postCard.word${post.word_count > 2 ? "s" : ""}`)}
          </span>
          <span className={styles.dot} />
          <span className={styles.item}>
            {t("postCard.read")} {}{" "}
            {t(`postCard.minute${needMinute > 2 ? "s" : ""}`)}
          </span>
          <span className={styles.dot} />
          {post.likes_count ? (
            <span className={styles.item}>
              {post.likes_count}{" "}
              {t(`postCard.like${needMinute > 2 ? "s" : ""}`)}
            </span>
          ) : null}
          <span className={styles.dot} />
          {post.comments_count ? (
            <span className={styles.item}>
              {post.comments_count}{" "}
              {t(`postCard.comment${needMinute > 2 ? "s" : ""}`)}
            </span>
          ) : null}
        </div>
        <div className={styles.book}>
          <Link to={`/books/${book.slug}`} className={styles.item}>
            <BookIcon />
            {book.name}
          </Link>
        </div>
        <div className={styles.yuque}>
          <a
            href={`https://www.yuque.com/iimt/${book.slug}/${post.slug}`}
            target="_blank"
          >
            {t("postDetail.slot.readInYuque")}
            <RightTopIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
