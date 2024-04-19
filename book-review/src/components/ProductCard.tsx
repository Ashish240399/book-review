"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Book } from "../../types";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { setBook } from "@/redux/slices/bookDetailsSlice";

export default function ProductCard({ book }: { book: Book }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="w-full">
        <CardMedia
          sx={{
            height: { xs: "50vw", md: "20vw" },
            width: "100%",
          }}
          component="img"
          alt="green iguana"
          image={book.cover_image}
        />
        <div className="p-2 sm:p-3 md:p-4">
          <Typography
            gutterBottom
            component="div"
            sx={{
              typography: {
                xs: "subtitle1", // On extra small screens, use h6
                sm: "h5", // On small screens and up, use h5
              },
            }}
          >
            {book.title}
          </Typography>
          <div className="hidden md:flex">
            <Typography variant="body2" color="text.secondary">
              {book.description}
            </Typography>
          </div>
        </div>
      </div>
      <CardActions
        sx={{
          width: "100%",
        }}
      >
        <Button
          onClick={() => {
            router.push("/book/" + book._id);
            dispatch(setBook(book));
          }}
          size="small"
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
}
