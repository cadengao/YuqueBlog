/*
 * @Author: i1mT
 * @Date: 2022-10-18 23:46:48
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-19 09:54:14
 * @Description:
 * @FilePath: \YuqueBlog\src\pages\About\index.tsx
 */
import request from "@/request/fetch";
import { useEffect, useState } from "react";

export default function About() {
  const [about, setAbout] = useState();
  useEffect(() => {
    request.get("/blog").then((res) => {
      console.log(res);
      setAbout(res.data?.data);
    });
  }, []);
  return (
    <div>
      {about?.title}
      <h1>{about?.title}</h1>
      <h1>{about?.title}</h1>
      <h1>{about?.title}</h1>
      <h1>{about?.title}</h1>
      <h1>{about?.title}</h1>
    </div>
  );
}
