import ProductDetail from "@/components/ProductDetail";
import React from "react";

type Props = {
  id: string;
};

const BookDetailsPage = ({ id }: Props) => {
  return <div>{id}</div>;
};

export default BookDetailsPage;
