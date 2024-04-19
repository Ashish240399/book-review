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
      <div>
        <CardMedia
          sx={{
            height: "20vw",
            width: "100%",
          }}
          component="img"
          alt="green iguana"
          image={book.cover_image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.description}
          </Typography>
        </CardContent>
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
