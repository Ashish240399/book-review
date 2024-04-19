"use client";
// Import necessary components and functions
import ProductDetail from "@/components/ProductDetail";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import React, { useEffect, useState } from "react";
import { Book } from "../../../../../types";
import { getBookById } from "@/services/book/getBookById";
import { setBook } from "@/redux/slices/bookDetailsSlice";
import { addReview } from "@/services/book/addReview";
import { getReviewByUserId } from "@/services/book/getReviewByUserId";
import { getTotalBookReview } from "@/services/book/getTotalBookReview";
import { Button } from "@mui/base";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/navigation";
import { hideLoader, showLoader } from "@/redux/slices/loaderSlice";
import Loader from "@/components/Loader";

// Define the props for the BookDetailsPage component
type Props = {
  id: string;
};

// Define the BookDetailsPage component
const BookDetailsPage = ({ id }: Props) => {
  // Use hooks for dispatch, router, and selectors
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loader = useAppSelector((state) => state.loader.isLoading);
  const user = useAppSelector((state) => state.user.user);

  // Define state variables for user review and book review
  const [userReview, setUserReview] = useState(0);
  const [bookReview, setBookReview] = useState(0);

  // Get the book details from the redux store
  const bookDetails: Book | null = useAppSelector(
    (state) => state.bookDetails.book
  );

  // Define a function to get the book by id
  async function getBookByIdFn() {
    const response = await getBookById(id);
    if (response.status === 200) {
      dispatch(setBook(response.data));
    }
  }

  // Define a function to add a review
  async function addReviewFn(review: number) {
    dispatch(showLoader());
    const response = await addReview({
      bookId: id,
      review: review,
      token: user?.token as string,
      userId: user?._id.toString() as string,
    });
    dispatch(hideLoader());
    alert("Thank you for your feedback!");
    if (response.status === 200) {
      getReviewByUserIdFn();
      getBookTotalReviewsFn();
    }
  }

  // Define a function to get the review by user id
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

  // Define a function to get the total book reviews
  async function getBookTotalReviewsFn() {
    dispatch(showLoader());
    const response = await getTotalBookReview({ bookId: id });
    dispatch(hideLoader());

    if (response.status == 200) {
      setBookReview(response.data.review);
    } else {
      setBookReview(0);
    }
  }

  // Use the useEffect hook to call the functions when the component mounts
  useEffect(() => {
    getBookByIdFn();
    getBookTotalReviewsFn();
    if (user) {
      getReviewByUserIdFn();
    }
  }, [user]);

  // Render the component
  return (
    <div className="pt-4 sm:pt-6 md:pt-0">
      <div className="md:flex hidden">
        <Button
          onClick={() => {
            router.back();
          }}
        >
          <ArrowBackIosIcon />
        </Button>
      </div>

      {bookDetails && (
        <ProductDetail
          books={bookDetails}
          action={addReviewFn}
          userLoggedIn={user ? true : false}
          userReview={userReview}
          bookReview={bookReview}
        />
      )}
      {loader && <Loader />}
    </div>
  );
};

// Export the BookDetailsPage component
export default BookDetailsPage;
