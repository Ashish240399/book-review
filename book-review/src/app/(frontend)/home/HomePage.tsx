"use client";
import { getBooks } from "@/services/book/getBooks";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { Book } from "../../../../types";

const HomePage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  async function getBooksFn() {
    const books = await getBooks({ title: undefined, sort: undefined });
    setBooks(books.data);
  }
  console.log(books);
  return (
    <div>
      <Button onClick={() => getBooksFn()} variant="contained">
        home
      </Button>
    </div>
  );
};

export default HomePage;
