/*
 * @Author: i1mT
 * @Date: 2022-10-23 13:25:36
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-23 17:16:44
 * @Description:
 * @FilePath: \YuqueBlog\src\pages\Post\index.tsx
 */
import fetch from "@/request/fetch";
import { Post as IPost } from "@/types/blog";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "./components/PostCard";
import styles from "./index.module.scss";

const PAGE_CAPACITY = 10;

export default function Post() {
  const { repo } = useParams();
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<IPost[]>();

  const getAllPosts = () => {
    let path = "/doc/all";
    if (repo) {
      path = `/repo/${repo}/docs`;
    }

    fetch.get(path).then((res) => {
      console.log(res);
      setPosts(res.data?.data);
      setPage(1);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, [repo]);

  const renderedPosts = useMemo(() => {
    if (!posts?.length) return [];
    return posts.slice(0, page * PAGE_CAPACITY);
  }, [page, posts]);

  const maxLen = useMemo(() => {
    return posts?.length || 0;
  }, [posts]);

  const hasMore = useMemo(() => {
    return page * PAGE_CAPACITY < maxLen;
  }, [posts, page]);

  return (
    <div className={styles.posts}>
      {maxLen ? (
        renderedPosts.map((post, index) => (
          <PostCard key={post.id} index={index} post={post} />
        ))
      ) : (
        <div className={styles.empty}>这个人很懒，还什么都没有写</div>
      )}
      {hasMore ? (
        <div className={styles.more} onClick={() => setPage((p) => p + 1)}>
          More
        </div>
      ) : null}
    </div>
  );
}
