import React from "react";
import BookDetailsPage from "./BookDetailsPage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Book Details Page",
  description: "Simaple Book Details Page for Book Review Application",
};

const BookDetails = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <BookDetailsPage id={params.id} />
    </div>
  );
};

export default BookDetails;
