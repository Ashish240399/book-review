import { ObjectId } from "mongodb";

type User = {
  name: string;
  email: string;
  password: string;
  token?: string;
};

type Book = {
  id: number;
  title: string;
  author: string;
  publication_year: number;
  genre: string[];
  description: string;
  cover_image: string;
};

type Review = {
  userId: ObjectId;
  bookId: ObjectId;
  review: number;
};
