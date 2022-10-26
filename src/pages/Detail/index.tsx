/*
 * @Author: i1mT
 * @Date: 2022-10-24 09:14:33
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-26 10:14:29
 * @Description:
 * @FilePath: \YuqueBlog\src\pages\Detail\index.tsx
 */

import fetch from "@/request/fetch";
import { PostDetail } from "@/types/blog";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import PostSlot from "./PostSlot";
import styles from "./index.module.scss";
import themeStyles from "./markdown.module.scss";
import { marked } from "marked";

export default function Detail() {
  const { doc, repo } = useParams();
  const [homeHeader, setHomeHeader] = useOutletContext();
  const [postDetail, setPostDetail] = useState<PostDetail>();
  const getDetail = () => {
    fetch.get(`/doc/${doc}/detail?repo=${repo}`).then((res) => {
      setPostDetail(res.data?.data?.data);
    });
  };
  useEffect(() => {
    getDetail();
  }, [doc, repo]);

  useEffect(() => {
    if (!postDetail || !repo) return;
    setHomeHeader({
      title: postDetail?.title,
      subtitle: "",
      cover: postDetail?.cover,
      slot: <PostSlot post={postDetail} repo={repo} />,
    });
  }, [postDetail, repo]);

  return (
    <article
      className={themeStyles.article}
      dangerouslySetInnerHTML={{
        __html: marked.parse(postDetail?.body || ""),
      }}
    ></article>
  );
}
