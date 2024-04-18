import React from "react";
import BookDetailsPage from "./BookDetailsPage";

const BookDetails = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <BookDetailsPage id={params.id} />
    </div>
  );
};

export default BookDetails;
