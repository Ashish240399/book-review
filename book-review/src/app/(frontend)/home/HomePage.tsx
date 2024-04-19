// Import necessary components and functions
"use client";
import { getBooks } from "@/services/book/getBooks";
import React, { useEffect, useState } from "react";
import { Book } from "../../../../types";
import ProductCard from "@/components/ProductCard";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setBooks } from "@/redux/slices/bookArraySlice";
import { getBookByTitleWithSort } from "@/services/book/getBookByTitleWithSort";
import Search from "@/components/Search";
import DropDown from "@/components/DropDown";
import Loader from "@/components/Loader";
import { hideLoader, showLoader } from "@/redux/slices/loaderSlice";

// Define the HomePage component
const HomePage = () => {
  // Define state variables for search and sort
  const [searchBookTitle, setSearchBookTitle] = useState("");
  const [sortBookTitle, setSortBookTitle] = useState("");

  // Use hooks for dispatch and selectors
  const loader = useAppSelector((state) => state.loader.isLoading);
  const dispatch = useAppDispatch();

  // Get the books from the redux store
  const books: Book[] = useAppSelector((state) => state.books.books);

  // Define a function to get the books
  async function getBooksFn() {
    dispatch(showLoader());
    const books = await getBooks({ title: undefined, sort: undefined });
    dispatch(hideLoader());
    dispatch(setBooks(books.data));
  }

  // Define a function to get the book by title with sort
  async function getBookByTitleWithSortFn() {
    dispatch(showLoader());
    const queryedBook = await getBookByTitleWithSort({
      title: searchBookTitle,
      sort: sortBookTitle,
    });
    dispatch(hideLoader());
    if (queryedBook.status == 200) {
      dispatch(setBooks(queryedBook.data));
    }
  }

  // Use the useEffect hook to call the functions when the component mounts or the search or sort changes
  useEffect(() => {
    if (searchBookTitle.length > 0 || sortBookTitle.length > 0) {
      getBookByTitleWithSortFn();
    } else {
      getBooksFn();
    }
  }, [searchBookTitle, sortBookTitle]);

  // Use the useEffect hook to call the getBooksFn function when the component mounts
  useEffect(() => {
    getBooksFn();
  }, []);

  // Render the component
  return (
    <div className="pt-3 w-full">
      <div className="md:w-[50vw] w-full flex md:flex-row flex-col items-center gap-2 pt-3 md:pt-0">
        <Search action={setSearchBookTitle} />
        <DropDown action={setSortBookTitle} />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2 md:grid-cols-4 md:gap-4 md:mt-3">
        {books.length > 0 &&
          books.map((book: Book, id: number) => (
            <ProductCard book={book} key={id} />
          ))}
      </div>
      {books.length == 0 && (
        <p className="text-[20px] md:text-[26px] mt-5 md:mt-6 text-center w-full">
          Result Not Found
        </p>
      )}
      {loader && <Loader />}
    </div>
  );
};

// Export the HomePage component
export default HomePage;
