"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function ReadOnlyRating({ value }: { value: number }) {
  return (
    <div className="flex">
      <p className="font-bold">Rating - </p>
      <Rating name="read-only" value={value} readOnly precision={0.5} />
    </div>
  );
}
