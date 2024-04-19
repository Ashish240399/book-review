"use client";
import React from "react";
import { Book } from "../../types";
import { Card, CardMedia } from "@mui/material";
import ReadOnlyRating from "./ReadOnlyRating";
import ControlledRating from "./ControlledRating";

const ProductDetail = ({
  books,
  action,
  userLoggedIn,
  userReview,
}: {
  books: Book;
  action: Function;
  userLoggedIn: boolean;
  userReview: number;
}) => {
  return (
    <div className="flex justify-center items-center">
      <Card
        sx={{
          display: "flex",
          gap: "2%",
          width: "fit-content",
          padding: "2vw",
        }}
      >
        <div>
          <CardMedia
            sx={{
              height: "30vw",
              width: "100%",
            }}
            component="img"
            alt="green iguana"
            image={books.cover_image}
          />
        </div>
        <div>
          <p className="font-bold text-[26px]">{books.title}</p>
          <p className="text-[13px]">{books.description}</p>
          <p className="mt-6">
            <span className="font-bold">Author - </span>
            {books.author}
          </p>
          <p>
            <span className="font-bold">Genre - </span>
            {books.genre.join(", ")}
          </p>
          <p>
            <span className="font-bold">Published on - </span>
            {books.publication_year}
          </p>
          <p>
            <ReadOnlyRating value={4} />
          </p>
          {userLoggedIn ? (
            <div className="mt-3">
              <ControlledRating action={action} userReview={userReview} />
            </div>
          ) : (
            <div className="mt-6">
              Please Login to add your valueable for about this book.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProductDetail;
