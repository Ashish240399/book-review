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
  bookReview,
}: {
  books: Book;
  action: Function;
  userLoggedIn: boolean;
  userReview: number;
  bookReview: number;
}) => {
  return (
    <div className="flex justify-center items-center">
      <Card
        sx={{
          width: "fit-content",
          padding: "2vw",
        }}
      >
        <div className="flex md:flex-row flex-col sm:flex-row gap-2">
          <div>
            <CardMedia
              sx={{
                height: { xs: "90vw", md: "20vw", sm: "50vw" },
                width: "100%",
              }}
              component="img"
              alt="green iguana"
              image={books.cover_image}
            />
          </div>
          <div>
            <p className="font-bold md:text-[26px] text-[20px]">
              {books.title}
            </p>
            <p className="text-[13px]">{books.description}</p>
            <p className="mt-6 md:text-[16px] text-[14px]">
              <span className="font-bold">Author - </span>
              {books.author}
            </p>
            <p className="md:text-[16px] text-[14px]">
              <span className="font-bold">Genre - </span>
              {books.genre.join(", ")}
            </p>
            <p className="md:text-[16px] text-[14px]">
              <span className="font-bold">Published on - </span>
              {books.publication_year}
            </p>
            <p className="md:text-[16px] text-[14px]">
              <ReadOnlyRating value={bookReview} />
            </p>
            {userLoggedIn ? (
              <div className="mt-3">
                <ControlledRating action={action} userReview={userReview} />
              </div>
            ) : (
              <div className="mt-6 md:text-[16px] text-[14px]">
                Please Login to add your valueable feedback about this book.
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetail;
