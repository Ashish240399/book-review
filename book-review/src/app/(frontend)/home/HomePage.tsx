"use client";
import { getBooks } from "@/services/book/getBooks";
import React, { useEffect, useState } from "react";
import { Book } from "../../../../types";
import ProductCard from "@/components/ProductCard";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setBooks } from "@/redux/slices/bookArraySlice";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const books: Book[] = useAppSelector((state) => state.books.books);
  async function getBooksFn() {
    const books = await getBooks({ title: undefined, sort: undefined });
    dispatch(setBooks(books.data));
  }
  useEffect(() => {
    getBooksFn();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {books.length > 0 &&
          books.map((book: Book, id: number) => (
            <ProductCard book={book} key={id} />
          ))}
      </div>
    </div>
  );
};

export default HomePage;
