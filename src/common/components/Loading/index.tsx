/*
 * @Author: i1mT
 * @Date: 2022-10-28 00:37:48
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-28 00:48:07
 * @Description:
 * @FilePath: \YuqueBlog\src\common\components\Loading\index.tsx
 */
import LoadingIcon from "@/common/icon/loading";
import React from "react";
import styles from "./index.module.scss";

interface IProps {
  show?: boolean;
}
export default function Loading(props: IProps) {
  const { show } = props;
  if (!show) return null;
  return (
    <div className={styles.loading}>
      <LoadingIcon />
    </div>
  );
}
