/*
 * @Author: i1mT
 * @Date: 2022-10-24 09:14:33
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-26 00:45:11
 * @Description:
 * @FilePath: \YuqueBlog\src\pages\Detail\index.tsx
 */

import fetch from "@/request/fetch";
import { PostDetail } from "@/types/blog";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import PostSlot from "./PostSlot";

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
    setHomeHeader({
      title: postDetail?.title,
      subtitle: "",
      cover: postDetail?.cover,
      slot: <PostSlot post={postDetail} repo={repo} />,
    });
  }, [postDetail]);
  return (
    <article
      dangerouslySetInnerHTML={{ __html: postDetail?.body_html || "" }}
    ></article>
  );
}
