/*
 * @Author: i1mT
 * @Date: 2022-10-24 09:14:33
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-27 09:58:01
 * @Description:
 * @FilePath: \YuqueBlog\src\pages\Detail\index.tsx
 */

import fetch from "@/request/fetch";
import { GlobalState, PostDetail } from "@/types/blog";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import PostSlot from "./PostSlot";
import styles from "./index.module.scss";
import { IGlobalContext } from "../Home";

const getPostDetailMainWidth = () => {
  if (window.document.documentElement.scrollWidth < 1024) return 100;
  return 85;
};

export default function Detail() {
  const { doc, repo } = useParams();
  const [globalState, setGlobalState] = useOutletContext<IGlobalContext>();
  const [postDetail, setPostDetail] = useState<PostDetail>();
  const [iframeHeight, setIframeHeight] = useState<number>(300);
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
    setGlobalState((state) => ({
      ...state,
      title: postDetail?.title,
      subtitle: "",
      mainWidth: getPostDetailMainWidth(),
      coverHeight: 350,
      cover: postDetail?.cover,
      slot: <PostSlot post={postDetail} />,
    }));
  }, [postDetail, repo]);
  useEffect(() => {
    window.addEventListener(
      "message",
      (event) => {
        if (
          event.data?.type !== "doc_ready" &&
          event.data?.type !== "doc_height_change"
        )
          return;
        const { payload } = event.data;
        setIframeHeight(payload.height || 300);
      },
      false
    );
  }, []);
  return (
    <iframe
      className={styles.iframe}
      style={{
        height: `${iframeHeight * 1.5}px`,
      }}
      name="article"
      src={`https://www.yuque.com/iimt/${repo}/${doc}?view=doc_embed&from=iimt_blog&outline=1&translate=${globalState.lang}`}
    ></iframe>
  );
}
