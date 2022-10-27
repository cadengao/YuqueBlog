/*
 * @Author: i1mT
 * @Date: 2022-10-27 10:12:51
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-27 23:15:55
 * @Description:
 * @FilePath: \YuqueBlog\src\common\i18n\index.ts
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "post.empty": "Nothing.",

      "postCard.word": "word",
      "postCard.words": "words",
      "postCard.minute": "minute",
      "postCard.minutes": "minutes",
      "postCard.read": "Read",
      "postCard.like": "like",
      "postCard.likes": "likes",
      "postCard.comment": "comment",
      "postCard.comments": "comments",
      "postCard.readInYuque": "Read in Yuque",
      "postDetail.slot.update_at": "Updated at",
      "postDetail.slot.created_at": "Created at",
      "postDetail.slot.read": "Read",
      "postDetail.slot.readInYuque": "Read & like & comment in Yuque",
    },
  },
  cn: {
    translation: {
      "post.empty": "这个人很懒，还什么都没有写",

      "postCard.word": "字",
      "postCard.words": "字",
      "postCard.minute": "分钟",
      "postCard.minutes": "分钟",
      "postCard.like": "喜欢",
      "postCard.likes": "喜欢",
      "postCard.comment": "评论",
      "postCard.comments": "评论",
      "postCard.readInYuque": "在语雀中阅读",
      "postCard.read": "阅读",

      "postDetail.slot.update_at": "更新于",
      "postDetail.slot.created_at": "发布于",
      "postDetail.slot.readInYuque": "在语雀中 阅读、点赞、评论",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "cn",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
