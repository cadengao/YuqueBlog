/*
 * @Author: i1mT
 * @Date: 2022-10-22 18:25:50
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-23 14:57:32
 * @Description:
 * @FilePath: \YuqueBlog\src\pages\Home\components\Navbar\BooksMenu\index.tsx
 */
import fetch from "@/request/fetch";
import { Book } from "@/types/blog";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";

interface IProps {
  className?: string;
}
export default function BooksMenu(props: IProps) {
  const { className } = props;
  const [books, setBooks] = useState<Book[]>([]);
  const getBooks = () => {
    fetch.get("/repo/all").then((res) => {
      setBooks(res.data?.data);
    });
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className={`${styles.booksMenu} ${className}`}>
      {books.map((book) => {
        return (
          <Link
            key={book.id}
            className={styles.bookItem}
            to={`/books/${book.slug}`}
          >
            {book.name}
          </Link>
        );
      })}
    </div>
  );
}
