"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function ControlledRating({
  action,
  userReview,
}: {
  action: Function;
  userReview: number;
}) {
  const [value, setValue] = React.useState<number | null>(0);
  React.useEffect(() => {
    setValue(userReview);
  }, [userReview]);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <p className="text-[16px] md:[20px]">Add Your Review About This Book</p>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          action(newValue);
        }}
      />
    </Box>
  );
}
