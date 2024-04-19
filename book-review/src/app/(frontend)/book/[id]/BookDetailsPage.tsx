"use client";
import ProductDetail from "@/components/ProductDetail";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import React, { useEffect, useState } from "react";
import { Book } from "../../../../../types";
import { getBookById } from "@/services/book/getBookById";
import { setBook } from "@/redux/slices/bookDetailsSlice";
import { addReview } from "@/services/book/addReview";
import { ObjectId } from "mongodb";
import { getReviewByUserId } from "@/services/book/getReviewByUserId";

type Props = {
  id: string;
};

const BookDetailsPage = ({ id }: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [userReview, setUserReview] = useState(0);
  const bookDetails: Book | null = useAppSelector(
    (state) => state.bookDetails.book
  );
  async function getBookByIdFn() {
    const response = await getBookById(id);
    if (response.status === 200) {
      dispatch(setBook(response.data));
    }
  }

  async function addReviewFn(review: number) {
    const response = await addReview({
      bookId: id,
      review: review,
      token: user?.token as string,
      userId: user?._id.toString() as string,
    });
    if (response.status === 200) {
      getBookByIdFn();
      getReviewByUserIdFn();
    }
  }

  async function getReviewByUserIdFn() {
    const response = await getReviewByUserId({
      userId: user?._id.toString() as string,
      bookId: id,
    });
    if (response.status == 200) {
      setUserReview(response.data.review);
    } else {
      setUserReview(0);
    }
  }
  useEffect(() => {
    getBookByIdFn();
    if (user) {
      getReviewByUserIdFn();
    }
  }, [user]);
  return (
    <div>
      {bookDetails && (
        <ProductDetail
          books={bookDetails}
          action={addReviewFn}
          userLoggedIn={user ? true : false}
          userReview={userReview}
        />
      )}
    </div>
  );
};

export default BookDetailsPage;
