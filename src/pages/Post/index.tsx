/*
 * @Author: i1mT
 * @Date: 2022-10-23 13:25:36
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-28 01:08:29
 * @Description:
 * @FilePath: \YuqueBlog\src\pages\Post\index.tsx
 */
import fetch from "@/request/fetch";
import { Book, Post as IPost } from "@/types/blog";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useOutletContext, useParams } from "react-router-dom";
import { IGlobalContext } from "../Home";
import PostCard from "./components/PostCard";
import styles from "./index.module.scss";

const PAGE_CAPACITY = 10;

export default function Post() {
  const { repo } = useParams();
  const [page, setPage] = useState(1);
  const [globalState, setGlobalState] = useOutletContext<IGlobalContext>();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [repos, setRepos] = useState<Book[]>([]);
  const { t } = useTranslation();

  const getAllPosts = () => {
    let path = "/doc/all";
    if (repo) {
      path = `/repo/${repo}/docs`;
    }

    fetch.get(path).then((res) => {
      setPosts(res.data?.data);
      setPage(1);
    });
  };

  const updateCurrentRepo = () => {
    fetch.get("/repo/all").then((res) => {
      const repos: Book[] = res.data?.data || [];
      setRepos(repos);
      if (!repo) return;
      const curRepo = repos.find((r) => r.slug === repo);
      if (!curRepo) return;
      setGlobalState((s) => ({
        ...(s || {}),
        title: curRepo.name,
        subtitle: curRepo.description,
        slot: null,
      }));
    });
  };

  useEffect(() => {
    getAllPosts();
    updateCurrentRepo();
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
          <PostCard key={post.id} repo={post.repo} index={index} post={post} />
        ))
      ) : (
        <div className={styles.empty}>{t("post.empty")}</div>
      )}
      {hasMore ? (
        <div className={styles.more} onClick={() => setPage((p) => p + 1)}>
          More
        </div>
      ) : null}
    </div>
  );
}
