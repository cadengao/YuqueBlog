/*
 * @Author: i1mT
 * @Date: 2022-10-24 09:14:33
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-28 00:59:48
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
import Loading from "@/common/components/Loading";
import { toTop } from "../Home/components/ScrollToTop";

const getPostDetailMainWidth = () => {
  if (window.document.documentElement.scrollWidth < 1024) return 95;
  if (window.document.documentElement.scrollWidth < 750) return 100;
  return 70;
};

export default function Detail() {
  const { doc, repo } = useParams();
  const [globalState, setGlobalState] = useOutletContext<IGlobalContext>();
  const [postDetail, setPostDetail] = useState<PostDetail>();
  const [iframeHeight, setIframeHeight] = useState<number>(300);
  const [loading, setLoading] = useState<boolean>(true);
  const getDetail = () => {
    fetch.get(`/doc/${doc}/detail?repo=${repo}`).then((res) => {
      setPostDetail(res.data?.data?.data);
    });
  };
  useEffect(() => {
    getDetail();
  }, [doc, repo]);

  useEffect(() => {
    toTop();
  }, []);

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
        if (event.data?.type === "doc_ready") {
          setLoading(false);
        }
        const { payload } = event.data;
        setIframeHeight(payload.height || 300);
      },
      false
    );
  }, []);
  return (
    <>
      <Loading show={loading} />
      <iframe
        className={styles.iframe}
        style={{
          height: `${iframeHeight * 1.5}px`,
        }}
        name="article"
        src={`https://www.yuque.com/iimt/${repo}/${doc}?view=doc_embed&from=iimt_blog&outline=1&translate=${globalState.lang}`}
      ></iframe>
    </>
  );
}
