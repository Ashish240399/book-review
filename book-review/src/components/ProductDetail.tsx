"use client";
import React from "react";
import { Book } from "../../types";
import { Card } from "@mui/material";

type Props = {
  books: Book;
};

const ProductDetail = ({ books }: Props) => {
  return (
    <div>
      <Card>
        <h1>{books.title}</h1>
        <p>{books.description}</p>
        <p>{books.author}</p>
      </Card>
    </div>
  );
};

export default ProductDetail;
