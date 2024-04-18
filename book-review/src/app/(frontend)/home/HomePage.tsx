"use client";
import { getBooks } from "@/services/book/getBooks";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Book } from "../../../../types";
import ProductCard from "@/components/ProductCard";

const HomePage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  async function getBooksFn() {
    const books = await getBooks({ title: undefined, sort: undefined });
    setBooks(books.data);
  }
  useEffect(() => {
    getBooksFn();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {books.map((book: Book, id: number) => (
          <ProductCard book={book} key={id} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
